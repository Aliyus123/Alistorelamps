/* ================================================================
   LOGIN PAGE LOGIC
   ================================================================ */
const authView = document.getElementById('authView');
const loggedInPanel = document.getElementById('loggedInPanel');
const loggedInEmail = document.getElementById('loggedInEmail');
const continueBtn = document.getElementById('continueBtn');
const orderHistoryList = document.getElementById('orderHistoryList');

const modeSignIn = document.getElementById('modeSignIn');
const modeSignUp = document.getElementById('modeSignUp');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const submitBtn = document.getElementById('submitBtn');
const authForm = document.getElementById('authForm');
const formMessage = document.getElementById('formMessage');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const toggleVisibility = document.getElementById('toggleVisibility');

let mode = 'signin';

// Read where the person should land after signing in — set by
// auth.js on every page as "login.html?redirect=<page>".
const params = new URLSearchParams(location.search);
const redirectTarget = params.get('redirect');

/* ---------- Mode switch: Sign in / Create account ---------- */
function setMode(newMode){
  mode = newMode;
  const isSignUp = mode === 'signup';

  modeSignIn.classList.toggle('active', !isSignUp);
  modeSignUp.classList.toggle('active', isSignUp);

  formTitle.textContent = isSignUp ? 'Create account' : 'Sign in';
  formSubtitle.textContent = isSignUp
    ? 'Set up your account to start ordering faster.'
    : 'Welcome back. Enter your details below.';
  submitBtn.textContent = isSignUp ? 'Create account' : 'Sign in';
  passwordInput.autocomplete = isSignUp ? 'new-password' : 'current-password';

  hideMessage();
}
modeSignIn.addEventListener('click', () => setMode('signin'));
modeSignUp.addEventListener('click', () => setMode('signup'));

/* ---------- Show/hide password ---------- */
toggleVisibility.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  toggleVisibility.textContent = isHidden ? '🙈' : '👁';
  toggleVisibility.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});

/* ---------- Validation ---------- */
function validate(){
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailValid = emailPattern.test(email);
  document.getElementById('f-email').classList.toggle('invalid', !emailValid);

  const passwordValid = password.length >= 6;
  document.getElementById('f-password').classList.toggle('invalid', !passwordValid);

  return emailValid && passwordValid;
}

/* ---------- Message helpers ---------- */
function showMessage(text, type){
  formMessage.textContent = text;
  formMessage.className = 'form-message ' + type;
}
function hideMessage(){
  formMessage.className = 'form-message';
  formMessage.textContent = '';
}

function friendlyError(error){
  const map = {
    'auth/invalid-email': 'That email address doesn\'t look right.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/email-already-in-use': 'An account already exists with that email.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  };
  return map[error.code] || 'Something went wrong. Please try again.';
}

/* ---------- Form submit ---------- */
authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideMessage();
  if (!validate()) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Please wait…';

  const action = mode === 'signup'
    ? auth.createUserWithEmailAndPassword(email, password)
    : auth.signInWithEmailAndPassword(email, password);

  action
    .then(() => { /* onAuthStateChanged (auth.js) drives the UI update */ })
    .catch(error => { showMessage(friendlyError(error), 'error'); })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = mode === 'signup' ? 'Create account' : 'Sign in';
    });
});

/* ---------- Google sign-in ---------- */
document.getElementById('googleSignInBtn').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(error => {
    showMessage(friendlyError(error), 'error');
  });
});

/* ---------- Forgot password ---------- */
document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email){
    showMessage('Enter your email above first, then click "Forgot password?"', 'error');
    return;
  }
  auth.sendPasswordResetEmail(email)
    .then(() => showMessage('Password reset email sent. Check your inbox.', 'success'))
    .catch(error => showMessage(friendlyError(error), 'error'));
});

document.getElementById('signOutBtn').addEventListener('click', () => {
  auth.signOut();
});

/* ---------- Order history for the signed-in account ---------- */
function renderOrderHistory(email){
  const orders = ORDERS.forUser(email);
  if (orders.length === 0){
    orderHistoryList.innerHTML = '<p class="order-history-empty">No orders placed yet. Start shopping to see your order history here!</p>';
    return;
  }
  
  orderHistoryList.innerHTML = orders.map(o => {
    const date = new Date(o.placedAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    const itemsArray = Array.isArray(o.items) ? o.items : JSON.parse(o.items || '[]');
    const itemsHtml = itemsArray.map(item => `
      <div class="oh-product-item">
        <span class="product-name">${item.name || 'Item'}</span>
        <span class="product-qty">×${item.qty || 1}</span>
        <span>${CART.fmt(item.price || 0)}</span>
      </div>
    `).join('');
    
    return `
      <div class="order-history-item">
        <div class="oh-header">
          <div class="oh-id">Order #${o.orderId.slice(-8).toUpperCase()}</div>
          <div class="oh-date">${date}</div>
        </div>
        <div class="oh-products">
          ${itemsHtml}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
          <div style="color:var(--off); font-size:0.8rem;">${itemsArray.length} item${itemsArray.length !== 1 ? 's' : ''}</div>
          <div class="oh-total">Total: ${CART.fmt(Number(o.total))}</div>
        </div>
      </div>
    `;
  }).join('');
}

/* ---------- React to auth state (this is the actual bug fix) ----------
   Previously the signed-in panel had no link back to the store at all,
   so once you logged in you were stuck on this page. Now the panel
   always shows a clear, working way out — straight back to checkout
   if that's where sign-in was triggered from (via ?redirect=), or to
   the store otherwise. --------------------------------------------- */
window.onAuthReady = function(user){
  if (user){
    authView.style.display = 'none';
    loggedInPanel.classList.add('active');
    loggedInEmail.textContent = user.email;
    const goingToCheckout = redirectTarget && redirectTarget !== 'login.html';
    continueBtn.textContent = goingToCheckout ? 'Continue to checkout' : 'Continue to store';
    continueBtn.href = goingToCheckout ? redirectTarget : 'index.html';
    renderOrderHistory(user.email);
  } else {
    authView.style.display = 'block';
    loggedInPanel.classList.remove('active');
  }
};
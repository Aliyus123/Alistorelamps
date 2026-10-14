/* ================================================================
   AUTH — shared across index.html, checkout.html and login.html.
   Because every page uses the same Firebase project, someone who
   signs in on login.html is automatically recognised everywhere else.
   ================================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyAHMnkXDm8uZ65T-ARCwM_u2Dr5viu1Pzw",
  authDomain: "alistore-logins.firebaseapp.com",
  projectId: "alistore-logins",
  storageBucket: "alistore-logins.firebasestorage.app",
  messagingSenderId: "844772101530",
  appId: "1:844772101530:web:3be3e42913ab6b0acffe23"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

window.AUTH = { currentUser: null };

auth.onAuthStateChanged(user => {
  window.AUTH.currentUser = user;
  renderAuthStatus();
  if (typeof window.onAuthReady === 'function') window.onAuthReady(user);
});

function renderAuthStatus(){
  const container = document.getElementById('authStatus');
  if (!container) return;
  const user = window.AUTH.currentUser;
  if (user){
    const displayName = user.displayName || user.email.split('@')[0];
    container.innerHTML = `
      <div class="auth-chip">
        <span>Hi, <span class="user-name">${displayName}</span></span>
        <button id="topbarSignOut">Sign out</button>
      </div>`;
    document.getElementById('topbarSignOut').addEventListener('click', () => auth.signOut());
  } else {
    // Carries the current page along so, after signing in, login.html
    // can send the person straight back to where they were.
    const redirect = encodeURIComponent(location.pathname.split('/').pop() || 'index.html');
    container.innerHTML = `<a href="login.html?redirect=${redirect}" class="auth-link">Sign in</a>`;
  }
}
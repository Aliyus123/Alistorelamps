/* ================================================================
   CHECKOUT — validation + order placement for checkout.html
   ================================================================ */
const checkoutForm = document.getElementById('checkoutForm');
const confirmPanel = document.getElementById('confirmPanel');
const emptyCartMsg = document.getElementById('emptyCartMsg');

function refreshCheckoutVisibility(){
  const isEmpty = CART.items.length === 0;
  const confirmShown = confirmPanel.classList.contains('active');
  if (isEmpty && !confirmShown){
    checkoutForm.style.display = 'none';
    emptyCartMsg.style.display = 'block';
  } else if (!confirmShown){
    checkoutForm.style.display = 'block';
    emptyCartMsg.style.display = 'none';
  }
}
window.onCartChanged = refreshCheckoutVisibility;

// Payment method selection
document.querySelectorAll('.pay-method').forEach(label => {
  label.addEventListener('click', () => {
    document.querySelectorAll('.pay-method').forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');
    label.querySelector('input').checked = true;
  });
});

function validateField(id, condition){
  const field = document.getElementById('f-' + id);
  field.classList.toggle('invalid', !condition);
  return condition;
}

function validateForm(){
  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const region = document.getElementById('region').value;

  const phonePattern = /^[0-9+\s-]{9,14}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validName = validateField('name', name.length >= 2);
  const validPhone = validateField('phone', phonePattern.test(phone));
  const validEmail = validateField('email', email === '' || emailPattern.test(email));
  const validAddress = validateField('address', address.length >= 5);
  const validCity = validateField('city', city.length >= 2);
  const validRegion = validateField('region', region !== '');

  return validName && validPhone && validEmail && validAddress && validCity && validRegion;
}

document.getElementById('placeOrderBtn').addEventListener('click', () => {
  if (CART.items.length === 0) return;

  // GATE: you must be signed in to actually place an order. Browsing
  // and editing the cart works without an account — this is the one
  // point where we require it.
  const loginMsg = document.getElementById('loginRequiredMsg');
  const user = window.AUTH && window.AUTH.currentUser;
  if (!user){
    loginMsg.style.display = 'block';
    loginMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  loginMsg.style.display = 'none';

  if (!validateForm()) return;

  const orderId = 'ALI-' + Date.now().toString().slice(-8);
  const itemsSummary = CART.items.map(i => {
    const p = CART.PRODUCTS.find(prod => prod.id === i.id);
    return p ? `${p.name} x${i.qty}` : '';
  }).filter(Boolean).join(', ');
  const total = (CART.subtotal() + (CART.items.length ? CART.DELIVERY_FEE : 0)).toFixed(2);

  const orderData = {
    orderId: orderId,
    userEmail: user.email,
    name: document.getElementById('fullName').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    address: document.getElementById('address').value.trim(),
    city: document.getElementById('city').value.trim(),
    region: document.getElementById('region').value,
    payment: document.querySelector('input[name="pay"]:checked').value,
    items: itemsSummary,
    total: total,
    placedAt: new Date().toISOString()
  };

  // Send to the Google Sheet backend...
  submitOrderToSheet(orderData);
  // ...and record it against the account locally, so login.html can
  // show it under "Your orders".
  ORDERS.save(orderData);

  document.getElementById('orderIdDisplay').textContent = 'Order reference: ' + orderId;

  checkoutForm.style.display = 'none';
  emptyCartMsg.style.display = 'none';
  confirmPanel.classList.add('active');
  confirmPanel.scrollIntoView({ behavior: 'smooth' });

  // Clear the cart after successful order placement
  CART.clear();
});

// On the checkout page itself, the drawer's checkout button has
// nowhere further to go — just close the drawer instead.
const drawerCheckoutBtn = document.getElementById('goToCheckoutBtn');
if (drawerCheckoutBtn){
  drawerCheckoutBtn.addEventListener('click', () => {
    if (window.CART_DRAWER) window.CART_DRAWER.close();
  });
}

/* ================================================================
   INIT
   ================================================================ */
CART.renderAll();
refreshCheckoutVisibility();
/* ================================================================
   CART DRAWER open/close — shared by index.html and checkout.html
   ================================================================ */
(function(){
  const cartToggle = document.getElementById('cartToggle');
  const cartDrawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('overlay');
  const closeCart = document.getElementById('closeCart');
  if (!cartToggle || !cartDrawer || !overlay || !closeCart) return;
 
  function openCart(){
    cartDrawer.classList.add('open');
    overlay.classList.add('open');
    cartToggle.setAttribute('aria-expanded', 'true');
  }
  function closeCartFn(){
    cartDrawer.classList.remove('open');
    overlay.classList.remove('open');
    cartToggle.setAttribute('aria-expanded', 'false');
  }
 
  cartToggle.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartFn);
  overlay.addEventListener('click', closeCartFn);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCartFn(); });
 
  window.CART_DRAWER = { open: openCart, close: closeCartFn };
})();
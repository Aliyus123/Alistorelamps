/* ================================================================
   CART MODULE
   State lives in localStorage (key: alistore_cart) instead of a plain
   JS variable, because checkout now lives on its own page — this is
   what lets the cart survive the trip from index.html to checkout.html
   and back.
   ================================================================ */
const CART = (() => {
  const STORAGE_KEY = 'alistore_cart';
  const DELIVERY_FEE = 15.00;
  const PRODUCTS = window.PRODUCTS;
 
  function load(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Could not read cart from storage:', e);
      return [];
    }
  }
 
  function save(items){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Could not save cart to storage:', e);
    }
  }
 
  let items = load();
 
  function getProduct(id){ return PRODUCTS.find(p => p.id === id); }
 
  function addItem(id){
    const existing = items.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else items.push({ id, qty: 1 });
    save(items);
    renderAll();
  }
 
  function changeQty(id, delta){
    const existing = items.find(i => i.id === id);
    if (!existing) return;
    existing.qty += delta;
    if (existing.qty <= 0) items = items.filter(i => i.id !== id);
    save(items);
    renderAll();
  }
 
  function removeItem(id){
    items = items.filter(i => i.id !== id);
    save(items);
    renderAll();
  }
 
  function subtotal(){
    return items.reduce((sum, i) => {
      const p = getProduct(i.id);
      return p ? sum + p.price * i.qty : sum;
    }, 0);
  }
 
  function totalCount(){
    return items.reduce((sum, i) => sum + i.qty, 0);
  }
 
  function fmt(n){
    return 'GHS ' + n.toFixed(2);
  }
 
  /* ---------- Rendering: product grid (index.html only) ---------- */
  function renderProducts(){
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(p => `
      <div class="card">
        <div class="card-media"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="card-desc">${p.desc}</p>
          <button class="view-details-link" data-id="${p.id}">View details &amp; more photos</button>
          <div class="card-footer">
            <span class="price mono">${fmt(p.price)}</span>
            <button class="add-btn" data-id="${p.id}">Add to cart</button>
          </div>
        </div>
      </div>
    `).join('');
 
    grid.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        addItem(btn.dataset.id);
        btn.textContent = 'Added ✓';
        btn.classList.add('added');
        setTimeout(() => { btn.textContent = 'Add to cart'; btn.classList.remove('added'); }, 900);
      });
    });
 
    grid.querySelectorAll('.view-details-link').forEach(btn => {
      btn.addEventListener('click', () => window.PRODUCT_MODAL && window.PRODUCT_MODAL.open(btn.dataset.id));
    });
  }
 
  /* ---------- Rendering: cart drawer (present on every page) ---------- */
  function renderCartDrawer(){
    const container = document.getElementById('cartItems');
    const toggle = document.getElementById('cartToggle');
    const count = document.getElementById('cartCount');
    const goBtn = document.getElementById('goToCheckoutBtn');
    if (!container || !toggle || !count) return;
 
    count.textContent = totalCount();
    toggle.classList.toggle('charged', totalCount() > 0);
    if (goBtn) goBtn.disabled = items.length === 0;
 
    if (items.length === 0){
      container.innerHTML = `
        <div class="cart-empty">
          <span class="glyph">🌑</span>
          Your cart is dark right now.<br>Add a lamp to switch it on.
        </div>`;
    } else {
      container.innerHTML = items.map(i => {
        const p = getProduct(i.id);
        if (!p) return '';
        return `
        <div class="cart-item">
          <div class="item-thumb"><img src="${p.image}" alt="${p.name}"></div>
          <div class="item-info">
            <h4>${p.name}</h4>
            <div class="item-price mono">${fmt(p.price)} × ${i.qty}</div>
          </div>
          <div class="item-controls">
            <div class="qty">
              <button data-action="dec" data-id="${p.id}" aria-label="Decrease quantity">−</button>
              <span class="qty-val">${i.qty}</span>
              <button data-action="inc" data-id="${p.id}" aria-label="Increase quantity">+</button>
            </div>
            <button class="remove-btn" data-action="remove" data-id="${p.id}">Remove</button>
          </div>
        </div>`;
      }).join('');
 
      container.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const action = btn.dataset.action;
          if (action === 'inc') changeQty(id, 1);
          if (action === 'dec') changeQty(id, -1);
          if (action === 'remove') removeItem(id);
        });
      });
    }
 
    const drawerSub = document.getElementById('drawerSubtotal');
    const drawerTotal = document.getElementById('drawerTotal');
    if (drawerSub) drawerSub.textContent = fmt(subtotal());
    if (drawerTotal) drawerTotal.textContent = fmt(subtotal());
  }
 
  /* ---------- Rendering: checkout order summary (checkout.html only) ---------- */
  function renderCheckoutSummary(){
    const lines = document.getElementById('orderLines');
    if (!lines) return;
    lines.innerHTML = items.map(i => {
      const p = getProduct(i.id);
      if (!p) return '';
      return `<div class="order-line">
        <button type="button" class="order-line-name" data-id="${p.id}">${p.name} × ${i.qty}</button>
        <span>${fmt(p.price * i.qty)}</span>
      </div>`;
    }).join('') || `<div class="order-line"><span>No items yet</span><span>—</span></div>`;
 
    lines.querySelectorAll('.order-line-name').forEach(btn => {
      btn.addEventListener('click', () => window.PRODUCT_MODAL && window.PRODUCT_MODAL.open(btn.dataset.id));
    });
 
    const sub = subtotal();
    const delivery = items.length ? DELIVERY_FEE : 0;
    const subEl = document.getElementById('sumSubtotal');
    const delEl = document.getElementById('sumDelivery');
    const totEl = document.getElementById('sumTotal');
    const specEl = document.getElementById('checkoutItemSpec');
    if (subEl) subEl.textContent = fmt(sub);
    if (delEl) delEl.textContent = fmt(delivery);
    if (totEl) totEl.textContent = fmt(sub + delivery);
    if (specEl) specEl.textContent = `${totalCount()} item${totalCount() === 1 ? '' : 's'}`;
  }
 
  function renderAll(){
    renderCartDrawer();
    renderProducts();
    renderCheckoutSummary();
    if (typeof window.onCartChanged === 'function') window.onCartChanged();
  }
 
  // Deliberately does NOT wipe the cart — placing an order keeps the
  // basket as-is and just records the order against the account.
  function clear(){
    items = [];
    save(items);
    renderAll();
  }
 
  return {
    PRODUCTS, renderProducts, renderAll, addItem, changeQty, removeItem,
    subtotal, totalCount, fmt, clear, DELIVERY_FEE,
    get items(){ return items; }
  };
})();
/* ================================================================
   PRODUCT MODAL — shows extra photos/views + the full description
   for one product. Reads from CART.PRODUCTS but never changes the
   cart itself (except when "Add to cart" inside it is clicked).
   Used on index.html (from "view details") and checkout.html
   (tapping a product name in the order summary).
   ================================================================ */
window.PRODUCT_MODAL = (function(){
  const modal = document.getElementById('productModal');
  if (!modal) return { open: function(){}, close: function(){} };

  const modalOverlay = document.getElementById('productOverlay');
  const galleryMain = document.getElementById('galleryMain');
  const galleryThumbs = document.getElementById('galleryThumbs');
  const nameEl = document.getElementById('modalProductName');
  const priceEl = document.getElementById('modalProductPrice');
  const descEl = document.getElementById('modalProductDesc');
  const addBtn = document.getElementById('modalAddBtn');

  let currentProduct = null;

  function showView(viewIndex){
    const view = currentProduct.views[viewIndex];
    galleryMain.innerHTML = `<img src="${view.image}" alt="${view.label}"><span class="view-label">${view.label}</span>`;
    galleryThumbs.querySelectorAll('.gallery-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === viewIndex);
    });
  }

  function open(productId){
    currentProduct = CART.PRODUCTS.find(p => p.id === productId);
    if (!currentProduct) return;

    nameEl.textContent = currentProduct.name;
    priceEl.textContent = CART.fmt(currentProduct.price);
    descEl.textContent = currentProduct.details;
    addBtn.dataset.id = currentProduct.id;

    galleryThumbs.innerHTML = currentProduct.views.map((v, i) =>
      `<button class="gallery-thumb" data-index="${i}" aria-label="${v.label}"><img src="${v.image}" alt="${v.label}"></button>`
    ).join('');
    galleryThumbs.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => showView(Number(thumb.dataset.index)));
    });
    showView(0);

    modal.classList.add('open');
    modalOverlay.classList.add('open');
  }

  function close(){
    modal.classList.remove('open');
    modalOverlay.classList.remove('open');
  }

  document.getElementById('closeProductModal').addEventListener('click', close);
  modalOverlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  addBtn.addEventListener('click', () => {
    if (!currentProduct) return;
    CART.addItem(currentProduct.id);
    addBtn.textContent = 'Added ✓';
    setTimeout(() => { addBtn.textContent = 'Add to cart'; }, 900);
  });

  return { open, close };
})();
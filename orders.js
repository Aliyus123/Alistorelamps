/* ================================================================
   ORDER HISTORY
   Placing an order no longer empties the cart — instead the order is
   recorded here, tagged with the signed-in account's email, so it can
   be shown back on login.html under "Your orders". The order is also
   sent to the Google Sheet backend (see checkout.js) as before.
   ================================================================ */
window.ORDERS = (function(){
  const STORAGE_KEY = 'alistore_orders';

  function all(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Could not read order history:', e);
      return [];
    }
  }

  function save(order){
    const list = all();
    list.unshift(order); // newest first
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Could not save order to history:', e);
    }
  }

  function forUser(email){
    return all().filter(o => o.userEmail === email);
  }

  return { save, forUser };
})();
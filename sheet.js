/* ================================================================
   BACKEND (LIGHTWEIGHT) — send each order to a Google Sheet
   ================================================================
   You don't need a real server for this. Google Sheets + a small
   "Apps Script" attached to it can act as a free, simple backend
   that just receives your order data and appends it as a new row.

   HOW TO SET THIS UP (one-time, takes ~5 minutes):
   1. Create a new Google Sheet. Add header row: Timestamp | Order ID |
      Account Email | Name | Phone | Email | Address | City | Region | Payment | Items | Total
   2. In the Sheet, go to Extensions > Apps Script.
   3. Delete any starter code and paste this instead:

        function doPost(e) {
          const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
          const data = JSON.parse(e.postData.contents);
          sheet.appendRow([
            new Date(), data.orderId, data.userEmail, data.name, data.phone, data.email,
            data.address, data.city, data.region, data.payment,
            data.items, data.total
          ]);
          return ContentService.createTextOutput("OK");
        }

   4. Click Deploy > New deployment > select type "Web app".
      - Execute as: Me
      - Who has access: Anyone
   5. Click Deploy, authorize it, then copy the "Web app URL" it gives you.
   6. Paste that URL below as GOOGLE_SHEET_URL.

   Until you paste a real URL, this section is simply skipped — the
   site still works normally, it just won't save orders anywhere.
   ================================================================ */
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyNTSQSmHjGwqS7ylWDQVLHpxyq_dBT57OAn7YBEy4shnxZdJm-JiNxH8Drm6pHnjffBQ/exec'; // <-- paste your Apps Script Web App URL here

function submitOrderToSheet(orderData){
  if (!GOOGLE_SHEET_URL){
    console.log('No Google Sheet URL configured yet — order was not saved externally.', orderData);
    return;
  }

  // Sent as a plain string (not JSON headers) on purpose: Apps Script
  // web apps don't handle CORS "preflight" requests well, and sending
  // as text/plain (fetch's default for a string body) avoids that.
  fetch(GOOGLE_SHEET_URL, {
    method: 'POST',
    mode: 'no-cors', // we can't read the response back, but the sheet still gets the row
    body: JSON.stringify(orderData)
  }).catch(err => {
    // Even if this fails (e.g. offline), we don't want to block the
    // customer's order confirmation — just log it for you to notice.
    console.error('Could not reach the Google Sheet:', err);
  });
}
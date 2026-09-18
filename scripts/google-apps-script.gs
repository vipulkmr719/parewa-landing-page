/**
 * Waitlist → Google Sheet.
 *
 * This is NOT part of the deployed site. It lives in the Google Sheet itself.
 * A published /pubhtml link only displays a sheet; this is what lets one
 * receive a row.
 *
 * ── Setup ────────────────────────────────────────────────────────────────
 *  1. Open the Google Sheet.
 *  2. Extensions → Apps Script. Delete whatever is in the editor.
 *  3. Paste this whole file in.
 *  4. Change SHARED_SECRET below to a long random string of your own.
 *  5. Deploy → New deployment → type "Web app".
 *       Execute as:       Me
 *       Who has access:   Anyone
 *     (It has to be "Anyone" — Vercel calls it without a Google login. The
 *      secret below is what keeps strangers out, so do not skip step 4.)
 *  6. Copy the /exec URL it gives you.
 *  7. In Vercel → Settings → Environment Variables, set:
 *       SHEET_WEBHOOK_URL   = that /exec URL
 *       SHEET_SHARED_SECRET = the same string as SHARED_SECRET below
 *  8. Redeploy the site so the new variables are picked up.
 *
 * Row 1 of the sheet gets written automatically the first time a signup
 * arrives, so there is nothing to set up by hand.
 *
 * If you ever change SHARED_SECRET, change it in Vercel too, and redeploy the
 * script (Deploy → Manage deployments → edit → Version: New version).
 */

var SHARED_SECRET = 'CHANGE-ME-to-a-long-random-string';
var SHEET_NAME = 'Sheet1';   // the tab to append to
// If your sheet already has rows, the header row is not rewritten — add
// "Suggestion" to column E by hand once; new values land there regardless.
var HEADERS = ['Joined at', 'Email', 'Agency', 'Proposals per month', 'Suggestion'];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return reply(false, 'no body');

    var data = JSON.parse(e.postData.contents);

    // Constant-time-ish check. The web app must be open to "Anyone", so this
    // secret is the only thing standing between the URL and your sheet.
    if (!SHARED_SECRET || data.secret !== SHARED_SECRET) return reply(false, 'forbidden');

    var email = String(data.email || '').trim();
    var agency = String(data.agency || '').trim();
    if (!email || !agency) return reply(false, 'missing fields');

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
             || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

    // Write the header row once, so nobody has to remember to.
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    sheet.appendRow([
      data.joinedAt || new Date().toISOString(),
      email,
      agency,
      String(data.volume || '').trim(),
      String(data.suggestion || '').trim()
    ]);

    return reply(true);
  } catch (err) {
    return reply(false, String(err));
  }
}

// Apps Script web apps cannot set an HTTP status code, so success or failure
// has to travel in the body — which is what api/waitlist.js checks for.
function reply(ok, error) {
  return ContentService
    .createTextOutput(JSON.stringify(error ? { ok: ok, error: error } : { ok: ok }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Visiting the /exec URL in a browser should not look broken.
function doGet() {
  return reply(true, undefined);
}

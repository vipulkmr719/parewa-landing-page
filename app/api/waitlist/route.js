/**
 * POST /api/waitlist  →  appends a row to a Google Sheet.
 *
 * This sits on our own domain deliberately. The browser posts here, and this
 * route forwards to the sheet — so the endpoint that can write to your data
 * never appears in the client bundle, there is no cross-origin request from
 * the visitor's browser, and the privacy policy's "nothing is requested from
 * anyone else's servers" claim stays true.
 *
 * Environment variables (Vercel → Settings → Environment Variables):
 *   SHEET_WEBHOOK_URL     the /exec URL of the Apps Script web app
 *                         (the script itself is scripts/google-apps-script.gs)
 *   SHEET_SHARED_SECRET   any long random string; the script rejects posts
 *                         that do not carry it. Without this, anyone who
 *                         learns the /exec URL can write to your sheet.
 */

const TIMEOUT_MS = 8000;

// Needs the Node runtime, not the edge one — and it must never be cached.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (body, status) => Response.json(body, { status });

export async function POST(request) {
  if (!process.env.SHEET_WEBHOOK_URL) {
    console.error('waitlist: SHEET_WEBHOOK_URL is not set');
    return json({ error: 'Signups are not configured yet.' }, 503);
  }

  let payload = {};
  try {
    payload = (await request.json()) || {};
  } catch {
    payload = {};
  }

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot believes it worked and does not look for another way in.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const email = String(payload.email || '').trim().slice(0, 254);
  const agency = String(payload.agency || '').trim().slice(0, 200);
  const volume = String(payload.volume || '').trim().slice(0, 50);
  // Free text, so the cap is the server's to enforce — the client's maxLength
  // is a courtesy to the person typing, not a control.
  const suggestion = String(payload.suggestion || '').trim().slice(0, 1000);

  // Never trust the client's validation — it is the easiest thing to bypass.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json({ error: 'That email address does not look right.' }, 400);
  }
  if (!agency) {
    return json({ error: 'Agency name is required.' }, 400);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(process.env.SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.SHEET_SHARED_SECRET || '',
        email,
        agency,
        volume,
        suggestion,
        joinedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
      redirect: 'follow', // Apps Script answers with a redirect to googleusercontent
    });

    const text = await upstream.text();
    let body = {};
    try { body = JSON.parse(text); } catch { /* Apps Script can return HTML on error */ }

    // Apps Script cannot set a status code, so a refusal arrives as 200 with
    // ok:false. Trusting the status alone would silently drop rows.
    if (!upstream.ok || body.ok !== true) {
      throw new Error(`sheet rejected the row (${upstream.status}): ${text.slice(0, 300)}`);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    // Log the detail for us; tell the visitor nothing about our internals.
    console.error('waitlist: write failed —', err && err.message);
    return json({ error: 'Could not save that right now.' }, 502);
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  return json({ error: 'Method not allowed' }, 405);
}

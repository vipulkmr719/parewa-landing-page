/**
 * POST /api/waitlist  →  appends a row to a Zoho Sheet.
 *
 * This sits on our own domain deliberately. The browser posts here, and this
 * function talks to Zoho — so the Zoho credentials never ship in public
 * JavaScript, there is no cross-origin request from the visitor's browser, and
 * the privacy policy's "nothing is requested from anyone else's servers" claim
 * stays true.
 *
 * Required environment variables (set them in Vercel → Settings → Environment
 * Variables, never in this file):
 *
 *   ZOHO_CLIENT_ID          from the self-client you create in Zoho API Console
 *   ZOHO_CLIENT_SECRET      ditto
 *   ZOHO_REFRESH_TOKEN      ditto — this is the long-lived one
 *   ZOHO_SHEET_RESOURCE_ID  the id in your sheet's URL
 *
 * Optional:
 *   ZOHO_WORKSHEET_NAME     defaults to "Sheet1"
 *   ZOHO_DC                 defaults to "in" (use "com", "eu", "au"… if your
 *                           Zoho account lives in another data centre)
 *
 * The sheet's first row must carry these exact column headers, because Zoho
 * matches on them and rejects the write if none line up:
 *
 *   Email | Agency | Proposals per month | Joined at
 */

const TIMEOUT_MS = 8000;

// Reused while the function stays warm, so we are not trading a refresh token
// for an access token on every single signup.
let cachedToken = null; // { value, expiresAt }

function timeout(ms) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, done: () => clearTimeout(t) };
}

async function getAccessToken(dc) {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const body = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });

  const t = timeout(TIMEOUT_MS);
  let res;
  try {
    res = await fetch(`https://accounts.zoho.${dc}/oauth/v2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: t.signal,
    });
  } finally {
    t.done();
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`Zoho token exchange failed (${res.status}): ${data.error || 'no access_token'}`);
  }

  // Zoho tokens last an hour; expire ours early so we never race the boundary.
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + Math.max(60, (data.expires_in || 3600) - 300) * 1000,
  };
  return cachedToken.value;
}

async function appendRow(dc, token, row) {
  const body = new URLSearchParams({
    method: 'worksheet.records.add',
    worksheet_name: process.env.ZOHO_WORKSHEET_NAME || 'Sheet1',
    json_data: JSON.stringify([row]),
  });

  const t = timeout(TIMEOUT_MS);
  let res;
  try {
    res = await fetch(`https://sheet.zoho.${dc}/api/v2/${process.env.ZOHO_SHEET_RESOURCE_ID}`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
      signal: t.signal,
    });
  } finally {
    t.done();
  }

  const data = await res.json().catch(() => ({}));
  // Zoho answers 200 with an error object for things like a column-header
  // mismatch, so the status code alone is not enough to call this a success.
  if (!res.ok || data.status === 'failure' || data.error) {
    throw new Error(`Zoho write failed (${res.status}): ${JSON.stringify(data).slice(0, 400)}`);
  }
  return data;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const required = ['ZOHO_CLIENT_ID', 'ZOHO_CLIENT_SECRET', 'ZOHO_REFRESH_TOKEN', 'ZOHO_SHEET_RESOURCE_ID'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error('waitlist: missing env vars:', missing.join(', '));
    return res.status(503).json({ error: 'Signups are not configured yet.' });
  }

  let payload = req.body;
  if (typeof payload === 'string') {
    try { payload = JSON.parse(payload); } catch { payload = {}; }
  }
  payload = payload || {};

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot believes it succeeded and does not go looking for
  // another way in.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const email = String(payload.email || '').trim().slice(0, 254);
  const agency = String(payload.agency || '').trim().slice(0, 200);
  const volume = String(payload.volume || '').trim().slice(0, 50);

  // Never trust the client's validation — it is the easiest thing to bypass.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'That email address does not look right.' });
  }
  if (!agency) {
    return res.status(400).json({ error: 'Agency name is required.' });
  }

  try {
    const dc = process.env.ZOHO_DC || 'in';
    const token = await getAccessToken(dc);
    await appendRow(dc, token, {
      Email: email,
      Agency: agency,
      'Proposals per month': volume,
      'Joined at': new Date().toISOString(),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    // Log the detail for us; tell the visitor nothing about our internals.
    console.error('waitlist: write failed —', err && err.message);
    return res.status(502).json({ error: 'Could not save that right now.' });
  }
};

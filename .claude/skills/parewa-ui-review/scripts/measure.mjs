// Playwright may be a project dep, a global install, or neither. Try in that
// order so this works on a laptop and in CI without editing.
async function playwright() {
  const candidates = [
    'playwright',
    process.env.PLAYWRIGHT_PATH,
    '/opt/node22/lib/node_modules/playwright/index.js',
    '/usr/lib/node_modules/playwright/index.js',
  ].filter(Boolean);
  for (const c of candidates) {
    try { const m = await import(c); return m.chromium || m.default?.chromium; } catch {}
  }
  throw new Error('Playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.');
}

/*
 * Print the real geometry of elements, so alignment claims rest on numbers.
 *
 *   node measure.mjs --url http://localhost:3000 --width 1280 \
 *     --sel ".plan__name" --sel ".plan .btn"
 *
 * Reports document-relative top and viewport-relative right for every match.
 * Things that should line up produce identical numbers; things that do not
 * produce the evidence for the fix.
 */

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf('--' + n); return i === -1 ? d : args[i + 1]; };
const sels = args.reduce((a, v, i) => (v === '--sel' ? [...a, args[i + 1]] : a), []);

const url = arg('url', 'http://localhost:3000');
const width = Number(arg('width', 1280));
if (!sels.length) { console.error('give at least one --sel'); process.exit(1); }

const chromium = await playwright();
const browser = await chromium.launch();
const page = await (await browser.newContext({
  viewport: { width, height: Number(arg('height', 1000)) },
  isMobile: width < 500,
})).newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
await page.waitForTimeout(Number(arg('settle', 3500)));

for (const sel of sels) {
  const rows = await page.$$eval(sel, (els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      return {
        top: Math.round(r.top + window.scrollY),
        right: Math.round(r.right),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    })
  );
  console.log(sel);
  if (!rows.length) console.log('  (no match)');
  rows.forEach((r, i) => console.log(`  [${i}] top=${r.top} right=${r.right} ${r.w}x${r.h}`));
}
await browser.close();

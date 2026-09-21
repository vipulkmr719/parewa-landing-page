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
 * Screenshot a running page in full-height slices.
 *
 *   node shoot.mjs --url http://localhost:3000 --width 1280 --out ./shots --tag before
 *
 * The slices are contiguous, so nothing between them is missed. That sounds
 * obvious, but the easy mistake is to advance by more than the viewport height
 * and silently skip a band of the page.
 */

const arg = (n, d) => {
  const i = process.argv.indexOf('--' + n);
  return i === -1 ? d : process.argv[i + 1];
};

const url    = arg('url', 'http://localhost:3000');
const width  = Number(arg('width', 1280));
const height = Number(arg('height', width < 500 ? 844 : 1000));
const out    = arg('out', './shots');
const tag    = arg('tag', 'shot');
const settle = Number(arg('settle', 4200));

const chromium = await playwright();
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  isMobile: width < 500,
  hasTouch: width < 500,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });

// globals.css sets scroll-behavior:smooth, which makes window.scrollTo animate.
// Without this the captures land mid-flight and you review the wrong pixels.
await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });

// The hero rewinds and replays its animation on mount; settle past it.
await page.waitForTimeout(settle);

const full = await page.evaluate(() => document.documentElement.scrollHeight);
const n = Math.ceil(full / height);
console.log(`${tag} ${width}x${height} pageHeight=${full} slices=${n}`);

for (let i = 0; i < n; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * height);
  await page.waitForTimeout(200);
  const file = `${out}/${tag}-${width}-${String(i).padStart(2, '0')}.png`;
  await page.screenshot({ path: file });
  console.log('  ' + file);
}
await browser.close();

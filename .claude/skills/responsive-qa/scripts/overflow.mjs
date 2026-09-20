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
 * Check every width the page is designed for, and when something overflows,
 * name the element responsible.
 *
 *   node overflow.mjs --url http://localhost:3000
 *   node overflow.mjs --url http://localhost:3000/privacy
 *
 * "The page scrolls sideways" is not a finding you can act on. The culprit is,
 * so this walks the DOM and reports the widest offenders with a selector you
 * can go and look at.
 */

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i === -1 ? d : process.argv[i + 1]; };
const url = arg('url', 'http://localhost:3000');
const WIDTHS = (arg('widths', '320,375,390,430,768,1024,1280,1440')).split(',').map(Number);

const chromium = await playwright();
const browser = await chromium.launch();
let bad = 0;

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    isMobile: width < 500,
    hasTouch: width < 500,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
  await page.waitForTimeout(3500);

  const report = await page.evaluate((vw) => {
    const doc = document.documentElement;
    const over = Math.round(doc.scrollWidth) - vw;
    const culprits = [];
    if (over > 0) {
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        // Ignore anything deliberately parked off-screen (the honeypot, the
        // skip link) — it is off-screen, not overflowing.
        if (r.width === 0 || r.right <= vw + 0.5 || r.left >= vw) continue;
        const sel = el.tagName.toLowerCase() +
          (el.id ? '#' + el.id : '') +
          (typeof el.className === 'string' && el.className
            ? '.' + el.className.trim().split(/\s+/).join('.') : '');
        culprits.push({ sel, right: Math.round(r.right) });
      }
      culprits.sort((a, b) => b.right - a.right);
    }
    return { over, scrollWidth: Math.round(doc.scrollWidth), culprits: culprits.slice(0, 5) };
  }, width);

  if (report.over > 0) {
    bad++;
    console.log(`w=${String(width).padStart(4)}  OVERFLOW by ${report.over}px (scrollWidth ${report.scrollWidth})`);
    report.culprits.forEach((c) => console.log(`            ${String(c.right).padStart(5)}px  ${c.sel}`));
  } else {
    console.log(`w=${String(width).padStart(4)}  ok`);
  }
  await ctx.close();
}

await browser.close();
console.log(bad ? `\n${bad} width(s) overflow` : '\nno horizontal overflow at any width');
process.exit(bad ? 1 : 0);

# Parewa — landing page

Static landing page for Parewa, AI proposal software for Indian digital agencies.

**Tagline:** Proposals that come back with an answer.

No build step, no dependencies. `index.html` plus three assets. Open the file,
or serve the directory with anything.

```
python3 -m http.server 8000     # then open http://localhost:8000
```

Fonts are fetched with `crossorigin`-free relative URLs, so `file://` works for
everything except the webfonts — use a server if you want to see the real type.

---

## Layout of the repo

```
index.html              the whole page
assets/
  styles.css            design system + components, in source order
  main.js               hero sequence, pricing toggle, waitlist form
  logo.svg              the mark, full colour
  logo-mono.svg         single colour, inherits currentColor
  favicon.svg           the mark on a Wing-blue tile
  fonts/*.woff2         self-hosted, subset (see Performance)
```

---

## Before this goes live

Four things are deliberately left as placeholders. All are marked with `TODO`
comments in the source.

| What | Where | Action |
|---|---|---|
| Waitlist counter | `index.html`, `data-count="142"` on `#waitlistCount` | Set to the real number. It is social proof — it has to be true. |
| Design partners | `index.html`, `.trust__partners` | Three agency names are placeholders. List only agencies that have agreed **in writing** to be named. |
| Registered city | `index.html`, `[City], India` in the footer | Replace with the registered office city. |
| Lifetime inclusions | `index.html`, the third `.plan` card | The price being on request is deliberate. The four bullets under it are **invented** — confirm what Lifetime actually covers, and whether it is capped to a number of agencies. |
| Form endpoint | `assets/main.js`, `FORM_ENDPOINT` | Empty. See below. |

### The waitlist form

`FORM_ENDPOINT` at the top of `assets/main.js` is empty. While it stays empty
the form validates input and then hands off to the visitor's mail client with
the details pre-filled — which still reaches you, and does not pretend to have
saved anything it hasn't.

Set it to any endpoint that accepts a JSON `POST` of
`{ email, agency, volume }` — Formspree, Buttondown, a Cloudflare Worker, your
own API. On a non-2xx response the form tells the visitor to email instead,
rather than silently dropping the signup.

### Also worth doing before launch

- **The name.** Parewa Labs (parewalabs.com, the Programiz people) and Parewa
  Inc are existing Nepali software companies. Neither is in proposal software,
  but `parewa.com` and the obvious handles may be contested, and early Google
  results will be crowded. Search Class 9 and Class 42 on ipindia.gov.in before
  anything is printed.
- **Buy the near-misses** — pariwa / parewaa / paruwa — and redirect them.
- **An OG image.** `og:image` is not set; there is no artwork for it yet. A
  1200×630 of the hero demo would do it.
- **Legal pages.** `/privacy`, `/terms`, `/refunds`, `/about`, `/blog` are
  linked from the footer and do not exist yet.

---

## Design decisions

The two things that ground the page: the product is about documents and what
happens to them after they are sent, and the brand is a pigeon. Both point away
from generic SaaS, so there are no rounded-card grids, gradient washes or stock
illustration anywhere.

### The mark

A dove folded out of paper — five straight-edged planes, no curves, so it holds
at 24px in a browser tab and on a WhatsApp profile picture. It was drawn as a
silhouette first and checked in single-colour black at 16/24/48/120px before any
colour version was approved.

The iridescent gradient (`#1A6B6E` → `#5B3E8C`) is carried by the **neck plane
only** — which is where a rock pigeon's iridescence actually is. It appears in
the logo and nowhere else on the page. That is the one flourish in the system
and it stays special because it never appears twice.

`logo-mono.svg` inherits `currentColor` and renders the folds as opacity steps,
so it works on any ground without a second file.

### Colour

| Role | Hex | Use |
|---|---|---|
| Paper | `#F7F8F7` | Page background — cool white, not beige |
| Paper sunk | `#EFF1EF` | The pause: problem section, feature band, insets |
| Slate | `#222A31` | Headlines and body |
| Slate soft | `#5A6670` | Secondary text — 5.5:1 on paper |
| Wing | `#27406B` | Primary buttons, links, active states |
| Return Green | `#1FA463` | Tracking states only: opened, read, signed |
| Green deep | `#12603A` | Green that is safe to set text in |
| Grain | `#F0D98A` | Highlighter. Once per page. |
| Rule | `#DCE0DC` | Hairlines, table borders, dividers |
| Iridescence | `#1A6B6E` → `#5B3E8C` | Logo mark only |

Return Green is doing real work: an owner reads a status flipping to green the
way they read a WhatsApp double tick, without a legend. It is used **only** for
tracking states so it keeps that meaning. At 3.0:1 on paper it is not safe for
text, so anything green and readable uses `--green-deep` on `--green-tint`
(6.7:1) and keeps `--green` for the dot.

Two palettes deliberately avoided: the cream-and-terracotta that every
AI-generated landing page currently uses, and saffron-green-white as shorthand
for "India" — this audience are professional marketers and would read the flag
palette as lazy.

### Type

Bricolage Grotesque for display, Inter for body and UI. Scale is
56/40/28/20/16/14 on desktop, 36/28/22/18/16/14 on mobile, via `clamp()`.
Sentence case everywhere, no all-caps labels except the small uppercase
field labels inside the product mockups.

The display face uses the **tighter widths at large sizes** — `wdth` 88 on `h1`,
92 on `h2`, 96 on `h3`. That axis is the reason the font is variable here; see
Performance for what that cost and what was traded away to pay for it.

### Layout

Left-aligned single editorial column at 1100px. Not centred, not full-bleed —
centred text past two lines slows reading and this page has a lot to say.

- **Hero** opens with the product doing its one trick, not an illustration: the
  brief on the left, the finished proposal on the right, a status rail beneath
  reading Sent → Opened 3× → Signed. One animated sequence on load — the brief
  types, the proposal assembles, the rail goes green. That moment is the pitch.
- **Problem** sits on the darker paper tone so it reads as a pause. Pain points
  are a list with hairline rules, not five identical cards.
- **Features** are alternating full-width rows with a mockup of the real screen
  on one side. No icon grid — an icon grid says "we couldn't show the product
  yet", which is the wrong signal pre-launch.
- **How it works** is the only place on the page that uses numbers, because it
  is the only part that is genuinely a sequence.
- **Pricing** is three plans with Pro raised in the middle. The monthly/annual
  toggle defaults to **monthly**, so the headline number is the ₹999 / ₹2,499
  entry price and the annual saving is offered as the upgrade — the sub-line
  under each price carries it, and the toggle itself is labelled "2 months
  free". The ₹ is set at the same weight and size as the number it belongs to.
- **Lifetime** prices on request rather than showing a figure. `On request` sits
  in the same slot as the numbers but at a quieter weight, so it reads as an
  answer to the question rather than as a number — and `min-height` on
  `.plan__price` keeps all three sub-lines on one line across the row. The
  toggle does not apply to it (a hidden `aria-describedby` note says so for
  screen readers, and the sub-line says "One-time payment" for everyone else).
  Its CTA is a real `mailto:`, so it works with no backend.
- Three cards orphan the third in an `auto-fit` grid at tablet widths, so the
  grid is a fixed three columns down to 980px and a single stack below — three
  columns any narrower leaves no room for the feature lists.
- **Empty states** (in-app, decided here): the folded-paper mark with *"Nothing
  in flight yet. Start your first proposal."* This is where the bird earns its
  keep — not in the headlines.

### Restraint

One bold element: the hero sequence. Everything else stays quiet. No
scroll-triggered fades on every section, no hover lift on every card, no
gradients as decoration.

---

## Accessibility

Verified in Chromium, not just intended:

- Every grey passes 4.5:1 against the ground it sits on. Measured, not eyeballed
  — the lowest is `--slate-soft` at 5.18:1.
- `prefers-reduced-motion: reduce` skips the hero sequence entirely and renders
  its finished state: brief in full, proposal assembled, rail already green.
- Keyboard focus is visible everywhere (2px Wing outline, 3px offset).
- The waitlist dialog moves focus to the first field, closes on Escape, and
  returns focus to whatever opened it.
- One `h1`; heading levels never skip; every field has a `<label>`; every
  in-page anchor resolves.
- No horizontal scroll at 320, 360, 390, 430, 768, 1024, 1280 or 1440px.

---

## Performance

Measured in throttled Chromium at **400 kbps / 400 ms RTT with 4× CPU
throttling** — Chrome's "Slow 4G", which is roughly the worst case for an
agency owner opening a WhatsApp link on patchy mobile data.

| | |
|---|---|
| First contentful paint | **~1.3 s** (target was under 1.5 s) |
| Cumulative layout shift | **0.001 – 0.012** (good is under 0.1) |
| Transferred | **~84 KB** — 7 KB HTML, 7 KB CSS, 3 KB JS, 68 KB fonts |

Three decisions got it there, each of which changed the numbers enough to be
worth writing down.

**Fonts are self-hosted and subset, not loaded from Google.** The CDN costs two
extra DNS + TLS handshakes before first paint, which is the wrong trade on a
narrow pipe. The four files are subset to the characters this page uses and the
variable axes are clamped — `opsz` is pinned (it halved Bricolage on its own),
while `wdth` stays live because the design depends on it. 320 KB → 73 KB.

Note that **the rupee sign lives in the `latin-ext` subset, not `latin`**. On a
page whose whole argument is INR pricing, shipping only `latin` would silently
drop every ₹ to a fallback font.

**The fonts are deliberately not preloaded.** Preloading them pushed first paint
from 1.12 s to 1.71 s: the font bytes compete with the stylesheet for a narrow
pipe, and `font-display: swap` means text paints without them anyway.

**Measures are set in `em`, never `ch`.** This was where essentially all of the
page's layout shift was coming from, and it is not obvious. `ch` resolves
against the advance width of "0", and a metric-matched fallback matches *average
text* width, not *digit* width — Liberation's zero is about 7% narrower relative
to its em than Inter's. So every `ch`-based `max-width` silently re-wrapped the
moment the real font arrived. Converting them to `em`, which depends only on
font-size, took desktop CLS from **0.48 to 0.001**.

The fallback faces themselves (`Inter Fallback`, `Bricolage Fallback 88/92/96/100`)
alias a local system font, so they cost no bytes. Their `size-adjust` and
ascent/descent overrides were derived from each font's own typo metrics and then
calibrated against measured width until the fallback and the real font render
identically — the hero `h1` and lead are now pixel-identical in both states.
Bricolage needs one fallback per width setting because `wdth` 88 is 10% narrower
than `wdth` 100 and a single adjust cannot serve both.

### Deploying

Any static host. Two things worth getting right:

- **Serve the text files compressed.** Brotli takes the HTML and CSS from 69 KB
  to 14 KB. Most hosts do this by default; the numbers above assume it.
- **Cache the fonts hard** — `Cache-Control: public, max-age=31536000, immutable`.
  They never change without their filename changing.

---

## Copy

All page copy lives in `index.html`. Alternate headlines from the brief, kept
here so they are not lost:

- **A.** Your proposal shouldn't take longer than the project kickoff call.
- **B.** Three hours in Google Docs. Then silence. There's a better way.
- **C.** Professional proposals in 15 minutes — and you'll know the second your
  client opens it.

A leads with time, B with pain, C with the tracking feature. The page currently
ships a fourth ("Send the proposal in 15 minutes. Not next Tuesday."), which is
also a time-led position. Run it against B first — they are the two clearest
opposing positions.

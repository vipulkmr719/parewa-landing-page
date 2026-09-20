# Parewa Landing Page — Claude Instructions

This repository is an existing production-oriented Next.js/React landing page
for Parewa.

## CRITICAL: Preserve the existing design

Do NOT rebuild the landing page from scratch.

Do NOT replace the existing visual system with a generic SaaS/AI
landing-page design.

Do NOT introduce a new framework.

Do NOT replace working components unnecessarily.

Before modifying anything, inspect the existing components, `globals.css`,
layout, page composition, and assets.

---

## Existing Design Direction

Parewa uses an editorial/product-led visual language.

Core principles:

- restrained
- editorial
- professional
- product-focused
- high whitespace
- strong typography
- minimal decoration
- clear hierarchy

Avoid generic AI-SaaS aesthetics.

Never add visual elements simply because they are trendy.

---

## Existing Design Tokens

Use the existing CSS variables rather than creating new values. They are all
declared on `:root` at the top of `app/globals.css`.

Colour:

```
--paper          --slate          --wing           --green
--paper-sunk     --slate-soft     --wing-deep      --green-deep
--paper-raised                                     --green-tint
--grain          --rule           --rule-strong
```

Typography:

```
--display    Bricolage Grotesque  (plus --display-88 / -92 / -96 width variants)
--text       Inter
```

Both are self-hosted and subset in `public/assets/fonts/`, with
metric-matched fallback faces so nothing re-wraps when the webfont swaps in.
Do not add a third family or load fonts from a CDN.

Type scale:

```
--t-display  36 → 56    --t-lead   18 → 20
--t-h2       28 → 40    --t-body   16
--t-h3       22 → 28    --t-small  14
```

Layout and shape:

```
--wrap  1100px   --gutter  20 → 40px   --sect-y  64 → 120px
--radius  10px   --radius-sm  6px
```

Reuse them.

Do not create a second competing design system.

---

## Existing Component Architecture

The landing page is composed from existing sections, in this order in
`app/page.jsx`:

- SiteHeader
- Hero
- TrustStrip
- Problem
- Benefits
- Features
- HowItWorks
- Pricing
- Faq
- FinalCta
- SiteFooter
- StickyCta

Alongside them are shared pieces that are not sections and are used from
several places: `Logo`, `FeatureShots` (the product mock panels inside
Features), and the waitlist set — `WaitlistProvider`, `WaitlistButton`,
`WaitlistDialog`, `WaitlistForm`. `WaitlistForm` renders in two places, the
dialog and FinalCta, so any change to it lands in both.

Preserve this architecture.

Before creating a new component:

1. Search existing components.
2. Determine whether an existing component can be reused.
3. Extend an existing component when appropriate.
4. Only create a new component when necessary.

---

## Anti-Vibe-Coding Rules

Do NOT automatically add:

- large gradients
- glassmorphism
- glowing effects
- excessive rounded cards
- excessive shadows
- floating blobs
- decorative AI graphics
- excessive pills
- excessive badges
- random icons
- emoji UI
- unnecessary parallax
- scroll-triggered animation everywhere
- fake social proof
- fake metrics
- fake testimonials

The existing design intentionally uses restraint.

Keep the hero/demo experience as the visual focal point.

---

## Typography

Do not randomly change font sizes or weights.

Maintain the existing type hierarchy.

Prefer improving:

- line breaks
- line length
- spacing
- hierarchy
- alignment

over simply making headings larger.

Do not introduce arbitrary typography values.

Two rules the stylesheet already depends on, worth not rediscovering the
hard way:

- **Measures are set in `em`, never `ch`.** `ch` resolves against the width
  of the digit zero, which a metric-matched fallback does not match, so every
  `ch`-based width re-wrapped the moment the real font arrived. That was the
  source of this page's layout shift.
- **`max-width` belongs on the text element**, not a wrapper, or it resolves
  against the wrong font.

---

## Color

Use the existing palette.

The iridescent treatment is intentionally limited — it appears in the logo
mark and nowhere else. `--grain` is a highlighter used once per page, and
green is reserved for tracking states, never decoration.

Do not spread gradients throughout the page.

Do not introduce additional brand colors without a clear reason.

---

## Layout

Use the existing:

- max-width
- gutters
- section spacing
- grid
- responsive breakpoints

Do not use arbitrary absolute positioning to make a screenshot look correct.

The layout must remain robust when copy changes.

---

## Responsive Design

Design intentionally for:

```
320  375  390  430  768  1024  1280  1440
```

Never treat mobile as a shrunken desktop.

Check:

- navigation
- hero
- demo
- feature sections
- pricing
- FAQ
- forms
- footer
- sticky CTA

No horizontal overflow.

---

## Accessibility

Preserve the existing accessibility behavior.

Check:

- semantic HTML
- heading hierarchy
- keyboard navigation
- visible focus
- form labels
- dialog focus management
- reduced motion
- contrast
- meaningful links
- skip navigation

Never remove accessibility behavior for visual convenience.

---

## Animation

Parewa intentionally uses restrained motion.

Prefer:

- short transitions
- meaningful state changes
- product-demo animation
- subtle interaction feedback

Do not animate every section.

Respect `prefers-reduced-motion`.

Reduced-motion users should receive the completed state, not an inaccessible
broken animation. This is why `Hero` renders the finished brief on the server
and then rewinds it on mount rather than starting empty: with no JavaScript,
and with reduced motion, the page is already complete.

---

## Copy

Do not invent:

- customers
- agency names
- statistics
- testimonials
- awards
- product capabilities
- pricing claims
- legal claims

When copy is uncertain, flag it instead of fabricating it.

Preserve the product's existing positioning.

**Placeholders currently live on the site.** They are marked with `TODO`
comments where they sit. Treat them as known-false, never as data to build on,
and never quietly extend the pattern:

- the waitlist count in `TrustStrip`
- the three design-partner names in `TrustStrip`
- the four inclusions listed under the Lifetime plan in `Pricing`
- the bracketed fields in `app/privacy/page.jsx` — `[LEGAL ENTITY NAME]`,
  `[REGISTERED ADDRESS]`, `[GRIEVANCE OFFICER NAME]`, `[DATE]`

The privacy policy is live and makes binding representations. If a change
alters what the site collects, stores or sends, the policy is part of that
change, not a follow-up.

---

## Visual QA

After every meaningful UI change, review:

**Hierarchy** — Is the primary message obvious? The primary CTA? The section
hierarchy?

**Typography** — font, size, weight, line height, wrapping, measure.

**Spacing** — section rhythm, component spacing, alignment, whitespace.

**Components** — consistency, button states, borders, radii, icons.

**Responsive** — mobile, tablet, desktop.

**Motion** — subtle, purposeful, performant.

**Final question** — does the change look like it belongs to the existing
Parewa design system? If not, revise it.

---

## Change Discipline

Prefer targeted changes.

When asked to improve a section:

1. Inspect that section.
2. Inspect related CSS/components.
3. Make the smallest coherent change.
4. Check related responsive states.
5. Run visual QA.
6. Avoid unrelated refactoring.

Do not rewrite the whole stylesheet for a local UI change.

---

## Code Quality

Use the existing project architecture.

Do not introduce unnecessary dependencies.

Prefer existing CSS/component patterns before installing a library.

Before finishing:

- verify the app builds
- verify no console errors were introduced
- verify responsive behavior
- verify accessibility
- verify visual consistency

Never claim a change is complete without checking the affected area.

---

## Running it

```
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before any change is finished
npm start        # serve the production build
```

Measure rather than assert. Screenshot the rendered page at the widths above
and read the actual geometry — alignment claims, overflow, contrast and layout
shift are all things to check in a browser, not infer from the CSS.

---

## Deployment

Vercel, configured by `vercel.json`, which sets `framework` and nothing else.

- **`vercel.json` allows no comments.** Vercel validates it against a schema
  with `additionalProperties: false`, so a `"//"` key fails the deployment
  rather than being ignored. Explanation belongs in the README.
- **Omitting a field is not the same as setting it to `null`.** Vercel reads
  `null` as a value — for `framework` it selects the preset "Other".
- **Do not set an output directory.** Vercel's Next integration resolves it;
  naming one makes Vercel treat the build as static output and drop the
  serverless route behind `/api/waitlist`.

`/api/waitlist` forwards signups to a Google Sheet via the Apps Script in
`scripts/google-apps-script.gs`, using `SHEET_WEBHOOK_URL` and
`SHEET_SHARED_SECRET`. When those are unset the route answers 503 and the form
falls back to a mailto, so a signup is never silently lost.

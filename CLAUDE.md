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

## Known traps

Things this page has already been caught by. Each cost real debugging time
once, and none of them is obvious from reading the code. Two more live in
their own sections above: measures in `em` rather than `ch` under
**Typography**, and the schema rule for `vercel.json` under **Deployment**.

### The waitlist dialog desyncs if you stop listening for `close`

It is a native `<dialog>`, so Escape closes the element without passing
through any React handler. `WaitlistDialog` listens for the element's own
`close` event and syncs state to match. Remove that listener and Escape
leaves the dialog visually shut but still open in state, so it never reopens.

Focus restoration is a separate mechanism: `WaitlistProvider` holds a
reference to whatever opened the dialog and returns focus there on close.
Lose it and a keyboard user is dropped at the top of the document.

### Grid rows that divide at different fractions never meet

The benefits block was five cards in a six-column grid: three across the top,
dividing at thirds, and two across the bottom, dividing at halves. Every cell
was correct and none of the vertical rules lined up, which reads as sloppy
without it being obvious why.

Three equal columns fixed it. Five cards fill five cells and the sixth is left
empty with its border closed by `::after`, because an empty cell is much
quieter than a misaligned one. That filler is dropped in the single-column
layout, where there is nothing left to close.

### Cards in a row need subgrid to share a baseline

Independently sized cards put their internal elements at different heights. A
plan with a one-line description beside one with three puts the rule under
them in two places, and the row reads as ragged.

Subgrid is the fix — the container declares the rows and each card spans them:

```css
@media (min-width:981px){           /* only where the cards sit side by side */
  .plans{ grid-template-rows:auto auto auto auto auto 1fr auto; }
  @supports (grid-template-rows:subgrid){
    .plan{ display:grid; grid-row:span 7; grid-template-rows:subgrid; row-gap:0; }
  }
}
```

Both guards matter. Stacked, there are no siblings to line up with, and the
`@supports` fence keeps the flex fallback intact where subgrid is missing.

Group optional elements into a single row, so a card missing one does not
shift everything after it. And remember flexbox properties stop applying:
`align-self:flex-start` on a chip becomes `justify-self:start`, or the chip
stretches the full width of the card.

### Specificity beats intent, especially inside media queries

When a rule works at one width and not another, it is usually one of these
rather than anything subtle:

- `.benefit:nth-child(4)` is (0,2,0) and out-specifies a bare `.benefit` at
  (0,1,0). A media query trying to undo an `nth-child` rule with a plain class
  selector silently loses.
- A media-query override written *above* the base rule it means to beat, at
  equal specificity, loses. Put the override after.
- `.site-nav a` is (0,1,1) and beats `.btn--primary` at (0,1,0). That is how a
  primary button once rendered grey-on-blue at 1.9:1. `:not(.btn)` fixed it.

### Hover is not a state on its own

Touch devices have no hover, so anything discoverable only by hovering is
undiscoverable on a phone. Pair it with a state that survives — focus, active,
or a permanent affordance.

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

Three scripts already exist for that, against a running server:

```
.claude/skills/visual-qa/scripts/shoot.mjs            screenshots in contiguous slices
.claude/skills/visual-qa/scripts/measure.mjs          prints real geometry for a selector
.claude/skills/responsive-design/scripts/overflow.mjs walks the eight widths, names
                                                      the element sticking out, exits
                                                      non-zero on overflow
```

`overflow.mjs` is the one no skill points at, so it is easy to miss and end up
checking eight widths by hand.

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

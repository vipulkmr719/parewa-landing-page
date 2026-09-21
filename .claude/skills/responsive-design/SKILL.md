---
name: responsive-design
description: Design and check the Parewa landing page across its eight intended widths — 320 to 1440 — for horizontal overflow, collapsed grids, unreachable controls and layout that only works at the width you happened to be looking at. Use this when writing or changing any grid, breakpoint, media query or layout rule in this repo, when adding a section, and whenever the user mentions mobile, tablet, phone, a specific width, small screens, "it breaks on my phone", or sideways scrolling.
---

# Responsive design for Parewa

The eight widths the page is designed for:

```
320   375   390   430   768   1024   1280   1440
```

320 and 1440 are the ends of the range, not afterthoughts. 390 is the most
likely real phone. 768 and 1024 straddle the breakpoints where grids change
shape, which is where things actually break.

Mobile is not a narrowed desktop. At small widths the page drops its nav, the
sticky CTA takes over the conversion path, and grids collapse to one column.
Check that the small layout works on its own terms rather than checking that
the desktop layout survived being squeezed.

## Run the overflow pass

```bash
npm run build && npm start &
node .claude/skills/responsive-design/scripts/overflow.mjs --url http://localhost:3000
node .claude/skills/responsive-design/scripts/overflow.mjs --url http://localhost:3000/privacy
```

It walks all eight widths and, when the page scrolls sideways, names the
elements sticking out with their right edge in pixels. "The page overflows" is
not actionable; `ul.plan__features 412px` is. It exits non-zero on any
overflow, so it drops straight into a check sequence.

## Choosing a breakpoint

Pick it by measuring, not by taste. The existing two-column section intro
starts at 1000px because that is where the narrower column still holds 47
characters a line; at 900px it dropped to 40, which is too cramped to be worth
the fill. Render it at candidate widths, count the characters, then decide.

A breakpoint that exists because 768 is a familiar number is a breakpoint that
will look wrong on something.

## What to walk through

At 390 and at 1280, minimum:

- **Header** — at small widths the nav is gone and only the logo and CTA
  remain. Confirm the CTA is reachable and not overlapped.
- **Hero and demo** — the brief-to-proposal demo is the focal point. It must
  stay legible when the two panels stack.
- **Feature rows** — they alternate sides on desktop and stack on mobile.
  Check the stacked order still reads copy-then-visual.
- **Pricing** — three columns above 980px, one below. The cards share grid rows
  only in the three-column layout.
- **FAQ** — summary text and chevron must not collide at 320.
- **Forms** — both. The dialog and FinalCta render the same component.
- **Footer and sticky CTA** — the sticky bar must not cover the last thing on
  the page or a form's submit button.

**The dialog needs its own check.** At 390×844 it must either fit the viewport
or scroll, with its submit button reachable either way. A dialog whose button
sits below the fold with no scroll is a form nobody can send:

```js
await page.$eval('#waitlistDialog', el => {
  const r = el.getBoundingClientRect();
  return { bottom: r.bottom, vh: innerHeight, scrolls: el.scrollHeight > el.clientHeight + 1 };
});
```

## CSS traps this page has actually hit

When a fix works at one width and not another, it is usually one of these
rather than anything subtle:

- **Specificity inside media queries.** `.benefit:nth-child(4)` is (0,2,0) and
  out-specifies a bare `.benefit` at (0,1,0). A media query trying to undo an
  `nth-child` rule with a plain class selector silently loses.
- **Source order between equal selectors.** A media-query override written
  *above* the base rule it means to beat, at the same specificity, loses. Put
  the override after.
- **Descendant selectors beating component classes.** `.site-nav a` is (0,1,1)
  and beats `.btn--primary` at (0,1,0) — that is how a primary button once
  rendered grey-on-blue at 1.9:1. `:not(.btn)` fixed it.
- **`ch` units.** They resolve against the digit zero, which the fallback
  fonts do not match, so any `ch` width re-wraps when the real font loads.
  Measures are `em` here for exactly that reason.

## Done means

- `overflow.mjs` exits clean on `/` and `/privacy`
- 390 and 1280 reviewed as images, not just as pass/fail
- Both forms reachable and submittable at 390
- Keyboard focus still visible and the dialog still traps focus

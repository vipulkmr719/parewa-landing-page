---
name: responsive-qa
description: Check the Parewa landing page across its eight designed widths for horizontal overflow, broken layout, unreachable controls and mobile-specific breakage. Use this after any CSS, grid, layout or component change in this repo, when adding a new section, and whenever the user mentions mobile, tablet, phone, small screens, a specific width, "it breaks on my phone", or horizontal scrolling. Run it before reporting a layout change as finished — a change verified at one width is verified at one width out of eight.
---

# Responsive QA for Parewa

The eight widths the page is designed for:

```
320   375   390   430   768   1024   1280   1440
```

320 and 1440 are the ends of the range, not afterthoughts. 390 is the most
likely real phone. 768 and 1024 straddle the breakpoints where the grids
change shape, which is where things usually break.

Mobile is not a narrowed desktop. At small widths the page drops its nav, the
sticky CTA takes over the conversion path, and grids collapse to one column.
Check that the small layout works on its own terms, rather than checking that
the desktop layout survived being squeezed.

## Run the overflow pass

```bash
npm run build && npm start &
node .claude/skills/responsive-qa/scripts/overflow.mjs --url http://localhost:3000
node .claude/skills/responsive-qa/scripts/overflow.mjs --url http://localhost:3000/privacy
```

It walks all eight widths, and when the page scrolls sideways it names the
elements sticking out with their right edge in pixels. "The page overflows" is
not actionable; `div.plan__features 412px` is.

It exits non-zero on any overflow, so it drops straight into a check sequence.

## Then look at it

Overflow is the failure you can automate. The rest you have to see:

```bash
node .claude/skills/parewa-ui-review/scripts/shoot.mjs \
  --url http://localhost:3000 --width 390 --tag mobile --out /tmp/shots
```

Walk the page at 390 and at 1280 and check each of these still works:

- **Header** — at small widths the nav is gone and only the logo and CTA
  remain. Confirm the CTA is still reachable and not overlapped.
- **Hero and demo** — the brief-to-proposal demo is the focal point. It has to
  stay legible when the two panels stack.
- **Feature rows** — they alternate sides on desktop and stack on mobile.
  Check the stacking order still reads copy-then-visual, not the reverse.
- **Pricing** — three columns above 980px, one below. The cards share grid
  rows only in the three-column layout.
- **FAQ** — summary text and the chevron must not collide at 320.
- **Forms** — both of them. The dialog and the one in the final section render
  the same component.
- **Footer and sticky CTA** — the sticky bar must not cover the last thing on
  the page or the form's submit button.

**The dialog deserves its own check.** At 390×844 it has to either fit the
viewport or scroll, with its submit button reachable either way. A dialog
whose button sits below the fold with no scroll is a form nobody can send:

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
  out-specifies a bare `.benefit` at (0,1,0). A media query that tries to undo
  a `nth-child` rule with a plain class selector silently loses.
- **Source order between equal selectors.** A media-query override written
  *above* the base rule it means to beat, at the same specificity, loses. Put
  the override after.
- **Descendant selectors beating component classes.** `.site-nav a` is (0,1,1)
  and beats `.btn--primary` at (0,1,0), which is how a primary button once
  rendered grey-on-blue at 1.9:1. `:not(.btn)` fixed it.
- **`ch` units.** They resolve against the width of the digit zero, which the
  metric-matched fallback fonts do not match, so any `ch` width re-wraps when
  the real font loads. Measures are set in `em` here for exactly this reason.

## Before you call it done

- `overflow.mjs` exits clean on `/` and `/privacy`
- 390 and 1280 reviewed as images, not just as pass/fail
- Both forms submitted, or at least reachable, at 390
- Keyboard focus still visible and the dialog still traps focus

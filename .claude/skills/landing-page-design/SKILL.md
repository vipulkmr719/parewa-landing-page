---
name: landing-page-design
description: Compose and lay out sections of the Parewa landing page — adding a new section, restructuring an existing one, fixing grids whose rules do not meet, card rows that sit ragged, dead columns and whitespace that reads as absence. Use this when the user asks to add a section, rework one, tidy or tighten the layout, or says a block looks unbalanced, empty, cramped or unfinished. Prefer it over restyling: on this page the fix is almost always structure, not decoration.
---

# Composing a section of Parewa

This is the skill for how a section is built: what goes in it, how it sits in
the page, and why a block that is correct cell by cell can still look wrong.

Its neighbours: `parewa-design-system` holds the values you build with,
`visual-hierarchy` decides what wins attention, `responsive-design` checks it
at every width. This one is about the structure in between.

## The page's existing patterns

Before inventing a layout, check whether one of these fits. Reusing a pattern
is most of what makes a page feel designed rather than assembled.

- **Section intro, two columns.** Heading in one column, the text it
  introduces in the next, above 1000px (`.section__intro`). This is the
  default for a section that opens with a heading and a paragraph.
- **Alternating feature rows.** Copy one side, a product mock the other,
  sides swapping down the page (`.feature`, with `FeatureShots` supplying the
  panels). Flush tops read as deliberate; centred read as ragged.
- **Bordered card grid.** Equal columns with hairline rules (`.benefits`).
- **Rule list.** A two-column list divided by hairlines (`.rule-list`).
- **Full-bleed band.** A strip in `--paper-sunk` or the dark ground, used to
  break the rhythm between sections.

Sections alternate `--paper` and `--paper-sunk` to give the page a pulse. Keep
that alternation when inserting one.

## The four structural faults this page has actually had

### Rules that do not meet

If a grid's rows divide at different fractions, none of the vertical lines
align and the block looks sloppy even though every cell is correct.

The benefits grid was five cards in a six-column grid: three across the top
dividing at thirds, two across the bottom dividing at halves. Nothing met.
Three equal columns fixed it — five cards fill five cells and the sixth is
left empty with its border closed by `::after`, so the block still reads as
finished. An empty cell is far quieter than a misaligned one. Drop the filler
in the single-column layout, where there is nothing to close.

### Card rows that do not share a baseline

Independently sized cards put their internal elements at different heights.
One plan with a one-line description beside another with three puts the rule
under them in two places, and the row reads as ragged.

Subgrid is the fix — give the container explicit rows and let each card span
them:

```css
.plans{ grid-template-rows:auto auto auto auto auto 1fr auto; }
.plan{ display:grid; grid-row:span 7; grid-template-rows:subgrid; row-gap:0; }
```

Two things to watch: group optional elements into a single row so a card
missing one does not shift everything after it, and remember flexbox
properties stop applying — `align-self:flex-start` on a chip becomes
`justify-self:start`, or the chip stretches the full card width.

### Dead columns

The wrap is 1100px but body text is capped near 34em, so a heading with a
paragraph beneath fills about two thirds of the width and leaves the rest
empty. That reads as a layout that failed to load rather than as margin.

Put something in the column — the editorial split above — or make the margin
obviously deliberate. Do not widen the text to fill it: line length is checked
by the page's tests, and a 95-character measure is a worse problem than an
empty column.

### Space that is not rhythm

Section spacing comes from `--sect-y` and component gaps should agree with
their neighbours. Space applied ad hoc to fix one block is how a page loses
its pulse — the eye reads inconsistent gaps as carelessness long before anyone
can say why.

## Adding a new section

1. Check the section belongs. This page has a shape — problem, then
   resolution, then proof, then price, then objections. A section that does
   not fit that arc usually belongs on another page.
2. Reuse a pattern from the list above.
3. Add it to `app/page.jsx` in the right place in the arc, and keep the
   `--paper` / `--paper-sunk` alternation.
4. Write the copy with `landing-copy`, not as filler to be replaced later.
5. Check it at all eight widths, then verify with `visual-qa`.

## What not to do

- **No absolute positioning to make a screenshot look right.** The layout has
  to survive the copy changing, and the copy will change.
- **No new spacing or radius values.** The tokens exist.
- **No fixing a local problem in a base selector.** That is how a page
  acquires side effects two breakpoints away.
- **No decoration to rescue a layout.** If a section needs a gradient or a
  shadow to hold together, the structure is wrong.

## Prove it worked

Re-measure the selectors you diagnosed with (`visual-qa` has the script).
Alignment fixes produce identical numbers across siblings, and that is the
evidence:

```
plan names   7461, 7461, 7461
rules        7710, 7710, 7710
```

Then check layout shift did not regress — restructuring is exactly the change
that introduces it — and run the responsive pass, because a fix at 1280 is not
a fix at 390.

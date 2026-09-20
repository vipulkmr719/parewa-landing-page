---
name: visual-polish
description: Fix the small structural things that make a page look unfinished — misaligned grid rules, ragged card rows, dead columns, inconsistent spacing, orphaned text blocks, whitespace that reads as absence. Use this in the Parewa repo when the user says a section looks off, unbalanced, empty, cramped, sloppy or unfinished, asks to tidy, tighten, polish or improve the look of something, or asks to improve the UI without naming a specific bug. Prefer it over restyling: the fix is usually alignment, not decoration.
---

# Polishing a section of Parewa

Most "this looks unfinished" reactions are not about colour or type. They are
about things not lining up, and about space that reads as absence rather than
as breathing room. Those are structural problems with structural fixes.

The instinct to reach for a gradient, a shadow or a bigger heading is almost
always the wrong one here. The page is restrained on purpose, and decoration
added to rescue a layout makes a section look more designed and the page look
less coherent. Fix the geometry instead.

## Diagnose before you touch anything

Screenshot the section and measure it (`parewa-ui-review` skill has the
scripts). You are looking for numbers that should match and do not. Work from
those, because "looks unbalanced" is a symptom and the pixel positions are the
cause.

## The four that account for most of it

### Rules that do not meet

If a grid's rows divide at different fractions, none of the vertical lines
align and the block looks sloppy even though every cell is correct.

The benefits grid was five cards in a six-column grid: three across the top
(dividing at thirds) and two across the bottom (dividing at halves). Nothing
met. Three equal columns fixed it — five cards fill five cells and the sixth
is left empty, with its border closed by `::after` so the block still reads as
finished. An empty cell is much quieter than a misaligned one.

Drop the filler in the single-column layout, where there is nothing left to
close and it would just be an empty box.

### Card rows that do not share a baseline

Independently sized cards in a row put their internal elements at different
heights. One plan with a one-line description and another with three puts the
rule beneath them in two different places, and the eye reads the row as
ragged.

CSS subgrid is the fix. Give the container explicit rows and let each card
span them:

```css
.plans{ grid-template-rows:auto auto auto auto auto 1fr auto; }
.plan{ display:grid; grid-row:span 7; grid-template-rows:subgrid; row-gap:0; }
```

Two things to watch: group optional elements into a single row so a card that
lacks one does not shift everything after it, and remember that flexbox
properties stop applying — `align-self:flex-start` on a chip becomes
`justify-self:start`, or the chip stretches the full card width.

### A lift too small to read as intentional

The recommended pricing card used to sit 20px above its neighbours. Twenty
pixels is too little to register as a deliberate step and just enough to look
like the cards missed each other, and it broke the shared rows. It came out,
and the border, shadow and marker chip carry the emphasis instead.

If an offset is not big enough to be obviously on purpose, it reads as a
mistake. Commit or remove.

### Dead columns

The wrap is 1100px, but body text is capped near 34em. A heading with a
paragraph beneath it therefore fills about two thirds of the width and leaves
the rest empty, which reads as a layout that failed rather than as margin.

The fix that fits this page is an editorial split: heading in one column, the
text it introduces in the next. That is what `.section__intro` does, above
1000px.

Pick the breakpoint by measuring, not by taste. 1000px is where the problem
story holds 47 characters a line; at 900px it dropped to 40, which is too
narrow to be worth the fill. Below the breakpoint it stacks, which was never
the broken case.

## What not to do

- **Do not widen text to fill space.** Line length is checked by the page's
  tests, and a 95-character measure is a worse problem than an empty column.
- **Do not position absolutely to make a screenshot look right.** The layout
  has to survive the copy changing, and the copy will change.
- **Do not introduce new spacing or radius values.** `--sect-y`, `--gutter`,
  `--radius`, `--radius-sm` exist. A fifth value is a second design system.
- **Do not fix a local problem in a global rule.** Changing a base selector to
  fix one section is how a page acquires mysterious side effects two
  breakpoints away.

## Prove it worked

Re-measure the same selectors you diagnosed with. Alignment fixes produce
identical numbers across siblings, and that is the evidence:

```
plan names   7461, 7461, 7461
rules        7710, 7710, 7710
```

Then check layout shift did not regress — restructuring is exactly the kind of
change that introduces it — and run the responsive pass, because a fix at 1280
is not a fix at 390.

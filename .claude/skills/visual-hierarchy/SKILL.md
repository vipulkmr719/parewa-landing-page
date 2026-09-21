---
name: visual-hierarchy
description: Decide what the eye should hit first on a Parewa page and make the design say so — what is emphasised, what recedes, whether the primary CTA is obvious, whether the focal point still holds. Use this when the user says a section feels flat, everything competes, the CTA gets lost, the message is not landing, or something is "not drawing the eye"; and when adding an element that will compete with an existing one for attention. This is about which element wins, not about whether things line up.
---

# Visual hierarchy on Parewa

Hierarchy is the order a page hands itself to the reader. This skill is for
deciding that order and making the design carry it.

Two neighbours worth keeping distinct: if the problem is that things do not
line up or a block looks unfinished, that is composition — see
`landing-page-design`. If the problem is that the wrong thing is loudest, or
nothing is, you are in the right place.

## The order this page commits to

1. The headline — what Parewa does, in one sentence.
2. The demo — brief in, proposal out, status back. **This is the focal
   point of the page.** It is the product doing its one trick, and it earns
   more visual weight than anything else on screen.
3. The primary CTA — join the waitlist.
4. Everything else.

Changes that quietly demote the demo are the most common way this page gets
worse. A new section with a big visual, a heading scaled up to fill space, a
card grid given borders heavy enough to pull the eye — each is defensible
alone and all of them cost the focal point.

## How emphasis is made here

The palette is restrained, so hierarchy comes from a small set of moves. Reach
for them in roughly this order:

- **Size and weight**, within the existing scale. `--t-display` is the
  headline; `--t-h2` is a section; `--t-lead` is a deck. The scale already
  encodes the hierarchy — use the right step rather than inventing one.
- **Colour, semantically.** `--slate` for what matters, `--slate-soft` for
  what supports it. Reducing a secondary element to `--slate-soft` is usually
  better than enlarging the primary one.
- **Space.** Isolation reads as importance. A heading with room around it
  outranks a bigger heading in a crowded block.
- **Ground.** `--paper-raised` against `--paper-sunk` lifts a card without a
  shadow. This is how elevation is done here.
- **`--grain`, once.** The highlight on the hero lead. It stops being a
  highlight the second time it appears.

What not to reach for: bigger type as a first resort, extra shadows, a new
accent colour, badges, or an icon added to make something feel significant.
The page is quiet on purpose, and in a quiet page a small move is loud.

## Emphasis has to be unambiguous

A signal too weak to read as deliberate reads as a mistake instead.

The recommended pricing card used to sit 20px above its neighbours. Twenty
pixels is too little to register as a step and just enough to look like the
cards missed each other — and it broke their shared rows. It came out; the
border, the ground and the marker chip carry the emphasis now, and they are
unambiguous.

If an offset, a weight change or a tint is not obviously on purpose, either
commit to it properly or remove it. Half-emphasis is worse than none.

## Checking it rather than asserting it

Hierarchy is judged by eye, but it is judged on the rendered page, not in the
CSS. Screenshot the section (`visual-qa` has the script) and ask:

- Squinting, or at thumbnail size, what do you see first? Is that what you
  intended?
- Is there exactly one primary action in view, or are two buttons competing at
  the same weight?
- Does any secondary element out-weigh something above it in the order?
- Did the demo stay the focal point?

Heading levels carry hierarchy for screen readers too. Emphasis is a visual
decision; `h2` versus `h3` is a structural one, and they should agree. Never
pick a heading level for its font size — set the level by structure and style
it with the scale.

---
name: visual-qa
description: Verify a UI change against the rendered page before calling it done — screenshot it, measure the geometry, check the console, confirm it still belongs to the Parewa design system. Use this after changing anything visual in this repo (CSS, layout, component markup, spacing, type), and when the user asks you to check, review, critique or sanity-check how the page looks, or says something "looks off" or "looks broken". Run it before reporting a visual change as complete, not after the user pushes back.
---

# Verifying a visual change

This is the pass that happens after the change, when you are about to say it
works. The other design skills decide what to do; this one decides whether
what you did actually happened.

The failure mode it exists to prevent is confident prose about a page you
never looked at. Alignment, overflow, contrast and layout shift are all
measurable, and a claim about any of them not backed by a number or an image
is a guess wearing a suit.

## Look at it

```bash
npm run build && npm start &
node .claude/skills/visual-qa/scripts/shoot.mjs \
  --url http://localhost:3000 --width 1280 --tag after --out /tmp/shots
node .claude/skills/visual-qa/scripts/shoot.mjs \
  --url http://localhost:3000 --width 390 --tag after --out /tmp/shots
```

Then read the images. Generating screenshots and not opening them is a
common and expensive mistake — it produces the feeling of having checked
without the fact of it.

Shoot the *before* state too if you can, before you start. Working from what
is actually wrong beats working from a description of what might be wrong.

Two traps the script already handles, worth knowing so you do not reintroduce
them in ad-hoc code:

- **`scroll-behavior: smooth` is global here**, so `window.scrollTo` animates
  and a screenshot taken straight after lands mid-flight, showing a section
  you were not aiming at.
- **The hero rewinds and replays on mount.** Shoot too early and you capture a
  half-typed brief and report it as a bug.

## Measure what you are about to claim

```bash
node .claude/skills/visual-qa/scripts/measure.mjs \
  --url http://localhost:3000 --sel ".plan__name" --sel ".plan .btn"
```

Elements that should share a line produce identical `top` values. Three
different numbers is the finding; the same command after the fix is the proof.
`7461, 7461, 7461` is an argument. "They look aligned now" is not.

## The checks

**Console.** Load both `/` and `/privacy` and look. React logs hydration
mismatches loudly, and a mismatch is exactly what a server-rendered component
with client state will produce if you got the initial state wrong.

**Hierarchy.** Still obvious what the page is about and what the primary
action is? If you changed emphasis, the `visual-hierarchy` skill is the one
with the reasoning.

**Type.** Wrapping and measure, not size. Roughly 45–75 characters a line —
the page's checks enforce this, so a wide measure fails rather than merely
looking loose.

**Spacing and alignment.** Grid rules meeting, consistent gaps, section rhythm
from `--sect-y`.

**Responsive.** At minimum 390 and 1280. A change verified at one width is
verified at one width out of eight — `responsive-design` has the full pass and
the overflow script.

**Contrast.** Any text whose colour or background you touched. 4.5:1 for body,
3:1 for large text. Measure it rather than trusting that a token was already
safe on its old background — `.site-nav a` once beat `.btn--primary` on
specificity and produced grey-on-blue at 1.9:1.

**Accessibility you might have broken.** Focus ring still visible, form labels
still associated, heading levels still not skipping, dialog still trapping
focus.

## The question that decides it

Does this look like it belongs to the existing Parewa design system, or like a
good idea from somewhere else that landed here?

The page is restrained on purpose. If a change needs a gradient, a glow or an
extra shadow to work, the change is usually wrong rather than the palette
being insufficient.

## Done means

- `npm run build` passes
- No new console errors, checked rather than assumed
- Screenshots at 390 and 1280 reviewed, not just generated
- Every alignment or contrast claim backed by a measured number

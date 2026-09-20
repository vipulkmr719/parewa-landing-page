---
name: parewa-ui-review
description: Review a UI change to the Parewa landing page against its existing editorial design system before calling it done. Use this whenever you have changed anything visual in this repo — CSS, layout, a component's markup, spacing, type — and also when the user asks you to check, review, critique, or sanity-check how the page looks, or says something "looks off", "looks broken", or "doesn't feel right". Use it before reporting any visual change as complete, not after the user pushes back.
---

# Reviewing a UI change to Parewa

`CLAUDE.md` in the repo root says *what* the design system is. This says *how*
to check you stayed inside it.

The failure mode this exists to prevent is confident prose about a page you
never actually looked at. Alignment, overflow, contrast and layout shift are
all measurable, and a claim about any of them that is not backed by a number or
a screenshot is a guess wearing a suit.

## Look at the page before you change it

Start the production build and screenshot what is there now:

```bash
npm run build && npm start &          # or: npm run dev
node .claude/skills/parewa-ui-review/scripts/shoot.mjs \
  --url http://localhost:3000 --width 1280 --tag before --out /tmp/shots
node .claude/skills/parewa-ui-review/scripts/shoot.mjs \
  --url http://localhost:3000 --width 390 --tag before --out /tmp/shots
```

Then read the images. Work from what is actually wrong rather than from a
description of what might be wrong — the two are rarely the same page.

Two traps the script already handles, worth knowing so you do not reintroduce
them in ad-hoc code:

- **`scroll-behavior: smooth` is set globally**, so `window.scrollTo` animates
  and a screenshot taken straight after lands mid-flight, showing you a section
  you were not aiming at. The script disables it.
- **The hero rewinds and replays on mount.** Screenshot too early and you
  capture a half-typed brief and call it a bug. The script waits it out.

## Measure the things you are about to claim

Do not eyeball alignment. Ask the page:

```bash
node .claude/skills/parewa-ui-review/scripts/measure.mjs \
  --url http://localhost:3000 --sel ".plan__name" --sel ".plan .btn"
```

Elements that should share a line produce identical `top` values. Three
different numbers is the finding, and the same command after your change is
the proof it worked. This is how the pricing cards were fixed: names at
7461/7461/7461 is an argument, "they look aligned now" is not.

## The review itself

Go through these with the screenshots open. Most changes only touch a few.

**Hierarchy.** Is the primary message still the most prominent thing on the
screen? Is the primary CTA obvious? Did you accidentally give a secondary
element the weight of a heading?

**Typography.** Wrapping and measure, not size. A heading that breaks into a
bad line ("Send the proposal in / 15 minutes.") is worth fixing; making it
bigger is not. Line length between roughly 45 and 75 characters — the page's
tests check this, so a wide measure will fail them, not just look wrong.

**Spacing and alignment.** Section rhythm comes from `--sect-y`; component
gaps should be consistent with their neighbours. Grid rules must meet: if one
row divides at thirds and the row beneath it divides at halves, none of the
vertical lines line up and the block reads as sloppy even though every cell is
correct on its own.

**Whitespace that reads as absence.** The wrap is 1100px. A heading with a
body paragraph capped at 34em beneath it leaves a few hundred pixels of empty
column to the right, and that reads as a layout that failed to load rather
than as breathing room. Either put something in that column or make the margin
obviously deliberate.

**Components.** Borders, radii and button states consistent with the rest.
`--radius` and `--radius-sm` exist; a third value does not.

**Motion.** Short, purposeful, and off under `prefers-reduced-motion`.

## Check both ends of the range

A change verified only at 1280 is verified at one width out of eight. Run the
responsive pass (`responsive-qa` skill, or at minimum 390 and 1280) before
you finish. Layout changes in particular tend to be fine at the width you were
looking at and broken two breakpoints away.

## The question that decides it

Does this look like it belongs to the existing Parewa design system, or does
it look like a good idea from somewhere else that landed here?

The page is restrained on purpose. Gradients, glows, badge clusters, extra
shadows and decorative icons all make a section look more designed and make
the page look less coherent. If a change needs one of those to work, the
change is usually wrong rather than the palette being insufficient.

## Before you say it is done

- `npm run build` passes
- No new console errors (load the page and check, do not assume)
- Screenshots at 390 and 1280 reviewed, not just generated
- Any alignment or spacing claim backed by measured numbers
- Nothing invented — see the `landing-copy` skill if you touched words

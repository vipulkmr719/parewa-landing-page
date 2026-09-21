---
name: interaction-motion
description: Add or change movement and interactive states on the Parewa page — transitions, hover, focus, active and disabled states, the hero's brief-to-proposal demo, the waitlist dialog's open and close behaviour, scroll-triggered reveals. Use this whenever you touch an animation, transition, keyframe, hover or focus style, or a component's interactive state, and when the user asks to make something animate, feel smoother, move, or react. It also covers what must still work with reduced motion and with no JavaScript.
---

# Motion and interaction on Parewa

The page moves in two places on purpose and is otherwise still. That restraint
is the design, not an omission — a proposal tool for agency owners earns trust
by being calm.

## What already moves, and why

**The hero demo.** A brief types itself, a proposal assembles, a status rail
lights up. This is the product doing its one trick and it is the only
substantial animation on the page. It earns its length because it *is* the
argument.

**Interaction feedback.** Short transitions on hover, focus and press. Enough
to feel responsive, not enough to notice.

Everything else holds still. Before adding motion, ask what it tells the
reader that stillness does not. "It feels more alive" is not an answer —
scroll-triggered reveals on every section make a page feel cheap and make the
content arrive late.

## The rule the hero is built around

Reduced-motion users get the **completed** state, not a broken one.

This is why `Hero` renders the finished brief on the server and then rewinds
it on mount, rather than starting empty and filling in. With no JavaScript,
and with `prefers-reduced-motion`, the page is already complete — the
animation is something added for people who can take it, not something the
content depends on.

Any new animation has to hold the same shape. Ask: if this never runs, is the
content still there and still legible? If the answer is no, the animation is
carrying content and needs restructuring, not a media query.

```css
@media (prefers-reduced-motion: reduce){
  /* land on the end state; do not simply shorten the duration */
}
```

Shortening a transition to 0.01s is fine for a hover tint. It is not fine for
anything that reveals content, because the content was never the animation's
to withhold.

## Interactive states

Every control needs hover, focus-visible, active and, where it applies,
disabled. Focus is the one most often forgotten and the one that matters most:
the page sets a visible 2px ring with offset, and removing it for visual
tidiness breaks keyboard use entirely.

Hover alone is not a state — touch devices have no hover, so anything
discoverable only by hovering is undiscoverable on a phone.

Disabled must look disabled and still be legible. The waitlist button swaps
its label while submitting rather than only dimming, so the change is visible
rather than merely decorative.

## The dialog

The waitlist dialog is a native `<dialog>`, which brings focus trapping and
Escape for free. Two things that are easy to break:

- **React state and the element must stay in step.** Escape fires the native
  `close` event without going through your handler, so the component listens
  for `close` and syncs. Bypass that and the dialog can end up visually shut
  but still open in state.
- **Focus returns to whatever opened it.** `WaitlistProvider` keeps that
  reference. Losing it drops a keyboard user at the top of the document.

## Cost

Motion is not free on the 4G this audience reads on. Prefer `transform` and
`opacity` — they composite rather than triggering layout. Animating width,
height, top or margin forces reflow on every frame.

Anything that changes layout after load is layout shift, which the page keeps
near zero. If you add a reveal, re-measure CLS afterwards rather than assuming.

## Done means

- It works with `prefers-reduced-motion`, landing on the end state
- It works with JavaScript off, or the content does not depend on it
- Focus is visible and the tab order is unchanged
- Transitions use `transform` / `opacity` where they can
- Layout shift did not regress — see `visual-qa`

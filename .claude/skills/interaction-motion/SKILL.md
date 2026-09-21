---
name: interaction-motion
description: Use motion on the Parewa page to aid understanding rather than to decorate — the restrained house philosophy, the full set of interaction states from default through hover, focus, active, disabled and loading, and what the product demo's animation is allowed to be. Use this whenever you touch an animation, transition, keyframe, hover or focus style, or a component's interactive state, when the user asks to make something animate, move or feel smoother, and before adding any scroll-triggered effect. It also covers reduced motion, jank and layout shift.
---

# Interaction and Motion

Use motion to improve understanding and perceived quality,
not to decorate the page.

## Existing Motion Philosophy

Parewa intentionally uses restrained animation.

The hero/product demonstration is the primary animated experience.

Other sections should remain relatively quiet.

## Interaction States

Interactive elements should have appropriate:

- default
- hover
- focus
- active
- disabled
- loading

states.

## Buttons

Button interactions should be subtle.

Prefer:

- color transition
- border transition
- slight opacity changes

Avoid excessive:

- scaling
- bouncing
- glowing
- movement

## Navigation

Navigation interactions should clearly communicate:

- hover
- active
- focus

## FAQ

FAQ expansion should feel responsive and predictable.

Avoid excessive animation.

## Product Demo

The product demonstration may use animation to communicate
the product workflow.

Animation should make the product easier to understand.

It should not exist only for visual spectacle.

## Scroll Animation

Do NOT automatically add scroll-triggered animations to every section.

Avoid:

- fade-in on every element
- slide-up on every card
- staggered animation everywhere
- parallax everywhere

## Performance

Animations should not cause:

- layout shift
- excessive CPU usage
- jank
- mobile performance problems

Prefer transform and opacity when animation is necessary.

## Reduced Motion

Respect:

prefers-reduced-motion: reduce

When reduced motion is enabled:

- remove decorative animation
- preserve meaningful state changes
- show completed states immediately

## Principle

If removing the animation makes the interface clearer,
the animation probably wasn't necessary.

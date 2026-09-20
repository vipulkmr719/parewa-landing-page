# Parewa Design System

You are working on the existing Parewa landing page.

The design system already exists in `app/globals.css`.
Treat the existing system as the source of truth.

## Core Design Direction

Parewa should feel:

- editorial
- professional
- restrained
- product-led
- trustworthy
- modern
- intentional

It should NOT feel like a generic AI-generated SaaS landing page.

## Existing Typography

The project uses:

- Bricolage Grotesque for display typography
- Inter for body/UI typography

Do not replace these fonts without explicit instruction.

Do not introduce random font families.

Maintain the existing typography hierarchy.

## Existing Color System

Use the existing CSS variables:

--paper
--paper-sunk
--paper-raised
--slate
--slate-soft
--wing
--wing-deep
--green
--green-deep
--green-tint
--grain
--rule
--rule-strong

Never create arbitrary colors when an existing token is appropriate.

## Brand Treatment

Parewa's visual identity is intentionally restrained.

The iridescent treatment should remain special.

Do not spread gradients throughout the page.

Do not introduce:

- gradient backgrounds
- glowing gradients
- colorful blobs
- excessive glass effects

unless explicitly requested.

## Spacing

Reuse the existing spacing system.

Prefer existing:

--gutter
--sect-y
--wrap

Use consistent spacing.

Avoid arbitrary values such as:

13px
17px
23px
37px

unless there is a clear layout reason.

## Border Radius

Use the existing radius system.

Do not turn every element into a pill.

Cards and containers should have meaningful grouping.

## Shadows

Use shadows sparingly.

Do not add shadows simply to make components look "premium".

## Component Reuse

Before creating a component:

1. Search the existing codebase.
2. Find similar components.
3. Reuse or extend the existing component.
4. Only create a new component if necessary.

## Golden Rule

When improving the UI:

Improve the existing design.

Do not replace the existing design.

---
name: parewa-design-system
description: The existing Parewa design system — the tokens, fonts, colour semantics, spacing and radius values that already exist in app/globals.css, and the rule that you extend them rather than inventing alongside them. Use this before writing any CSS in this repo, before picking a colour, size, spacing or radius value, before adding a styled element or component, and whenever the user asks to restyle, theme, or change the look of something. Consult it first rather than reading values off a screenshot.
---

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

Both are self-hosted and subset in `public/assets/fonts/`, with metric-matched
fallback faces so nothing re-wraps when the webfont arrives. Do not load fonts
from a CDN — it costs two extra handshakes before first paint, which is the
wrong trade for the patchy 4G a lot of this audience reads on.

The display face is variable in width, and the scale uses four fallback faces
to match it: `--display-88` / `-92` / `-96` / `--display`. Headings pick the
width that suits their size, which is why `h1` and `h2` use different ones.

The scale, all fluid between mobile and desktop:

```
--t-display  36 → 56     --t-lead   18 → 20
--t-h2       28 → 40     --t-body   16
--t-h3       22 → 28     --t-small  14
```

**Measures are set in `em`, never `ch`.** `ch` resolves against the width of
the digit zero, which a metric-matched fallback does not match, so every
`ch`-based width re-wrapped the moment the real font loaded. That was the
source of this page's layout shift. `em` depends only on font-size, so it
holds. For the same reason, `max-width` belongs on the text element itself,
not a wrapper — on a wrapper it resolves against the wrong font.

## Existing Color System

Use the existing CSS variables:

```
--paper          page ground, a cool white
--paper-sunk     the pause: problem section, insets
--paper-raised   cards lifted off the paper
--slate          headlines and body
--slate-soft     secondary text
--wing           primary buttons, links, active states
--wing-deep
--green          tracking states only — never decoration
--green-deep     green that is safe to set text in
--green-tint
--grain          highlighter. Once per page.
--rule           hairlines, borders, dividers
--rule-strong
```

Never create arbitrary colors when an existing token is appropriate.

The semantics matter as much as the values. Green means a tracking state, not
"good" in general. `--grain` is the one highlight on the page and stops being
a highlight the moment it is used twice.

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

```
--wrap    1100px         the content column
--gutter  20 → 40px      inside the wrap
--sect-y  64 → 120px     between sections
```

Use consistent spacing.

Avoid arbitrary values such as:

13px
17px
23px
37px

unless there is a clear layout reason.

## Border Radius

Use the existing radius system: `--radius` at 10px, `--radius-sm` at 6px.

Do not turn every element into a pill.

Cards and containers should have meaningful grouping.

## Shadows

Use shadows sparingly.

Do not add shadows simply to make components look "premium".

The page has essentially one: a 1px line under the recommended pricing card.
Elevation here comes from `--paper-raised` against `--paper-sunk`, not from
blur.

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

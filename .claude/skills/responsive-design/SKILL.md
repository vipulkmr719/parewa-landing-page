---
name: responsive-design
description: Make the Parewa landing page work intentionally at every size it is designed for, from 320px to 1440px — rethinking navigation, hero, demo, pricing, FAQ and footer per breakpoint rather than scaling the desktop layout down. Use this when writing or changing any grid, breakpoint or layout rule in this repo, when adding a section, and whenever the user mentions mobile, tablet, phone, a specific width, touch targets, small screens, "it breaks on my phone", or sideways scrolling. The bar is no horizontal scrolling, no clipping, no overlap, no broken alignment.
---

# Responsive Design

The Parewa landing page must work intentionally across screen sizes.

## Required Sizes

Check:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px

## Mobile Is Not Shrunk Desktop

Do not simply reduce desktop dimensions.

Reconsider:

- navigation
- hero layout
- CTA layout
- product demo
- feature layouts
- pricing
- FAQ
- footer

## Mobile Navigation

Check:

- logo visibility
- CTA visibility
- navigation access
- touch target size

## Typography

Ensure:

- headings don't overflow
- text doesn't wrap awkwardly
- body text remains readable
- line lengths remain comfortable

Use responsive typography where appropriate.

## Layout

Prefer:

- CSS Grid
- Flexbox
- minmax()
- clamp()
- max-width
- responsive gaps

Avoid unnecessary:

- absolute positioning
- fixed widths
- fixed heights

## Images

Images and product mockups must:

- scale correctly
- maintain aspect ratio
- avoid overflow

## Buttons

On mobile:

- buttons must remain tappable
- text must not wrap unexpectedly
- CTA hierarchy must remain clear

## Tables / Pricing

Pricing layouts must remain readable.

Do not squeeze three desktop cards into a narrow mobile viewport.

## Sticky CTA

The existing mobile sticky CTA must not:

- cover important content
- block form controls
- create horizontal overflow
- interfere with navigation

## Final Test

No horizontal scrolling.

No clipped content.

No overlapping components.

No broken alignment.

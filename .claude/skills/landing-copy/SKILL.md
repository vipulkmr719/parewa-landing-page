---
name: landing-copy
description: Write or edit user-facing copy on the Parewa landing page — headlines, section text, feature descriptions, pricing text, FAQ answers, form labels, microcopy, the privacy policy. Use this whenever you are changing words that a visitor will read on this site, when the user asks to reword, tighten, rewrite, punch up or fix the wording of anything, and when adding a new section that needs text. Use it especially before writing any number, customer name, or capability claim, because the rule against inventing those is what this skill mostly exists to enforce.
---

# Writing copy for Parewa

Parewa is AI proposal software for Indian digital agencies. The tagline is
*Proposals that come back with an answer.* The reader is an agency owner or
senior account person who writes proposals at 9pm and does not enjoy it.

## The voice

Concrete and specific, not aspirational. The page earns trust by describing
the reader's Thursday accurately, not by claiming to be transformative.

What that means in practice:

- **Name the real thing.** "Print, sign, scan, email" beats "streamline your
  signature workflow." "Two to four hours per proposal" beats "hours of
  wasted time."
- **Indian agency specifics are the point.** INR pricing, GST as a line item,
  monthly retainers, WhatsApp, UPI, PCMC clusters. This is the differentiator
  against software adapted from a US template — do not sand it off into
  generic SaaS English.
- **Second person, active, present tense.** "You edit, you don't start from
  zero."
- **No hype vocabulary.** Revolutionary, seamless, powerful, cutting-edge,
  game-changing, supercharge, unlock, effortless. If a sentence survives
  deleting the adjective, delete the adjective.
- **No emoji in UI copy.** The one in the problem section is inside a quoted
  message a reader would actually send, which is different.

Sentence case for headings and labels. The existing form labels read *Work
email*, *Agency name*, *Proposals sent per month* — match that shape.

## The thing you must not do

Do not invent customers, agency names, numbers, testimonials, awards, product
capabilities, pricing, or legal claims. Not as a placeholder, not "for now",
not to make a section look finished. This is a live page making commercial
representations to real businesses.

If you need a fact you do not have, flag it and leave the gap visible. An
obvious hole gets filled before launch; a plausible invention does not,
because nobody knows it is there.

**Placeholders are already on the page.** They are marked `TODO` where they
sit, and knowing about them is part of not making things worse:

- the waitlist count in `components/TrustStrip.jsx`
- the three design-partner names in `components/TrustStrip.jsx`
- the four inclusions under the Lifetime plan in `components/Pricing.jsx`
- `[LEGAL ENTITY NAME]`, `[REGISTERED ADDRESS]`, `[GRIEVANCE OFFICER NAME]`
  and `[DATE]` in `app/privacy/page.jsx`

Treat them as known-false. Never cite one as evidence, never round one up, and
never add a fifth by matching the pattern.

Bracketed placeholders are for source files, not for rendered pages. The
footer used to display `[City], India` to visitors, which reads as a bug
rather than as a gap. If a value is missing in live copy, write the sentence
so it works without the value.

## Copy that changes what the product does

Some words are promises the code has to keep.

If a change alters what the site collects, stores, or sends anywhere — a new
form field, a new third-party script, a new integration — then
`app/privacy/page.jsx` is part of that change, not a follow-up ticket. The
policy is written for India's DPDP Act, 2023 and enumerates the fields the
form collects. Adding a field without updating it makes the page's own
disclosure false.

Free-text fields need a sentence of their own: someone may type a client's or
colleague's name into a suggestion box, which makes it that person's data too.

The same applies in reverse. The policy once claimed *"There is no hidden
field. You can read the page source and confirm it"* while a honeypot input
sat in the markup. Any copy that invites the reader to verify something must
survive them actually doing it.

## Fitting the layout

The page's tests check line length, so copy is not free of layout
consequences:

- Headings are balanced (`text-wrap: balance`) and set at `--t-display` or
  `--t-h2`. A headline two words longer can push into an extra line or break
  badly. Look at it rendered.
- Body measures are capped near 34em. Roughly 45–75 characters a line is the
  target; well past that fails the checks.
- Card and grid copy has to survive its neighbours. Pricing cards share grid
  rows, so a plan description that runs to three lines when its siblings run
  to one changes the height of a shared row.

After any substantial copy change, look at the rendered page (see the
`visual-qa` skill), not just the diff.

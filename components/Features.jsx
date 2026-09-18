import {
  DraftShot, TemplatesShot, BrandKitShot, TrackingShot, SignatureShot, WorkflowShot,
} from './FeatureShots';

const FEATURES = [
  {
    title: 'AI that writes from a brief, not from a blank page',
    body: 'Paste your call notes, a client email, or three rough bullet points. Parewa drafts the objectives, scope of work, deliverables, timelines and pricing — structured the way agency proposals are actually structured. You edit, you don’t start from zero.',
    shot: <DraftShot />,
  },
  {
    title: 'Templates built for the work Indian agencies actually sell',
    body: 'Ready-made, editable templates for SEO, Social Media Management, Performance Marketing, Branding & Identity, Website Design & Development, and Content Marketing. Built around monthly retainers, INR pricing tables and GST line items — not adapted from a US template that assumes hourly billing in dollars.',
    shot: <TemplatesShot />,
    flip: true,
  },
  {
    title: 'An editor that respects your brand',
    body: 'Drop in your logo, set your brand colours and fonts once. Every proposal after that comes out on-brand automatically. Drag sections around, swap in case studies, adjust pricing. It works like a document, not like software you need training for.',
    shot: <BrandKitShot />,
  },
  {
    title: 'Open and view tracking',
    body: 'A notification the moment your client opens the proposal. Then the detail: how many times they came back, how long they spent on the pricing page, whether they forwarded it to someone else. Your follow-up finally has timing behind it.',
    shot: <TrackingShot />,
    flip: true,
  },
  {
    title: 'Built-in e-signature',
    body: 'The client accepts and signs inside the proposal itself, on desktop or mobile. Both sides get a stamped PDF copy. No third-party signing tool, no extra subscription.',
    shot: <SignatureShot />,
  },
  {
    title: 'A workflow that stays out of the way',
    body: 'Duplicate a past proposal in one click. Save your best-performing scope sections as reusable blocks. Share a link instead of a 14MB attachment. Everything your team has sent, in one place, searchable.',
    shot: <WorkflowShot />,
    flip: true,
  },
];

export default function Features() {
  return (
    <section className="section section--sunk" id="features">
      <div className="wrap">
        <h2 className="section__head">Everything you need to go from brief to signed</h2>

        <div className="features">
          {FEATURES.map(({ title, body, shot, flip }) => (
            <div className={`feature${flip ? ' feature--flip' : ''}`} key={title}>
              <div className="feature__copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              {shot}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

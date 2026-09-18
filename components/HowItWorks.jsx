const STEPS = [
  ['Drop in the brief', 'Type a few lines about the client, or paste your call notes. Pick the service: SEO, paid media, branding, whatever the deal is. Set your budget range.'],
  ['Review and brand it', 'Parewa drafts the full proposal on your template. Read it, tighten the parts only you’d know, adjust the pricing. This is where most of your fifteen minutes goes — and it’s the only part that genuinely needs you.'],
  ['Send, track, close', 'Share a link. Get notified when it’s opened. See what they read. Follow up at the right moment, and let them sign in the browser when they’re ready.'],
];

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <h2 className="section__head">Three steps. About fifteen minutes.</h2>
        <ol className="steps">
          {STEPS.map(([title, body]) => (
            <li className="step" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

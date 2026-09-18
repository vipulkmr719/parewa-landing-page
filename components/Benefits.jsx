const BENEFITS = [
  ['Get your evenings back', 'What took three hours takes fifteen minutes. An agency sending eight proposals a month gets roughly 25 hours back — that’s a full account manager week, every month, spent on clients instead of formatting.'],
  ['Walk in looking like the biggest agency in the room', 'Every proposal carries your logo, your colours, your structure. Consistent from the first line to the signature block, whether you wrote it or your newest AM did.'],
  ['Know exactly what’s happening after you send', 'See when it was opened, how many times, and which sections held their attention. Follow up because you know they’re reading — not because it’s been four days.'],
  ['Close while the intent is still hot', 'The client signs in the browser, on their phone, in under a minute. No printing, no scanning, no “let me get back to you next week.”'],
  ['Let your team send proposals without you', 'Templates and approved content blocks mean an account manager can put together a proposal you’d be happy to put your name on. You just approve it.'],
];

export default function Benefits() {
  return (
    <section className="section">
      <div className="wrap">
        <h2 className="section__head">One brief in. A ready-to-send proposal out.</h2>
        <p className="lead">
          Tell Parewa what the client needs in a few lines. It writes the scope, deliverables,
          timeline and pricing in your agency’s voice, on your agency’s template. You review,
          adjust, and send — usually in under 15 minutes.
        </p>

        <div className="benefits">
          {BENEFITS.map(([title, body]) => (
            <div className="benefit" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

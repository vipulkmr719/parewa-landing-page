const PAINS = [
  ['Two to four hours per proposal.', 'Usually yours, usually after 9pm, because nobody else on the team can write scope the way you do.'],
  ['Every proposal looks like a different agency made it.', 'Different fonts, different structure, the old logo on page one. Not the impression you want to make at a ₹2 lakh/month pitch.'],
  ['Zero visibility after you hit send.', 'No idea if it was opened, skimmed, or ignored. Your follow-up is pure guesswork.'],
  ['Signatures take a week.', 'Print, sign, scan, email. Or worse, “we’ll do it when I’m back in office.”'],
  ['Your senior team is stuck doing document work.', 'Account managers who should be on calls are fixing table borders instead.'],
];

export default function Problem() {
  return (
    <section className="section section--sunk">
      <div className="wrap">
        <div className="section__intro">
          <h2 className="section__head">
            You’re not losing deals on price. You’re losing them on turnaround.
          </h2>

          <div className="problem__story">
            <p>A client calls on Thursday. They want a scope and a number. So the same thing happens that always happens.</p>
            <p>Someone opens the last proposal you sent — the one for a different client, in a different industry — and starts deleting. The formatting breaks halfway down. The pricing table from the old retainer is still in there. Three hours later it’s a PDF, and it goes out on WhatsApp on Friday evening.</p>
            <p>Then nothing. You don’t know if they opened it. You don’t know if they read past page two. You don’t know if they forwarded it to their founder or let it sit. So on Monday you send “Just following up 😊” and wait some more.</p>
          </div>
        </div>

        <ul className="rule-list">
          {PAINS.map(([title, detail]) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <p className="problem__close">
          Meanwhile the agency that replied in two hours with something sharp has already booked
          the follow-up call.
        </p>
      </div>
    </section>
  );
}

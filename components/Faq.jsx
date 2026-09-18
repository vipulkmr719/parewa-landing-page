const QUESTIONS = [
  ['Will the AI sound generic?', 'No — it writes on your templates, in your voice, and you edit before sending. Parewa drafts from your brief against the structure and language you’ve already approved, then hands it to you. Nothing goes to a client that you haven’t read.'],
  ['Can I import my existing proposals?', 'Yes. Send us the three proposals you send most often and we’ll rebuild them as Parewa templates — free for waitlist members. After that you can turn any proposal you write into a reusable template in one click.'],
  ['Does it handle GST and INR pricing?', 'It’s built around them. Pricing tables are INR-first with tabular figures, GST is a line item rather than an afterthought, and the templates assume monthly retainers instead of hourly billing in dollars.'],
  ['What happens to my data?', 'Your proposals and client data stay yours. We don’t train models on them, we don’t share them, and you can export everything you’ve written and delete your account at any time.'],
  ['What does Parewa mean?', 'Parewa (परेवा) means pigeon. The carrier pigeon is the oldest messaging technology there is: you send it out, and it comes back with an answer — which is exactly what a proposal should do.'],
];

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <h2 className="section__head">Questions agency owners ask us</h2>
        <div className="faq">
          {QUESTIONS.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

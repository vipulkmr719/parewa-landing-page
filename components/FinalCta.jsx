import WaitlistForm from './WaitlistForm';

export default function FinalCta() {
  return (
    <section className="section final">
      <div className="wrap final__grid">
        <div>
          <h2>The next brief is coming this week. Be ready for it.</h2>
          <p className="lead">
            Parewa is opening to a limited set of Indian agencies before public launch. Join the
            waitlist and you’ll get early access, 40% off your first year, and a say in what we
            build next.
          </p>
          <p className="trustline">
            Built in India, for Indian agencies. Your proposals and client data stay yours — we
            don’t train models on them.
          </p>
        </div>

        <WaitlistForm
          idPrefix="f"
          note={
            <p className="microcopy">
              Takes 20 seconds. No card, no commitment. We’ll email you the moment your access opens.
            </p>
          }
        />
      </div>
    </section>
  );
}

/*
 * Rough mockups of the real screens. An icon grid would say "we couldn't show
 * the product yet", which is the wrong signal pre-launch.
 */

const Tick = () => <span className="tick" aria-hidden="true">✓</span>;

export function DraftShot() {
  const rows = ['Objectives', 'Scope of work', 'Deliverables & timeline', 'Investment & GST'];
  return (
    <div className="shot">
      <div className="shot__bar">Draft from brief <span>12 sec</span></div>
      <p className="paste">
        “Call w/ Meraki — 6 mo SEO, technical + content, want local Pune leads, budget around 1.5–2L…”
      </p>
      <ul>
        {rows.map((r) => (
          <li className="outline-row" key={r}><Tick /><b>{r}</b><i>Drafted</i></li>
        ))}
      </ul>
    </div>
  );
}

export function TemplatesShot() {
  const tpl = ['SEO', 'Social Media', 'Performance', 'Branding', 'Web Design', 'Content'];
  return (
    <div className="shot">
      <div className="shot__bar">Templates <span>6 services</span></div>
      <div className="tpl-grid">
        {tpl.map((t, i) => (
          <div className={`tpl${i === 0 ? ' tpl--active' : ''}`} key={t}>{t}</div>
        ))}
      </div>
      <div className="brief__meta">
        <span className="chip">Monthly retainer</span>
        <span className="chip">INR pricing</span>
        <span className="chip">GST @ 18%</span>
      </div>
    </div>
  );
}

export function BrandKitShot() {
  return (
    <div className="shot">
      <div className="shot__bar">Brand kit <span>Applied to 34 proposals</span></div>
      <ul>
        <li className="kit-row"><span>Logo</span><span className="logo-slot">KD</span></li>
        <li className="kit-row">
          <span>Colours</span>
          <span className="swatches">
            {['#1B3A2F', '#D9744A', '#E9E4D8', '#2B2B2B'].map((c) => (
              <span className="sw" style={{ background: c }} key={c} />
            ))}
          </span>
        </li>
        <li className="kit-row"><span>Headings</span><span style={{ fontWeight: 600 }}>Söhne Dreiviertel</span></li>
        <li className="kit-row"><span>Body</span><span>Söhne Buch</span></li>
        <li className="kit-row"><span>Cover</span><span>Full-bleed, logo top-left</span></li>
      </ul>
    </div>
  );
}

export function TrackingShot() {
  const activity = [
    ['Signed', 'Fri 10:48 am'],
    ['Forwarded to 1 person', 'Thu 7:02 pm'],
    ['Opened · 4 min 12 s', 'Thu 5:19 pm'],
    ['Opened · 1 min 40 s', 'Thu 4:14 pm'],
  ];
  const heat = [['Investment', 88, '2m 41s'], ['Scope of work', 54, '1m 36s'], ['Case studies', 22, '0m 38s']];
  return (
    <div className="shot">
      <div className="shot__bar">Meraki Interiors <span>Opened 3×</span></div>
      <ul className="activity">
        {activity.map(([label, when]) => (
          <li key={label}>
            <span className="state state--on"><span className="rail__dot" />{label}</span>
            <time>{when}</time>
          </li>
        ))}
      </ul>
      <div className="heat">
        {heat.map(([label, pct, time]) => (
          <div className="heat__row" key={label}>
            <span>{label}</span>
            <span className="heat__track"><span className="heat__fill" style={{ width: `${pct}%` }} /></span>
            <span>{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SignatureShot() {
  return (
    <div className="shot">
      <div className="shot__bar">Accept &amp; sign <span>iPhone · Safari</span></div>
      <div className="sign-card">
        <p className="sign-name">Aditi Kulkarni</p>
        <p className="sign-meta">Founder, Meraki Interiors · 19 Sep 2026, 10:48 am IST</p>
      </div>
      <span className="stamp"><span className="rail__dot" aria-hidden="true" />Stamped PDF sent to both parties</span>
    </div>
  );
}

export function WorkflowShot() {
  const rows = [
    ['Meraki Interiors — SEO', 'Signed', true],
    ['Hariyali Foods — Performance', 'Opened 3×', true],
    ['Bluecrest Realty — Branding', 'Sent', false],
    ['Anantam Resorts — Social', 'Draft', false],
  ];
  return (
    <div className="shot">
      <div className="shot__bar">All proposals <span>34 sent</span></div>
      <p className="search">🔍 “performance marketing”</p>
      <ul className="rows">
        {rows.map(([name, state, on]) => (
          <li key={name}>
            <b>{name}</b>
            <span className={`pill${on ? ' pill--on' : ''}`}>{state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

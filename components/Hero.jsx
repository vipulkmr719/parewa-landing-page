'use client';

import { useEffect, useRef, useState } from 'react';
import WaitlistButton from './WaitlistButton';

const BRIEF =
  'Meraki Interiors, Pune. Wants to rank for “interior designers in Pune” and cut down ' +
  'on paid leads. Six-month SEO retainer, technical fixes plus content. They mentioned ' +
  '₹1.5–2L a month.';

const RAIL = ['Sent', 'Opened 3×', 'Signed'];

export default function Hero() {
  // Rendered finished, so the markup is correct with no JavaScript at all.
  // The sequence below rewinds it and plays it forward.
  const [typed, setTyped] = useState(BRIEF);
  const [assembled, setAssembled] = useState(true);
  const [lit, setLit] = useState(RAIL.length);
  const [started, setStarted] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const after = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };

    // Marks the demo as script-driven, which is what reveals the brief text
    // (CSS keeps it hidden until then, so the finished text never flashes
    // before the typing starts).
    setStarted(true);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setTyped('');
    setAssembled(false);
    setLit(0);

    let i = 0;
    const typeNext = () => {
      // Small bursts, so it reads as typing rather than a slow reveal.
      i += 2;
      setTyped(BRIEF.slice(0, i));
      if (i < BRIEF.length) {
        after(typeNext, 18);
      } else {
        after(() => {
          setAssembled(true);
          after(() => {
            RAIL.forEach((_, n) => after(() => setLit(n + 1), n * 420));
          }, 900);
        }, 260);
      }
    };
    after(typeNext, 450);

    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  return (
    <section className="section hero">
      <div className="wrap">
        <p className="eyebrow">Now in early access for Indian digital agencies</p>

        <h1>Send the proposal in 15&nbsp;minutes. Not next Tuesday.</h1>

        <p className="lead">
          Parewa turns a short client brief into a professional, on-brand proposal — written by
          AI, designed to your agency’s identity,{' '}
          <span className="grain">tracked from the moment your client opens it</span>, and signed
          online. Built specifically for digital marketing agencies in India.
        </p>

        <div className="cta-row">
          <WaitlistButton>Join the Waitlist</WaitlistButton>
          <a className="btn btn--link" href="#how">See how it works</a>
        </div>

        <p className="microcopy">
          Free to join. No card required. Waitlist members get 40% off for their first year.
        </p>

        {/* The product doing its one trick: brief in, proposal out, status back. */}
        <div
          className={`demo${assembled ? ' is-assembled' : ''}`}
          id="demo"
          data-anim={String(started)}
        >
          <div className="demo__panes">
            <div className="demo__pane demo__pane--brief">
              <p className="demo__label">Client brief</p>
              <div className="brief__inner">
                <p id="briefText" className={`brief__body${typed === BRIEF ? ' is-typed' : ''}`}>
                  {typed}
                  <span className="brief__caret" aria-hidden="true" />
                </p>
                <div className="brief__meta">
                  <span className="chip">Service: SEO</span>
                  <span className="chip">₹1.5–2L / month</span>
                  <span className="chip">6 months</span>
                </div>
                <p className="brief__action" aria-hidden="true">
                  <span className="brief__btn">Draft proposal</span>
                  <span className="brief__done">Drafted in 12s</span>
                </p>
              </div>
            </div>

            <div className="demo__pane">
              <p className="demo__label">Proposal</p>
              <div className="doc assemble">
                <div className="doc__brandbar">
                  <span className="doc__logo" aria-hidden="true">K</span>
                  <span className="doc__agency">Kanvas Digital</span>
                  <span className="doc__date">15 Sep 2026</span>
                </div>
                <div>
                  <p className="doc__title">SEO Retainer — Meraki Interiors</p>
                  <p className="doc__sub">Prepared for Aditi Kulkarni, Founder</p>
                </div>
                <div className="doc__section">
                  <p className="doc__h">Objectives</p>
                  <div className="doc__line doc__line--mid" />
                  <div className="doc__line doc__line--short" />
                </div>
                <div className="doc__section">
                  <p className="doc__h">Scope of work</p>
                  <ul className="doc__bullets">
                    <li>Technical audit &amp; Core Web Vitals fixes</li>
                    <li>Local SEO for Pune &amp; PCMC clusters</li>
                    <li>8 content pieces / month</li>
                  </ul>
                </div>
                <div className="doc__section">
                  <p className="doc__h">Investment</p>
                  <table className="doc__table">
                    <thead>
                      <tr><th scope="col">Line item</th><th scope="col">Monthly</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>SEO retainer</td><td>₹1,65,000</td></tr>
                      <tr><td>Content production</td><td>₹35,000</td></tr>
                      <tr><td className="doc__gst">GST @ 18%</td><td className="doc__gst">₹36,000</td></tr>
                      <tr><td>Total</td><td>₹2,36,000</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="doc__sign">
                  <span>Signature</span><span className="doc__signline" /><span>Date</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rail" id="rail" aria-live="polite">
            {RAIL.map((label, n) => (
              <span key={label} style={{ display: 'contents' }}>
                {n > 0 && <span className="rail__arrow" aria-hidden="true">&rarr;</span>}
                <span className="rail__step" data-live={String(n < lit)}>
                  <span className="rail__dot" />
                  {label}
                </span>
              </span>
            ))}
            <span className="rail__note">
              Delivered Thursday 4:12&nbsp;pm · signed Friday 10:48&nbsp;am
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

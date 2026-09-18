'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * TODO before launch: COUNT must be the real number of agencies on the
 * waitlist, and the three partner names must be agencies that have agreed in
 * writing to be named here. This is social proof — it has to be true.
 */
const COUNT = 142;
const PARTNERS = ['Kanvas Digital', 'Thirdeye Media', 'Studio Nemara'];

export default function TrustStrip() {
  // Rendered at the real figure so it is correct with no JavaScript, and
  // correct for anyone who never scrolls it into view.
  const [shown, setShown] = useState(COUNT);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();

        const from = Math.max(0, COUNT - 24);
        const start = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - start) / 900);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(from + (COUNT - from) * eased));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="trust">
      <div className="wrap trust__inner">
        <span className="trust__count">
          <span className="rail__dot" aria-hidden="true" />
          <b id="waitlistCount" ref={ref} data-count={COUNT}>{shown}</b> agencies on the waitlist
        </span>
        <span>Design partners shaping the first release</span>
        <span className="trust__partners">
          {PARTNERS.map((name) => (
            <span className="partner" key={name}>{name}</span>
          ))}
        </span>
      </div>
    </div>
  );
}

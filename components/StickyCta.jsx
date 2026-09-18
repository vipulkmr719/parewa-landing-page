'use client';

import { useEffect, useState } from 'react';
import WaitlistButton from './WaitlistButton';

/** Mobile only, and only once the hero demo has scrolled by. */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const demo = document.getElementById('demo');
    if (!demo || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => setShow(!entries[0].isIntersecting),
      { rootMargin: '-40% 0px 0px 0px' }
    );
    io.observe(demo);
    return () => io.disconnect();
  }, []);

  return (
    <div className="sticky-cta" id="stickyCta" data-show={String(show)}>
      <WaitlistButton className="btn btn--primary btn--full">Join the Waitlist</WaitlistButton>
    </div>
  );
}

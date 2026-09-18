'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import WaitlistButton from './WaitlistButton';

export default function SiteHeader({ homeHref = '/' }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const update = () => setStuck(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className="site-header" id="siteHeader" data-stuck={String(stuck)}>
      <div className="wrap site-header__inner">
        <a className="brand" href={homeHref}>
          <Logo gradientId="ir-header" />
          <span className="brand__name">Parewa</span>
          <span className="brand__tagline">Proposals that come back with an answer.</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href={`${homeHref}#features`}>Features</a>
          <a href={`${homeHref}#how`}>How it works</a>
          <a href={`${homeHref}#pricing`}>Pricing</a>
          <a href={`${homeHref}#faq`}>FAQ</a>
          <WaitlistButton>Join the Waitlist</WaitlistButton>
        </nav>
      </div>
    </header>
  );
}

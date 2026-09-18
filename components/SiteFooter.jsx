import Logo from './Logo';
import WaitlistButton from './WaitlistButton';

export default function SiteFooter({ minimal = false }) {
  if (minimal) {
    return (
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer__base">
            {/* TODO before launch: replace [City] with the registered office city. */}
            <span><a href="mailto:hello@parewa.com">hello@parewa.com</a> · [City], India</span>
            <span>© 2026 Parewa. All rights reserved.</span>
            <span><a href="/">Home</a> · <a href="/privacy">Privacy</a></span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <a className="brand" href="/">
              <Logo gradientId="ir-footer" />
              <span className="brand__name">Parewa</span>
            </a>
            <p className="tagline">Proposals that come back with an answer.</p>
            <p>AI proposal software for Indian digital agencies.</p>
          </div>

          <div>
            <h3>Product</h3>
            <nav aria-label="Product"><ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#features">Templates</a></li>
              <li><WaitlistButton className="btn--bare">Waitlist</WaitlistButton></li>
            </ul></nav>
          </div>

          <div>
            <h3>Company</h3>
            <nav aria-label="Company"><ul>
              <li><a href="/about">About</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="mailto:hello@parewa.com">Contact</a></li>
            </ul></nav>
          </div>

          <div>
            <h3>Legal</h3>
            <nav aria-label="Legal"><ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/refunds">Refund Policy</a></li>
            </ul></nav>
          </div>
        </div>

        {/* TODO before launch: replace [City] with the registered office city. */}
        <div className="footer__base">
          <span><a href="mailto:hello@parewa.com">hello@parewa.com</a> · [City], India</span>
          <span>© 2026 Parewa. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

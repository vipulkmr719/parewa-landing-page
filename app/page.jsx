import WaitlistProvider from '../components/WaitlistProvider';
import SiteHeader from '../components/SiteHeader';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Problem from '../components/Problem';
import Benefits from '../components/Benefits';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Faq from '../components/Faq';
import FinalCta from '../components/FinalCta';
import SiteFooter from '../components/SiteFooter';
import StickyCta from '../components/StickyCta';

export default function Home() {
  return (
    <WaitlistProvider>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Problem />
        <Benefits />
        <Features />
        <HowItWorks />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyCta />
    </WaitlistProvider>
  );
}

'use client';

import { useState } from 'react';
import WaitlistButton from './WaitlistButton';

const Tick = () => <span className="tick" aria-hidden="true">✓</span>;

const PLANS = [
  {
    name: 'Starter',
    price: { monthly: '₹999', annual: '₹9,999' },
    alt: {
      monthly: 'or ₹9,999/year (two months free)',
      annual: '₹833/month, billed annually',
    },
    who: 'For small teams sending a handful of proposals a month.',
    features: [
      '3 user seats', '15 proposals per month', 'All service templates',
      'AI brief-to-proposal writing', 'Brand kit: logo, colours, fonts',
      'Open and view tracking', 'Unlimited e-signatures', 'Email support',
    ],
    cta: { label: 'Join the Waitlist', className: 'btn btn--ghost btn--full' },
  },
  {
    name: 'Pro',
    marker: 'Most agencies pick this one',
    price: { monthly: '₹2,499', annual: '₹24,999' },
    alt: {
      monthly: 'or ₹24,999/year (two months free)',
      annual: '₹2,083/month, billed annually',
    },
    who: 'For agencies with a full sales motion and multiple account managers.',
    intro: 'Everything in Starter, plus:',
    features: [
      '10 user seats', 'Unlimited proposals',
      'Custom templates and reusable content blocks',
      'Section-level analytics — see exactly what they read',
      'Your own domain on proposal links, Parewa branding removed',
      'Approval workflow before an AM can send',
      'Collect the advance on acceptance via Razorpay',
      'CRM and Zapier integrations', 'Priority support on WhatsApp',
    ],
    cta: { label: 'Get Early Access', className: 'btn btn--primary btn--full' },
  },
  {
    // TODO before launch: the price being on request is deliberate, but these
    // four inclusions are a placeholder — confirm what Lifetime actually covers.
    name: 'Lifetime',
    priceText: 'On request',
    altText: 'One-time payment. No renewals.',
    who: 'For agencies that would rather own it outright than carry another monthly line item.',
    intro: 'Everything in Pro, plus:',
    features: [
      'Paid once — no renewals, no price rises',
      'Every future update included',
      'Onboarding and template migration done for you',
      'A direct line to the team',
    ],
    contact: true,
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');

  return (
    <section className="section section--sunk" id="pricing">
      <div className="wrap">
        <div className="section__intro">
          <h2 className="section__head">Pricing built for Indian agencies</h2>
          <p className="lead">
            Less than what one round of proposal formatting costs you in team hours. Every plan
            includes everything you need to send, track and sign.
          </p>
        </div>

        <div className="toggle" role="group" aria-label="Billing period" aria-describedby="toggleScope">
          <button
            type="button"
            data-billing="monthly"
            aria-pressed={billing === 'monthly'}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            data-billing="annual"
            aria-pressed={billing === 'annual'}
            onClick={() => setBilling('annual')}
          >
            Annual <span className="save">· 2 months free</span>
          </button>
        </div>
        <p id="toggleScope" className="visually-hidden">
          Applies to the Starter and Pro plans. Lifetime is a one-time payment.
        </p>

        <div className="plans">
          {PLANS.map((plan) => (
            <div className={`plan${plan.marker ? ' plan--pro' : ''}`} key={plan.name}>
              {plan.marker && <span className="plan__marker">{plan.marker}</span>}
              <p className="plan__name">{plan.name}</p>

              {plan.priceText ? (
                <p className="plan__price plan__price--text">{plan.priceText}</p>
              ) : (
                <p className="plan__price">
                  <span>{plan.price[billing]}</span>
                  <span className="per">{billing === 'monthly' ? '/month' : '/year'}</span>
                </p>
              )}

              <p className="plan__alt">{plan.altText || plan.alt[billing]}</p>
              <p className="plan__who">{plan.who}</p>
              <div className="plan__body">
                {plan.intro && <p className="plan__intro">{plan.intro}</p>}

                <ul className="plan__features">
                  {plan.features.map((f) => (
                    <li key={f}><Tick />{f}</li>
                  ))}
                </ul>
              </div>

              {plan.contact ? (
                <a
                  className="btn btn--ghost btn--full"
                  href="mailto:hello@parewa.com?subject=Parewa%20Lifetime%20%E2%80%94%20pricing"
                >
                  Contact us
                </a>
              ) : (
                <WaitlistButton className={plan.cta.className}>{plan.cta.label}</WaitlistButton>
              )}
            </div>
          ))}
        </div>

        <p className="pricing__foot">
          Extra seats at ₹249/user/month on Starter and Pro. All prices exclusive of GST. Annual
          plans can be paid by UPI, card or NEFT.
        </p>

        <div className="offer">
          <h3>Waitlist members get 40% off the first year</h3>
          <div className="offer__side">
            <p>
              Join before launch and your discount locks in at signup — plus free onboarding, and
              we’ll rebuild your three best-performing proposals as Parewa templates at no cost.
              Limited to the first 500 agencies.
            </p>
            <WaitlistButton>Secure Your Spot</WaitlistButton>
          </div>
        </div>
      </div>
    </section>
  );
}

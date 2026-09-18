'use client';

import { useRef, useState } from 'react';

/*
 * Signups go to our own /api/waitlist, which forwards to the Google Sheet.
 * Same-origin on purpose: nothing that can write to the sheet ships in this
 * bundle, and the visitor's browser still contacts nobody but us.
 */
const FORM_ENDPOINT = '/api/waitlist';
const CONTACT_EMAIL = 'hello@parewa.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUGGESTION_MAX = 1000;

export default function WaitlistForm({ idPrefix, note }) {
  const [status, setStatus] = useState({ state: null, message: '' });
  const [busy, setBusy] = useState(false);
  const formRef = useRef(null);

  // Honest: it does not claim to have saved anything, and the signup still
  // reaches us. Used when the endpoint is absent or unconfigured.
  const mailtoFallback = (data) => {
    const subject = encodeURIComponent(`Waitlist: ${data.agency}`);
    const body = encodeURIComponent(
      `Agency: ${data.agency}\nEmail: ${data.email}\nProposals per month: ${data.volume}\n` +
        (data.suggestion ? `\nWhat we'd want built first:\n${data.suggestion}\n` : '') +
        '\nPlease add us to the Parewa waitlist.'
    );
    setStatus({ state: 'ok', message: 'Opening your email app — send that message and you’re on the list.' });
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      email: (form.elements.email.value || '').trim(),
      agency: (form.elements.agency.value || '').trim(),
      volume: form.elements.volume ? form.elements.volume.value : '',
      suggestion: form.elements.suggestion
        ? (form.elements.suggestion.value || '').trim().slice(0, SUGGESTION_MAX)
        : '',
      // Honeypot. Hidden from people, irresistible to bots.
      website: form.elements.website ? form.elements.website.value : '',
    };

    if (!EMAIL_RE.test(data.email)) {
      setStatus({ state: 'error', message: 'That email address doesn’t look right — mind checking it?' });
      form.elements.email.focus();
      return;
    }
    if (!data.agency) {
      setStatus({ state: 'error', message: 'Which agency are you with?' });
      form.elements.agency.focus();
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });

      // 503 means the endpoint exists but is not configured yet — fall back
      // rather than telling someone their signup failed.
      if (res.status === 503) {
        mailtoFallback(data);
        return;
      }

      if (!res.ok) {
        let message = `Something went wrong on our end. Email ${CONTACT_EMAIL} and we’ll add you by hand.`;
        if (res.status === 400) {
          const body = await res.json().catch(() => ({}));
          if (body.error) message = body.error;
        }
        setStatus({ state: 'error', message });
        return;
      }

      form.reset();
      setStatus({ state: 'ok', message: 'You’re on the list. We’ll email you the moment your access opens.' });
    } catch {
      setStatus({
        state: 'error',
        message: `Something went wrong on our end. Email ${CONTACT_EMAIL} and we’ll add you by hand.`,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form" ref={formRef} onSubmit={handleSubmit} data-waitlist-form noValidate>
      <div className="field">
        <label htmlFor={`${idPrefix}-email`}>Work email</label>
        <input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" required placeholder="you@youragency.com" />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-agency`}>Agency name</label>
        <input id={`${idPrefix}-agency`} name="agency" type="text" autoComplete="organization" required placeholder="Kanvas Digital" />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-volume`}>Proposals sent per month</label>
        <select id={`${idPrefix}-volume`} name="volume" defaultValue="6–15">
          <option>1–5</option>
          <option>6–15</option>
          <option>16–30</option>
          <option>30+</option>
        </select>
      </div>

      {/* Optional, and last, so it never stands between anyone and the button.
          The waitlist promise is "a say in what we build next" — this is where
          that say actually arrives. */}
      <div className="field">
        <label htmlFor={`${idPrefix}-suggestion`}>
          your suggestions <span className="field__optional">optional</span>
        </label>
        <textarea
          id={`${idPrefix}-suggestion`}
          name="suggestion"
          rows={3}
          maxLength={SUGGESTION_MAX}
          placeholder="The one thing that would save you the most time"
        />
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website (leave this blank)</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="btn btn--primary btn--full" type="submit" disabled={busy}>
        {busy ? 'Joining…' : 'Join the Waitlist'}
      </button>

      <p className="form__status" role="status" data-form-status data-state={status.state || undefined}>
        {status.message}
      </p>
      {note}
    </form>
  );
}

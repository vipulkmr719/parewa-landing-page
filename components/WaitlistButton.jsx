'use client';

import { useWaitlist } from './WaitlistProvider';

/** Any CTA that should open the waitlist dialog. */
export default function WaitlistButton({ className = 'btn btn--primary', children }) {
  const { open } = useWaitlist();
  return (
    <button type="button" className={className} data-open-waitlist onClick={open}>
      {children}
    </button>
  );
}

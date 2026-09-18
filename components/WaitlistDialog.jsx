'use client';

import { useEffect, useRef } from 'react';
import WaitlistForm from './WaitlistForm';

export default function WaitlistDialog({ isOpen, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      dialog.querySelector('input')?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Escape closes the dialog natively, which fires 'close' without going
  // through onClose — so listen for it and keep React's state in step.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => { if (isOpen) onClose(); };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={ref}
      id="waitlistDialog"
      aria-labelledby="waitlistTitle"
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      <div className="dialog__inner">
        <button className="dialog__close" type="button" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 id="waitlistTitle">Join the waitlist</h2>
        <p>Early access, 40% off your first year, and a say in what we build next.</p>
        <WaitlistForm
          idPrefix="d"
          note={<p className="form__note">Free to join. No card required.</p>}
        />
      </div>
    </dialog>
  );
}

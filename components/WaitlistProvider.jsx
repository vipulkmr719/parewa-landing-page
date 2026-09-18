'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import WaitlistDialog from './WaitlistDialog';

const WaitlistContext = createContext(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error('useWaitlist must be used inside <WaitlistProvider>');
  return ctx;
}

/**
 * One dialog for the whole page. Several CTAs open it, so the open state lives
 * here rather than in any one of them. The element that opened it is kept so
 * focus can go back there on close.
 */
export default function WaitlistProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const opener = useRef(null);

  const open = useCallback(() => {
    opener.current = document.activeElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (opener.current && typeof opener.current.focus === 'function') opener.current.focus();
  }, []);

  return (
    <WaitlistContext.Provider value={{ open, close }}>
      {children}
      <WaitlistDialog isOpen={isOpen} onClose={close} />
    </WaitlistContext.Provider>
  );
}

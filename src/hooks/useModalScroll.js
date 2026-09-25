// src/hooks/useModalScroll.js
// Custom hook to handle locking body scroll and bypassing global smooth scroll (Lenis) for modals and popups
import { useEffect } from 'react';

export function useModalScroll(isOpen) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);
}

export default useModalScroll;

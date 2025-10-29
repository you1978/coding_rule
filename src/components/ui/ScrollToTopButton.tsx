'use client';

import { ArrowUp } from 'lucide-react';
import './scroll-to-top.scss';

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="u-btn u-btn--scroll-top fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full p-0 opacity-100 hover:opacity-90 transition-opacity duration-200"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

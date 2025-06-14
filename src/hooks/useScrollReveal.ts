'use client';
import { useEffect } from 'react';
export function useScrollReveal(selector = '.boxanimation', threshold = 0.2) {
  useEffect(() => {
    const boxes = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('show');
          } else {
            el.classList.remove('show');
          }
        });
      },
      { threshold }
    );
    boxes.forEach((box) => observer.observe(box));
    return () => boxes.forEach((box) => observer.unobserve(box));
  }, [selector, threshold]);
}

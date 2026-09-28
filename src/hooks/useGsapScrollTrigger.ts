import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Foundation Hook for registering GSAP ScrollTrigger animations safely.
 * Will be utilized in future phases to implement scroll-driven timelines.
 */
export const useGsapScrollTrigger = (
  effect: () => void | (() => void),
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      effect();
    });

    return () => {
      ctx.revert(); // Clean up GSAP context & ScrollTriggers on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

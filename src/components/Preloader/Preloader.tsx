import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from '../../providers/LenisProvider';
import chennaiCentralLogo from '../../assets/images/chennai-central-logo.svg';
import './Preloader.css';

export const Preloader: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoWrapperRef = useRef<HTMLDivElement | null>(null);
  const logoImageRef = useRef<HTMLImageElement | null>(null);

  const { stopScroll, startScroll } = useLenis();

  useLayoutEffect(() => {
    // 1. Lock document scrolling immediately
    stopScroll();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (logoImageRef.current) {
        gsap.set(logoImageRef.current, { opacity: 1, scale: 1, clipPath: 'circle(100% at 50% 50%)' });
      }

      const timeout = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              startScroll();
              setIsComplete(true);
            },
          });
        }
      }, 500);

      return () => clearTimeout(timeout);
    }

    // Initial hidden state for exact logo image
    if (logoImageRef.current) {
      gsap.set(logoImageRef.current, {
        opacity: 0,
        scale: 0.94,
        clipPath: 'circle(0% at 50% 50%)',
      });
    }

    // Master Timeline using exact SVG asset (~2.7s total)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit Animation: Fade out & subtle scale down
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.97,
            duration: 0.45,
            ease: 'power2.inOut',
            onComplete: () => {
              startScroll();
              setIsComplete(true);
            },
          });
        },
      });

      // Phase 1: Unmask & reveal exact SVG logo from center outward (0.15s -> 2.2s)
      if (logoImageRef.current) {
        tl.to(
          logoImageRef.current,
          {
            opacity: 1,
            scale: 1,
            clipPath: 'circle(85% at 50% 50%)',
            duration: 2.1,
            ease: 'power2.out',
          },
          0.15
        );
      }

      // Phase 2: Hold complete exact SVG logo (2.25s -> 2.65s)
      tl.to({}, { duration: 0.4 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [stopScroll, startScroll]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="preloader-overlay"
      aria-label="Chennai Central Loading Presentation"
      role="dialog"
      aria-modal="true"
    >
      <div className="preloader-content-wrapper">
        <div ref={logoWrapperRef} className="preloader-logo-container">
          <img
            ref={logoImageRef}
            src={chennaiCentralLogo}
            alt="Chennai Central Emblem"
            className="preloader-logo-image"
          />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroDesktopImg from '../assets/images/hero/hero-desktop.webp';
import heroMobileImg from '../assets/images/hero/hero-mobile.webp';
import { ORDER_ONLINE_CONFIG } from '../data/navigation';
import './Hero.css';

/**
 * Responsive Media Stage Component.
 * Uses semantic <picture> element to serve hero-mobile.webp for portrait viewports
 * and hero-desktop.webp for landscape/desktop viewports.
 */
export const MediaStage: React.FC = () => {
  return (
    <div className="hero-media-wrapper">
      <picture className="hero-media-picture">
        <source media="(orientation: portrait)" srcSet={heroMobileImg} />
        <source media="(max-width: 640px)" srcSet={heroMobileImg} />
        <img
          src={heroDesktopImg}
          alt="Chennai Central South Indian restaurant in Warrenville, Illinois"
          className="hero-media-element"
          loading="eager"
          decoding="async"
          width="1920"
          height="1080"
        />
      </picture>
    </div>
  );
};

const REVEAL_WORDS = [
  '“Authentic',
  'South',
  'Indian',
  'cuisine,',
  'crafted',
  'with',
  'tradition',
  'and',
  'the',
  'warmth',
  'of',
  'home,',
  'brought',
  'to',
  'Warrenville,',
  'Illinois.”',
];



export const Hero: React.FC = () => {
  const runwayRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mediaFrameRef = useRef<HTMLDivElement | null>(null);

  // Reveal Text Refs
  const revealTextRef = useRef<HTMLParagraphElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Title Line Ref
  const titleLineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && runwayRef.current && stageRef.current && mediaFrameRef.current) {
      const ctx = gsap.context(() => {
        const isMobile = window.innerWidth <= 640;

        // Synchronized GSAP ScrollTrigger timeline matching existing pinned scroll geometry
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: runwayRef.current,
            start: 'top top',
            end: '+=160%',
            pin: stageRef.current,
            pinSpacing: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        // 1. Full 2D Media Frame Expansion (0 -> 0.70 progress):
        tl.fromTo(
          mediaFrameRef.current,
          {
            width: isMobile ? '86vw' : '76vw',
            height: isMobile ? '50vh' : '55vh',
            maxWidth: isMobile ? '100vw' : '1080px',
            borderRadius: isMobile ? '20px' : '28px',
            boxShadow: '0 24px 60px rgba(34, 27, 24, 0.18)',
          },
          {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            borderRadius: '0px',
            boxShadow: 'none',
            ease: 'power1.inOut',
            duration: 0.7,
          },
          0
        );

        // 2. Continuous Scroll-Driven Word Reveal (0.15 -> 0.65 progress)
        const validWords = wordRefs.current.filter(Boolean);
        if (validWords.length > 0) {
          tl.fromTo(
            validWords,
            { opacity: 0.25 },
            {
              opacity: 1,
              stagger: 0.025,
              duration: 0.35,
              ease: 'power1.out',
            },
            0.15
          );
        }

        // 3. Fullscreen Hold Phase (0.65 -> 1.00 progress) - Supporting sentence remains fully visible
        tl.to({}, { duration: 0.35 });
      }, runwayRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={runwayRef} className="hero-runway" id="hero" aria-label="Chennai Central Hero">
      <div ref={stageRef} className="hero-sticky-stage">
        {/* Expanding Media Frame */}
        <div ref={mediaFrameRef} className="hero-media-frame">
          <MediaStage />

          {/* Independent Centered Scroll-Reveal Stage (Supporting Sentence remains visible) */}
          <div className="hero-reveal-stage">
            <p
              ref={revealTextRef}
              className="hero-reveal-text"
              aria-label="Authentic South Indian cuisine, crafted with tradition and the warmth of home, brought to Warrenville, Illinois."
            >
              {REVEAL_WORDS.map((word, index) => (
                <span
                  key={index}
                  ref={(el) => (wordRefs.current[index] = el)}
                  className="hero-reveal-word"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* Integrated Editorial Text & CTA Overlay */}
          <div className="hero-media-overlay">
            <div className="hero-editorial-stage">
              {/* Preserved Semantic H1 Structure */}
              <div className="hero-title-stage">
                <h1 className="hero-title hero-title-hidden">
                  <span ref={titleLineRef} className="hero-title-line">
                    Chennai Central Warrenville | South Indian Restaurant
                  </span>
                </h1>
              </div>
            </div>

            {/* Stable Lower CTAs */}
            <div className="hero-cta-group">
              <a
                href="#order"
                onClick={(e) => {
                  e.preventDefault();
                  alert(ORDER_ONLINE_CONFIG.urlPlaceholder);
                }}
                className="hero-cta-primary"
              >
                ORDER ONLINE &rarr;
              </a>
              <a href="/menu" className="hero-cta-secondary">
                EXPLORE MENU
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



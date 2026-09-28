import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SIGNATURE_DISHES } from '../../data/signatureDishes';
import { ORDER_ONLINE_CONFIG } from '../../data/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './SignatureDishes.css';

export const SignatureDishes: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Touch / Mouse drag state tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && sectionRef.current) {
      const ctx = gsap.context(() => {
        const revealItems = sectionRef.current?.querySelectorAll('.signature-reveal-item');
        revealItems?.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0.15, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                end: 'top 55%',
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SIGNATURE_DISHES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length);
  };

  // Touch Gesture Handling with Axis Locking
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      touchEndX.current === null ||
      touchEndY.current === null
    ) {
      return;
    }

    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 35;

    // Axis lock: only navigate if horizontal movement dominates vertical movement
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= minSwipeDistance) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  // Mouse Drag Handling
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
    touchEndY.current = e.clientY;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    if (
      touchStartX.current !== null &&
      touchStartY.current !== null &&
      touchEndX.current !== null &&
      touchEndY.current !== null
    ) {
      const deltaX = touchStartX.current - touchEndX.current;
      const deltaY = touchStartY.current - touchEndY.current;
      const minDragDistance = 35;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= minDragDistance) {
        if (deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    isDragging.current = false;
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const activeDish = SIGNATURE_DISHES[activeIndex];

  return (
    <section ref={sectionRef} className="signature-section" id="signature" aria-label="Signature Dishes">
      <div className="signature-container">
        
        {/* Section Header with Scroll Reveal */}
        <header className="signature-header signature-reveal-item">
          <span className="signature-eyebrow">OUR SIGNATURE</span>
          <h2 className="signature-title">Signature Dishes</h2>
        </header>

        {/* Spatial Arc Focus Carousel Stage */}
        <div
          className="signature-carousel-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          role="region"
          aria-label="Arc Focus Carousel of Signature Dishes"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
          }}
        >
          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="carousel-arrow-btn prev-btn"
            aria-label="Previous signature dish"
            type="button"
          >
            <ChevronLeft className="arrow-icon" />
          </button>

          <button
            onClick={handleNext}
            className="carousel-arrow-btn next-btn"
            aria-label="Next signature dish"
            type="button"
          >
            <ChevronRight className="arrow-icon" />
          </button>

          {/* Arced Cards Spatial Track */}
          <div className="arced-cards-track">
            {SIGNATURE_DISHES.map((dish, index) => {
              const total = SIGNATURE_DISHES.length;
              let offset = index - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCurrent = offset === 0;

              return (
                <div
                  key={dish.id}
                  onClick={() => setActiveIndex(index)}
                  className={`arced-card ${isCurrent ? 'is-active' : ''}`}
                  style={
                    {
                      '--offset': offset,
                      '--abs-offset': Math.abs(offset),
                    } as React.CSSProperties
                  }
                  role="button"
                  tabIndex={isCurrent ? 0 : -1}
                  aria-label={`Select ${dish.name}`}
                  aria-current={isCurrent ? 'true' : 'false'}
                >
                  <div className="dish-media-card">
                    <img
                      src={dish.image}
                      alt={dish.alt}
                      className="dish-media-element"
                      loading={isCurrent || index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      width="600"
                      height="600"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal Editorial Slide Counter & Progress Bar (01 / 08) */}
        <div
          className="signature-slide-indicator"
          aria-label={`Dish ${activeIndex + 1} of ${SIGNATURE_DISHES.length}`}
        >
          <span className="signature-counter-text">
            {String(activeIndex + 1).padStart(2, '0')} / {String(SIGNATURE_DISHES.length).padStart(2, '0')}
          </span>
          <div className="signature-progress-track">
            <div
              className="signature-progress-bar"
              style={{ width: `${((activeIndex + 1) / SIGNATURE_DISHES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Active Dish Detail Card with Scroll Reveal & Stable Height */}
        <div className="active-dish-info signature-reveal-item" key={activeDish.id}>
          <h3 className="active-dish-name">{activeDish.name}</h3>
          <p className="active-dish-description">{activeDish.description}</p>
        </div>

        {/* CTAs Row */}
        <div className="signature-cta-row">
          <a
            href="#order"
            onClick={(e) => {
              e.preventDefault();
              alert(ORDER_ONLINE_CONFIG.urlPlaceholder);
            }}
            className="signature-cta-primary"
          >
            ORDER ONLINE &rarr;
          </a>
          <a href="/menu" className="signature-cta-secondary">
            EXPLORE MENU
          </a>
        </div>

      </div>
    </section>
  );
};

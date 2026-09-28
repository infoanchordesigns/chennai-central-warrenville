import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { ORDER_ONLINE_CONFIG } from '../data/navigation';
import { useLenis } from '../providers/LenisProvider';
import './Gallery.css';

export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { stopScroll, startScroll } = useLenis();

  // Handle opening Lightbox
  const openLightbox = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      stopScroll();
      document.body.style.overflow = 'hidden';
    },
    [stopScroll]
  );

  // Handle closing Lightbox
  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    startScroll();
    document.body.style.overflow = '';
  }, [startScroll]);

  // Navigate to Previous Image
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  }, []);

  // Navigate to Next Image
  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, handlePrev, handleNext]);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Header entrance animation
        const headerEl = sectionRef.current?.querySelector('.gallery-header');
        if (headerEl) {
          gsap.fromTo(
            headerEl,
            { opacity: 0.15, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerEl,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Masonry items staggered reveal
        const items = gridRef.current?.querySelectorAll('.gallery-masonry-item');
        if (items && items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0.15, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // CTA row reveal
        const ctaEl = sectionRef.current?.querySelector('.gallery-cta-row');
        if (ctaEl) {
          gsap.fromTo(
            ctaEl,
            { opacity: 0.15, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ctaEl,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const activeItem: GalleryItem | null = selectedIndex !== null ? GALLERY_ITEMS[selectedIndex] : null;

  return (
    <section className="gallery-section" id="gallery" ref={sectionRef} aria-label="Restaurant Editorial Gallery">
      <div className="container">
        {/* Section Header */}
        <div className="gallery-header">
          <span className="gallery-eyebrow">OUR TABLE</span>
          <h2 className="gallery-heading">Every plate has a story.</h2>
        </div>

        {/* Masonry Layout Grid */}
        <div className="gallery-masonry-wrapper">
          <div className="gallery-masonry-grid" ref={gridRef}>
            {GALLERY_ITEMS.map((item, index) => (
              <article
                key={item.id}
                className="gallery-masonry-item"
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`View ${item.title} in full screen`}
              >
                <div className="gallery-card-media" style={{ aspectRatio: item.displayAspect }}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="gallery-card-img"
                    loading="lazy"
                    decoding="async"
                    width="1600"
                    height="1200"
                  />
                  <div className="gallery-card-overlay">
                    <div className="gallery-card-info">
                      <h3 className="gallery-card-title">{item.title}</h3>
                      <span className="gallery-card-action">
                        View Image <Maximize2 aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Section CTA */}
        <div className="gallery-cta-row">
          <a href="/menu" className="gallery-cta-primary">
            EXPLORE MENU &rarr;
          </a>
          <a
            href="#order"
            onClick={(e) => {
              e.preventDefault();
              alert(ORDER_ONLINE_CONFIG.urlPlaceholder);
            }}
            className="gallery-cta-secondary"
          >
            ORDER ONLINE &rarr;
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && activeItem && (
        <div
          className="gallery-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery Lightbox - ${activeItem.title}`}
        >
          <div className="gallery-lightbox-container" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close Lightbox (Escape)"
            >
              <X size={22} />
            </button>

            {/* Navigation Buttons */}
            <button
              className="gallery-lightbox-btn gallery-lightbox-prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              className="gallery-lightbox-btn gallery-lightbox-next"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={26} />
            </button>

            {/* Main Stage */}
            <div className="gallery-lightbox-content">
              <div className="gallery-lightbox-image-wrapper">
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="gallery-lightbox-img"
                />
              </div>

              {/* Caption & Metadata Panel */}
              <div className="gallery-lightbox-details">
                <div className="gallery-lightbox-meta">
                  <span className="gallery-lightbox-counter">
                    {String(selectedIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="gallery-lightbox-title">{activeItem.title}</h3>
                <p className="gallery-lightbox-caption">{activeItem.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

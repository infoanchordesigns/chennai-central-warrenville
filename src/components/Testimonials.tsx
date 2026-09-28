import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, BadgeCheck, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA, Testimonial } from '../data/testimonialsData';
import './Testimonials.css';

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Section Header Reveal
        const header = sectionRef.current?.querySelector('.testimonials-header');
        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0.15, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Marquee Container Reveal
        const marquee = sectionRef.current?.querySelector('.testimonials-marquee-container');
        if (marquee) {
          gsap.fromTo(
            marquee,
            { opacity: 0.15, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: marquee,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  // Duplicate items to guarantee infinite seamless marquee loop
  const row1Items = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];
  const row2Items = [...[...TESTIMONIALS_DATA].reverse(), ...[...TESTIMONIALS_DATA].reverse()];

  const renderCard = (item: Testimonial, keyPrefix: string, index: number) => (
    <article className="testimonial-card" key={`${keyPrefix}-${item.id}-${index}`}>
      <div>
        {/* Card Header: Author Profile */}
        <div className="testimonial-card-header">
          <div className="testimonial-user-profile">
            <div
              className="testimonial-avatar"
              style={{ backgroundColor: item.avatarBg, color: item.avatarTextColor }}
              aria-hidden="true"
            >
              {item.initials}
            </div>
            <div className="testimonial-user-meta">
              <span className="testimonial-author-name">{item.name}</span>
              <span className="testimonial-author-handle">
                {item.handle} • {item.location}
              </span>
            </div>
          </div>
        </div>

        {/* 5-Star Rating Row */}
        <div className="testimonial-stars-row" aria-label={`Rating: ${item.rating} out of 5 stars`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} size={15} fill="#C9A24B" stroke="none" />
          ))}
        </div>

        {/* Review Content */}
        <p className="testimonial-text">“{item.text}”</p>
      </div>

      {/* Card Footer: Metadata */}
      <div className="testimonial-card-footer">
        <div className="testimonial-footer-meta">
          <BadgeCheck size={14} className="testimonial-verified-icon" aria-hidden="true" />
          <span>Google Review</span>
        </div>
        <Quote size={18} className="testimonial-quote-icon" aria-hidden="true" />
      </div>
    </article>
  );

  return (
    <section className="testimonials-section" id="testimonials" ref={sectionRef} aria-label="Guest Testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="testimonials-header">
          <span className="testimonials-eyebrow">WHAT OUR GUESTS SAY</span>
          <h2 className="testimonials-heading">Stories shared around our table.</h2>
        </div>
      </div>

      {/* Dual Marquee Container */}
      <div className="testimonials-marquee-container">
        {/* Row 1: Scrolling Left */}
        <div className="testimonials-track-wrapper">
          <div className="testimonials-track testimonials-track-left">
            {row1Items.map((item, i) => renderCard(item, 'row1', i))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="testimonials-track-wrapper">
          <div className="testimonials-track testimonials-track-right">
            {row2Items.map((item, i) => renderCard(item, 'row2', i))}
          </div>
        </div>
      </div>
    </section>
  );
};

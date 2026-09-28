import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ourStory1Img from '../assets/images/our-story/our-story-1.webp';
import ourStory2Img from '../assets/images/our-story/our-story-2.webp';
import './About.css';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Progressive Text Reveal animation driven by scroll progress
        const revealItems = sectionRef.current?.querySelectorAll('.about-reveal-item');
        revealItems?.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0.15, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                end: 'top 48%',
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // Image reveal animations (subtle opacity + scale mask reveal)
        const imageItems = sectionRef.current?.querySelectorAll('.about-image-item');
        imageItems?.forEach((img) => {
          gsap.fromTo(
            img,
            { opacity: 0.25, scale: 1.03 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 88%',
                end: 'top 45%',
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about" aria-label="Our Story">
      <div className="about-container">
        
        {/* 1. SECTION HEADER */}
        <header className="about-header about-reveal-item">
          <span className="about-eyebrow">THE STORY BEHIND THE TABLE</span>
          <h2 className="about-title">OUR STORY</h2>
        </header>

        {/* 2. MAIN STORY - LARGE EDITORIAL TEXT REVEAL */}
        <article className="about-story-block main-story about-reveal-item">
          <p className="story-large-text">
            Rooted in the flavors of South India, we bring the warmth and character of South Indian cuisine to Warrenville, Illinois, with food inspired by the flavors, traditions, and hospitality of South India.
          </p>
        </article>

        {/* 3. FIRST IMAGE MOMENT */}
        <figure className="about-image-wrapper about-image-item img-offset-left">
          <div className="about-visual-card">
            <img
              src={ourStory1Img}
              alt="Chennai Central restaurant interior"
              className="about-card-img"
              loading="eager"
              decoding="async"
              width="1600"
              height="1200"
            />
          </div>
          <figcaption className="about-image-caption">
            <span className="caption-label">FLAVORS ROOTED IN SOUTH INDIA</span>
          </figcaption>
        </figure>

        {/* 4. SECOND STORY - MENU & TRADITION TEXT REVEAL */}
        <article className="about-story-block second-story about-reveal-item story-align-right">
          <p className="story-medium-text">
            Our menu brings together comforting favorites and time-honored recipes — from fragrant biryani and crisp dosas to beloved South Indian classics — prepared with aromatic spices and ingredients chosen to let each dish speak for itself.
          </p>
        </article>

        {/* 5. SECOND IMAGE MOMENT */}
        <figure className="about-image-wrapper about-image-item img-offset-right">
          <div className="about-visual-card card-variant-two">
            <img
              src={ourStory2Img}
              alt="Chennai Central restaurant dining interior"
              className="about-card-img"
              loading="lazy"
              decoding="async"
              width="1600"
              height="1200"
            />
          </div>
          <figcaption className="about-image-caption">
            <span className="caption-label">MADE FOR THE TABLE</span>
          </figcaption>
        </figure>

        {/* 6. THIRD STORY - COMMUNITY & GATHERING TEXT REVEAL */}
        <article className="about-story-block third-story about-reveal-item story-align-left">
          <p className="story-medium-text">
            More than a place to eat, Chennai Central is a place to gather. Whether you're joining us for a family meal, meeting friends over dinner, or simply craving authentic Indian food in Warrenville, our table is made to feel familiar from the moment you arrive.
          </p>
        </article>

        {/* 7. CLOSING STATEMENT */}
        <footer className="about-closing-block about-reveal-item">
          <span className="closing-eyebrow">MADE FOR THE TABLE</span>
          <blockquote className="closing-quote">
            “Good food brings people together.<br />
            We simply make room for one more.”
          </blockquote>
        </footer>

      </div>
    </section>
  );
};

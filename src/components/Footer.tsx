import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Instagram, Facebook, ChevronDown } from 'lucide-react';
import {
  FOOTER_BRAND_INFO,
  FOOTER_LOCATIONS,
  FOOTER_NAV_LINKS,
  FOOTER_SOCIAL_CONFIG,
  FOOTER_HOURS_SUMMARY,
} from '../data/footerData';
import { ORDER_ONLINE_CONFIG } from '../data/navigation';
import logoSvg from '../assets/images/chennai-central-logo.svg';
import './Footer.css';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  // Accordion state for mobile (< 640px)
  const [activeAccordions, setActiveAccordions] = useState<Record<string, boolean>>({
    nav: false,
    locations: false,
    connect: false,
  });

  const toggleAccordion = (key: string) => {
    setActiveAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && footerRef.current) {
      const ctx = gsap.context(() => {
        const topBlock = footerRef.current?.querySelector('.footer-top-brand-block');
        if (topBlock) {
          gsap.fromTo(
            topBlock,
            { opacity: 0.15, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: topBlock,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }, footerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <footer className="footer-section" id="footer" ref={footerRef} aria-label="Chennai Central Footer">
      <div className="container">
        {/* TOP CENTERED BRAND ANCHOR BLOCK */}
        <div className="footer-top-brand-block">
          <img
            src={logoSvg}
            alt="Chennai Central Logo"
            className="footer-hero-logo"
            width="240"
            height="70"
          />
          <p className="footer-hero-brand-desc">{FOOTER_BRAND_INFO.description}</p>
          <span className="footer-hero-signoff">{FOOTER_BRAND_INFO.signOff}</span>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        {/* 3-COLUMN MAIN DESKTOP / MOBILE ACCORDION GRID */}
        <div className="footer-main-grid">
          {/* COLUMN 1: NAVIGATION */}
          <div className="footer-mobile-accordion-group">
            <button
              type="button"
              className="footer-col-header-button"
              onClick={() => toggleAccordion('nav')}
              aria-expanded={activeAccordions.nav}
              aria-label="Toggle Navigation menu"
            >
              <h3 className="footer-col-heading">NAVIGATION</h3>
              <ChevronDown
                size={18}
                className={`footer-accordion-arrow ${activeAccordions.nav ? 'is-open' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div className={`footer-accordion-body ${activeAccordions.nav ? 'is-open' : ''}`}>
              <div className="footer-accordion-content">
                <ul className="footer-nav-list">
                  {FOOTER_NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="footer-nav-item-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* COLUMN 2: OUR LOCATIONS */}
          <div className="footer-mobile-accordion-group">
            <button
              type="button"
              className="footer-col-header-button"
              onClick={() => toggleAccordion('locations')}
              aria-expanded={activeAccordions.locations}
              aria-label="Toggle Locations section"
            >
              <h3 className="footer-col-heading">OUR LOCATIONS</h3>
              <ChevronDown
                size={18}
                className={`footer-accordion-arrow ${activeAccordions.locations ? 'is-open' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div className={`footer-accordion-body ${activeAccordions.locations ? 'is-open' : ''}`}>
              <div className="footer-accordion-content">
                <div className="footer-locations-list">
                  {FOOTER_LOCATIONS.map((loc) => (
                    <div key={loc.id} className="footer-loc-item">
                      <h4 className="footer-loc-heading">{loc.name}</h4>
                      <p className="footer-loc-address-text">
                        {loc.addressLine1}
                        <br />
                        {loc.addressLine2}
                      </p>
                      <a
                        href={loc.phoneTel}
                        className="footer-loc-phone-link"
                        aria-label={`Call ${loc.name} at ${loc.phoneDisplay}`}
                      >
                        {loc.phoneDisplay}
                      </a>
                      <a
                        href={loc.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-loc-directions-link"
                        aria-label={`Get directions to ${loc.name} location on Google Maps`}
                      >
                        <span>GET DIRECTIONS</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: CONNECT WITH US & HOURS */}
          <div className="footer-mobile-accordion-group">
            <button
              type="button"
              className="footer-col-header-button"
              onClick={() => toggleAccordion('connect')}
              aria-expanded={activeAccordions.connect}
              aria-label="Toggle Connect and Hours section"
            >
              <h3 className="footer-col-heading">CONNECT WITH US</h3>
              <ChevronDown
                size={18}
                className={`footer-accordion-arrow ${activeAccordions.connect ? 'is-open' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div className={`footer-accordion-body ${activeAccordions.connect ? 'is-open' : ''}`}>
              <div className="footer-accordion-content">
                <div className="footer-connect-stack">
                  {/* Social Links */}
                  <div className="footer-social-list">
                    <a
                      href={FOOTER_SOCIAL_CONFIG.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-item"
                      aria-label="Chennai Central Instagram"
                    >
                      <div className="footer-social-icon-wrapper">
                        <Instagram size={16} />
                      </div>
                      <span>{FOOTER_SOCIAL_CONFIG.instagram.label}</span>
                    </a>
                    <a
                      href={FOOTER_SOCIAL_CONFIG.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-item"
                      aria-label="Chennai Central Facebook"
                    >
                      <div className="footer-social-icon-wrapper">
                        <Facebook size={16} />
                      </div>
                      <span>{FOOTER_SOCIAL_CONFIG.facebook.label}</span>
                    </a>
                  </div>

                  {/* Compact Hours Summary */}
                  <div className="footer-hours-block">
                    <span className="footer-col-heading" style={{ fontSize: '0.7rem', marginBottom: '0.35rem' }}>
                      HOURS
                    </span>
                    {FOOTER_HOURS_SUMMARY.map((item) => (
                      <div key={item.days} className="footer-hours-row">
                        <span className="footer-hours-days">{item.days}:</span>
                        <span className="footer-hours-time">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        {/* CTA ROW BELOW MAIN GRID */}
        <div className="footer-cta-bar">
          <a href="/menu" className="footer-compact-btn footer-btn-outline">
            <span>EXPLORE MENU</span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href="#order"
            onClick={(e) => {
              e.preventDefault();
              alert(ORDER_ONLINE_CONFIG.urlPlaceholder);
            }}
            className="footer-compact-btn footer-btn-gold"
          >
            <span>ORDER ONLINE</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* BOTTOM LEGAL ROW */}
        <div className="footer-bottom-row">
          <p className="footer-copyright-text">
            © 2026 Chennai Central. All rights reserved.
          </p>

          <nav className="footer-legal-nav" aria-label="Legal Navigation">
            <a href="/privacy-policy" className="footer-legal-link-item">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="/terms" className="footer-legal-link-item">
              Terms of Use
            </a>
            <span>·</span>
            <a href="/accessibility-statement" className="footer-legal-link-item">
              Accessibility
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, ArrowUpRight, Instagram, Facebook, Clock, ChevronDown } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VISIT_DATA } from '../data/visitData';
import { ORDER_ONLINE_CONFIG } from '../data/navigation';
import './Visit.css';

// Coordinates for 28331 Dodge Dr, Warrenville, IL 60555
const WARRENVILLE_LAT = 41.8116;
const WARRENVILLE_LNG = -88.1768;

export const Visit: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const [isMobileHoursExpanded, setIsMobileHoursExpanded] = useState(false);
  const currentDayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

  const todayItem =
    VISIT_DATA.hoursOfOperation.find((item) => item.dayIndex === currentDayIndex) ||
    VISIT_DATA.hoursOfOperation[0];

  // Leaflet Custom Muted Map Initialization
  useEffect(() => {
    if (!mapContainerRef.current || leafletMapRef.current) return;

    // Initialize Leaflet map instance centered at Warrenville, IL
    const map = L.map(mapContainerRef.current, {
      center: [WARRENVILLE_LAT, WARRENVILLE_LNG],
      zoom: 13.8,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    leafletMapRef.current = map;

    // Esri World Light Gray Base (Muted, free, public, zero API key required, no watermarks)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
      }
    ).addTo(map);

    // Esri World Light Gray Reference Labels
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
      }
    ).addTo(map);

    // Custom Dark Brown + Gold Location Marker (Matches Arlington reference pin)
    const customPinHtml = `
      <div class="custom-map-pin-container" aria-hidden="true">
        <div class="pin-halo-pulse"></div>
        <div class="pin-marker-head">
          <div class="pin-inner-gold-dot"></div>
        </div>
        <div class="pin-title-tag">CHENNAI CENTRAL</div>
      </div>
    `;

    const customIcon = L.divIcon({
      html: customPinHtml,
      className: 'custom-leaflet-marker',
      iconSize: [120, 54],
      iconAnchor: [60, 27],
    });

    L.marker([WARRENVILLE_LAT, WARRENVILLE_LNG], {
      icon: customIcon,
      interactive: false,
    }).addTo(map);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Heading Entrance
        const header = sectionRef.current?.querySelector('.visit-header');
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

        // Map Entrance
        const mapCard = sectionRef.current?.querySelector('.visit-map-card');
        if (mapCard) {
          gsap.fromTo(
            mapCard,
            { opacity: 0.15, y: 28, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: mapCard,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Stacked Info Cards Staggered Reveal
        const infoCards = sectionRef.current?.querySelectorAll('.visit-info-stack > *');
        if (infoCards && infoCards.length > 0) {
          gsap.fromTo(
            infoCards,
            { opacity: 0.15, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.visit-info-stack',
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

  return (
    <section className="visit-section" id="visit" ref={sectionRef} aria-label="Visit Us and Location Details">
      <div className="container">
        {/* Centered Section Header */}
        <div className="visit-header">
          <span className="visit-eyebrow">VISIT US</span>
          <h2 className="visit-heading">We’d Love to See You</h2>
          <p className="visit-supporting-text">
            Find us at our Warrenville location and step into a world of authentic South Indian flavors, warm hospitality, and unforgettable moments.
          </p>
        </div>

        {/* Two-Column Main Layout */}
        <div className="visit-grid">
          {/* LEFT COLUMN — MAP CARD */}
          <div className="visit-map-card">
            {/* Custom Leaflet Muted Map Canvas */}
            <div
              ref={mapContainerRef}
              className="visit-leaflet-container"
              aria-label="Interactive visual map of Chennai Central Warrenville location"
            />

            {/* Map Overlay Card (Top-Left) */}
            <div className="visit-map-overlay">
              <div className="visit-overlay-brand">{VISIT_DATA.restaurantName}</div>
              <span className="visit-overlay-sub">{VISIT_DATA.subtitle}</span>
              <p className="visit-overlay-address">
                {VISIT_DATA.addressLine1}
                <br />
                {VISIT_DATA.addressLine2}
              </p>
            </div>

            {/* Map CTA Button (Bottom-Right) */}
            <a
              href={VISIT_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-map-directions-btn"
              aria-label="Get directions to Chennai Central Warrenville on Google Maps"
            >
              <span>GET DIRECTIONS</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* RIGHT COLUMN — STACKED INFORMATION CARDS */}
          <div className="visit-info-stack">
            {/* Hours Card */}
            <div className="visit-card visit-hours-card">
              <h3 className="visit-card-title">
                <Clock size={16} aria-hidden="true" />
                HOURS OF OPERATION
              </h3>

              {/* Desktop: Full Monday - Sunday List (Always visible on desktop) */}
              <div className="visit-hours-desktop-list">
                <div className="visit-hours-list">
                  {VISIT_DATA.hoursOfOperation.map((item) => {
                    const isToday = item.dayIndex === currentDayIndex;
                    return (
                      <div
                        key={item.day}
                        className={`visit-hours-row ${isToday ? 'is-today' : ''}`}
                      >
                        <div className="visit-day-wrapper">
                          {isToday && <span className="visit-today-dot" aria-hidden="true" />}
                          <span className="visit-day-label">{item.day}</span>
                          {isToday && <span className="visit-today-badge">TODAY</span>}
                        </div>
                        <div className="visit-dotted-line" aria-hidden="true" />
                        <span className="visit-hours-value">{item.hours}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: Compact Today View + Smooth Expandable Schedule */}
              <div className="visit-hours-mobile-view">
                {/* Today Summary */}
                <div className="visit-hours-row is-today">
                  <div className="visit-day-wrapper">
                    <span className="visit-today-dot" aria-hidden="true" />
                    <span className="visit-day-label">TODAY ({todayItem.dayShort})</span>
                    <span className="visit-today-badge">TODAY</span>
                  </div>
                  <div className="visit-dotted-line" aria-hidden="true" />
                  <span className="visit-hours-value">{todayItem.hours}</span>
                </div>

                {/* Expandable Schedule */}
                <div
                  className={`visit-mobile-expandable-schedule ${
                    isMobileHoursExpanded ? 'is-expanded' : ''
                  }`}
                >
                  <div className="visit-hours-list">
                    {VISIT_DATA.hoursOfOperation.map((item) => {
                      const isToday = item.dayIndex === currentDayIndex;
                      return (
                        <div
                          key={`mobile-${item.day}`}
                          className={`visit-hours-row ${isToday ? 'is-today' : ''}`}
                        >
                          <div className="visit-day-wrapper">
                            {isToday && <span className="visit-today-dot" aria-hidden="true" />}
                            <span className="visit-day-label">{item.day}</span>
                            {isToday && <span className="visit-today-badge">TODAY</span>}
                          </div>
                          <div className="visit-dotted-line" aria-hidden="true" />
                          <span className="visit-hours-value">{item.hours}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  type="button"
                  className="visit-mobile-toggle-btn"
                  onClick={() => setIsMobileHoursExpanded((prev) => !prev)}
                  aria-expanded={isMobileHoursExpanded}
                  aria-label={
                    isMobileHoursExpanded
                      ? 'Hide full hours of operation'
                      : 'View all hours of operation'
                  }
                >
                  <span>{isMobileHoursExpanded ? 'HIDE ALL HOURS' : 'VIEW ALL HOURS'}</span>
                  <ChevronDown
                    size={16}
                    className={`visit-toggle-arrow ${isMobileHoursExpanded ? 'is-rotated' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* Contact Card */}
            <div className="visit-card visit-contact-card">
              <div className="visit-contact-grid">
                {/* Location Item */}
                <div className="visit-contact-item">
                  <div className="visit-contact-icon" aria-hidden="true">
                    <MapPin size={18} />
                  </div>
                  <div className="visit-contact-info">
                    <span className="visit-contact-label">LOCATION</span>
                    <span className="visit-contact-text">
                      {VISIT_DATA.addressLine1}
                      <br />
                      {VISIT_DATA.addressLine2}
                    </span>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="visit-contact-item">
                  <div className="visit-contact-icon" aria-hidden="true">
                    <Phone size={18} />
                  </div>
                  <div className="visit-contact-info">
                    <span className="visit-contact-label">TELEPHONE</span>
                    <a
                      href={VISIT_DATA.phoneTel}
                      className="visit-contact-link"
                      aria-label={`Call Chennai Central at ${VISIT_DATA.phoneDisplay}`}
                    >
                      {VISIT_DATA.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="visit-ctas-row">
              <a
                href={VISIT_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-btn visit-btn-primary"
              >
                <span>GET DIRECTIONS</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#order"
                onClick={(e) => {
                  e.preventDefault();
                  alert(ORDER_ONLINE_CONFIG.urlPlaceholder);
                }}
                className="visit-btn visit-btn-secondary"
              >
                <span>ORDER ONLINE</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Social Connect Card */}
            <div className="visit-card visit-social-card">
              <span className="visit-social-label">CONNECT WITH US</span>
              <div className="visit-social-links">
                <a
                  href={VISIT_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-social-icon-btn"
                  aria-label="Chennai Central Instagram Page"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={VISIT_DATA.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-social-icon-btn"
                  aria-label="Chennai Central Facebook Page"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

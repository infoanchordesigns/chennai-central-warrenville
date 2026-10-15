import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ArrowRight, X } from 'lucide-react';
import gsap from 'gsap';
import { useLenis } from '../../providers/LenisProvider';
import { ORDER_ONLINE_CONFIG } from '../../data/navigation';
import './Navbar.css';

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  number: string;
}

const FULLSCREEN_NAV_LINKS: NavLinkItem[] = [
  { id: 'home', number: '01', label: 'HOME', href: '/' },
  { id: 'menu', number: '02', label: 'MENU', href: '/menu' },
  { id: 'about', number: '03', label: 'OUR STORY', href: '/#about' },
  { id: 'signature', number: '04', label: 'SIGNATURE DISHES', href: '/#signature' },
  { id: 'gallery', number: '05', label: 'GALLERY', href: '/#gallery' },
  { id: 'testimonials', number: '06', label: 'TESTIMONIALS', href: '/#testimonials' },
  { id: 'visit', number: '07', label: 'VISIT US', href: '/#visit' },
];

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  currentPath,
  triggerRef,
}) => {
  const { stopScroll, startScroll } = useLenis();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Scroll Lock, Focus Management, Escape Listener & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    // Lock background scrolling via Lenis provider
    stopScroll();

    // Initial focus placement on close button
    const focusTimer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      } else if (linksRef.current[0]) {
        linksRef.current[0].focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'Tab') {
        // Focus trap inside the modal dialog
        if (!overlayRef.current) return;
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      startScroll();
    };
  }, [isOpen]);

  // Entrance GSAP Stagger Animation
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(linksRef.current.filter(Boolean), { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    const validLinks = linksRef.current.filter(Boolean);
    tl.fromTo(
      validLinks,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power3.out' },
      '-=0.15'
    );
  }, [isOpen]);

  const handleClose = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !overlayRef.current) {
      startScroll();
      onClose();
      triggerRef?.current?.focus();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        startScroll();
        onClose();
        triggerRef?.current?.focus();
      },
    });

    tl.to(linksRef.current.filter(Boolean), {
      opacity: 0,
      y: -12,
      duration: 0.18,
      stagger: 0.02,
      ease: 'power2.in',
    });

    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.2, ease: 'power2.in' },
      '-=0.08'
    );
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      id="fullscreen-menu"
      ref={overlayRef}
      className="fullscreen-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Overlay Header with Close Button */}
      <div className="overlay-header container">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={handleClose}
          className="overlay-close-btn"
          aria-label="Close navigation menu"
        >
          <span className="close-text">CLOSE</span>
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Overlay Main Nav Items */}
      <div className="overlay-body container">
        <nav className="nav-links-list" aria-label="Main Navigation">
          {FULLSCREEN_NAV_LINKS.map((item, index) => {
            const isActive =
              currentPath === item.href ||
              (item.href === '/' && currentPath === '') ||
              (currentPath !== '/' && item.href.includes(currentPath));

            return (
              <a
                key={item.id}
                ref={(el) => (linksRef.current[index] = el)}
                href={item.href}
                onClick={handleClose}
                className={`nav-editorial-link ${isActive ? 'active-link' : ''}`}
              >
                <span className="nav-link-num">{item.number}</span>
                <span className="nav-link-label">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Overlay Footer */}
      <div className="overlay-footer container">
        <div className="overlay-info">
          <span>SOUTH INDIAN HERITAGE • WARRENVILLE, IL</span>
        </div>

        <div className="overlay-cta-container">
          <a
            href={ORDER_ONLINE_CONFIG.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="overlay-order-cta"
          >
            <span>ORDER ONLINE</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

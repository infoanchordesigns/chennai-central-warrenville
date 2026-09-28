import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ArrowRight } from 'lucide-react';
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
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  currentPath,
}) => {
  const { stopScroll, startScroll } = useLenis();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Scroll Lock & Escape Listener
  useEffect(() => {
    if (!isOpen) return;

    // Lock background scrolling via Lenis provider
    stopScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
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
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        startScroll();
        onClose();
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
      ref={overlayRef}
      className="fullscreen-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Overlay Header Spacer */}
      <div className="overlay-header container" aria-hidden="true" />

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
            href="#order"
            onClick={(e) => {
              e.preventDefault();
              alert(ORDER_ONLINE_CONFIG.urlPlaceholder);
              handleClose();
            }}
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

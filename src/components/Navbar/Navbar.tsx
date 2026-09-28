import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { FullscreenMenu } from './FullscreenMenu';
import { ORDER_ONLINE_CONFIG } from '../../data/navigation';
import logoSvg from '../../assets/images/chennai-central-logo.svg';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isNavHidden) {
      document.body.classList.add('navbar-is-hidden');
      document.body.classList.remove('navbar-is-visible');
    } else {
      document.body.classList.add('navbar-is-visible');
      document.body.classList.remove('navbar-is-hidden');
    }
  }, [isNavHidden]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for backdrop styling (activates after exiting Hero runway)
      const heroThreshold = window.innerHeight * 0.85;
      setIsScrolled(currentScrollY > heroThreshold);

      // Directional scroll tracking with 100px activation threshold & 12px direction delta
      if (currentScrollY > 100) {
        const scrollDiff = currentScrollY - lastScrollY;
        if (scrollDiff > 12) {
          setIsNavHidden(true);
        } else if (scrollDiff < -12) {
          setIsNavHidden(false);
        }
      } else {
        setIsNavHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`header-floating-bar ${isScrolled ? 'header-scrolled' : ''} ${
          isMenuOpen ? 'is-menu-open' : ''
        } ${isNavHidden && !isMenuOpen ? 'is-nav-hidden' : ''}`}
      >
        <div className="header-bar-container">
          {/* LEFT: Logo / Brand Mark */}
          <div className="navbar-brand-left">
            <a href="/" className="navbar-logo-link" aria-label="Chennai Central Warrenville Home">
              <img
                src={logoSvg}
                alt="Chennai Central Logo"
                className="navbar-logo-mark"
                width="36"
                height="36"
              />
            </a>
          </div>

          {/* RIGHT: Actions (Order Online CTA + Minimal Hamburger Trigger) */}
          <div className="navbar-actions-group">
            <a
              href="#order"
              onClick={(e) => {
                e.preventDefault();
                alert(ORDER_ONLINE_CONFIG.urlPlaceholder);
              }}
              className="navbar-cta-pill"
            >
              <span>ORDER ONLINE</span>
              <ArrowRight size={14} className="cta-pill-arrow" />
            </a>

            <button
              onClick={toggleMenu}
              className="menu-trigger-compact"
              aria-expanded={isMenuOpen}
              aria-controls="fullscreen-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <div className={`menu-icon-animated ${isMenuOpen ? 'is-open' : ''}`} aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="menu-icon-svg"
                >
                  <line
                    x1="3.5"
                    y1="6.5"
                    x2="16.5"
                    y2="6.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    className="menu-line menu-line-top"
                  />
                  <line
                    x1="3.5"
                    y1="13.5"
                    x2="16.5"
                    y2="13.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    className="menu-line menu-line-bottom"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentPath={location.pathname}
      />
    </>
  );
};





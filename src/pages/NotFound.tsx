import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import { ALL_LOCATIONS } from '../data/visitData';
import { ArrowRight } from 'lucide-react';
import './NotFound.css';

export const NotFound: React.FC = () => {
  usePageMeta({
    title: 'Page Not Found | Chennai Central Warrenville',
    description:
      'The page you are looking for does not exist. Explore the Chennai Central Warrenville menu or return to our homepage.',
    noindex: true,
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="page-not-found-foundation" tabIndex={-1}>
        <div className="not-found-container">
          <span className="not-found-badge">404 ERROR</span>
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-desc">
            The table you are looking for isn&apos;t set, but our kitchen is always welcoming.
            Explore our authentic South Indian menu or return to our homepage.
          </p>

          <div className="not-found-actions">
            <a href="/" className="not-found-btn not-found-btn-primary">
              <span>Return to Home</span>
              <ArrowRight size={14} />
            </a>
            <a href="/menu" className="not-found-btn not-found-btn-secondary">
              <span>Explore Menu</span>
            </a>
          </div>

          <div className="not-found-locations-panel">
            <h3 className="not-found-locations-title">Our Restaurant Branches</h3>
            <div className="not-found-locations-grid">
              {ALL_LOCATIONS.map((loc) => (
                <div key={loc.id} className="not-found-loc-item">
                  <h4 className="not-found-loc-name">{loc.name}</h4>
                  <p className="not-found-loc-text">
                    {loc.addressLine1}, {loc.addressLine2}
                  </p>
                  <a href={loc.phoneTel} className="not-found-loc-phone">
                    {loc.phoneDisplay}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;

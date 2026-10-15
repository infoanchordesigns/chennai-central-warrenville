import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import './Legal.css';

export const AccessibilityStatement: React.FC = () => {
  usePageMeta({
    title: 'Accessibility Statement | Chennai Central Warrenville',
    description: 'Accessibility Statement and commitments for Chennai Central Warrenville restaurant website.',
    canonicalPath: '/accessibility-statement',
    noindex: true,
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="page-legal-foundation" tabIndex={-1}>
        <section className="legal-content-container">
        <header className="legal-header">
          <h1 className="legal-title">Accessibility Statement</h1>
          <p className="legal-last-updated">Last Updated: October 2026</p>
        </header>

        {/* TODO: Confirm legal entity name and verified on-site physical accessibility accommodations with restaurant owner */}

        <article className="legal-section">
          <h2 className="legal-section-title">1. Our Commitment to Accessibility</h2>
          <p className="legal-text">
            Chennai Central Warrenville is dedicated to welcoming all patrons and ensuring an
            enjoyable, inclusive experience—both online and at our dining table.
          </p>
          <p className="legal-text">
            We are actively committed to improving the accessibility and usability of our website
            (<a href="https://mychennaicentral.com" className="legal-link">https://mychennaicentral.com</a>)
            so that all visitors, including individuals with disabilities, can easily explore our
            menu, locate our restaurant, and learn about our hospitality offerings.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">2. Digital Accessibility Measures</h2>
          <p className="legal-text">
            In designing and developing our website, we implement thoughtful modern web design
            practices intended to facilitate accessibility for all users and assistive technology
            devices:
          </p>
          <ul className="legal-list">
            <li>
              <strong>Semantic Structure:</strong> We structure pages with logical HTML5 landmarks
              (such as navigation bars, main content areas, and footers) and a clear, sequential
              heading hierarchy (H1, H2, H3) to assist screen reader users.
            </li>
            <li>
              <strong>Keyboard Navigation:</strong> Interactive elements—including links, buttons,
              and drawer menus—are navigable via standard keyboard inputs with visible focus
              indicators.
            </li>
            <li>
              <strong>Alternative Text:</strong> Descriptive alternative text attributes are
              provided on meaningful imagery, culinary photographs, and brand logos.
            </li>
            <li>
              <strong>Visual Contrast & Sizing:</strong> We use high-contrast color pairings
              (deep espresso tones against warm ivory backgrounds) and fluid typography scales
              designed to maintain clarity across modern screens and zoom levels.
            </li>
            <li>
              <strong>Motion Preferences:</strong> The website respects system-level reduced motion
              preferences (<span className="legal-text-code">prefers-reduced-motion</span>) to ensure
              comfortable browsing for individuals sensitive to visual motion.
            </li>
            <li>
              <strong>Responsive Layouts:</strong> The website adapts smoothly to various viewport
              dimensions, mobile devices, tablets, and desktop displays.
            </li>
          </ul>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">3. Third-Party Platforms and Services</h2>
          <p className="legal-text">
            Our Website provides links to third-party services that enhance your visit, notably
            online ordering hosted by the Toast platform (<span className="legal-text-code">toast.app</span>)
            and mapping directions via Google Maps.
          </p>
          <p className="legal-text">
            While we encourage our partners to provide user-friendly and accessible digital
            experiences, these third-party platforms are operated independently and outside our
            direct engineering control. If you encounter any difficulty navigating an external
            ordering or mapping tool, please contact our restaurant staff directly by phone so we
            may assist you immediately.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">4. Physical Restaurant Accessibility (Warrenville Location)</h2>
          <p className="legal-text">
            We strive to provide warm, comfortable, and accommodating dining for all guests visiting
            our restaurant located at 28331 Dodge Dr, Warrenville, IL 60555.
          </p>
          <p className="legal-text">
            If you or someone in your dining party requires specific physical accommodations,
            wheelchair seating, or assistance prior to your visit, please call our hospitality team in
            advance so we may reserve an easily accessible table.
          </p>
          {/* TODO: Owner to confirm verified physical accessibility features at Warrenville location (e.g., ADA-compliant designated parking spaces, ground-level step-free entrance, wheelchair-accessible restrooms, dining table clearance, service animal policy) */}
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">5. Reporting Barriers and Requesting Assistance</h2>
          <p className="legal-text">
            We view accessibility as an ongoing journey of continuous improvement. If you
            experience any difficulty accessing any portion of our Website, or if you have specific
            questions or suggestions regarding accessibility, we warmly welcome your feedback.
          </p>
          <div className="legal-contact-card">
            <p>
              <strong>Chennai Central Warrenville</strong>
            </p>
            <p>28331 Dodge Dr, Warrenville, IL 60555</p>
            <p>
              Telephone:{' '}
              <a href="tel:6303936570" className="legal-link">
                (630) 393-6570
              </a>
            </p>
            {/* TODO: Owner to supply a verified accessibility contact email address if desired (e.g., accessibility@mychennaicentral.com) */}
          </div>
          <p className="legal-text">
            When contacting us, please describe the specific web page or feature you were attempting
            to access and any assistive technology you were using. We will make every reasonable
            effort to provide the information or service you need in an accessible format.
          </p>
        </article>
      </section>
      </main>
      <Footer />
    </>
  );
};

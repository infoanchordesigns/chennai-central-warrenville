import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import './Legal.css';

export const PrivacyPolicy: React.FC = () => {
  usePageMeta({
    title: 'Privacy Policy | Chennai Central Warrenville',
    description: 'Privacy Policy for Chennai Central Warrenville restaurant website.',
    canonicalPath: '/privacy-policy',
    noindex: true,
  });

  return (
    <main className="page-legal-foundation">
      <Navbar />
      <section className="legal-content-container">
        <header className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-last-updated">Last Updated: October 2026</p>
        </header>

        {/* TODO: Confirm registered legal entity name with restaurant ownership (e.g., Chennai Central Warrenville LLC) */}

        <article className="legal-section">
          <h2 className="legal-section-title">1. Introduction and Scope</h2>
          <p className="legal-text">
            This Privacy Policy describes the policies and practices of Chennai Central Warrenville
            ("we," "us," or "our") regarding the collection, use, and disclosure of information
            through our informational website located at{' '}
            <a href="https://mychennaicentral.com" className="legal-link">
              https://mychennaicentral.com
            </a>{' '}
            (the "Website").
          </p>
          <p className="legal-text">
            This policy applies solely to information processed through this Website. It does not
            apply to interactions conducted entirely offline or to independent third-party services
            that may be linked from our Website.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">2. Information You May Provide</h2>
          <p className="legal-text">
            Our Website is designed primarily to provide information regarding our dining menu,
            restaurant location, hours of operation, and hospitality services.
          </p>
          <p className="legal-text">
            We do not maintain user account registration or direct customer-facing contact form
            submissions on this Website. If you choose to contact our restaurant staff directly by
            telephone or in person, you may voluntarily share your name, telephone number, or
            dining inquiries to facilitate table reservations, takeaway inquiries, or catering
            requests.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">3. Technical and Hosting Information</h2>
          <p className="legal-text">
            Like most websites, our hosting infrastructure may automatically record basic technical
            data transmitted by your web browser during your visit. This information may include
            your Internet Protocol (IP) address, browser type and version, device operating system,
            referring web page, and the date and time of page requests.
          </p>
          <p className="legal-text">
            This technical data is processed primarily to ensure website stability, monitor server
            performance, maintain network security, and troubleshoot technical issues.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">4. Online Ordering via Third-Party Platform (Toast)</h2>
          <p className="legal-text">
            Online ordering for pickup is facilitated through an external link directing visitors to
            the Toast ordering platform (<span className="legal-text-code">toast.app</span>).
          </p>
          <p className="legal-text">
            When you navigate to Toast to place an order, any information you provide—such as your
            name, contact information, delivery or pickup instructions, and payment card details—is
            collected and processed directly by Toast in accordance with Toast’s own privacy policy
            and terms of service.
          </p>
          <p className="legal-text">
            Payment transactions are handled securely by the third-party payment processor; credit
            card numbers are not collected, processed, or stored on this Website.
          </p>
          {/* TODO: Owner to confirm whether customer order records or contact data exported from Toast are incorporated into any secondary marketing databases */}
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">5. External Maps and Social Media Links</h2>
          <p className="legal-text">
            Our Website provides links to external services for customer convenience, including
            Google Maps for driving directions, as well as our official social media profiles on
            Instagram and Facebook.
          </p>
          <p className="legal-text">
            Clicking these external links will direct you to third-party platforms. We do not
            control and are not responsible for the privacy practices, tracking mechanisms, or
            content of these third-party operators. We encourage you to review the privacy policies
            of any third-party websites you visit.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">6. Cookies and Tracking Technologies</h2>
          <p className="legal-text">
            This Website does not deploy third-party advertising pixels, behavioral ad-tracking
            cookies, or cross-site tracking technologies.
          </p>
          <p className="legal-text">
            Standard functional session mechanisms or browser caching may be used by the hosting
            environment or your browser solely to load site resources efficiently and remember
            basic interface preferences.
          </p>
          {/* TODO: Owner to confirm if any web analytics tools (e.g., Google Analytics) or marketing pixels will be added in future updates */}
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">7. How Information Is Used and Shared</h2>
          <p className="legal-text">
            Any technical information generated through your use of the Website is used strictly to
            administer the Website, maintain system security, and ensure reliable service delivery.
          </p>
          <p className="legal-text">
            We do not sell, rent, or trade personal information to third parties for marketing or
            commercial purposes. Information may only be disclosed if required by applicable law,
            subpoena, court order, or to protect the rights, property, and safety of our restaurant,
            guests, or the public.
          </p>
          {/* TODO: Owner to confirm specific business data retention schedules if applicable */}
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">8. Children's Privacy</h2>
          <p className="legal-text">
            Our Website is designed for a general dining audience and is not directed to children
            under 13 years of age. We do not knowingly solicit or collect personal information from
            children under 13. If you believe that a child has provided us with personal
            information, please contact us so we can take appropriate steps to delete it.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">9. Privacy Questions and Contact Details</h2>
          <p className="legal-text">
            If you have questions, comments, or concerns regarding our privacy practices or wish to
            inquire about information associated with your dining interactions, please contact us
            directly:
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
            {/* TODO: Owner to supply a dedicated privacy or legal contact email address if desired */}
          </div>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">10. Updates to This Policy</h2>
          <p className="legal-text">
            We may update this Privacy Policy from time to time to reflect operational, legal, or
            technical changes. Any updates will be posted directly to this page with an updated
            "Last Updated" date at the top. We encourage you to review this page periodically.
          </p>
        </article>
      </section>
      <Footer />
    </main>
  );
};

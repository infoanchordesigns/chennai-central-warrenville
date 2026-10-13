import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import './Legal.css';

export const Terms: React.FC = () => {
  usePageMeta({
    title: 'Terms of Service | Chennai Central Warrenville',
    description: 'Terms of Service for Chennai Central Warrenville restaurant website.',
    canonicalPath: '/terms',
    noindex: true,
  });

  return (
    <main className="page-legal-foundation">
      <Navbar />
      <section className="legal-content-container">
        <header className="legal-header">
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-last-updated">Last Updated: October 2026</p>
        </header>

        {/* TODO: Confirm legal entity name and corporate registration details with restaurant owner */}

        <article className="legal-section">
          <h2 className="legal-section-title">1. Agreement to Terms</h2>
          <p className="legal-text">
            Welcome to Chennai Central Warrenville ("we," "us," or "our"). By accessing or using our
            website located at{' '}
            <a href="https://mychennaicentral.com" className="legal-link">
              https://mychennaicentral.com
            </a>{' '}
            (the "Website"), you agree to be bound by these Terms of Service ("Terms").
          </p>
          <p className="legal-text">
            If you do not agree to these Terms, please do not use the Website. These Terms govern
            your use of the Website and provide important information regarding menus, online
            ordering, dietary advisories, and restaurant policies.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">2. Website Use and Permitted Activities</h2>
          <p className="legal-text">
            This Website is made available solely for your personal, non-commercial informational
            use. You may use the Website to browse our menu offerings, review restaurant hours, find
            our location, contact restaurant staff, and navigate to authorized external ordering
            services.
          </p>
          <p className="legal-text">
            You agree not to use the Website for any unlawful purpose, interfere with the proper
            operation of the site, or attempt to gain unauthorized access to any server or network
            connected to the Website.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">3. Menu Information, Prices, and Availability</h2>
          <p className="legal-text">
            We make every reasonable effort to keep menu items, descriptions, and pricing displayed
            on the Website accurate and reflective of our kitchen's offerings. However:
          </p>
          <ul className="legal-list">
            <li>
              <strong>Pricing & Changes:</strong> All prices, descriptions, and item availability are
              subject to change without prior notice based on seasonal supply, market ingredients,
              and operational updates.
            </li>
            <li>
              <strong>Typographical Errors:</strong> While we endeavor to prevent errors, inadvertent
              typographical, descriptive, or pricing errors may occasionally occur. We reserve the
              right to correct any errors at any time.
            </li>
            <li>
              <strong>Authoritative Menu:</strong> In the event of a discrepancy, the current in-store
              menu pricing or active ordering portal pricing shall govern.
            </li>
          </ul>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">4. Online Ordering via Third-Party Platform</h2>
          <p className="legal-text">
            Online ordering for takeaway is facilitated through our authorized external ordering
            partner, Toast (<span className="legal-text-code">toast.app</span>).
          </p>
          <p className="legal-text">
            When you select "Order Online," you will be redirected to the Toast platform. Orders,
            digital transactions, checkout calculations, and payment card handling are processed
            directly on Toast’s platform in accordance with Toast’s independent terms of service and
            privacy policies.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">5. Orders, Payments, Cancellations, and Refunds</h2>
          <p className="legal-text">
            All culinary dishes are prepared fresh upon order placement to deliver the highest
            quality South Indian cuisine.
          </p>
          <ul className="legal-list">
            <li>
              <strong>Order Confirmation:</strong> Please review your order selections, contact
              number, and pickup timing carefully before submitting your order through the ordering
              portal.
            </li>
            <li>
              <strong>Cancellations & Modifications:</strong> Because food preparation begins promptly
              after receipt, changes or cancellations must be communicated immediately by calling
              the restaurant directly at (630) 393-6570.
            </li>
            <li>
              <strong>Refund Inquiries:</strong> Any questions regarding order quality, missing
              items, or refund requests are evaluated individually by restaurant management. Please
              contact the restaurant immediately upon receiving your order so we may assist you.
            </li>
          </ul>
          {/* TODO: Owner to confirm specific formal refund, return, or order cancellation policies if a written policy is established */}
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">6. Food Allergies and Dietary Information</h2>
          <p className="legal-text">
            Authentic South Indian cuisine incorporates a diverse variety of regional ingredients,
            spices, and dairy products.
          </p>
          <ul className="legal-list">
            <li>
              <strong>Common Allergens:</strong> Our dishes may contain or come into contact with
              tree nuts (such as cashews), peanuts, dairy products (such as ghee, milk, paneer, and
              butter), mustard seeds, sesame, gluten/wheat, and soy.
            </li>
            <li>
              <strong>Shared Kitchen Advisory:</strong> While we observe strict hygiene and food
              preparation protocols, our kitchen uses shared cooking surfaces and preparation areas.
              Cross-contact between ingredients can occur.
            </li>
            <li>
              <strong>Customer Responsibility:</strong> We cannot guarantee that any menu item is
              completely allergen-free. If you or any member of your dining party has a severe food
              allergy or dietary restriction, please inform our staff directly before ordering so we
              can guide your selections.
            </li>
          </ul>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">7. Intellectual Property</h2>
          <p className="legal-text">
            All content displayed on this Website—including but not limited to the Chennai Central
            name, logos, culinary photographs, menu text, graphics, and interface design—is the
            property of Chennai Central Warrenville or its content licensors and is protected by
            applicable copyright, trademark, and intellectual property laws.
          </p>
          <p className="legal-text">
            No material from this Website may be copied, reproduced, republished, uploaded, posted,
            transmitted, or distributed in any way without prior written permission.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">8. Third-Party Services and External Links</h2>
          <p className="legal-text">
            Our Website contains links to external websites and services, including Toast, Google
            Maps, Instagram, and Facebook. These links are provided solely as a convenience to our
            patrons.
          </p>
          <p className="legal-text">
            We do not endorse, monitor, or have control over third-party websites or services. Your
            use of third-party platforms is governed by their respective terms and policies.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">9. Disclaimer of Warranties and Limitation of Liability</h2>
          <p className="legal-text">
            This Website and its content are provided on an "as is" and "as available" basis without
            warranties of any kind, either express or implied, including but not limited to implied
            warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p className="legal-text">
            To the fullest extent permitted by applicable law, Chennai Central Warrenville and its
            owners, employees, and agents shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from or related to your use of, or inability
            to use, this Website.
          </p>
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">10. Applicable Law and Jurisdiction</h2>
          <p className="legal-text">
            Subject to review and confirmation by the restaurant's legal counsel, these Terms shall
            be governed by and construed in accordance with the laws of the State of Illinois,
            without giving effect to any principles of conflicts of law.
          </p>
          <p className="legal-text">
            Any legal suit, action, or proceeding arising out of or related to these Terms or the
            Website shall be instituted in the state or federal courts located in DuPage County,
            Illinois.
          </p>
          {/* TODO: Legal counsel review recommended for governing law, venue, and arbitration clauses */}
        </article>

        <article className="legal-section">
          <h2 className="legal-section-title">11. Changes to Terms and Inquiries</h2>
          <p className="legal-text">
            We reserve the right to revise and update these Terms at our sole discretion. Any changes
            are effective immediately when posted on this page. Your continued use of the Website
            following the posting of revised Terms indicates your acceptance of the changes.
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
            {/* TODO: Owner to supply a dedicated legal or management email address if desired */}
          </div>
        </article>
      </section>
      <Footer />
    </main>
  );
};

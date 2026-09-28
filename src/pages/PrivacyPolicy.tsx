import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { usePageMeta } from '../hooks/usePageMeta';

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
      <section className="container" style={{ padding: '60px 20px', minHeight: '50vh' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h1, 2.5rem)', marginBottom: '16px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          [PRIVACY POLICY STUB - AWAITING VERIFIED BUSINESS LEGAL POLICIES]
        </p>
      </section>
      <Footer />
    </main>
  );
};

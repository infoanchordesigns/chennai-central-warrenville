import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { usePageMeta } from '../hooks/usePageMeta';

export const AccessibilityStatement: React.FC = () => {
  usePageMeta({
    title: 'Accessibility Statement | Chennai Central Warrenville',
    description: 'Accessibility Statement and commitments for Chennai Central Warrenville restaurant website.',
    canonicalPath: '/accessibility-statement',
    noindex: true,
  });

  return (
    <main className="page-legal-foundation">
      <Navbar />
      <section className="container" style={{ padding: '60px 20px', minHeight: '50vh' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h1, 2.5rem)', marginBottom: '16px' }}>
          Accessibility Statement
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          [ACCESSIBILITY STATEMENT STUB - AWAITING VERIFIED ACCESSIBILITY POLICIES]
        </p>
      </section>
      <Footer />
    </main>
  );
};

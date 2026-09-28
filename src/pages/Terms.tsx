import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { usePageMeta } from '../hooks/usePageMeta';

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
      <section className="container" style={{ padding: '60px 20px', minHeight: '50vh' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h1, 2.5rem)', marginBottom: '16px' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          [TERMS OF SERVICE STUB - AWAITING VERIFIED BUSINESS LEGAL TERMS]
        </p>
      </section>
      <Footer />
    </main>
  );
};

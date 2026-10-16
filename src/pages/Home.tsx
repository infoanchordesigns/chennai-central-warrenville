import React, { Suspense, lazy } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { usePageMeta } from '../hooks/usePageMeta';

// Below-the-fold components code-split to eliminate render-blocking CSS and initial reflows
const SignatureDishes = lazy(() => import('../components/SignatureDishes').then(m => ({ default: m.SignatureDishes })));
const Gallery = lazy(() => import('../components/Gallery').then(m => ({ default: m.Gallery })));
const Testimonials = lazy(() => import('../components/Testimonials').then(m => ({ default: m.Testimonials })));
const Visit = lazy(() => import('../components/Visit').then(m => ({ default: m.Visit })));
const Footer = lazy(() => import('../components/Footer').then(m => ({ default: m.Footer })));

export const Home: React.FC = () => {
  usePageMeta({
    title: 'Chennai Central Warrenville | South Indian Restaurant',
    description: 'Chennai Central Warrenville - Authentic South Indian Cuisine in Warrenville, IL. Dum Biryani, Masala Dosa, Chettinad specialties, and fine South Indian dining.',
    canonicalPath: '/',
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="page-home-foundation" tabIndex={-1}>
        <Hero />
        <About />
        <Suspense fallback={null}>
          <SignatureDishes />
          <Gallery />
          <Testimonials />
          <Visit />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

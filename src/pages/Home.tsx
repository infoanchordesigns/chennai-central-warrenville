import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SignatureDishes } from '../components/SignatureDishes';
import { About } from '../components/About';
import { Gallery } from '../components/Gallery';
import { Testimonials } from '../components/Testimonials';
import { Visit } from '../components/Visit';
import { Footer } from '../components/Footer';

import { usePageMeta } from '../hooks/usePageMeta';

export const Home: React.FC = () => {
  usePageMeta({
    title: 'Chennai Central Warrenville | South Indian Restaurant',
    description: 'Chennai Central Warrenville - Authentic South Indian Cuisine in Warrenville, IL. Dum Biryani, Masala Dosa, Chettinad specialties, and fine South Indian dining.',
    canonicalPath: '/',
  });

  return (
    <main className="page-home-foundation">
      <Navbar />
      <Hero />
      <About />
      <SignatureDishes />
      <Gallery />
      <Testimonials />
      <Visit />
      <Footer />
    </main>
  );
};


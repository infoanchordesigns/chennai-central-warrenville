import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';

const Menu = lazy(() => import('../pages/Menu').then(m => ({ default: m.Menu })));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('../pages/Terms').then(m => ({ default: m.Terms })));
const AccessibilityStatement = lazy(() => import('../pages/AccessibilityStatement').then(m => ({ default: m.AccessibilityStatement })));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

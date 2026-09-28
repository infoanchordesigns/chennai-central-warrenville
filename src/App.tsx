import React from 'react';
import { LenisProvider } from './providers/LenisProvider';
import { AppRouter } from './router/AppRouter';
import { Preloader } from './components/Preloader';

export const App: React.FC = () => {
  return (
    <LenisProvider>
      <Preloader />
      <AppRouter />
    </LenisProvider>
  );
};

export default App;

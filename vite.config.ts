import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Custom Vite plugin to optimize lucide-react imports.
 * Instead of traversing the 1,400+ icon barrel file in lucide-react/dist/esm/lucide-react.js,
 * this virtual module resolves directly to the 16 specific icons used in the project.
 */
function lucideIconPlugin(): Plugin {
  const virtualModuleId = 'virtual:lucide-react';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'lucide-icon-optimizer',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'lucide-react') {
        return resolvedVirtualModuleId;
      }
      return null;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
export { default as ArrowRight } from 'lucide-react/icons/arrow-right';
export { default as ArrowUpRight } from 'lucide-react/icons/arrow-up-right';
export { default as BadgeCheck } from 'lucide-react/icons/badge-check';
export { default as ChevronDown } from 'lucide-react/icons/chevron-down';
export { default as ChevronLeft } from 'lucide-react/icons/chevron-left';
export { default as ChevronRight } from 'lucide-react/icons/chevron-right';
export { default as Clock } from 'lucide-react/icons/clock';
export { default as Facebook } from 'lucide-react/icons/facebook';
export { default as Instagram } from 'lucide-react/icons/instagram';
export { default as MapPin } from 'lucide-react/icons/map-pin';
export { default as Maximize2 } from 'lucide-react/icons/maximize-2';
export { default as Phone } from 'lucide-react/icons/phone';
export { default as Quote } from 'lucide-react/icons/quote';
export { default as SlidersHorizontal } from 'lucide-react/icons/sliders-horizontal';
export { default as Star } from 'lucide-react/icons/star';
export { default as X } from 'lucide-react/icons/x';
`;
      }
      return null;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), lucideIconPlugin()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-leaflet': ['leaflet'],
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
  },
});

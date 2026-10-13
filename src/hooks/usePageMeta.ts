import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
}

export const PRODUCTION_ORIGIN = 'https://mychennaicentral.com';
export const DEFAULT_OG_IMAGE = `${PRODUCTION_ORIGIN}/restaurant-ambience.webp`;
export const DEFAULT_OG_IMAGE_ALT = 'Chennai Central South Indian Restaurant interior in Warrenville, IL';

const buildCanonicalUrl = (canonicalPath: string = ''): string => {
  if (!canonicalPath || canonicalPath === '/') {
    return `${PRODUCTION_ORIGIN}/`;
  }
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  return `${PRODUCTION_ORIGIN}${cleanPath}`;
};

const setOrCreateMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (el) {
    el.setAttribute('content', content);
  } else {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    el.setAttribute('content', content);
    document.head.appendChild(el);
  }
};

export const usePageMeta = ({
  title,
  description,
  canonicalPath = '',
  noindex = false,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
}: PageMetaOptions) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Description
    setOrCreateMeta('name', 'description', description);

    // 3. Robots
    setOrCreateMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');

    // 4. Canonical
    const fullCanonical = buildCanonicalUrl(canonicalPath);
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', fullCanonical);
    } else {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      linkCanonical.setAttribute('href', fullCanonical);
      document.head.appendChild(linkCanonical);
    }

    // 5. Open Graph Meta Tags
    setOrCreateMeta('property', 'og:title', title);
    setOrCreateMeta('property', 'og:description', description);
    setOrCreateMeta('property', 'og:url', fullCanonical);
    setOrCreateMeta('property', 'og:image', ogImage);
    setOrCreateMeta('property', 'og:image:secure_url', ogImage);
    setOrCreateMeta('property', 'og:image:alt', ogImageAlt);

    // 6. Twitter / X Meta Tags
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', title);
    setOrCreateMeta('name', 'twitter:description', description);
    setOrCreateMeta('name', 'twitter:image', ogImage);
    setOrCreateMeta('name', 'twitter:image:alt', ogImageAlt);
  }, [title, description, canonicalPath, noindex, ogImage, ogImageAlt]);
};

/* TypeScript Data Architecture Interfaces for Chennai Central Warrenville */

export type DietaryTag = 'Veg' | 'Non-Veg' | 'Vegan' | 'Gluten-Free' | 'Halal';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: string; // Optional until verified client data is provided
  category: string;
  dietary?: DietaryTag[];
  isSignature?: boolean;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

export interface RestaurantHours {
  day: string;
  open: string;
  close: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  addressPlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  hoursPlaceholder: string;
  orderOnlineUrlPlaceholder: string;
  directionsUrlPlaceholder: string;
}

export interface Review {
  id: string;
  author: string;
  quote: string;
  rating?: number;
  source?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'interior' | 'kitchen' | 'ambiance';
  altText: string;
  srcPlaceholder: string;
}

// Data Architecture Constants (Placeholders explicitly marked)
export const CLIENT_CONTENT_REQUIRED = '[CLIENT CONTENT REQUIRED]';

export interface LocationItem {
  id: string;
  locationNumber: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  phoneDisplay: string;
  phoneTel: string;
  directionsUrl: string;
}

export interface FooterNavLink {
  label: string;
  href: string;
}

export interface CompactHoursSummary {
  days: string;
  hours: string;
}

export const FOOTER_BRAND_INFO = {
  description: 'Authentic South Indian dining, heritage recipes, and warm hospitality.',
  signOff: 'Vanakkam! ✦',
};

export const FOOTER_LOCATIONS: LocationItem[] = [
  {
    id: 'warrenville',
    locationNumber: 'LOCATION 01',
    name: 'WARRENVILLE',
    addressLine1: '28331 Dodge Dr',
    addressLine2: 'Warrenville, IL 60555',
    phoneDisplay: '(630) 393-6570',
    phoneTel: 'tel:6303936570',
    directionsUrl: 'https://maps.app.goo.gl/jQEWagDBRoHXvKHp9',
  },
  {
    id: 'arlington',
    locationNumber: 'LOCATION 02',
    name: 'ARLINGTON HEIGHTS',
    addressLine1: '1035 S Arlington Heights Rd',
    addressLine2: 'Arlington Heights, IL 60005',
    phoneDisplay: '(847) 262-5997',
    phoneTel: 'tel:8472625997',
    directionsUrl: 'https://maps.app.goo.gl/jQEWagDBRoHXvKHp9',
  },
];

export const FOOTER_NAV_LINKS: FooterNavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Signature Dishes', href: '/#signature' },
  { label: 'Our Story', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Visit Us', href: '/#visit' },
  { label: 'Menu', href: '/menu' },
];

export const FOOTER_SOCIAL_CONFIG = {
  instagram: {
    label: '@chennai_central_restaurant',
    url: 'https://www.instagram.com/chennai_central_restaurant/',
  },
  facebook: {
    label: 'Chennai Central Arlington Heights',
    url: 'https://www.facebook.com/p/Chennai-Central-Arlington-Heights-61579620741874/',
  },
};

export const FOOTER_HOURS_SUMMARY: CompactHoursSummary[] = [
  { days: 'Mon – Thu', hours: '11:30 AM – 3:00 PM\n5:30 PM – 10:00 PM' },
  { days: 'Fri – Sat', hours: '11:30 AM – 1:00 AM' },
  { days: 'Sunday', hours: '11:30 AM – 9:00 PM' },
];

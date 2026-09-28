export interface NavItem {
  id: string;
  number: string;
  label: string;
  href: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', number: '01', label: 'HOME', href: '/' },
  { id: 'about', number: '02', label: 'ABOUT', href: '/#about' },
  { id: 'signature', number: '03', label: 'SIGNATURE DISHES', href: '/#signature' },
  { id: 'gallery', number: '04', label: 'GALLERY', href: '/#gallery' },
  { id: 'testimonials', number: '05', label: 'TESTIMONIALS', href: '/#testimonials' },
  { id: 'visit', number: '06', label: 'VISIT', href: '/#visit' },
  { id: 'menu', number: '07', label: 'MENU', href: '/menu' },
];

export const ORDER_ONLINE_CONFIG = {
  urlPlaceholder: '[CLIENT ORDERING URL REQUIRED]',
  label: 'ORDER NOW',
  phonePlaceholder: null, // Only set when verified client phone exists
  whatsappPlaceholder: null, // Only set when verified client WhatsApp exists
};

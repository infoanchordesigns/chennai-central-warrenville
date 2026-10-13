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

export const OFFICIAL_ORDER_URL =
  'https://toast.app/r/chennai-central-28331-dodge-drive/order/r-c51c73fb-9999-4baa-aab2-c229a7b33f28?diningOption=takeout&rwg_token=AE37R_hkg8YxM__cMqXQ3HuwVjXS-kV2GL_s1HyWx_ySizGKzzIkpUNZYQYQHQhlYnXoecz-3VJjce79-xUzoU0a_1vWKWqQtw%3D%3D&utm_medium=redirect';

export const ORDER_ONLINE_CONFIG = {
  url: OFFICIAL_ORDER_URL,
  urlPlaceholder: OFFICIAL_ORDER_URL,
  label: 'ORDER NOW',
  phonePlaceholder: null, // Only set when verified client phone exists
  whatsappPlaceholder: null, // Only set when verified client WhatsApp exists
};

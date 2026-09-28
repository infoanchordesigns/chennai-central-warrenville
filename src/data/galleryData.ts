import chicken65Img from '../assets/images/gallery/chicken-65.webp';
import chickenBiryaniImg from '../assets/images/gallery/chicken-biryani.webp';
import restaurantAmbienceImg from '../assets/images/gallery/restaurant-ambience.webp';
import masalaDosaImg from '../assets/images/gallery/masala-dosa.webp';
import filterCoffeeImg from '../assets/images/gallery/chennai-filter-coffee.webp';
import idlySambarImg from '../assets/images/gallery/idly-sambar.webp';
import chickenTikkaImg from '../assets/images/gallery/chicken-tikka.webp';
import chennaiClassicsImg from '../assets/images/gallery/table-of-dish.webp';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  aspectRatio: 'portrait' | 'square' | 'tall' | 'wide' | 'landscape';
  src: string;
  alt: string;
  displayAspect: string; // e.g. "3 / 4", "4 / 3"
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Chicken 65',
    category: 'STARTER',
    caption: 'Crisp, spiced South Indian fried chicken with a bold blend of aromatic seasoning.',
    aspectRatio: 'tall',
    displayAspect: '3 / 4',
    src: chicken65Img,
    alt: 'Chicken 65',
  },
  {
    id: 'gallery-2',
    title: 'Chennai Bhai Chicken Biryani',
    category: 'SIGNATURE',
    caption: 'Fragrant basmati rice layered with tender chicken and aromatic South Indian spices.',
    aspectRatio: 'landscape',
    displayAspect: '4 / 3',
    src: chickenBiryaniImg,
    alt: 'Chennai Bhai Chicken Biryani',
  },
  {
    id: 'gallery-3',
    title: 'Restaurant Ambience',
    category: 'ATMOSPHERE',
    caption: 'Warm and inviting dining room ambience at Chennai Central in Warrenville.',
    aspectRatio: 'landscape',
    displayAspect: '4 / 3',
    src: restaurantAmbienceImg,
    alt: 'Chennai Central restaurant ambience',
  },
  {
    id: 'gallery-4',
    title: 'Masala Dosa',
    category: 'CLASSIC',
    caption: 'Crisp golden dosa served with traditional South Indian accompaniments.',
    aspectRatio: 'tall',
    displayAspect: '3 / 4',
    src: masalaDosaImg,
    alt: 'Masala Dosa with South Indian accompaniments',
  },
  {
    id: 'gallery-5',
    title: 'Madras Filter Coffee',
    category: 'BEVERAGE',
    caption: 'Traditional South Indian filter coffee with its rich aroma and bold character.',
    aspectRatio: 'tall',
    displayAspect: '3 / 4',
    src: filterCoffeeImg,
    alt: 'Madras Filter Coffee',
  },
  {
    id: 'gallery-6',
    title: 'Idly with Sambar & Chutneys',
    category: 'BREAKFAST',
    caption: 'Soft steamed idly served with comforting sambar and classic South Indian chutneys.',
    aspectRatio: 'landscape',
    displayAspect: '4 / 3',
    src: idlySambarImg,
    alt: 'Idly with sambar and South Indian chutneys',
  },
  {
    id: 'gallery-7',
    title: 'Chicken Tikka',
    category: 'TANDOOR',
    caption: 'Tender chicken marinated with aromatic spices and grilled for a lightly charred finish.',
    aspectRatio: 'landscape',
    displayAspect: '4 / 3',
    src: chickenTikkaImg,
    alt: 'Grilled Chicken Tikka',
  },
  {
    id: 'gallery-8',
    title: 'Chennai Classics',
    category: 'FEAST',
    caption: 'A traditional Chennai spread featuring Chicken 65, kothu parotta, parotta and salna.',
    aspectRatio: 'tall',
    displayAspect: '3 / 4',
    src: chennaiClassicsImg,
    alt: 'Chennai food spread featuring Chicken 65, kothu parotta, parotta and salna',
  },
];

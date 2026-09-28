import { SignatureDish } from '../types/signatureDish';

import chickenBiryaniImg from '../assets/images/signature/chicken-biryani.webp';
import masalaDosaImg from '../assets/images/signature/masala-dosa.webp';
import gheeRoastDosaImg from '../assets/images/signature/ghee-roast-dosa.webp';
import chickenTikkaImg from '../assets/images/signature/chicken-tikka.webp';
import gulabJamunImg from '../assets/images/signature/gulab-jamun.webp';
import paneerTikkaImg from '../assets/images/signature/paneer-tikka.webp';
import rasmalaiImg from '../assets/images/signature/rasmalai.webp';
import chettinadGoatCurryImg from '../assets/images/signature/chettinad-goat-curry.webp';

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    id: 'chicken-biryani',
    name: 'Chennai Street Style Bhai Chicken Biryani',
    description: "Aromatic, long-grain biryani inspired by Chennai's beloved bhai-style biryani, layered with tender chicken, fragrant spices and beautifully seasoned rice.",
    image: chickenBiryaniImg,
    alt: 'Chennai street style bhai chicken biryani',
  },
  {
    id: 'masala-dosa',
    name: 'Masala Dosa',
    description: 'A crisp, golden South Indian dosa filled with warmly spiced potato masala, served with traditional chutneys and sambar.',
    image: masalaDosaImg,
    alt: 'Masala dosa with South Indian chutneys and sambar',
  },
  {
    id: 'ghee-roast-dosa',
    name: 'Ghee Roast Dosa',
    description: 'A paper-thin dosa roasted in ghee until deeply golden and crisp, paired with classic South Indian chutneys and sambar.',
    image: gheeRoastDosaImg,
    alt: 'Ghee roast dosa with South Indian chutneys and sambar',
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka',
    description: 'Tender pieces of chicken marinated in aromatic spices and yogurt, grilled until beautifully charred and full of flavor.',
    image: chickenTikkaImg,
    alt: 'Grilled chicken tikka',
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    description: 'Soft, golden milk dumplings soaked in fragrant sugar syrup, offering a warm and delicate finish to the meal.',
    image: gulabJamunImg,
    alt: 'Gulab jamun in sugar syrup',
  },
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    description: 'Juicy paneer marinated with Indian spices and yogurt, grilled with peppers and onions for a smoky, satisfying bite.',
    image: paneerTikkaImg,
    alt: 'Paneer tikka with grilled peppers and onions',
  },
  {
    id: 'rasmalai',
    name: 'Rasmalai',
    description: 'Soft chenna dumplings immersed in rich saffron-infused milk, finished with delicate pistachio and almond accents.',
    image: rasmalaiImg,
    alt: 'Rasmalai with saffron milk',
  },
  {
    id: 'chettinad-goat-curry',
    name: 'Chettinad Goat Curry',
    description: 'Tender goat slow-cooked in a rich Chettinad masala, layered with roasted spices and the bold flavors of Tamil Nadu.',
    image: chettinadGoatCurryImg,
    alt: 'Chettinad goat curry',
  },
];

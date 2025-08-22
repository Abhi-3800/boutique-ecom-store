import banner2 from "../assets/hero2.jpeg";
import banner3 from "../assets/hero3.jpeg";
import hank1 from "../assets/hank1.jpg";
import hank2 from "../assets/hank2.jpg";
import hank3 from "../assets/hank3.jpg";
import rakhi1 from "../assets/rakhi1.jpg";
import rakhi2 from "../assets/rakhi2.jpg";
import rakhi3 from "../assets/rakhi3.jpg";
import palazzo1 from "../assets/palazzo1.jpg";
import palazzo2 from "../assets/palazzo2.jpg";
import palazzo3 from "../assets/palazzo3.jpg";
import cushion1 from "../assets/cushion1.jpg";
import cushion2 from "../assets/cushion2.jpg";
import cushion3 from "../assets/cushion3.jpg";
import cushion4 from "../assets/cushion4.jpg";
import hair1 from "../assets/hair1.jpg";
import hair2 from "../assets/hair2.jpg";
import hair3 from "../assets/hair3.jpg";
import hair4 from "../assets/hair4.jpg";


export const categories = [
  { id: 'custom-suits', name: 'Customized Suits' },
  { id: 'handcrafted', name: 'Handcrafted Decor' },
  { id: 'rakhis', name: 'Rakhis' },
  { id: 'handkerchiefs', name: 'Handkerchiefs' },
  { id: 'bottomwear', name: 'Bottomwear (Palazzo)' }
]

export const products = [
  {
    id: 'p1',
    title: 'Handcrafted Rakhi – Floral Beads',
    price: 299,
    category: 'rakhis',
    images: [rakhi1, rakhi2, rakhi3],
    description: 'Beautiful handcrafted rakhi with floral bead work and silk thread.',
    variants: ['Red','Maroon']
  },
  {
    id: 'p2',
    title: 'Custom Stitched Suit – Anarkali',
    price: 3499,
    category: 'custom-suits',
    images: [banner2, banner3, banner2, banner3],
    description: 'Tailored Anarkali suit with personalized measurements and fabric choice.',
    variants: ['S','M','L','XL']
  },
  {
    id: 'p3',
    title: 'Cotton Handkerchief – Set of 6',
    price: 499,
    category: 'handkerchiefs',
    images: [hank1, hank2, hank3],
    description: 'Soft cotton handkerchiefs, hemmed edges, assorted prints.',
    variants: ['Assorted']
  },
  {
    id: 'p4',
    title: 'Palazzo – Khadi Blend',
    price: 899,
    category: 'bottomwear',
    images: [palazzo1, palazzo2, palazzo3],
    description: 'Comfort-fit palazzo with elasticated waistband and breathable fabric.',
    variants: ['S','M','L','XL']
  },
  {
    id: 'p5',
    title: 'Cushion Cover – Hand Embroidered (16x16)',
    price: 799,
    category: 'handcrafted',
    images: [cushion1, cushion2, cushion3, cushion4],
    description: 'Hand embroidered cushion cover; zipper closure; premium cotton.',
    variants: ['Single','Pair']
  },
    {
    id: 'p6',
    title: 'Hair Accessories – Floral Hairband',
    price: 299,
    category: 'hair accessories',
    images: [hair1, hair2, hair3, hair4],
    description: 'Handcrafted floral hairband with adjustable size. Perfect for all occasions.',
    variants: ['Pink', 'Blue', 'White']
  }
]

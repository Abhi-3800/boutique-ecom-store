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
import dress1 from "../assets/hero2.jpeg";
import dress2 from "../assets/hero3.jpeg";

export const categories = [
  { id: 'stitched-suits', name: 'Stitched Suits' },
  { id: 'unstitched-suits', name: 'Unstitched Suits' },
  { id: 'coord-sets', name: 'Coord Sets' },
  { id: 'dupattas', name: 'Dupattas' },
  { id: 'customized-handkerchief ', name: 'Customized Handkerchief' },
  { id: 'handcrafted-items ', name: 'Handcrafted Items ' },
  { id: 'bottoms', name: 'Bottoms (Salwars and plaazo)' },
  {id: 'hair-accessories', name: 'Hair Accessories'},
  {id: 'customized-parandis', name: 'Customized Parandis'},
  { id: 'kids', name: 'Kids' }
]

export const products = [
  // ---------- Customized Handkerchief ----------
  {
    id: '1',
    title: 'Personalized Cotton Handkerchief – Set of 6',
    price: 499,
    category: 'customized-handkerchief',
    images: [hank1, hank2, hank3],
    description: 'Soft cotton handkerchiefs customized with initials or patterns. Perfect for gifting.',
    variants: ['Initial Embroidery','Printed Design'],
    isSale: true,
    isNew: false,
    rating: 4.5,
    numReviews: 34
  },
  {
    id: '2',
    title: 'Premium White Handkerchief – Monogrammed',
    price: 399,
    category: 'customized-handkerchief',
    images: [hank2],
    description: 'Classic white handkerchiefs with personalized monogram embroidery.',
    variants: ['Pack of 3','Pack of 6'],
    isSale: false,
    isNew: true,
    rating: 4.8,
    numReviews: 21
  },

  // ---------- Handcrafted Items ----------
  {
    id: '3',
    title: 'Hand Embroidered Cushion Cover (16x16)',
    price: 799,
    category: 'handcrafted-items',
    images: [cushion1, cushion2, cushion3, cushion4],
    description: 'Premium cotton cushion cover with intricate hand embroidery. Adds elegance to any space.',
    variants: ['Single','Pair'],
    isSale: false,
    isNew: true,
    rating: 4.9,
    numReviews: 15
  },
  {
    id: '4',
    title: 'Table Runner – Handwoven Cotton',
    price: 1299,
    category: 'handcrafted-items',
    images: [cushion2],
    description: 'Traditional handwoven table runner with ethnic motifs.',
    variants: ['Standard Size'],
    isSale: true,
    isNew: false,
    rating: 4.6,
    numReviews: 12
  },
  {
    id: '5',
    title: 'Decorative Wall Hanging – Embroidered',
    price: 1999,
    category: 'handcrafted-items',
    images: [cushion3],
    description: 'Handcrafted embroidered wall hanging to elevate home décor.',
    variants: ['Small','Large'],
    isSale: false,
    isNew: true,
    rating: 4.7,
    numReviews: 9
  },

  // ---------- Bottoms (Salwars and Palazzo) ----------
  {
    id: '6',
    title: 'Khadi Blend Palazzo',
    price: 899,
    category: 'bottoms',
    images: [palazzo1, palazzo2, palazzo3],
    description: 'Comfort-fit palazzo made with breathable khadi blend. Everyday essential wear.',
    variants: ['S','M','L','XL'],
    isSale: false,
    isNew: true,
    rating: 4.4,
    numReviews: 18
  },
  {
    id: '7',
    title: 'Cotton Palazzo – Solid Colors',
    price: 799,
    category: 'bottoms',
    images: [palazzo2],
    description: 'Classic cotton palazzo in versatile solid colors.',
    variants: ['Black','White','Beige'],
    isSale: true,
    isNew: false,
    rating: 4.0,
    numReviews: 22
  },
  {
    id: '8',
    title: 'Festive Embroidered Palazzo',
    price: 1199,
    category: 'bottoms',
    images: [palazzo3],
    description: 'Palazzo pants with light embroidery – perfect for festive occasions.',
    variants: ['M','L','XL'],
    isSale: true,
    isNew: false,
    rating: 4.1,
    numReviews: 11
  },

  // ---------- Hair Accessories ----------
  {
    id: '9',
    title: 'Handmade Floral Hairband',
    price: 299,
    category: 'hair-accessories',
    images: [hair1, hair2, hair3, hair4],
    description: 'Beautiful floral hairband with a comfortable fit. Ideal for parties and casual wear.',
    variants: ['Pink','Blue','White'],
    isSale: false,
    isNew: true,
    rating: 4.3,
    numReviews: 25
  },
  {
    id: '10',
    title: 'Beaded Hair Clip',
    price: 199,
    category: 'hair-accessories',
    images: [hair2],
    description: 'Elegant beaded hair clip for everyday and festive styling.',
    variants: ['Golden','Silver'],
    isSale: true,
    isNew: false,
    rating: 4.2,
    numReviews: 30
  },
  {
    id: '11',
    title: 'Silk Scrunchies – Set of 3',
    price: 249,
    category: 'hair-accessories',
    images: [hair3],
    description: 'Soft silk scrunchies that prevent breakage and add style.',
    variants: ['Black','Pink','Green'],
    isSale: false,
    isNew: true,
    rating: 4.8,
    numReviews: 40
  },

  // ---------- Customized Parandis ----------
  {
    id: '12',
    title: 'Traditional Parandi – Custom Beads',
    price: 599,
    category: 'customized-parandis',
    images: [hair4],
    description: 'Hand-braided parandi with customizable beadwork. Perfect for weddings and festivals.',
    variants: ['Red','Green','Golden'],
    isSale: true,
    isNew: false,
    rating: 4.5,
    numReviews: 14
  },
  {
    id: '13',
    title: 'Silk Thread Parandi',
    price: 699,
    category: 'customized-parandis',
    images: [hair1],
    description: 'Premium silk thread parandi with personalized color options.',
    variants: ['Pink','Blue','Black'],
    isSale: false,
    isNew: true,
    rating: 4.7,
    numReviews: 19
  },

  // ---------- Kids ----------
  {
    id: '14',
    title: 'Kids Summer Cotton Dress',
    price: 1499,
    category: 'kids',
    images: [dress1],
    description: 'Lightweight cotton dress for kids. Soft and breathable for all-day comfort.',
    variants: ['2-4Y','4-6Y','6-8Y'],
    isSale: true,
    isNew: false,
    rating: 4.6,
    numReviews: 16
  },
  {
    id: '15',
    title: 'Kids Ethnic Kurta Set',
    price: 1799,
    category: 'kids',
    images: [dress2],
    description: 'Traditional kurta set for kids, crafted in soft fabric for festive wear.',
    variants: ['3-5Y','5-7Y','7-9Y'],
    isSale: false,
    isNew: true,
    rating: 4.9,
    numReviews: 10
  }
];


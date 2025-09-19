import React from "react";
import Carousel from '../components/Carousel';
import SocialMedia from '../components/SocialMedia';
import CategoryCollection from '../components/CategoryCollection';
import CategoryCard from "../components/CategoryCard";
import { supabase } from "../services/supabase";
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors, Gift, MapPin, ShieldCheck, CreditCard } from "lucide-react";
import { Instagram } from "react-feather";

// Hero images
import banner1 from "../assets/hero1.jpg";
import banner2 from "../assets/hero2.jpeg";
import banner3 from "../assets/hero3.jpeg";


// Example "Shop The Look" images (replace with your actual paths)
import look1 from "../assets/hero1.jpg";
import look2 from "../assets/hero3.jpeg";

export default function Home(){

  const heroes = [banner2, banner3, banner1];

  // Fetch products from Supabase (or use fake data as fallback)
  const [products, setProducts] = React.useState([]);
  
  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) {
        console.error("Error fetching products:", error);

      } else {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  
  return (
    <div className="font-sans text-brand-black bg-beige-light pb-1">
      
      {/* Floating WhatsApp Chat Widget */}
      <a
        href="https://wa.me/9814687469"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition"
        title="Chat with us"
        aria-label="Chat with us"
      >
        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          className="text-white"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 2.1.55 4.1 1.6 5.9L.5 23.5l5.8-1.5c1.7 1 3.7 1.6 5.7 1.6 6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5zm0 20.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.4.9.9-3.3-.2-.4c-1-1.5-1.5-3.2-1.5-5 0-5.1 4.1-9.2 9.2-9.2 2.4 0 4.7.9 6.4 2.6 1.7 1.7 2.6 4 2.6 6.4-.1 5-4.2 9.2-9.2 9.2zm4.9-6.7c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-1 .9c-.2 0-.4 0-.7-.2-.3-.2-1.1-.4-2-1.4-.7-.8-1.1-1.6-1.3-1.9-.1-.3 0-.4.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6s-.7-1.8-1-2.4c-.3-.7-.5-.6-.7-.6h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.2.5 1.6.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.3.3-.7.3-1.2.2-1.3z" />
        </svg>
      </a>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto px-4 pt-20"
      >
        <Carousel images={heroes} autoPlay />
      </motion.section>

      {/* Category Highlights */}
      <CategoryCard />

      {/* Featured Collection */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-b from-white via-beige-light/30 to-white rounded-3xl mt-8 shadow-md">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-black tracking-wide mb-1">
              Shop by Category
            </h2>
            <p className="text-sm md:text-base text-brand-black/60">
              Discover our curated collections designed to inspire and delight
            </p>
          </div>
          <Link
            to="/collection"
            className="text-sm md:text-base font-medium text-beige-dark border border-beige-dark px-4 py-2 rounded-full hover:bg-beige-dark hover:text-white transition"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          {products.slice(0, 8).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges below grid */}
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          <div className="flex items-center gap-2 text-beige-dark font-semibold">
            <ShieldCheck className="w-6 h-6" />
            Secure Payments
          </div>
          <div className="flex items-center gap-2 text-beige-dark font-semibold">
            <CreditCard className="w-6 h-6" />
            Cash on Delivery
          </div>
          <div className="flex items-center gap-2 text-beige-dark font-semibold">
            <Gift className="w-6 h-6" />
            Hassle-free Returns
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="h-0.5 w-40 bg-gradient-to-r from-beige-dark/20 via-beige-dark to-beige-dark/20 rounded-full" />
        </div>
      </section>


      {/* Shop The Look */}
      <SocialMedia />

      <div className="flex justify-center mt-8">
        <a
          href="https://www.instagram.com/nodima_designer?igsh=ajYwcWw1NWYxNzRy"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-beige text-black px-6 py-3 rounded-md font-semibold shadow-md hover:bg-beige-dark transition-colors flex items-center gap-2"
        >
          <Instagram size={20} />
          <span>Follow Us On @nodima_boutique</span>
        </a>
      </div>

      {/* Stats + Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-beige py-20 mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

          {/* Stats */}
          <div>
            <h2 className="text-3xl font-serif mb-8">Trusted by Customers Worldwide 🌍</h2>
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <p className="text-5xl font-extrabold">500+</p>
                <p className="text-brand-black/70">Happy Customers</p>
              </div>
              <div>
                <p className="text-5xl font-extrabold">10+</p>
                <p className="text-brand-black/70">Countries Served</p>
              </div>
            </div>
          </div>

          {/* Testimonials with arrows/swiper for UX */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">What Our Customers Say</h3>
            {/* Replace below with a TestimonialsCarousel if needed */}
            <div className="space-y-6">
              <div>
                <p className="text-yellow-500 text-lg">★★★★★</p>
                <p className="italic">“The custom suit fit perfectly and was delivered on time. Highly recommend!”</p>
              </div>
              <div>
                <p className="text-yellow-500 text-lg">★★★★★</p>
                <p className="italic">“The handcrafted pillow covers added such a cozy vibe to my home.”</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        viewport={{ once: true }}
        className="bg-white py-20 mt-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-black">
              Why choose <span className="text-beige-dark">Nodima</span>
            </h2>
            <p className="text-brand-black/60 mt-2 text-sm md:text-base max-w-2xl mx-auto">
              We bring together tradition, craftsmanship, and modern elegance to give you an experience like no other.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Custom Stitching", 
                desc: "Perfect fit & fabric of your choice.", 
                icon: <Scissors className="w-10 h-10 text-beige-dark" /> 
              },
              { 
                title: "Handcrafted Gifts", 
                desc: "Thoughtful, artisanal pieces.", 
                icon: <Gift className="w-10 h-10 text-beige-dark" /> 
              },
              { 
                title: "Local Pickup", 
                desc: "Pick up in our Amritsar store.", 
                icon: <MapPin className="w-10 h-10 text-beige-dark" /> 
              },
            ].map((b, i) => (
              <div
                className="p-6 rounded-xl bg-beige-light shadow-sm hover:shadow-md transition text-center"
                key={i}
              >
                <div className="flex justify-center mb-4">{b.icon}</div>
                <h3 className="font-medium text-base md:text-lg">{b.title}</h3>
                <p className="text-brand-black/70 mt-2 text-sm md:text-base">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Signup */}
      {/* <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-4 py-16 mt-16 mb-12 bg-beige-light rounded-2xl text-center shadow"
      >
        <h3 className="text-xl font-semibold mb-2 text-brand-black">Join The Pehnaava Family</h3>
        <p className="mb-6 text-brand-black/60">Get exclusive offers & early access to our new collections</p>
        <form className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 py-2 rounded px-3 border border-beige-dark bg-white outline-none"
          />
          <button
            type="submit"
            className="bg-beige-dark text-white px-5 rounded hover:bg-brand-black transition"
          >
            Subscribe
          </button>
        </form>
      </motion.section> */}
    </div>
  );
}

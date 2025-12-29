import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scissors, Gift, MapPin, ShieldCheck, CreditCard } from "lucide-react";
import { Instagram } from "react-feather";

import Carousel from "../components/Carousel";
import SocialMedia from "../components/SocialMedia";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

import { supabase } from "../services/supabase";

// Hero images
import banner1 from "../assets/hero1.jpg";
import banner2 from "../assets/hero2.jpeg";
import banner3 from "../assets/hero3.jpeg";

export default function Home() {
  const heroes = [banner2, banner3, banner1];

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="font-sans text-brand-black bg-beige-light pb-1">

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/9814687469"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition"
        aria-label="Chat with us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          className="text-white"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 2.1.55 4.1 1.6 5.9L.5 23.5l5.8-1.5c1.7 1 3.7 1.6 5.7 1.6 6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5z" />
        </svg>
      </a>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto px-4 pt-20"
      >
        <Carousel images={heroes} autoPlay />
      </motion.section>

      {/* Categories */}
      <CategoryCard />

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-b from-white via-beige-light/30 to-white rounded-3xl mt-8 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-1">
              Shop by Category
            </h2>
            <p className="text-sm md:text-base text-brand-black/60">
              Discover our curated collections
            </p>
          </div>
          <Link
            to="/collection"
            className="text-sm md:text-base font-medium border px-4 py-2 rounded-full hover:bg-beige-dark hover:text-white transition"
          >
            View All
          </Link>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck /> Secure Payments
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <CreditCard /> Cash on Delivery
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <Gift /> Hassle-free Returns
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialMedia />

      <div className="flex justify-center mt-8">
        <a
          href="https://www.instagram.com/nodima_designer"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-beige px-6 py-3 rounded-md font-semibold shadow-md hover:bg-beige-dark transition flex items-center gap-2"
        >
          <Instagram size={20} />
          Follow @nodima_boutique
        </a>
      </div>

      {/* Services */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white py-20 mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          {[
            { title: "Custom Stitching", desc: "Perfect fit & fabric.", icon: <Scissors /> },
            { title: "Handcrafted Gifts", desc: "Artisanal pieces.", icon: <Gift /> },
            { title: "Local Pickup", desc: "Amritsar store.", icon: <MapPin /> },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-beige-light shadow text-center">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-brand-black/70 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

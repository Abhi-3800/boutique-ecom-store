import { Helmet } from "react-helmet-async";
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
    <>
    <Helmet>
      <title>Nodima | Elegance in Every Stitch</title>
      <meta
        name="description"
        content="Explore Nodima Designs premium handcrafted fashion where elegance meets timeless design."
      />
    </Helmet>
    <div className="font-sans text-brand-black bg-beige-light pb-1">

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/9814687469"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] p-4 rounded-full shadow-lg z-50
                  hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
        >
          <path d="M16.04 2.01c-7.73 0-14.03 6.3-14.03 14.04
            0 2.48.65 4.91 1.88 7.05L2 30l7.07-1.86a14
            14 0 0 0 6.97 1.78h.01c7.74 0 14.04-6.3
            14.04-14.04S23.78 2.01 16.04 2.01zm8.19
            19.29c-.34.96-1.99 1.84-2.8 1.98-.77.14
            -1.75.2-2.83-.18-.66-.21-1.5-.49-2.59-1
            -4.55-1.97-7.52-6.6-7.75-6.9-.23-.3-1.85-2.46
            -1.85-4.69s1.16-3.33 1.57-3.79c.41-.46.9-.58
            1.2-.58.3 0 .6 0 .86.01.28.01.65-.1
            .99.76.34.86 1.17 2.97 1.27 3.18.1.21.17
            .45.03.72-.14.27-.21.45-.41.69-.2.24-.42
            .54-.6.73-.2.2-.4.42-.17.82.23.4 1.03
            1.7 2.21 2.76 1.52 1.36 2.8 1.78 3.2
            1.98.4.2.63.17.86-.1.23-.27 1-1.17
            1.27-1.57.27-.4.54-.34.91-.2.37.14
            2.35 1.11 2.75 1.31.4.2.67.3.77.47
            .1.17.1.96-.24 1.92z"/>
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
            <CreditCard /> Multiple Payment Options
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
    </>
  );
}

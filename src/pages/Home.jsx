import React from "react";
import Carousel from '../components/Carousel';
import SocialMedia from '../components/SocialMedia';
import { products } from '../utils/fakeData';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors, Gift, MapPin, ShieldCheck, CreditCard } from "lucide-react";

// Hero images
import banner1 from "../assets/hero1.jpg";
import banner2 from "../assets/hero2.jpeg";
import banner3 from "../assets/hero3.jpeg";

// Example category images (replace with your actual paths)
import catDresses from "../assets/hair2.jpg";
import catSuits from "../assets/hero3.jpeg";
import catAccessories from "../assets/palazzo1.jpg";
import catHome from "../assets/cushion1.jpg";

// Example "Shop The Look" images (replace with your actual paths)
import look1 from "../assets/hero1.jpg";
import look2 from "../assets/hero3.jpeg";

export default function Home(){

  const heroes = [banner2, banner3, banner1];

  // Replace with your actual categories!
  const categories = [
    { label: "Dresses", img: catDresses },
    { label: "Suits", img: catSuits },
    { label: "Accessories", img: catAccessories },
    { label: "Home Decor", img: catHome }
  ];

  // Replace with your actual lookbook images!
  const shopTheLook = [
    { img: look1, label: "Festive Look" },
    { img: look2, label: "Everyday Elegance" }
  ];

  return (
    <div className="font-sans text-brand-black bg-beige-light pb-4">
      
      {/* Floating Chat Widget */}
      <a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-beige-dark p-3 rounded-full shadow-lg z-50 hover:bg-brand-black transition"
        title="Chat with us"
        aria-label="Chat with us"
      >
        {/* WhatsApp SVG icon */}
        <svg width="24" height="24" fill="currentColor" className="text-white">
          <path d="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
        </svg>
      </a>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto px-4 pt-24"
      >
        <Carousel images={heroes} autoPlay textOverlay={[
          {heading: "Elevate Your Style", text: "Discover the intersection of tradition and trend."},
          {heading: "Crafted With Love", text: "Handmade. Handpicked. Just for you."},
          {heading: "New Season, New Arrivals", text: "Shop the freshest finds in store now."}
        ]} />
      </motion.section>

      {/* Category Highlights */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link to={`/category/${cat.label.toLowerCase()}`} key={cat.label}
              className="group rounded-xl overflow-hidden shadow hover:scale-105 transition flex flex-col items-center bg-white"
            >
              <img src={cat.img} alt={cat.label}
                className="h-28 sm:h-32 w-full object-cover transition group-hover:scale-110" />
              <div className="p-2 w-full text-center font-semibold text-brand-black">{cat.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="max-w-6xl mx-auto px-6 py-20 bg-gradient-to-b from-white via-beige-light/30 to-white rounded-3xl mt-12 shadow-md">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-black tracking-wide">
              Featured Collection
            </h2>
            <p className="text-sm md:text-base text-brand-black/60 mt-2">
              Curated picks loved by our customers
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
          {products.slice(0, 6).map((p, i) => (
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
        <div className="flex flex-wrap justify-center gap-10 mt-12">
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
        <div className="mt-12 flex justify-center">
          <div className="h-0.5 w-40 bg-gradient-to-r from-beige-dark/20 via-beige-dark to-beige-dark/20 rounded-full" />
        </div>
      </section>

      {/* Shop The Look */}
      <SocialMedia />

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
              Why choose <span className="text-beige-dark">Pehnaava</span>
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
      <motion.section
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
      </motion.section>
    </div>
  );
}

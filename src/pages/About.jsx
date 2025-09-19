import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import founder1 from "../assets/founder1.jpg";
import founder2 from "../assets/founder2.jpg";
import logo8 from "../assets/logo8.png";

export default function About() {
  return (
    <div className="bg-beige-light min-h-screen py-20 px-6 md:px-16 font-serif text-brand-black w-full">
      {/* Page Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 tracking-wide text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Nodima
      </motion.h1>

      {/* ⭐ Our Story (inserted component) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 py-16 mt-16 mb-20 bg-gradient-to-r from-white via-beige-light/40 to-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-10"
      >
        {/* Left: Image */}
        <div className="flex-1">
          <img
            src={logo8}
            alt="Our Story"
            className="rounded-2xl shadow-md object-cover w-full h-[320px]"
          />
        </div>

        {/* Right: Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-brand-black/70 leading-relaxed mb-5">
            At <span className="font-semibold text-brand-black">Nodima Boutique</span>, 
            we believe fashion is more than clothing. It’s a reflection of identity, 
            confidence, and timeless elegance. What began as a passion for curating 
            refined styles has grown into a boutique that celebrates women who embrace 
            sophistication in their everyday lives. 
          </p>
          <p className="text-brand-black/70 leading-relaxed mb-6">
            Each collection is thoughtfully designed, blending heritage craftsmanship 
            with contemporary aesthetics. From handpicked fabrics to artisanal finishes, 
            our pieces are made to last, empowering you to express your individuality 
            with grace.
          </p>
          <p className="text-lg font-bold text-brand-black mb-6">
            “Elegance In Every Stitch”
          </p>

          <Link
            to="/collection"
            className="inline-block bg-beige-dark text-white px-6 py-3 rounded-full shadow hover:bg-brand-black transition"
          >
            Discover More
          </Link>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        className="grid md:grid-cols-3 gap-12 text-center mb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {[
          {
            title: "Authenticity",
            desc: "Handcrafted designs that honor heritage.",
            delay: 0.3
          },
          {
            title: "Quality",
            desc: "Sourced fabrics and precision stitching.",
            delay: 0.45
          },
          {
            title: "Sustainability",
            desc: "Eco-conscious processes and ethical sourcing.",
            delay: 0.6
          },
        ].map(({ title, desc, delay }) => (
          <motion.div
            key={title}
            className="bg-white bg-opacity-50 rounded-xl p-6 shadow-md text-[#7f6f54]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay }}
          >
            <h3 className="text-xl font-semibold text-beige-dark mb-2 tracking-wide">{title}</h3>
            <p className="text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {[
            { name: "Harnoor Chawla", role: "Founder & Designer", bio: "Passionate about bringing handcrafted fashion to life.", img: founder2 },
            { name: "Arvind Kaur", role: "Founder & Designer", bio: "Ensures every stitch is perfect and every fit is flawless.", img: founder1},
          ].map(({ name, role, bio, img }) => (
            <div key={name} className="flex flex-col items-center text-center space-y-4 p-6 bg-white bg-opacity-50 rounded-lg shadow-md text-[#7f6f54]">
              <img src={img} alt={name}   className="w-32 h-32 rounded-full object-cover object-top border-4 border-beige-light shadow-md" />
              <h3 className="text-xl font-semibold text-beige-dark">{name}</h3>
              <p className="italic text-sm">{role}</p>
              <p className="text-sm leading-relaxed max-w-xs">{bio}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

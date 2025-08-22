import React from "react";
import { motion } from "framer-motion";

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
        About Pehnaava
      </motion.h1>

      {/* Boutique Story */}
      <motion.section
        className="max-w-3xl mx-auto mb-16 space-y-6 text-lg leading-relaxed text-[#7f6f54]"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>
          At <span className="font-semibold text-beige-dark">Pehnaava</span>, we blend
          timeless tradition with modern elegance. Founded in the heart of Amritsar, our boutique brings you handcrafted apparel and thoughtfully curated collections. Each piece tells a story — weaving heritage, artisan craftsmanship, and contemporary style.
        </p>
        <p>
          Our mission is to empower you to wear confidence, comfort, and culture — all in one frame. We believe luxury lies in quality, fit, and the small details which make fashion personal.
        </p>
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
            { name: "Anjali Singh", role: "Founder & Designer", bio: "Passionate about bringing handcrafted fashion to life.", img: "https://i.pravatar.cc/300?img=47" },
            { name: "Rohan Verma", role: "Head Tailor", bio: "Ensures every stitch is perfect and every fit is flawless.", img: "https://i.pravatar.cc/300?img=48" },
          ].map(({ name, role, bio, img }) => (
            <div key={name} className="flex flex-col items-center text-center space-y-4 p-6 bg-white bg-opacity-50 rounded-lg shadow-md text-[#7f6f54]">
              <img src={img} alt={name} className="w-32 h-32 rounded-full object-cover border-4 border-beige-light shadow-md" />
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

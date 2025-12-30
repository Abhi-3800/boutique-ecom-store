import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Carousel({ images = [], overlayText }) {
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-2xl shadow-soft">
      {/* Images */}
      <motion.div
        className="absolute inset-0 flex"
        initial={{ x: 0 }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-full h-[420px] object-cover flex-shrink-0"
          />
        ))}
      </motion.div>

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Elegance Stitched With Love ✨
        </h1>
        <p className="mt-3 text-lg max-w-2xl drop-shadow">
          Discover handcrafted suits, palazzos & boutique pieces.
        </p>
        <Link
          to="/collection"
          className="mt-6 inline-block px-6 py-3 bg-white text-black rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  )
}
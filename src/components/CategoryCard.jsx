import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Instagram } from 'react-feather';
import React, { useState, useEffect } from 'react';
import baby1 from "../assets/baby1.jpg";
import baby2 from "../assets/baby2.jpg";
import suit1 from "../assets/suit1.jpg";
import suit2 from "../assets/suit2.jpg";
import shawl1 from "../assets/shawl1.jpg";
import shawl2 from "../assets/shawl2.jpg";
import hank1 from "../assets/hank1.jpg";
import hank2 from "../assets/hank2.jpg";
import hank3 from "../assets/hank3.jpg";


const CategoryCard = () => {
    const categories = [
      { label: "Baby Memory Blankets", images: [baby2, baby1], count: "20+ items", trending: true },
      { label: "Signature Handkerchief", images: [hank3, hank2, hank1], count: "60+ items", trending: false },
      { label: "Embroidered Dupattas", images: [shawl1, shawl2], count: "150+ items", trending: true }
    ];

  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    let interval;
    if (hoveredCard !== null) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => {
          const newIndex = { ...prev };
          const currentIndex = newIndex[hoveredCard] || 0;
          const nextIndex = (currentIndex + 1) % categories[hoveredCard].images.length;
          newIndex[hoveredCard] = nextIndex;
          return newIndex;
        });
      }, 800);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hoveredCard, categories]);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-neutral-100 py-12 px-6">
      <section className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="w-20 h-1 bg-gradient-to-r from-amber-200 via-amber-300 to-stone-300 rounded-full opacity-60"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 flex items-center justify-center gap-3">
            Featured Collection
            <Sparkles className="text-amber-400 animate-pulse" size={22} />
          </h2>
          <p className="text-stone-600 text-base max-w-xl mx-auto leading-relaxed">
            Curated picks loved by our customers worldwide ranging from suits to accessories and home decor
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={cat.label}
              className="group relative bg-gradient-to-br from-white/80 to-stone-50/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-stone-200/50"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => {
                setHoveredCard(index);
                setCurrentImageIndex(prev => ({ ...prev, [index]: 0 }));
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
              }}
            >
              {/* Trending Badge */}
              {cat.trending && (
                <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-400 to-orange-400 
                                text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md 
                                animate-bounce">
                  Trending
                </div>
              )}

              {/* Image */}
              <div className="relative h-28 sm:h-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent z-10"></div>
                <img
                  src={cat.images[currentImageIndex[index] || 0]}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                />

                {/* Floating Arrow (fixed) */}
                <Link
                  to="/collection"
                  className="absolute bottom-3 right-3 z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-100"
                >
                  <ArrowRight className="text-stone-700" size={16} />
                </Link>
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-4 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-14 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>

                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-stone-800 group-hover:text-amber-900">
                    {cat.label}
                  </h3>
                  <a
                    href="https://www.instagram.com/nodima_designer?igsh=ajYwcWw1NWYxNzRy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-pink-500 hover:text-pink-600"
                  >
                    <Instagram size={18} />
                  </a>
                </div>

                <p className="text-stone-500 text-xs sm:text-sm font-medium mb-2">
                  {cat.count}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200/50">
                  <span className="text-[10px] font-semibold text-stone-600 uppercase tracking-wider">
                    Explore
                  </span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-amber-300 rounded-full opacity-70"></div>
                    <div className="w-1 h-1 bg-stone-300 rounded-full opacity-50"></div>
                    <div className="w-1 h-1 bg-stone-300 rounded-full opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="/collection"
            className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-stone-200/50 hover:shadow-lg hover:bg-amber-50/70 transition"
          >
            <span className="text-stone-700 font-semibold text-sm">View All Categories</span>
            <ArrowRight className="text-amber-600" size={18} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default CategoryCard;

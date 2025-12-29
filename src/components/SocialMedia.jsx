import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, ExternalLink } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const instagramMedia = [
  {
    id: 1,
    image:
      "https://jkcdtllpbpzlndunyjna.supabase.co/storage/v1/object/public/Products/hank1.jpg",
    instagramUrl: "https://www.instagram.com/p/DNlKu3xhQCY/",
    isReel: false,
  },
  {
    id: 2,
    image:
      "https://jkcdtllpbpzlndunyjna.supabase.co/storage/v1/object/public/Products/hank2.jpg",
    instagramUrl: "https://www.instagram.com/reel/DNlQ5DEhhIU/",
    isReel: true,
  },
  {
    id: 3,
    image:
      "https://jkcdtllpbpzlndunyjna.supabase.co/storage/v1/object/public/Products/hank3.jpg",
    instagramUrl: "https://www.instagram.com/p/DMky3kdymoI/",
    isReel: false,
  },
  {
    id: 4,
    image:
      "https://jkcdtllpbpzlndunyjna.supabase.co/storage/v1/object/public/Products/hank3.jpg",
    instagramUrl: "https://www.instagram.com/p/DMky3kdymoI/",
    isReel: false,
  }
];

export default function InstagramCarousel() {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-20">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 text-center">
        Instagram Highlights
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {instagramMedia.map(({ id, image, instagramUrl, isReel }) => (
          <SwiperSlide key={id}>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block rounded-xl overflow-hidden shadow-md group"
            >
              {/* Image */}
              <img
                src={image}
                alt="Instagram look"
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Reel indicator */}
              {isReel && (
                <div className="absolute top-3 right-3 bg-black/70 rounded-full p-2">
                  <Play className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center px-4">
                
                {/* Shop This Look Button */}
                <button
                  type="button"
                  className="bg-white text-black px-5 py-2 rounded-full font-semibold text-sm hover:bg-beige-dark hover:text-white transition"
                >
                  Shop this look
                </button>

                {/* View on Instagram */}
                <div className="flex items-center gap-1 mt-3 text-white text-sm opacity-90">
                  <ExternalLink className="w-4 h-4" />
                  <span>View on Instagram</span>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

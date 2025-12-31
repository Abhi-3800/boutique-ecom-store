import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, ExternalLink } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ins } from "framer-motion/client";

const instagramMedia = [
  {
    id: 1,
    image:
      "https://jkcdtllpbpzlndunyjna.supabase.co/storage/v1/object/sign/Products/hank3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMWJjMDViMi1jMTkwLTQ0OTEtYjliNy02NmE3MzY4Yzk3ODIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQcm9kdWN0cy9oYW5rMy5qcGciLCJpYXQiOjE3NjcwMTU0ODgsImV4cCI6MTgzMDA4NzQ4OH0.3vzWEpvTEHmq_CoxEABjfvotdJ6n9-V_yAKsCMkKloI",
    instagramUrl: "https://www.instagram.com/reel/DNlQ5DEhhIU/?igsh=MTVwdzk2dzR1eXRodQ==",
    isReel: false,
  },
  {
    id: 2,
    image:
      "https://jkcdtllpbpzlndunyjna.supabase.co/storage/v1/object/sign/Products/baby1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMWJjMDViMi1jMTkwLTQ0OTEtYjliNy02NmE3MzY4Yzk3ODIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQcm9kdWN0cy9iYWJ5MS5qcGciLCJpYXQiOjE3NjcwMTQ5NjksImV4cCI6MTgyOTY1NDk2OX0.VkBCeqPCIboXG080Msyv4GR5-5qddWtt8FRg0850Iyw",
    instagramUrl: "https://www.instagram.com/reel/DNlQ5DEhhIU/?igsh=MTVwdzk2dzR1eXRodQ==",
    isReel: true,
  },
  {
    id: 3,
    image:
      "https://jkcdtllpbpzlndunyjna.supabase.co/storage/v1/object/sign/Products/hair13.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMWJjMDViMi1jMTkwLTQ0OTEtYjliNy02NmE3MzY4Yzk3ODIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQcm9kdWN0cy9oYWlyMTMuanBnIiwiaWF0IjoxNzY3MDgzMjQ0LCJleHAiOjE4MzAxNTUyNDR9.lSJXFwYNb_kJdPwh0kU7YtmiIE_lv-IUBvrbrk12hPE",
    instagramUrl: "https://www.instagram.com/p/Cu1jX4xLZpM/?igsh=MTVwdzk2dzR1eXRodQ==",
    isReel: false,
  },
  {
    id: 4,
    image:
      "https://jkcdtllpbpzlndunyjna.supabase.co/storage/v1/object/sign/Products/baby3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMWJjMDViMi1jMTkwLTQ0OTEtYjliNy02NmE3MzY4Yzk3ODIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQcm9kdWN0cy9iYWJ5My5qcGciLCJpYXQiOjE3NjcwMTQ5OTYsImV4cCI6MTgyOTY1NDk5Nn0.p3EI9e1TLWEMVXmsGOXoqiguAtpi1eJak4ahp72xk6E",
    instagramUrl: "https://www.instagram.com/reel/DNlQ5DEhhIU/?igsh=MTVwdzk2dzR1eXRodQ==",
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
                  Shop this product
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

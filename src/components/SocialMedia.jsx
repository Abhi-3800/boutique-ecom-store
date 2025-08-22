import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ✅ Development dummy data
const instagramMedia = [
  {
    id: 1,
    type: "post",
    // random fashion image
    media: "https://picsum.photos/400/400?random=1",
    url: "https://www.instagram.com/p/DMky3kdymoI/",
  },
  {
    id: 2,
    type: "reel",
    // sample video that always works
    media: "https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4",
    poster: "https://picsum.photos/400/400?random=2",
    url: "https://www.instagram.com/reel/DM-ZyxfgLMa/",
  },
  {
    id: 3,
    type: "post",
    media: "https://picsum.photos/400/400?random=3",
    url: "https://www.instagram.com/p/DMky3kdymoI/",
  },
  {
    id: 4,
    type: "post",
    media: "https://picsum.photos/400/400?random=4",
    url: "https://www.instagram.com/p/DMky3kdymoI/",
  },
  {
    id: 5,
    type: "reel",
    media: "https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4",
    poster: "https://picsum.photos/400/400?random=5",
    url: "https://www.instagram.com/reel/DM-ZyxfgLMa/",
  },
  {
    id: 6,
    type: "post",
    media: "https://picsum.photos/400/400?random=7",
    url: "https://www.instagram.com/p/DMky3kdymoI/",
  },
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
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="group"
      >
        {instagramMedia.map(({ id, type, media, poster, url }) => (
          <SwiperSlide key={id}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block rounded-lg overflow-hidden shadow-md cursor-pointer group"
            >
              {type === "post" && (
                <img
                  src={media}
                  alt={`Instagram post ${id}`}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              )}

              {type === "reel" && (
                <>
                  <video
                    src={media}
                    poster={poster}
                    className="w-full h-56 object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                </>
              )}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

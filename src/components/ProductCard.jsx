import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const timerRef = React.useRef(null);
  const navigate = useNavigate();

  const images = product.images || [];

  // Clear timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Carousel on hover
  useEffect(() => {
    if (hovered && images.length > 1) {
      timerRef.current = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % images.length);
      }, 1000);
    } else {
      clearTimer();
      setActiveImage(0);
    }
    return () => clearTimer();
  }, [hovered, images.length]);

  const isColorVariant = product.variantType === "color";
  const swatches = isColorVariant ? product.variants : null;

  return (
    <div
      className="relative group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-[#b49b7f] text-white px-2 py-0.5 rounded text-xs font-bold z-10">
            New
          </div>
        )}
        {product.isSale && (
          <div className="absolute top-3 right-3 bg-[#ff5555] text-white px-2 py-0.5 rounded text-xs font-bold z-10">
            Sale
          </div>
        )}

        <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3]">
          <button className="absolute top-3 right-3 z-30 bg-white rounded-full p-2 shadow-md hover:bg-[#f8f5f2] transition">
            <Heart className="w-5 h-5 text-[#b49b7f]" />
          </button>

          {images.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.title} image ${idx + 1}`}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
                idx === activeImage ? "opacity-100 z-10" : "opacity-0 z-0"
              } ${hovered ? "scale-110" : "scale-100"}`}
              loading="lazy"
            />
          ))}
        </div>
      </Link>

      <div className="bg-white rounded-lg shadow-md px-3 pb-3 flex flex-col w-full mx-auto -mt-5 z-20 relative max-w-full sm:max-w-xs">
        <h3 className="text-base font-semibold my-2 truncate">{product.title}</h3>

        <div className="flex gap-1 items-center text-[#b49b7f] text-xs mb-1">
          <Star className="w-4 h-4 fill-[#eacb9c]" />
          <span>{product.rating ?? "4.7"}</span>
          <span className="text-gray-400">({product.numReviews ?? 28})</span>
        </div>

        <p className="text-gray-600 text-xs mb-1 line-clamp-2 min-h-[2.5em]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[#b49b7f] font-bold text-lg">₹{product.price}</span>

          {swatches ? (
            <div className="flex gap-1">
              {swatches.slice(0, 4).map((clr) => (
                <span
                  key={clr}
                  className="w-5 h-5 rounded-full border border-[#ece1d0] inline-block"
                  style={{ background: clr }}
                  title={clr}
                ></span>
              ))}
              {swatches.length > 4 && (
                <span className="ml-1 text-xs text-gray-500">
                  +{swatches.length - 4}
                </span>
              )}
            </div>
          ) : product.variants?.length > 1 ? (
            <select className="border rounded px-1 py-0.5 text-xs">
              {product.variants.map((variant, idx) => (
                <option key={idx} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full mt-2 py-1 rounded bg-[#b49b7f] text-white text-sm hover:bg-[#917d63] transition"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
}
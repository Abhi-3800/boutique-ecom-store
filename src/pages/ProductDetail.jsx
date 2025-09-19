import { useParams, Link } from "react-router-dom";
import { useState, useRef } from "react";
import { products } from "../utils/fakeData";
import WishlistButton from "../components/WishlistButton";
import EnquiryForm from "../components/EnquiryForm";
import { ChevronLeft, ChevronRight, Star, Truck, RefreshCcw, Share2 } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const enquiryRef = useRef(null);

  // Demo variant/size/color/qty state
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const [cartFeedback, setCartFeedback] = useState(false);

  if (!product)
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-[#b49b7f] font-semibold px-4">
        Product not found.
      </div>
    );

  // Combine main image + thumbnails
  const allImages = product.images || [];
  const relatedProducts = products.filter((p) => p.id !== id);

  // Scroll handlers for related carousel
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Cart feedback demo
  const addToCartHandler = () => {
    setCartFeedback(true);
    setTimeout(() => setCartFeedback(false), 1500);
  };

  // Social share demo function
  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href); // copy link to clipboard
    alert("Product link copied!");
  };

  // Scroll to enquiry form
  const scrollToEnquiry = () => {
    enquiryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f5f2] flex flex-col gap-16 px-6 md:px-16 py-20">
      {/* Top Section: Product */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex flex-col flex-1 max-md:w-full">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 border border-[#ece1d0] bg-[#ece1d0]">
            <img
              src={allImages[activeIndex]}
              alt={`${product.title} large`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto md:flex-wrap">
            {allImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-28 h-28 rounded-xl border flex-shrink-0 overflow-hidden focus:outline-none transition-transform ${
                  activeIndex === i
                    ? "border-[#b49b7f] scale-110"
                    : "border-[#d9cab3] hover:scale-105"
                }`}
                aria-label={`View image ${i + 1}`}
                type="button"
              >
                <img
                  src={src}
                  alt={`${product.title} preview ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col flex-1 max-md:w-full gap-4 md:gap-6">
          <h1 className="text-4xl font-bold text-[#b49b7f]">{product.title}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 text-[#c8ad7f]">
            <Star className="w-5 h-5 fill-[#c8ad7f]" />
            <span className="font-semibold text-lg">{product.rating || "4.7"}</span>
            <span className="text-[#917d63]">({product.reviews?.length || 29} reviews)</span>
          </div>

          {/* Product Price */}
          {/* <p className="text-[#917d63] text-2xl font-semibold mt-1">
            ₹{Number(product.price).toLocaleString()}
          </p> */}
          <p className="mt-1 text-[#7f6f54]">{product.description}</p>

          {/* Wishlist, Add to Cart, Social Share, Enquire */}
          <div className="mt-4 flex gap-4 items-center flex-wrap">
            {/* <WishlistButton product={product} /> */}
            {/* <button
              className="px-7 py-3 bg-[#b49b7f] text-white rounded hover:bg-[#917d63] transition"
              onClick={addToCartHandler}
              aria-label="Add to Cart"
            >
              Add to Cart
            </button> */}
            <button
              className="bg-transparent px-3 py-2 hover:bg-[#ece1d0] rounded border-2 border-[#ece1d0] text-[#b49b7f] flex items-center gap-2"
              onClick={shareProduct}
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" /> Share
            </button>
            {/* <button
              onClick={scrollToEnquiry}
              className="px-6 py-3 bg-[#917d63] text-white rounded hover:bg-[#7f6f54] transition"
            >
              Enquire Now
            </button> */}
          </div>

          {/* Add to Cart Feedback */}
          {cartFeedback && (
            <div className="mt-2 text-green-700 font-semibold animate-fadeIn">
              Added to cart!
            </div>
          )}

          {/* Tabs for details/Shipping/Returns */}
          <div className="mt-8">
            <Tabs />
          </div>

          {/* Enquiry Form */}
          <div ref={enquiryRef} className="mt-10">
            <EnquiryForm product={product} />
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      <div>
        <h2 className="text-2xl text-center font-bold text-[#b49b7f] mb-6 mx-4">
          Related Products
        </h2>
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#b49b7f] text-white p-2 rounded-full shadow hover:bg-[#917d63] transition z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#b49b7f] text-white p-2 rounded-full shadow hover:bg-[#917d63] transition z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Related Products */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-10"
          >
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="flex-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 min-w-[180px] bg-white rounded-xl shadow hover:scale-105 hover:shadow-lg transition-transform duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-t-xl">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[#7f6f54] font-semibold truncate">
                    {item.title}
                  </h3>
                  <p className="text-[#917d63]">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* TABS SECTION */
function Tabs() {
  const [tab, setTab] = useState("details");
  return (
    <div>
      <div className="flex gap-8 border-b-[1.5px] border-[#ece1d0]">
        <button
          className={`pb-3 font-medium text-lg ${
            tab === "details"
              ? "border-b-2 border-[#b49b7f] text-[#b49b7f]"
              : "text-[#917d63]"
          }`}
          onClick={() => setTab("details")}
        >
          Details
        </button>
        <button
          className={`pb-3 font-medium text-lg ${
            tab === "shipping"
              ? "border-b-2 border-[#b49b7f] text-[#b49b7f]"
              : "text-[#917d63]"
          }`}
          onClick={() => setTab("shipping")}
        >
          Shipping
        </button>
        <button
          className={`pb-3 font-medium text-lg ${
            tab === "returns"
              ? "border-b-2 border-[#b49b7f] text-[#b49b7f]"
              : "text-[#917d63]"
          }`}
          onClick={() => setTab("returns")}
        >
          Returns
        </button>
      </div>
      <div className="mt-4 text-[#7f6f54]">
        {tab === "details" && (
          <p>
            All garments are thoughtfully designed and crafted using the finest fabrics.
            For specific sizing or care queries, please reach out to our boutique staff.
          </p>
        )}
        {tab === "shipping" && (
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5" />
            <span>
              Standard shipping across India (3-6 working days). Tracking provided for all orders.
            </span>
          </div>
        )}
        {tab === "returns" && (
          <div className="flex items-center gap-3">
            <RefreshCcw className="w-5 h-5" />
            <span>
              Returns accepted within 7 days for unused, unworn items with tags. Read our{" "}
              <a href="/returns" className="underline text-[#b49b7f]">Returns Policy</a>.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

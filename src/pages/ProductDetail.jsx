import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../services/supabase";
import EnquiryForm from "../components/EnquiryForm";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RefreshCcw,
  Share2,
  Heart
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const enquiryRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [cartFeedback, setCartFeedback] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  /* ----------------------------------
     FETCH PRODUCT FROM SUPABASE
  ---------------------------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setProduct(null);
      } else {
        setProduct(data);
        setSelectedColor(data?.colors?.[0] || "");
        setSelectedSize(data?.sizes?.[0] || "");
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  /* ----------------------------------
     FETCH RELATED PRODUCTS
  ---------------------------------- */
  useEffect(() => {
    const fetchRelated = async () => {
      if (!product) return;

      const { data } = await supabase
        .from("products")
        .select("*")
        .neq("id", product.id)
        .limit(10);

      setRelatedProducts(data || []);
    };

    fetchRelated();
  }, [product]);

  /* ----------------------------------
     WISHLIST HANDLER
  ---------------------------------- */
  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    // Check if already wishlisted
    const { data: existing, error: checkError } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", Number(product.id))
      .maybeSingle();

    if (checkError) {
      console.error("Wishlist check error:", checkError);
      return;
    }

    // If exists → remove
    if (existing) {
      const { error: deleteError } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", existing.id);

      if (deleteError) {
        console.error("Wishlist remove error:", deleteError);
      }
      return;
    }

    // Else → add
    const { error: insertError } = await supabase.from("wishlists").insert({
      user_id: user.id,
      product_id: Number(product.id),
    });

    if (insertError) {
      console.error("Wishlist insert error:", insertError);
    }
  };

  /* ----------------------------------
     UTILITIES
  ---------------------------------- */
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied!");
  };

  const scrollToEnquiry = () => {
    enquiryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ----------------------------------
     STATES
  ---------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#b49b7f]">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#b49b7f]">
        Product not found.
      </div>
    );
  }

  const allImages = product.images || [];

  return (
    <div className="w-full min-h-screen bg-[#f8f5f2] flex flex-col gap-16 px-6 md:px-16 py-20">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="flex flex-col flex-1">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 border bg-[#ece1d0]">
            <img
              src={allImages[activeIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto">
            {allImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-28 h-28 rounded-xl border overflow-hidden ${
                  activeIndex === i
                    ? "border-[#b49b7f] scale-110"
                    : "border-[#d9cab3]"
                }`}
              >
                <img src={src} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 gap-4">
          <h1 className="text-4xl font-bold text-[#b49b7f]">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 text-[#c8ad7f]">
            <Star className="w-5 h-5 fill-[#c8ad7f]" />
            <span className="font-semibold text-lg">
              {product.rating || "4.7"}
            </span>
          </div>

          <p className="mt-1 text-[#7f6f54]">{product.description}</p>

          {/* Actions */}
          <div className="mt-4 flex gap-4 items-center flex-wrap">
            {/* WISHLIST */}
            <button
              onClick={handleWishlistClick}
              disabled={wishlistLoading}
              className="px-4 py-2 border-2 border-[#ece1d0] rounded flex items-center gap-2 text-[#b49b7f]"
            >
              <Heart className="w-5 h-5" />
              Wishlist
            </button>

            <button
              onClick={shareProduct}
              className="px-4 py-2 border-2 border-[#ece1d0] rounded flex items-center gap-2 text-[#b49b7f]"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {cartFeedback && (
            <div className="text-green-700 font-semibold">
              Added to cart!
            </div>
          )}

          <Tabs />

          <div ref={enquiryRef} className="mt-10">
            <EnquiryForm product={product} />
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div>
        <h2 className="text-2xl text-center font-bold text-[#b49b7f] mb-6">
          Related Products
        </h2>

        <div className="relative">
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 z-10">
            <ChevronLeft />
          </button>

          <button onClick={scrollRight} className="absolute right-0 top-1/2 z-10">
            <ChevronRight />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto px-10"
          >
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="min-w-[180px] bg-white rounded-xl shadow"
              >
                <img
                  src={item.images?.[0]}
                  className="aspect-[3/4] object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="truncate">{item.title}</h3>
                  <p>₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- TABS ---------------- */

function Tabs() {
  const [tab, setTab] = useState("details");

  return (
    <div className="mt-8">
      <div className="flex gap-8 border-b">
        {["details", "shipping", "returns"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 ${
              tab === t
                ? "border-b-2 border-[#b49b7f] text-[#b49b7f]"
                : "text-[#917d63]"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-4 text-[#7f6f54]">
        {tab === "details" && (
          <p>
            All garments are thoughtfully designed and crafted using the finest
            fabrics.
          </p>
        )}
        {tab === "shipping" && (
          <div className="flex gap-2">
            <Truck /> Standard delivery in 3–6 working days.
          </div>
        )}
        {tab === "returns" && (
          <div className="flex gap-2">
            <RefreshCcw /> Returns accepted within 7 days.
          </div>
        )}
      </div>
    </div>
  );
}

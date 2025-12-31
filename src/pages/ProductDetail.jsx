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
  Heart,
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

  const [wishlistLoading, setWishlistLoading] = useState(false);

  /* ---------------- FETCH PRODUCT ---------------- */
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
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  /* -------- RESET IMAGE INDEX -------- */
  useEffect(() => {
    setActiveIndex(0);
  }, [id]);

  /* -------- FETCH RELATED PRODUCTS -------- */
  useEffect(() => {
    const fetchRelated = async () => {
      if (!product?.category) return;

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category", product.category)
        .neq("id", product.id)
        .limit(10);

      setRelatedProducts(data || []);
    };

    fetchRelated();
  }, [product]);

  /* -------- WISHLIST -------- */
  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlistLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data: existing } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", Number(product.id))
      .maybeSingle();

    if (existing) {
      await supabase.from("wishlists").delete().eq("id", existing.id);
    } else {
      await supabase.from("wishlists").insert({
        user_id: user.id,
        product_id: Number(product.id),
      });
    }

    setWishlistLoading(false);
  };

  const scrollLeft = () =>
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });

  const scrollRight = () =>
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });

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
      {/* PRODUCT */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* IMAGE */}
        <div className="flex flex-col flex-1">
          <div className="relative w-full h-[360px] md:h-[460px] lg:h-[520px] rounded-2xl mb-6 overflow-hidden border bg-[#f3efe9]">
            {/* blurred background */}
            <img
              src={allImages[activeIndex] || allImages[0]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
            />
            {/* main image */}
            <img
              src={allImages[activeIndex] || allImages[0]}
              alt={product.title}
              className="relative z-10 w-full h-full object-contain"
            />
          </div>

          {/* thumbnails */}
          <div className="flex gap-4">
            {allImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-24 h-24 rounded-xl border bg-[#f3efe9] flex items-center justify-center ${
                  activeIndex === i
                    ? "border-[#b49b7f] scale-110"
                    : "border-[#d9cab3]"
                }`}
              >
                <img src={src} className="max-w-full max-h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col flex-1 gap-4">
          <h1 className="text-4xl font-bold text-[#b49b7f]">
            {product.title}
          </h1>
          <p className="text-2xl font-bold text-[#b49b7f] mt-1">
            ₹{product.price}
          </p>
          <div className="flex items-center gap-2 text-[#c8ad7f]">
            <Star className="w-5 h-5 fill-[#c8ad7f]" />
            <span className="font-semibold text-lg">
              {product.rating || "4.7"}
            </span>
          </div>
          <p className="text-[#7f6f54]">{product.description}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleWishlistClick}
              disabled={wishlistLoading}
              className="px-4 py-2 border-2 border-[#ece1d0] rounded flex gap-2 text-[#b49b7f]"
            >
              <Heart className="w-5 h-5" />
              Wishlist
            </button>
          </div>

          <Tabs />
          <div ref={enquiryRef} className="mt-10">
            <EnquiryForm product={product} />
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl text-center font-bold text-[#b49b7f] mb-6">
            Related Products
          </h2>

          <div className="relative">
            {relatedProducts.length > 4 && (
              <>
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
                >
                  <ChevronLeft />
                </button>

                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
                >
                  <ChevronRight />
                </button>
              </>
            )}

            <div
              ref={carouselRef}
              className={`flex gap-6 px-10 ${
                relatedProducts.length > 4
                  ? "overflow-x-hidden"
                  : "justify-center"
              }`}
            >
              {(relatedProducts.length > 4
                ? relatedProducts
                : relatedProducts.slice(0, 4)
              ).map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="w-[180px] sm:w-[200px] bg-white rounded-xl shadow flex flex-col flex-shrink-0"
                >
                  {/* blurred-fill card image */}
                  <div className="relative h-[140px] rounded-t-xl overflow-hidden bg-[#f1ece5]">
                    <img
                      src={item.images?.[0]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                    />
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="relative z-10 w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold">
                      ₹{item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
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
        {tab === "details" && <p>Finest fabrics and craftsmanship.</p>}
        {tab === "shipping" && (
          <div className="flex gap-2">
            <Truck /> Delivered in 3–6 working days.
          </div>
        )}
        {tab === "returns" && (
          <div className="flex gap-2">
            <RefreshCcw /> Currently we don't accept returns.
          </div>
        )}
      </div>
    </div>
  );
}

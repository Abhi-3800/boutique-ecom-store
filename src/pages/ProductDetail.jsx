import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../services/supabase";
import EnquiryForm from "../components/EnquiryForm";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RefreshCcw,
  Heart,
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const enquiryRef = useRef(null);
  const [buyOpen, setBuyOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
  const handleProceedToPayment = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase.functions.invoke(
        "create-razorpay-order",
        {
          body: {
            productId: product.id,
            quantity,
          },
        }
      );

      if (error) {
        console.error(error);
        return;
      }

      const options = {
  
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Noor Fashion Hut",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            const { data: verifyData, error: verifyError } =
              await supabase.functions.invoke("verify-razorpay-payment", {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              });

            console.log("Verification result:", verifyData);

            if (verifyError) {
              console.error(verifyError);
              toast.error("Payment verification failed ❌");
              return;
            }

            // ✅ Close modal
            setBuyOpen(false);

            // ✅ Show success toast
            toast.success("Your order has been placed successfully 🎉");

            // ✅ Redirect after short delay
            setTimeout(() => {
              navigate("/orders");
            }, 1200);

          } catch (err) {
            console.error(err);
            toast.error("Something went wrong ❌");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
    }
  };

  /* -------- WISHLIST -------- */
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

    await toggleWishlist(product.id);
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

          <div className="flex gap-4 mt-4 flex-wrap">
            <button
              onClick={() => setBuyOpen(true)}
              className="px-4 py-2 bg-[#b49b7f] text-white rounded flex items-center gap-2 hover:opacity-90 transition"
            >
              Buy Now
            </button>

            <button
              onClick={handleWishlistClick}
              className="px-5 py-2 border rounded-xl flex items-center gap-2 hover:shadow-md transition"
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  isWishlisted(product.id)
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-500"
                }`}
              />

              <span>
                {isWishlisted(product.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </span>
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
    <BuyNowModal
      open={buyOpen}
      onClose={() => setBuyOpen(false)}
      product={product}
      quantity={quantity}
      setQuantity={setQuantity}
      onProceed={handleProceedToPayment}
    />
    </div>
  );
}

function BuyNowModal({ open, onClose, product, quantity, setQuantity, onProceed }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative bg-white w-full
          sm:max-w-md
          rounded-t-3xl sm:rounded-2xl
          p-6
          shadow-2xl
          animate-[fadeIn_0.2s_ease-out]
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <h2 className="text-xl font-bold text-[#b49b7f] mb-4">
          Buy {product.title}
        </h2>

        {/* Product Summary */}
        <div className="flex gap-4 mb-4">
          <img
            src={product.images?.[0]}
            className="w-20 h-20 object-contain border rounded"
          />
          <div>
            <p className="font-semibold">{product.title}</p>
            <p className="text-[#b49b7f] font-bold">
              ₹{product.price}
            </p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 border rounded-full flex items-center justify-center"
          >
            −
          </button>

          <span className="font-semibold text-lg">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 border rounded-full flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={onProceed}
          className="w-full py-3 rounded-xl bg-[#b49b7f] text-white font-semibold hover:opacity-90 transition"
        >
          Proceed to Payment
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full text-sm text-gray-500 hover:text-black"
        >
          Cancel
        </button>
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
        {tab === "details" && <p>Finest fabrics and craftsmanship. Customization also available.</p>}
        {tab === "shipping" && (
          <div className="flex gap-2">
            <Truck /> Delivered in 3–6 working days.
          </div>
        )}
        {tab === "returns" && (
          <Link
            to="/returns"
            className="flex items-center gap-2 text-sm  hover:text-black"
          >
            <RefreshCcw className="w-4 h-4 flex-shrink-0" />
            <span>
              Currently we don’t accept returns.{" "}
              <span className="underline">Learn more</span>
            </span>
          </Link>
        )}

      </div>
    </div>
  );
}
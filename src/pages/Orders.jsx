import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data } = await supabase
        .from("orders")
        .select(`
          *,
          products (
            title,
            images,
            price
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setOrders(data || []);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#b49b7f]">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] px-6 md:px-16 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#b49b7f] mb-12">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-[#917d63]">
          You haven’t placed any orders yet.
        </div>
      ) : (
        <div className="grid gap-8 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-6"
            >
              {/* Product Image */}
              <div className="w-full sm:w-32 h-32 bg-[#f3efe9] rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={order.products?.images?.[0]}
                  alt=""
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg font-semibold text-[#3d2f1f]">
                    {order.products?.title}
                  </h2>

                  <p className="text-sm text-[#917d63] mt-1">
                    Quantity: {order.quantity}
                  </p>

                  {order.selected_variant && (
                    <p className="text-sm text-[#917d63]">
                      Variant: {order.selected_variant}
                    </p>
                  )}

                  <p className="mt-2 text-[#b49b7f] font-bold text-lg">
                    ₹{(order.amount / 100).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Status */}
                <div className="mt-4">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
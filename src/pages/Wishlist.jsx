import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../services/supabase"

export default function Wishlist() {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchWishlist = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        navigate("/login")
        return
      }

      const { data, error } = await supabase
        .from("wishlists")
        .select(`
          id,
          products!wishlists_product_fk (*)
        `)
        .eq("user_id", user.id);

      if (error) {
        console.error("Wishlist fetch error:", error)
      } else {
        // flatten product data
        setItems(
          (data || []).map((row) => ({
            wishlist_id: row.id,
            ...row.products,
          }))
        )
      }
    }

    fetchWishlist()
  }, [navigate])

  const removeFromWishlist = async (wishlistId) => {
    await supabase.from("wishlists").delete().eq("id", wishlistId)
    setItems((prev) => prev.filter((p) => p.wishlist_id !== wishlistId))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Your Wishlist
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-600 text-center">
          No items yet.{" "}
          <Link to="/collection" className="underline">
            Browse collection
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((p) => (
            <div key={p.wishlist_id} className="card">
              <Link to={`/product/${p.id}`}>
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{p.price}
                    </p>
                  </div>

                  <button
                    className="px-3 py-2 rounded-xl border hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault()
                      removeFromWishlist(p.wishlist_id)
                    }}
                  >
                    Remove
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

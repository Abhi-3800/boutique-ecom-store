import { useWishlist } from '../context/WishlistContext'

export default function WishlistButton({ product }){
  const { items, add, remove } = useWishlist()
  const exists = items.find(p=>p.id===product.id)
  return (
    <button
      aria-label="wishlist"
      onClick={(e)=>{ e.preventDefault(); exists ? remove(product.id) : add(product) }}
      className={"px-3 py-2 rounded-xl border " + (exists ? "bg-black text-white" : "hover:bg-gray-100")}
    >
      {exists ? "♥" : "♡"}
    </button>
  )
}

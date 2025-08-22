import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist(){
  const { items, remove } = useWishlist()
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {items.length===0 ? (
        <p className="text-gray-600">No items yet. <Link to="/collection" className="underline">Browse collection</Link></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(p=>(
            <div key={p.id} className="card">
              <Link to={`/product/${p.id}`}>
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3">
                  <img src={p.images?.[0]} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">₹{p.price}</p>
                  </div>
                  <button className="px-3 py-2 rounded-xl border hover:bg-gray-100" onClick={(e)=>{ e.preventDefault(); remove(p.id) }}>Remove</button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

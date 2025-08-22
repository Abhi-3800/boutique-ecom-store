import { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(()=>{
    const saved = localStorage.getItem('be_wishlist')
    if (saved) setItems(JSON.parse(saved))
  },[])

  useEffect(()=>{
    localStorage.setItem('be_wishlist', JSON.stringify(items))
  },[items])

  const add = (product) => {
    setItems(prev => prev.find(p=>p.id===product.id) ? prev : [...prev, product])
  }
  const remove = (id) => setItems(prev => prev.filter(p=>p.id!==id))

  return (
    <WishlistContext.Provider value={{ items, add, remove }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)

// src/contexts/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '../components/Auth/AuthContext'
import { supabase } from '../services/supabase'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const { user } = useAuth()

  // Fetch cart from Supabase
  const fetchCart = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching cart:', error)
      return
    }

    setCart(data || [])
  }

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      throw new Error('Must be logged in to add to cart')
    }

    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: product.id,
        quantity
      })
      .select()

    if (error) {
      console.error('Error adding to cart:', error)
      return
    }

    fetchCart()
  }

  // Remove from cart
  const removeFromCart = async (cartItemId) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)

    if (error) {
      console.error('Error removing from cart:', error)
      return
    }

    fetchCart()
  }

  useEffect(() => {
    if (user) {
      fetchCart()
    }
  }, [user])

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      fetchCart 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
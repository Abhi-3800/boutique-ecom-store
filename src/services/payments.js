// src/services/payment.js
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabase'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export const processPayment = async (cart, user) => {
  try {
    // Create checkout session on the backend
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: JSON.stringify({
        cart,
        userId: user.id
      })
    })

    if (error) throw error

    // Redirect to Stripe Checkout
    const stripe = await stripePromise
    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId
    })

    if (result.error) {
      console.error(result.error)
    }
  } catch (err) {
    console.error('Payment processing error:', err)
  }
}
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from '@vercel/analytics/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <App />
            <Analytics />
          </BrowserRouter>
        </HelmetProvider>
      </WishlistProvider>
    </AuthProvider>
  </React.StrictMode>
)

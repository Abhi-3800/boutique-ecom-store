import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CategoryCollection from './components/CategoryCollection'
import Home from './pages/Home'
import About from "./pages/About";
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Returns from './pages/Returns.jsx'
import ScrollToTop from './components/ScrollToTop'
import Orders from './pages/Orders.jsx'
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ScrollToTop />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#3d2f1f",
              border: "1px solid #e8dcc9",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/category/:id" element={<CategoryCollection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}

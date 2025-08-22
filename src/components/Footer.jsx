import { Phone, Mail, MapPin } from "lucide-react"
import { FaInstagram, FaFacebook, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-beige-light/40 border-t border-beige-dark/20 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        
        {/* About */}
        <div>
          <h3 className="font-semibold text-brand-black mb-3">About Us</h3>
          <p className="text-gray-600 leading-relaxed">
            Amritsar-based boutique specializing in custom-stitched suits and
            handcrafted gifts. We bring tradition and elegance together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-brand-black mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/" className="hover:text-brand-black transition">Home</a></li>
            <li><a href="/collection" className="hover:text-brand-black transition">Collections</a></li>
            <li><a href="/about" className="hover:text-brand-black transition">About</a></li>
            <li><a href="/contact" className="hover:text-brand-black transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-brand-black mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2"><Phone size={16}/> +91-90000 00000</li>
            <li className="flex items-center gap-2"><Mail size={16}/> boutique@example.com</li>
            <li className="flex items-center gap-2"><MapPin size={16}/> Amritsar, Punjab</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-brand-black mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://instagram.com" className="p-2 rounded-full bg-white shadow hover:bg-beige-dark hover:text-white transition">
              <FaInstagram size={18} />
            </a>
            <a href="https://facebook.com" className="p-2 rounded-full bg-white shadow hover:bg-beige-dark hover:text-white transition">
              <FaFacebook size={18} />
            </a>
            <a href="https://pinterest.com" className="p-2 rounded-full bg-white shadow hover:bg-beige-dark hover:text-white transition">
              <FaPinterest size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-beige-dark/10 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} Boutique. All rights reserved.
      </div>
    </footer>
  )
}

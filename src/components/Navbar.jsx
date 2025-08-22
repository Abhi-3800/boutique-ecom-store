import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ShoppingBag, Heart, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const links = [
    { name: "Home", to: "/" },
    {
      name: "Collections",
      to: "/collection",
      dropdown: [
        { name: "Sarees", to: "/collection/sarees" },
        { name: "Kurtas", to: "/collection/kurtas" },
        { name: "Accessories", to: "/collection/accessories" },
        { name: "New Arrivals", to: "/collection/new" },
      ],
    },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-beige-100/95 shadow-md backdrop-blur-sm" : "bg-beige-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-gray-800 hover:text-rose-500 transition-colors"
        >
          <span className="text-rose-400">Pehnaava</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 font-medium relative">
          {links.map((link) =>
            link.dropdown ? (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-rose-500 transition-colors duration-200"
                >
                  <span>{link.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-100 shadow-lg rounded-lg py-2 animate-fadeIn">
                    {link.dropdown.map((d) => (
                      <Link
                        key={d.to}
                        to={d.to}
                        className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-gray-700 hover:text-rose-500 transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="hover:text-rose-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <Link to="/login" className="hover:text-rose-500 transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-rose-500"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-beige-100 shadow-inner px-4 py-6 space-y-4 animate-slideDown">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.name}>
                <button
                  className="flex items-center justify-between w-full text-gray-800 hover:text-rose-500"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {link.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="mt-2 space-y-2 pl-4">
                    {link.dropdown.map((d) => (
                      <Link
                        key={d.to}
                        to={d.to}
                        className="block text-gray-700 hover:text-rose-500"
                        onClick={() => setMobileOpen(false)}
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="block text-gray-800 hover:text-rose-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}

          {/* Icons in Mobile */}
          <div className="flex space-x-6 pt-4">
            <button className="hover:text-rose-500">
              <Heart className="w-5 h-5" />
            </button>
            <button className="hover:text-rose-500">
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

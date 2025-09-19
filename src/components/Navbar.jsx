import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, ShoppingBag, Heart, ChevronDown } from "lucide-react"
import logo3 from "../assets/logo10.png" // updated logo with only NODIMA text

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState(null) // track logged-in user
  const navigate = useNavigate()

  const links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
    {
      name: "View Store",
      to: "/collection",
      dropdown: [
        { name: "Parandis", to: "/collection" },
        { name: "Suits", to: "/collection" },
        { name: "Pallazos", to: "/collection" },
        { name: "New Arrivals", to: "/collection" },
      ],
    },
  ]

  // Check login state
  useEffect(() => {
    const loggedUser = localStorage.getItem("user")
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCartClick = () => {
    if (!user) {
      navigate("/login") // redirect if not logged in
    } else {
      navigate("/cart") // go to cart if logged in
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/") // back to home
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-beige-100/95 shadow-md backdrop-blur-sm"
          : "bg-beige-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo3}
            alt="ND Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 font-medium relative">
          {links.map((link) =>
            link.dropdown ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center space-x-1 text-black-700 hover:text-rose-500 transition-colors duration-200">
                  <span>{link.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-100 shadow-lg rounded-lg py-2 animate-fadeIn">
                    {link.dropdown.map((d) => (
                      <Link
                        key={d.to}
                        to={d.to}
                        className="block px-4 py-2 text-black-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
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
                className="relative text-black-700 hover:text-rose-500 transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Icons + Login/Logout */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="hover:text-rose-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={handleCartClick}
            className="hover:text-rose-500 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>

          {!user ? (
            <Link
              to="/login"
              className="text-black-700 hover:text-rose-500 transition-colors font-medium"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-black-700 hover:text-rose-500 transition-colors font-medium"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black-700 hover:text-rose-500"
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
                  className="flex items-center justify-between w-full text-black-800 hover:text-rose-500"
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
                        className="block text-black-700 hover:text-rose-500"
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
                className="block text-black-800 hover:text-rose-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}

          {/* Icons + Login in Mobile */}
          <div className="flex space-x-6 pt-4 items-center">
            <button className="hover:text-rose-500">
              <Heart className="w-5 h-5" />
            </button>
            <button onClick={handleCartClick} className="hover:text-rose-500">
              <ShoppingBag className="w-5 h-5" />
            </button>

            {!user ? (
              <Link
                to="/login"
                className="text-black-700 hover:text-rose-500 transition-colors font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-black-700 hover:text-rose-500 transition-colors font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

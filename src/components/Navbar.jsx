import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, Heart, ChevronDown } from "lucide-react"
import logo3 from "../assets/logo10.png"
import { supabase } from "../services/supabase"
import { useWishlist } from "../context/WishlistContext"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const { wishlistCount } = useWishlist()

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

  /* ---------------- Auth State (Supabase) ---------------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ---------------- Handlers ---------------- */
  const handleWishlistClick = () => {
    if (!user) {
      navigate("/login")
    } else {
      navigate("/wishlist")
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
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
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo3}
            alt="ND Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 font-medium">
          {links.map((link) =>
            link.dropdown ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center space-x-1 hover:text-rose-500">
                  <span>{link.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                    {link.dropdown.map((d) => (
                      <Link
                        key={d.name}
                        to={d.to}
                        className="block px-4 py-2 hover:bg-rose-50 hover:text-rose-500"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                className="hover:text-rose-500 transition-colors"
              >
                {link.name}
              </Link>
            )
          )}
          {user && (
            <Link
              to="/orders"
              className="hover:text-rose-500 transition-colors"
            >
              Orders
            </Link>
          )}
          {user && wishlistCount > 0 && (
          <Link
            to="/wishlist"
            className="flex items-center gap-2 hover:text-rose-500 transition-colors"
          >
            <Heart
              className="w-5 h-5 fill-red-500 text-red-500"
            />
            Wishlist
          </Link>
        )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {!user ? (
            <Link to="/login" className="font-medium hover:text-rose-500">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="font-medium hover:text-rose-500"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden hover:text-rose-500"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-beige-100 px-4 py-6 space-y-4">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.name}>
                <button
                  className="flex justify-between w-full hover:text-rose-500"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {link.name}
                  <ChevronDown
                    className={`transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="mt-2 pl-4 space-y-2">
                    {link.dropdown.map((d) => (
                      <Link
                        key={d.name}
                        to={d.to}
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
                key={link.name}
                to={link.to}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}

          {/* Mobile Wishlist */}
          {user && (
            <button
              onClick={handleWishlistClick}
              className="flex items-center gap-2 hover:text-rose-500"
            >
              <Heart />
              Wishlist
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

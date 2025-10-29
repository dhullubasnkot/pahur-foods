import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useCart } from "../context/cartcontext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Calculate total items count
  const totalItems = cart.length;

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="inline-block">
          <img
            src="/pahurlogo.png"
            alt="Pahur Logo"
            className="w-36 h-[70px] object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {[
            { label: "Products", path: "/products" },
            { label: "Contact", path: "/contact" },
            { label: "Cart", path: "/cart", showCount: true },
            { label: "Profile", path: "/admin" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="relative text-black hover:text-orange-600 text-lg font-medium transition duration-200 ease-in-out group flex items-center"
            >
              {item.label}

              {/* Show count badge only for Cart */}
              {item.showCount && totalItems > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-600 rounded-full">
                  {totalItems}
                </span>
              )}

              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-orange-500 hover:text-orange-600 focus:outline-none transition-transform duration-200 ease-in-out active:scale-95"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-orange-100/95 shadow-md rounded-b-lg px-6 py-4 space-y-3 animate-fade-in-down">
          {[
            { label: "Products", path: "/products" },
            { label: "Contact", path: "/contact" },
            { label: "Cart", path: "/cart", showCount: true },
            { label: "Profile", path: "/profile" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={toggleMenu}
              className="flex items-center text-orange-600 hover:text-orange-800 text-lg font-semibold py-1 transition duration-150"
            >
              {item.label}
              {/* Cart count badge */}
              {item.showCount && totalItems > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
//
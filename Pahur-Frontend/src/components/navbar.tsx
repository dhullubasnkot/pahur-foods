import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-orange-500 tracking-wide hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          Pahur
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {[
            { label: "Products", path: "/products" },
            { label: "Contact", path: "/contact" },
            { label: "Cart", path: "/profile" },
            { label: "Profile", path: "/profile" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="relative text-black hover:text-orange-600 text-lg font-medium transition duration-200 ease-in-out group"
            >
              {item.label}
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
            { label: "Cart", path: "/profile" },
            { label: "Profile", path: "/profile" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={toggleMenu}
              className="block text-orange-600 hover:text-orange-800 text-lg font-semibold py-1 transition duration-150"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

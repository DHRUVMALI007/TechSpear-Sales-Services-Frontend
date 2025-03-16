import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../Helpers/ThemeContext";
import Logo from "./Logo";
import { SiSearxng } from "react-icons/si";
import { FaBars, FaTimes, FaUserCircle, FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(3); // Example cart count
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Detect Scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check login status from localStorage
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // If user exists, set logged-in state
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 left-0 z-[100] w-full h-auto md:h-24 lg:h-28 transition duration-200 ${isDarkMode ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-800 shadow-md"
          } ${isScrolled ? "shadow-lg" : ""}`}
        style={{ "--header-height": "4rem" }}
      >
        <div className="lg:container mx-auto flex items-center justify-between py-2 px-2 md:px-8 text-lg font-semibold">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <Logo className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto max-w-[150px] sm:max-w-[180px] md:max-w-[200px]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:space-x-6 xl:space-x-20 xl:text-base 2xl:text-lg">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/about-us" className="hover:text-blue-500">About Us</Link>
            <Link to="/services" className="hover:text-blue-500">Services</Link>
            <Link to="/contact-us" className="hover:text-blue-500">Contact Us</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center w-auto lg:w-full max-w-sm border rounded-full focus-within:shadow pl-2">
              <input
                type="search"
                placeholder="Search Here..."
                className="w-full outline-none px-2 py-1 bg-transparent"
              />
              <button className="text-lg min-w-[50px] h-8 bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-r-full text-white">
                <SiSearxng />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            {/* <button onClick={toggleTheme} className="hidden lg:inline text-xl p-2 rounded-full hover:bg-gray-700 transition">
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button> */}

            {/* User Panel - Dynamic Login/Logout */}

            {/* Shopping Cart */}
            <div className="relative">
              <button className="text-xl hover:text-blue-500" aria-label="Shopping Cart" onClick={() => navigate("user-cart")}>
                <FaShoppingCart />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            {/* {isLoggedIn ? (
                <Link to="/User-panel" className="text-lg md:text-xl hover:text-blue-500" aria-label="User Profile">
                  <FaUserCircle />
                </Link>
              ) : (
                <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  Login
                </Link>
              )} */}
            <Link to="/User-panel" className="text-lg md:text-xl hover:text-blue-500" aria-label="User Profile">
              <FaUserCircle />
            </Link>
            <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  Login
                </Link>
            {/* Mobile Menu Button */}
            <button className="text-2xl lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar (Mobile Menu) */}
      <div
        className={`fixed left-0 top-[var(--header-height)] w-64 h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
          } shadow-md z-[90] transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button className="text-2xl" onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          <Link to="/" className="hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/about-us" className="hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/services" className="hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/contact-us" className="hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>

          {/* Dynamic Login/Logout in Sidebar */}
          {isLoggedIn ? (
            <Link to="/User-panel" className="hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>User Panel</Link>
          ) : (
            <Link to="/login" className="hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
          )}

          {/* Dark Mode Toggle Inside Sidebar */}
          <div className="flex items-center justify-between p-2 border-t mt-4">
            <span className="text-lg font-medium">Dark Mode:</span>
            <button onClick={toggleTheme} className="text-xl p-2 rounded-full hover:bg-gray-700 transition">
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;

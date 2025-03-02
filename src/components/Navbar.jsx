import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the menu is open

  // Toggle the mobile menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close the mobile menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="flex justify-between items-center p-4 lg:px-36 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl lg:text-4xl font-bold">
        LOGO
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 text-gray-700">
        <li className="relative cursor-pointer group">
          <Link to="/festival">Festival</Link>
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative cursor-pointer group">
          <Link to="/poster">Poster</Link>
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative cursor-pointer group">
          <Link to="/stickers">Stickers</Link>
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative cursor-pointer group">
          <Link to="/clip-meme">Clip & Meme</Link>
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>

      {/* Login Button on Desktop */}
      <button className="bg-red-400 text-white px-4 py-2 lg:px-8 rounded-full hidden lg:block">
        Login
      </button>

      {/* Mobile Menu Toggle (Hamburger Icon) */}
      <button
        className="block md:hidden text-gray-700"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation with Slide-in Animation */}
      <div
        className={`${isMenuOpen
            ? "transform translate-x-0 transition-all duration-500 ease-in-out h-auto"
            : "transform translate-x-full transition-all duration-500 ease-in-out h-0 overflow-hidden"
          } absolute top-0 right-0 w-64 bg-white shadow-md md:hidden z-40`}
      >

        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 text-gray-700"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ul className="flex flex-col items-center gap-6 p-6 text-gray-700">
          <li className="relative cursor-pointer group">
            <Link to="/festival" onClick={closeMenu}>Festival</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative cursor-pointer group">
            <Link to="/poster" onClick={closeMenu}>Poster</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative cursor-pointer group">
            <Link to="/stickers" onClick={closeMenu}>Stickers</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative cursor-pointer group">
            <Link to="/clip-meme" onClick={closeMenu}>Clip & Meme</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        {/* Login Button Inside Hamburger for Mobile */}
        <div className="p-6">
          <button className="bg-red-400 text-white px-4 py-2 rounded-full w-full">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

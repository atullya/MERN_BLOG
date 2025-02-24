import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500 py-4 shadow-md z-20">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="text-white text-2xl font-bold">WriteOn</div>
        <div className={`hidden md:flex space-x-6`}>
          <a href="/" className="text-white hover:text-gray-200">
            Home
          </a>
          <Link
            to={"/price"}
            className="text-white hover:text-gray-200"
          >
            Pricing
          </Link>

          <a href="/about" className="text-white hover:text-gray-200">
            About
          </a>
          <Link to={"/contact"} className="text-white hover:text-gray-200">
            Contact
          </Link>
          {/* Add Login and Signup */}
          <a href="/login" className="text-white hover:text-gray-200">
            Login
          </a>
          <a
            href="/signup"
            className="bg-gray-100 text-blue-500 py-1 px-4 rounded hover:bg-gray-200"
          >
            Signup
          </a>
        </div>
        <div className="md:hidden flex items-center">
          {/* Hamburger Menu */}
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } fixed top-16 left-0 w-full bg-blue-500 z-50`}
      >
        <a href="/" className="block py-2 text-white hover:text-gray-200">
          Home
        </a>
        <Link to={"/price"}>
          <div className="block py-2 text-white hover:text-gray-200">
            Pricing
          </div>
        </Link>
        <a href="/about" className="block py-2 text-white hover:text-gray-200">
          About
        </a>
        <a
          href="/contact"
          className="block py-2 text-white hover:text-gray-200"
        >
          Contact
        </a>
        {/* Add Login and Signup in the Mobile Menu */}
        <a href="/login" className="block py-2 text-white hover:text-gray-200">
          Login
        </a>
        <Link
          to={"/signup"}
          className="block py-2 bg-gray-100 text-blue-500 text-center py-1 mx-4
          rounded hover:bg-gray-200"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

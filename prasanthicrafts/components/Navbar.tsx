"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Update cart count when the component mounts and when the cart changes
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const count = cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
        setCartItemCount(count);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCartItemCount(0);
      }
    };

    // Initial update
    updateCartCount();

    // Listen for storage events to update cart count across tabs
    window.addEventListener("storage", updateCartCount);

    // Custom event for cart updates within the same tab
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-yellow-400 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-black">Prasanthi Crafts</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-black font-medium hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-black font-medium hover:underline">
              About Us
            </Link>
            <div className="relative group">
              <button className="text-black font-medium hover:underline flex items-center">
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link
                    href="/category/wall-hangings"
                    className="block px-4 py-2 text-black hover:bg-yellow-100"
                  >
                    Wall Hangings
                  </Link>
                  <Link
                    href="/category/pottery"
                    className="block px-4 py-2 text-black hover:bg-yellow-100"
                  >
                    Pottery
                  </Link>
                  <Link
                    href="/category/textiles"
                    className="block px-4 py-2 text-black hover:bg-yellow-100"
                  >
                    Textiles
                  </Link>
                  <Link
                    href="/category/jewelry"
                    className="block px-4 py-2 text-black hover:bg-yellow-100"
                  >
                    Jewelry
                  </Link>
                  <Link
                    href="/category/paintings"
                    className="block px-4 py-2 text-black hover:bg-yellow-100"
                  >
                    Paintings
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/contact" className="text-black font-medium hover:underline">
              Contact
            </Link>
          </div>

          {/* Cart Icon and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 transition-all duration-300">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-black hover:bg-yellow-100 py-2 px-3 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-black hover:bg-yellow-100 py-2 px-3 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="py-2">
                <button className="text-black font-medium mb-2 flex items-center">
                  Categories
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/category/wall-hangings"
                    className="block text-black hover:bg-yellow-100 py-1 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wall Hangings
                  </Link>
                  <Link
                    href="/category/pottery"
                    className="block text-black hover:bg-yellow-100 py-1 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pottery
                  </Link>
                  <Link
                    href="/category/textiles"
                    className="block text-black hover:bg-yellow-100 py-1 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Textiles
                  </Link>
                  <Link
                    href="/category/jewelry"
                    className="block text-black hover:bg-yellow-100 py-1 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jewelry
                  </Link>
                  <Link
                    href="/category/paintings"
                    className="block text-black hover:bg-yellow-100 py-1 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Paintings
                  </Link>
                </div>
              </div>
              <Link
                href="/contact"
                className="text-black hover:bg-yellow-100 py-2 px-3 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 
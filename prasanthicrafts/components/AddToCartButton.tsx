"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate adding to cart (in a real app, this would interact with a cart context or API)
    setTimeout(() => {
      // Get existing cart from localStorage or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      
      // Check if product is already in cart
      const existingProductIndex = existingCart.findIndex(
        (item: { id: number }) => item.id === product.id
      );
      
      if (existingProductIndex >= 0) {
        // If already in cart, increment quantity
        existingCart[existingProductIndex].quantity += 1;
      } else {
        // Otherwise add new item
        existingCart.push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          quantity: 1,
        });
      }
      
      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(existingCart));
      
      setIsAdding(false);
      setIsAdded(true);
      
      // Reset "Added" state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full py-3 px-6 rounded-md font-medium transition-all ${
        isAdded
          ? "bg-green-600 text-white"
          : isAdding
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 text-white"
      }`}
    >
      {isAdded ? (
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Added to Cart
        </span>
      ) : isAdding ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Adding...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </span>
      )}
    </button>
  );
} 
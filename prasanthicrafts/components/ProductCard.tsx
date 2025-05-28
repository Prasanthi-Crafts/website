"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-64 w-full">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="bg-white text-black px-4 py-2 rounded-md font-medium">
                View Details
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            onClick={() => {
              // In a real app, this would add the product to the cart
              console.log(`Add ${product.name} to cart`);
            }}
          >
            Add to Cart
          </button>
          
          <Link 
            href={`/product/${product.slug}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
} 
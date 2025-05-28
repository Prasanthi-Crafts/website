"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
  itemCount?: number;
}

interface CategoryCardProps {
  category: Category;
  variant?: 'default' | 'featured' | 'minimal';
  index?: number;
}

export function CategoryCard({ category, variant = 'default', index = 0 }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'featured') {
    return (
      <Link href={`/category/${category.slug}`} className="block group">
        <div 
          className="relative h-80 overflow-hidden rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-yellow"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isHovered ? 'perspective(1000px) rotateY(5deg)' : 'perspective(1000px) rotateY(0deg)',
            transition: 'transform 0.5s ease-out'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image 
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:translate-x-2">{category.name}</h3>
            {category.itemCount && (
              <p className="text-yellow-400 text-sm mb-3">{category.itemCount} items</p>
            )}
            <div className="w-12 h-1 bg-yellow-400 rounded-full mb-4 transform transition-all duration-500 group-hover:w-24"></div>
            <p className="text-white text-sm font-medium opacity-0 transform -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              Explore Collection →
            </p>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'minimal') {
    // Staggered animation based on index
    const animationDelay = `${index * 100}ms`;

    return (
      <Link href={`/category/${category.slug}`} className="block">
        <div 
          className="relative bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
          style={{ animationDelay }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
              <Image 
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-black">{category.name}</h3>
              {category.itemCount && (
                <p className="text-gray-600 text-xs">{category.itemCount} items</p>
              )}
            </div>
          </div>
          <div className={`absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 origin-left transition-transform duration-300 ${isHovered ? 'scale-x-100' : ''}`}></div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/category/${category.slug}`} className="group block">
      <div 
        className="relative h-64 rounded-lg overflow-hidden shadow-md transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-yellow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full bg-gray-200">
          <Image 
            src={category.image}
            alt={category.name}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1 transform transition-transform duration-300 group-hover:translate-x-1">{category.name}</h3>
              {category.itemCount && (
                <p className="text-yellow-400 text-sm opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">{category.itemCount} artisan products</p>
              )}
            </div>
          </div>
          <div 
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="bg-yellow-400 text-black font-medium px-5 py-2.5 rounded-md shadow-lg transform transition-transform duration-300 group-hover:scale-105">
              Explore Collection
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 
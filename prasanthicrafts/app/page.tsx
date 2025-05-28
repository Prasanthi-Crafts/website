import Image from "next/image";
import Link from "next/link";
import { Slideshow } from "@/components/Slideshow";
import { CategoryCard } from "@/components/CategoryCard";

export default function Home() {
  const categories = [
    { id: 1, name: "Wall Hangings", image: "/images/categories/wall-hangings.jpg", slug: "wall-hangings", itemCount: 24 },
    { id: 2, name: "Pottery", image: "/images/categories/pottery.jpg", slug: "pottery", itemCount: 18 },
    { id: 3, name: "Textiles", image: "/images/categories/textiles.jpg", slug: "textiles", itemCount: 15 },
    { id: 4, name: "Jewelry", image: "/images/categories/jewelry.jpg", slug: "jewelry", itemCount: 32 },
    { id: 5, name: "Paintings", image: "/images/categories/paintings.jpg", slug: "paintings", itemCount: 27 },
    { id: 6, name: "Sculptures", image: "/images/categories/sculptures.jpg", slug: "sculptures", itemCount: 12 },
    { id: 7, name: "Home Decor", image: "/images/categories/home-decor.jpg", slug: "home-decor", itemCount: 29 },
    { id: 8, name: "Handmade Paper", image: "/images/categories/handmade-paper.jpg", slug: "handmade-paper", itemCount: 8 },
    { id: 9, name: "Wood Crafts", image: "/images/categories/wood-crafts.jpg", slug: "wood-crafts", itemCount: 16 },
    { id: 10, name: "Metal Crafts", image: "/images/categories/metal-crafts.jpg", slug: "metal-crafts", itemCount: 14 },
    { id: 11, name: "Clay Art", image: "/images/categories/clay-art.jpg", slug: "clay-art", itemCount: 10 },
    { id: 12, name: "Glass Art", image: "/images/categories/glass-art.jpg", slug: "glass-art", itemCount: 7 },
    { id: 13, name: "Embroidery", image: "/images/categories/embroidery.jpg", slug: "embroidery", itemCount: 12 },
    { id: 14, name: "Fabric Art", image: "/images/categories/fabric-art.jpg", slug: "fabric-art", itemCount: 19 },
    { id: 15, name: "Traditional Art", image: "/images/categories/traditional-art.jpg", slug: "traditional-art", itemCount: 23 },
    { id: 16, name: "Contemporary Art", image: "/images/categories/contemporary-art.jpg", slug: "contemporary-art", itemCount: 17 },
  ];

  // Featured categories (subset of all categories)
  const featuredCategories = categories.slice(0, 4);
  
  // Popular categories for the minimal cards
  const popularCategories = categories.slice(4, 12);

  const slides = [
    {
      id: 1,
      title: "New Collection Arrived",
      description: "Check out our latest handcrafted items",
      image: "/images/slideshow/slide1.jpg",
      link: "/new-arrivals"
    },
    {
      id: 2,
      title: "Special Offers",
      description: "Unique handmade items for your home",
      image: "/images/slideshow/slide2.jpg",
      link: "/special-offers"
    },
    {
      id: 3,
      title: "Featured Artists",
      description: "Discover the talented artisans behind our products",
      image: "/images/slideshow/slide3.jpg",
      link: "/artists"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full">
        <Slideshow slides={slides} />
      </section>
      
      {/* Featured Categories */}
      <section className="w-full bg-yellow-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">Explore Our Categories</h2>
              <p className="text-black max-w-2xl">Discover beautiful handcrafted items created by talented artisans from around the world.</p>
            </div>
            <Link 
              href="/categories" 
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              View All Categories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map(category => (
              <CategoryCard key={category.id} category={category} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-2">Browse by Category</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {popularCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} variant="minimal" index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* All Categories in Grid */}
      <section className="w-full bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">All Collections</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

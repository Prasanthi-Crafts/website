import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";

// Simulated data - in a real app, this would come from a database
const categories = [
  { id: 1, name: "Wall Hangings", slug: "wall-hangings" },
  { id: 2, name: "Pottery", slug: "pottery" },
  { id: 3, name: "Textiles", slug: "textiles" },
  { id: 4, name: "Jewelry", slug: "jewelry" },
  { id: 5, name: "Paintings", slug: "paintings" },
  { id: 6, name: "Sculptures", slug: "sculptures" },
  { id: 7, name: "Home Decor", slug: "home-decor" },
  { id: 8, name: "Handmade Paper", slug: "handmade-paper" },
  { id: 9, name: "Wood Crafts", slug: "wood-crafts" },
  { id: 10, name: "Metal Crafts", slug: "metal-crafts" },
  { id: 11, name: "Clay Art", slug: "clay-art" },
  { id: 12, name: "Glass Art", slug: "glass-art" },
  { id: 13, name: "Embroidery", slug: "embroidery" },
  { id: 14, name: "Fabric Art", slug: "fabric-art" },
  { id: 15, name: "Traditional Art", slug: "traditional-art" },
  { id: 16, name: "Contemporary Art", slug: "contemporary-art" },
];

// Mock product data - in a real app, this would come from a database
const products = {
  "wall-hangings": [
    { id: 1, name: "Handcrafted Macramé Wall Hanging", description: "Beautiful bohemian style macramé wall hanging, handmade with natural cotton rope.", image: "/images/products/wall-hangings-1.jpg", slug: "handcrafted-macrame-wall-hanging" },
    { id: 2, name: "Wooden Mandala Wall Art", description: "Intricately carved wooden mandala, perfect for adding a touch of elegance to any room.", image: "/images/products/wall-hangings-2.jpg", slug: "wooden-mandala-wall-art" },
    { id: 3, name: "Embroidered Tapestry", description: "Hand-embroidered tapestry featuring traditional Indian motifs and vibrant colors.", image: "/images/products/wall-hangings-3.jpg", slug: "embroidered-tapestry" },
  ],
  "pottery": [
    { id: 4, name: "Handmade Ceramic Vase", description: "Beautifully crafted ceramic vase with unique glazing techniques.", image: "/images/products/pottery-1.jpg", slug: "handmade-ceramic-vase" },
    { id: 5, name: "Clay Tea Set", description: "Traditional clay tea set, perfect for serving tea with elegance.", image: "/images/products/pottery-2.jpg", slug: "clay-tea-set" },
    { id: 6, name: "Decorative Pottery Bowl", description: "Hand-painted pottery bowl with intricate patterns, ideal for display or practical use.", image: "/images/products/pottery-3.jpg", slug: "decorative-pottery-bowl" },
  ],
  // Data for other categories would follow the same pattern
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Find the category
  const category = categories.find(cat => cat.slug === slug);
  
  // If category doesn't exist, return 404
  if (!category) {
    notFound();
  }
  
  // Get products for this category (or empty array if none exist)
  const categoryProducts = products[slug as keyof typeof products] || [];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
      
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No products found in this category.</p>
      )}
    </div>
  );
}

// Generate static params for all known categories
export function generateStaticParams() {
  return categories.map(category => ({
    slug: category.slug,
  }));
} 
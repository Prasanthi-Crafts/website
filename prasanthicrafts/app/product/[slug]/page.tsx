import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";

// Mock product data - in a real app, this would come from a database
const allProducts = [
  { id: 1, name: "Handcrafted Macramé Wall Hanging", description: "Beautiful bohemian style macramé wall hanging, handmade with natural cotton rope. This intricate piece is carefully crafted by skilled artisans, bringing a touch of nature and texture to your living space. Each piece is unique and makes for a perfect statement piece in any room.", image: "/images/products/wall-hangings-1.jpg", slug: "handcrafted-macrame-wall-hanging", category: "Wall Hangings", categorySlug: "wall-hangings", features: ["Handmade", "Natural cotton", "Sustainable materials", "Wall decoration"] },
  { id: 2, name: "Wooden Mandala Wall Art", description: "Intricately carved wooden mandala, perfect for adding a touch of elegance to any room. Each mandala is hand-carved by skilled craftsmen with attention to detail. The natural wood grain adds warmth and character to this beautiful piece of wall art.", image: "/images/products/wall-hangings-2.jpg", slug: "wooden-mandala-wall-art", category: "Wall Hangings", categorySlug: "wall-hangings", features: ["Hand-carved", "Natural wood", "Intricate design", "Wall decoration"] },
  { id: 3, name: "Embroidered Tapestry", description: "Hand-embroidered tapestry featuring traditional Indian motifs and vibrant colors. This stunning tapestry showcases the rich heritage and artistic traditions of Indian craftsmanship. Each stitch is carefully placed by skilled artisans, creating a beautiful story in fabric.", image: "/images/products/wall-hangings-3.jpg", slug: "embroidered-tapestry", category: "Wall Hangings", categorySlug: "wall-hangings", features: ["Hand-embroidered", "Traditional motifs", "Vibrant colors", "Textile art"] },
  { id: 4, name: "Handmade Ceramic Vase", description: "Beautifully crafted ceramic vase with unique glazing techniques. This stunning vase is wheel-thrown and hand-finished, making each piece one-of-a-kind. The special glazing process creates a beautiful, dynamic surface that changes in different lighting conditions.", image: "/images/products/pottery-1.jpg", slug: "handmade-ceramic-vase", category: "Pottery", categorySlug: "pottery", features: ["Wheel-thrown", "Hand-glazed", "Unique finish", "Home decor"] },
  { id: 5, name: "Clay Tea Set", description: "Traditional clay tea set, perfect for serving tea with elegance. This handcrafted tea set includes a teapot and four cups, all made from natural clay. The earthy tones and simple design highlight the beauty of traditional pottery techniques.", image: "/images/products/pottery-2.jpg", slug: "clay-tea-set", category: "Pottery", categorySlug: "pottery", features: ["Handcrafted", "Natural clay", "Complete set", "Functional art"] },
  { id: 6, name: "Decorative Pottery Bowl", description: "Hand-painted pottery bowl with intricate patterns, ideal for display or practical use. This beautiful bowl is hand-thrown on a potter's wheel and then meticulously painted with traditional designs. It's food-safe and can be used for serving or as a stunning decorative piece.", image: "/images/products/pottery-3.jpg", slug: "decorative-pottery-bowl", category: "Pottery", categorySlug: "pottery", features: ["Hand-thrown", "Hand-painted", "Food-safe", "Versatile use"] },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Find the product
  const product = allProducts.find(p => p.slug === slug);
  
  // If product doesn't exist, return 404
  if (!product) {
    notFound();
  }
  
  // Find related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3); // Limit to 3 related products
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <Link href={`/category/${product.categorySlug}`} className="text-indigo-600 hover:text-indigo-800">
          ← Back to {product.category}
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* Add to Cart */}
          <div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <Link href={`/product/${relatedProduct.slug}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{relatedProduct.name}</h3>
                    <p className="text-gray-600 line-clamp-2">{relatedProduct.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Generate static params for all products
export function generateStaticParams() {
  return allProducts.map(product => ({
    slug: product.slug,
  }));
} 
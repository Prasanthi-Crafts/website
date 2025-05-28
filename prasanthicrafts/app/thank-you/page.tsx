import Link from "next/link";
import Image from "next/image";

export default function ThankYouPage() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-green-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl mb-8">
          Your order has been received. We've sent you an invoice via email.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start">
              <span className="flex-shrink-0 bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
              <p>Our team will review your order and contact you via WhatsApp or phone to confirm details.</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
              <p>We'll provide you with the final price including shipping costs and payment options.</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
              <p>After payment confirmation, we'll ship your items and provide tracking information.</p>
            </div>
          </div>
        </div>
        
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
} 
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isMemberOnly?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  region?: string;
  type?: string;
  year?: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
        {product.isMemberOnly && (
          <span className="bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Member Exclusive
          </span>
        )}
        {product.isNew && (
          <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            New
          </span>
        )}
        {product.isOnSale && (
          <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
        <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="relative pt-[100%] bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          {product.region && (
            <p className="text-sm text-gray-500 mb-1">{product.region}</p>
          )}
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          {product.type && (
            <p className="text-sm text-gray-500 mb-2">{product.type}</p>
          )}
          {product.year && (
            <p className="text-sm text-gray-500 mb-2">Vintage {product.year}</p>
          )}
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= Math.round(product.rating) ? 'fill-current' : ''}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs font-medium text-red-600 ml-auto">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
          
          <button className="mt-3 w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

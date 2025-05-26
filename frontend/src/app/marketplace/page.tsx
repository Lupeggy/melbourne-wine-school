import { Wine, Star, Award, Percent, Shield, Truck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/marketplace/ProductCard';

// Mock data - in a real app, this would come from an API
const featuredProducts = [
  {
    id: 'wine-1',
    name: 'Penfolds Grange 2018',
    price: 950.00,
    originalPrice: 1050.00,
    rating: 4.9,
    reviewCount: 42,
    image: '/images/wines/penfolds-grange.jpg',
    region: 'Barossa Valley, Australia',
    type: 'Red Blend',
    year: 2018,
    isMemberOnly: true,
    isOnSale: true
  },
  {
    id: 'wine-2',
    name: 'Giaconda Chardonnay 2020',
    price: 120.00,
    rating: 4.8,
    reviewCount: 36,
    image: '/images/wines/giaconda-chardonnay.jpg',
    region: 'Beechworth, Australia',
    type: 'Chardonnay',
    year: 2020,
    isNew: true
  },
  {
    id: 'wine-3',
    name: 'Henschke Hill of Grace 2017',
    price: 850.00,
    rating: 4.9,
    reviewCount: 51,
    image: '/images/wines/henschke-hill-of-grace.jpg',
    region: 'Eden Valley, Australia',
    type: 'Shiraz',
    year: 2017,
    isMemberOnly: true
  },
  {
    id: 'wine-4',
    name: 'Leeuwin Estate Art Series Chardonnay 2019',
    price: 95.00,
    originalPrice: 110.00,
    rating: 4.7,
    reviewCount: 28,
    image: '/images/wines/leeuwin-chardonnay.jpg',
    region: 'Margaret River, Australia',
    type: 'Chardonnay',
    year: 2019,
    isOnSale: true
  },
];

const categories = [
  { name: 'Red Wine', slug: 'red', count: 124, icon: <Wine className="h-6 w-6" /> },
  { name: 'White Wine', slug: 'white', count: 98, icon: <Wine className="h-6 w-6" /> },
  { name: 'Sparkling', slug: 'sparkling', count: 45, icon: <Wine className="h-6 w-6" /> },
  { name: 'Rosé', slug: 'rose', count: 32, icon: <Wine className="h-6 w-6" /> },
  { name: 'Dessert & Fortified', slug: 'dessert', count: 27, icon: <Wine className="h-6 w-6" /> },
];

const regions = [
  'Barossa Valley',
  'Margaret River',
  'Yarra Valley',
  'McLaren Vale',
  'Coonawarra',
  'Hunter Valley',
  'Mornington Peninsula',
  'Clare Valley',
];

export default function MarketplacePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Wine Marketplace</h1>
            <p className="text-xl text-primary-100 mb-8">
              Discover exceptional wines from around the world, hand-selected by our experts. 
              Exclusive discounts for Wine Club members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#featured"
                className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-center"
              >
                Shop Now
              </Link>
              <Link 
                href="/wine-club"
                className="border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-center"
              >
                Join Wine Club
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/marketplace/categories" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.slug}
                href={`/marketplace/category/${category.slug}`}
                className="group p-6 bg-gray-50 rounded-lg text-center hover:bg-primary-50 transition-colors border border-gray-100"
              >
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 group-hover:bg-primary-200 group-hover:text-primary-800 transition-colors mb-3">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Wines</h2>
            <Link href="/marketplace/wines" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
              View all wines <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore by Region</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {regions.map((region) => (
              <Link 
                key={region}
                href={`/marketplace/region/${region.toLowerCase().replace(/\s+/g, '-')}`}
                className="group p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-primary-700">{region}</h3>
                <p className="text-sm text-gray-500">Shop Wines</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're passionate about bringing you the finest selection of wines with expert guidance and exceptional service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Expert Selection</h3>
              <p className="text-gray-600 text-sm">Hand-picked by our Master of Wine</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                <Percent className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Member Discounts</h3>
              <p className="text-gray-600 text-sm">Up to 30% off for Wine Club members</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $150</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-sm">30-day returns, no questions asked</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Join Wine Club */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Wine Club</h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Become a member and enjoy exclusive benefits, including discounts, free shipping, 
            and access to limited-release wines.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/wine-club/join" 
              className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium"
            >
              Join Now
            </Link>
            <Link 
              href="/wine-club/benefits" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

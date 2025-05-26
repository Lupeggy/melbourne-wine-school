import { Check, Star, Gift, Wine } from 'lucide-react';
import Link from 'next/link';
import { MembershipTier } from '@/types/membership';

export default function MembershipCard({ tier }: { tier: MembershipTier }) {
  return (
    <div className={`relative flex flex-col p-6 rounded-2xl border-2 ${
      tier.isPopular 
        ? 'border-primary-500 bg-gradient-to-b from-primary-50 to-white' 
        : 'border-gray-200 bg-white'
    } h-full`}>
      {/* Popular Badge */}
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary-600 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
            MOST POPULAR
          </div>
        </div>
      )}

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
            <p className="text-sm text-gray-600">{tier.description}</p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              ${tier.price}
              <span className="text-base font-normal text-gray-500">/{tier.billingCycle}</span>
            </div>
            {tier.discount > 0 && (
              <span className="text-sm text-green-600 font-medium">
                Save {tier.discount}% on all wines
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mt-6 mb-8">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              <span className="font-medium">{tier.bottleCredits} bottle credits</span> per {tier.billingCycle}
            </span>
          </li>
          
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
          
          {tier.freeShipping && (
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Free shipping</span> on all orders
              </span>
            </li>
          )}
          
          {tier.exclusiveAccess && (
            <li className="flex items-start">
              <Star className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0 fill-current" />
              <span className="text-gray-700">
                <span className="font-medium">Exclusive access</span> to limited releases
              </span>
            </li>
          )}
        </ul>
      </div>

      <div className="mt-auto">
        <Link
          href={`/wine-club/join?tier=${tier.id}`}
          className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
            tier.isPopular
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          {tier.isPopular ? 'Get Started' : 'Choose Plan'}
        </Link>
        
        {tier.billingCycle === 'year' && (
          <p className="mt-3 text-center text-sm text-gray-500">
            Billed annually (${(tier.price * 12).toFixed(2)} total)
          </p>
        )}
      </div>
      
      {tier.isPopular && (
        <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          <Gift className="h-3 w-3 inline mr-1" />
          Best Value
        </div>
      )}
    </div>
  );
}

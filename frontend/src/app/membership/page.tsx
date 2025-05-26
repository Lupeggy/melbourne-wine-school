import { Wine, Users, Check, Percent, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const membershipTiers = [
  {
    name: 'Melbourne Wine School - Membership',
    price: 55,
    frequency: 'quarterly',
    description: 'This membership includes:',
    features: [
      'Exclusive Access to Member\'s Only Events (Email Invitation)',
      '5% Savings on Your Registration for Classes & Events (Except WSET)',
      'Limited Access to Education Materials',
      'Access to WhatsApp community group'
    ],
    buttonText: 'Sign Up for 7 Days Free',
    popular: false
  },
  {
    name: 'Melbourne Wine School - Village Membership',
    price: 195,
    frequency: 'quarterly',
    description: 'This membership includes:',
    features: [
      '5 vials of 100 ml Quarterly Wine Club Allocation w/ Standard Shipping',
      'Exclusive Access to Member\'s Only Events (Email Invitation)',
      '5% Savings on Your Registration for Classes & Events (Except WSET)',
      '5% Savings on Retail Wine Bottles (MWS Cellar)',
      '5% Saving on Vials (MWS Cellar)',
      'Limited Access to Education Materials',
      'Access to WhatsApp community group'
    ],
    buttonText: 'Join Now',
    popular: true
  },
  {
    name: 'Melbourne Wine School - Premier Membership',
    price: 295,
    frequency: 'quarterly',
    description: 'This membership includes:',
    features: [
      '10 vials of 100 ml Quarterly Wine Club Allocation w/ Standard Shipping',
      'Exclusive Access to Member\'s Only Tastings & Events (Email Invitation)',
      '10% Savings on Your Registration for Classes & Events (Except WSET)',
      '10% Savings on Retail Wine Bottles (MWS Cellar)',
      '10% Saving on Vials (MWS Cellar)',
      'Limited Access to Education Materials',
      'Free Community Nights',
      'Access to WhatsApp community group'
    ],
    buttonText: 'Join Now',
    popular: false
  }
];

export default function MembershipPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Melbourne Wine School Membership</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Join our exclusive membership program for wine enthusiasts. Enjoy curated wine selections, member-only benefits, and expert-led tastings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#membership" 
              className="bg-white text-red-700 hover:bg-gray-100 px-8 py-4 rounded-md font-medium text-lg transition-colors"
            >
              View Memberships
            </a>
            <a 
              href="#why-us" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-medium text-lg transition-colors"
            >
              Why Join Us?
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-16 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Membership?</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join a community of wine lovers and elevate your wine journey with exclusive benefits designed for every enthusiast.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wine className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">Exclusive Access</h3>
              <p className="text-gray-600 text-center">
                Get special invitations to members-only events, tastings, and masterclasses with renowned winemakers and sommeliers.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Percent className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">Substantial Savings</h3>
              <p className="text-gray-600 text-center">
                Enjoy significant discounts on courses, events, and wine purchases, making your wine education more affordable.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">Vibrant Community</h3>
              <p className="text-gray-600 text-center">
                Connect with like-minded wine lovers in our exclusive WhatsApp group and at our regular community events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="membership" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Membership</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Sign up for 7 days free to experience the benefits of our membership. We'll notify you before your trial ends.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`relative rounded-xl overflow-hidden border-2 ${tier.popular ? 'border-red-500 shadow-xl transform md:-translate-y-2' : 'border-gray-200'}`}
              >
                {tier.popular && (
                  <div className="bg-red-600 text-white text-sm font-semibold py-1 text-center">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${tier.price}</span>
                    <span className="text-gray-600">/{tier.frequency}</span>
                  </div>
                  <p className="text-gray-700 mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                      tier.popular 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50'
                    }`}
                  >
                    {tier.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect - 7 Day Free Trial */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
              {/* Left Side - Content */}
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                <div className="mb-2">
                  <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">7-DAY FREE TRIAL</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience the Benefits</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Try our membership risk-free for 7 days. Experience all the benefits with no obligation to continue. We'll notify you before your trial ends.
                </p>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-100 p-1.5 rounded-full mr-4 mt-0.5">
                      <Check className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Full Access</h3>
                      <p className="text-gray-600">Enjoy all membership benefits during your trial period</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-100 p-1.5 rounded-full mr-4 mt-0.5">
                      <Check className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">No Commitment</h3>
                      <p className="text-gray-600">Cancel anytime during your trial with no charges</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-100 p-1.5 rounded-full mr-4 mt-0.5">
                      <Check className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Easy Management</h3>
                      <p className="text-gray-600">Update or cancel your membership anytime through your account</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Visual */}
              <div className="bg-red-50 md:w-1/2 flex items-center justify-center p-8">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-300 rounded-full opacity-20"></div>
                  <div className="relative bg-white p-8 rounded-xl shadow-lg border border-red-100">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Wine className="h-10 w-10 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Journey</h3>
                      <p className="text-gray-600 mb-6">Begin your 7-day free trial today</p>
                      <a 
                        href="#membership" 
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

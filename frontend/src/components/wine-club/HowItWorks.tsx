import { CheckCircle2, Wine, Truck, Gift, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Choose Your Membership',
      description: 'Select from our Explorer, Connoisseur, or Collector tiers to match your wine journey and preferences.',
      icon: <Wine className="h-6 w-6" />,
      color: 'bg-amber-100 text-amber-800',
    },
    {
      number: 2,
      title: 'Complete Your Profile',
      description: 'Tell us about your wine preferences, tasting notes, and delivery details to personalize your experience.',
      icon: <CheckCircle2 className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      number: 3,
      title: 'Receive Your First Shipment',
      description: 'Get your carefully curated selection of wines delivered to your door each month.',
      icon: <Truck className="h-6 w-6" />,
      color: 'bg-emerald-100 text-emerald-800',
    },
    {
      number: 4,
      title: 'Enjoy & Explore',
      description: 'Taste, learn, and discover new favorites with our detailed tasting notes and food pairing suggestions.',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Joining the Melbourne Wine Club is simple and rewarding. Here&apos;s how it works:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={cn(
                "relative p-6 rounded-xl transition-all duration-300 hover:shadow-lg",
                "bg-white border border-gray-100",
                "flex flex-col items-center text-center"
              )}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                step.color
              )}>
                {step.icon}
              </div>
              <div className="absolute -top-4 -right-4 bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-amber-50 rounded-full">
            <Gift className="h-6 w-6 text-amber-600" />
            <span className="text-amber-800 font-medium">
              Special offer: Get a free wine accessory with your first shipment!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ReactNode } from 'react';
import { Wine, Percent, Truck, Calendar, Award, Shield } from 'lucide-react';

type Benefit = {
  title: string;
  description: string;
  icon: ReactNode;
};

export default function BenefitsGrid() {
  const benefits: Benefit[] = [
    {
      title: 'Exclusive Wines',
      description: 'Access to limited-production and allocated wines not available to the general public.',
      icon: <Wine className="h-8 w-8 text-primary-600" />,
    },
    {
      title: 'Member Discounts',
      description: 'Enjoy significant discounts on all wine purchases, with higher tiers saving up to 20%.',
      icon: <Percent className="h-8 w-8 text-primary-600" />,
    },
    {
      title: 'Free Shipping',
      description: 'Complimentary shipping on all orders for Connoisseur and Collector members.',
      icon: <Truck className="h-8 w-8 text-primary-600" />,
    },
    {
      title: 'Tasting Events',
      description: 'Exclusive invitations to member-only virtual and in-person tasting events.',
      icon: <Calendar className="h-8 w-8 text-primary-600" />,
    },
    {
      title: 'Wine Education',
      description: 'Access to educational content, masterclasses, and expert guidance.',
      icon: <Award className="h-8 w-8 text-primary-600" />,
    },
    {
      title: 'Flexible Membership',
      description: 'Change your plan or cancel anytime with no long-term commitment.',
      icon: <Shield className="h-8 w-8 text-primary-600" />,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {benefits.map((benefit, index) => (
        <div 
          key={index} 
          className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300 group"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-200 transition-colors">
            {benefit.icon}
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">{benefit.title}</h3>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}

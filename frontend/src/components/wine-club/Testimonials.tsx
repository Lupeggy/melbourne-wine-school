import { Star } from 'lucide-react';

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  rating: number;
};

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "The Connoisseur membership has completely changed how I experience wine. The selections are always exceptional.",
      author: "Sarah M.",
      role: "Member since 2021",
      rating: 5
    },
    {
      quote: "As a wine novice, the Explorer membership has been the perfect way to learn and discover new favorites.",
      author: "James T.",
      role: "Member since 2022",
      rating: 5
    },
    {
      quote: "The Collector membership gives me access to rare wines I couldn't find anywhere else. Worth every penny.",
      author: "Emma R.",
      role: "Member since 2020",
      rating: 5
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
        >
          <div className="flex text-amber-400 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className={`h-5 w-5 ${star <= testimonial.rating ? 'fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <blockquote className="text-gray-700 italic mb-6 flex-grow">"{testimonial.quote}"</blockquote>
          <div className="flex items-center mt-auto">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold mr-3">
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

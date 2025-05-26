'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How does the membership work?",
      answer: "Each month, you'll receive a curated selection of wines based on your membership tier. You can choose to keep the selection or swap for other wines from our member store."
    },
    {
      question: "Can I cancel my membership?",
      answer: "Yes, you can cancel your membership at any time. There are no long-term contracts or cancellation fees."
    },
    {
      question: "How are the wines selected?",
      answer: "Our Master of Wine selects each bottle based on quality, value, and interest. We feature a mix of well-known producers and hidden gems from around the world."
    },
    {
      question: "When will I be charged?",
      answer: "You'll be charged on the same date each month that you signed up. For example, if you joined on the 15th, you'll be charged on the 15th of each month."
    },
    {
      question: "Can I skip a month?",
      answer: "Yes, you can skip any month at no cost. Just log in to your account and skip before your next billing date."
    },
    {
      question: "Is shipping included?",
      answer: "Free shipping is included for Connoisseur and Collector members. Explorer members receive free shipping on orders over $150."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggleAccordion(index)}
            className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            aria-expanded={openIndex === index}
            aria-controls={`faq-${index}`}
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          <div 
            id={`faq-${index}`}
            className={`p-4 bg-white transition-all duration-300 ${openIndex === index ? 'block' : 'hidden'}`}
          >
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

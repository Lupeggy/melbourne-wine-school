'use client';

import { HelpCircle, Mail, Phone, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I enroll in a course?",
    answer: "You can enroll in any of our courses directly through our website by visiting the Courses page and selecting your preferred course. Follow the registration process to secure your spot."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For corporate bookings, we also accept bank transfers."
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes, we offer special rates for group bookings of 5 or more people. Please contact our team for more information on group rates and availability."
  },
  {
    question: "What is your cancellation policy?",
    answer: "You may cancel your booking up to 14 days before the course start date for a full refund. Cancellations made within 14 days will receive a 50% refund or the option to reschedule."
  },
  {
    question: "Are your courses accredited?",
    answer: "Yes, all our WSET courses are fully accredited. We are an Approved Programme Provider (APP) for the Wine & Spirit Education Trust (WSET)."
  },
  {
    question: "Do I need any prior knowledge to start?",
    answer: "No prior knowledge is required for our Level 1 courses. We welcome complete beginners as well as experienced wine enthusiasts looking to expand their knowledge."
  }
];

export default function SupportPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How Can We Help?</h1>
          <p className="text-xl max-w-3xl mx-auto">Find answers to common questions or get in touch with our support team</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Search Bar */}
          <div className="mb-16 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our help center..."
                className="w-full px-6 py-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-700"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    className={`w-full px-6 py-5 text-left flex justify-between items-center ${activeIndex === index ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-red-700" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 pb-6 pt-2 bg-white text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Still Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-red-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
                <a 
                  href="mailto:support@melbournewineschool.com.au" 
                  className="text-red-700 hover:text-red-800 font-medium inline-flex items-center"
                >
                  Send Message
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-red-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Mon-Fri, 9am-5pm AEST</p>
                <a 
                  href="tel:+61399999999" 
                  className="text-red-700 hover:text-red-800 font-medium inline-flex items-center"
                >
                  +61 3 9999 9999
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-red-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Chat with our support team</p>
                <button 
                  className="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300 inline-flex items-center"
                  onClick={() => console.log('Start live chat')}
                >
                  Start Chat
                </button>
              </div>
            </div>
          </section>

          {/* Helpful Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Helpful Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Course Information</h3>
                <p className="text-gray-600 mb-4">Learn more about our course offerings, schedules, and what to expect.</p>
                <Link href="/courses" className="text-red-700 hover:text-red-800 font-medium inline-flex items-center">
                  View Courses
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">FAQs</h3>
                <p className="text-gray-600 mb-4">Find answers to common questions about our programs and policies.</p>
                <a href="#faq" className="text-red-700 hover:text-red-800 font-medium inline-flex items-center">
                  Visit FAQ
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Our team is here to help you with any questions or concerns you may have.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:support@melbournewineschool.com.au" 
              className="bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 inline-flex items-center justify-center"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email Support
            </a>
            <a 
              href="tel:+61399999999" 
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-8 rounded-full transition-colors duration-300 inline-flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

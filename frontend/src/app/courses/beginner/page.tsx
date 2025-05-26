'use client';

import { Wine, Clock, Award, Calendar, MapPin, Check, ChevronRight, Users, Star } from 'lucide-react';
import Link from 'next/link';

export default function BeginnerCoursePage() {
  const course = {
    title: 'Wine Fundamentals',
    subtitle: 'Beginner Course',
    description: 'Start your wine journey with our comprehensive introduction to the world of wine. Perfect for beginners, this course covers everything you need to know to confidently select, taste, and enjoy wine.',
    duration: '4 Weeks',
    level: 'Beginner',
    price: 199,
    location: 'Melbourne CBD',
    startDate: 'June 10, 2023',
    highlights: [
      'Learn wine tasting techniques',
      'Understand major grape varieties',
      'Discover food and wine pairing basics',
      'Explore different wine regions',
      'No prior knowledge required'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to Wine',
        topics: [
          'Understanding wine styles',
          'Wine tasting basics',
          'Common wine faults'
        ]
      },
      {
        week: 2,
        title: 'White Wines',
        topics: [
          'Major white grape varieties',
          'White wine regions',
          'Tasting session'
        ]
      },
      {
        week: 3,
        title: 'Red Wines',
        topics: [
          'Major red grape varieties',
          'Red wine regions',
          'Tasting session'
        ]
      },
      {
        week: 4,
        title: 'Food and Wine Pairing',
        topics: [
          'Basic pairing principles',
          'Practical pairing exercises',
          'Graduation and certification'
        ]
      }
    ],
    instructor: {
      name: 'Sarah Johnson',
      title: 'Master of Wine',
      bio: 'With over 15 years of experience in the wine industry, Sarah has educated thousands of wine enthusiasts and professionals alike.'
    },
    testimonials: [
      {
        name: 'Michael T.',
        comment: 'This course completely changed how I appreciate wine. The instructor was incredibly knowledgeable and made complex topics easy to understand.',
        rating: 5
      },
      {
        name: 'Emma L.',
        comment: 'As a complete beginner, I was nervous, but the course was perfectly paced. I now feel confident ordering wine at restaurants.',
        rating: 5
      }
    ]
  };

  return (
    <div className="bg-white pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 h-48 md:h-56 w-full"></div>
      
      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg -mt-8 relative z-10 shadow-lg p-6 mb-8">
              <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {course.level} Level
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              {/* Course Meta */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-2 text-red-600" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-2 text-red-600" />
                  <span>Starts {course.startDate}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-2 text-red-600" />
                  <span>{course.location}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                {course.curriculum.map((week) => (
                  <div key={week.week} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Week {week.week}: {week.title}</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {week.topics.map((topic, tIndex) => (
                        <li key={tIndex}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Students Say</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {course.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center justify-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                      <p className="font-medium text-gray-900">{testimonial.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="mb-12">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-1">Need help deciding?</h3>
                  <p className="text-blue-700 mb-4">Contact our course advisors for personalized recommendations.</p>
                  <button className="inline-flex items-center text-blue-700 hover:text-blue-600 font-medium">
                    Contact Us <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Course Details */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-red-700 text-white p-4">
                  <h3 className="text-xl font-bold">Course Details</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Next Start Date</h4>
                      <p className="text-gray-700">{course.startDate}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Duration</h4>
                      <p className="text-gray-700">{course.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                      <p className="text-gray-700">{course.location}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <button className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-md transition-colors">
                      Enroll Now
                    </button>
                    <button className="w-full border border-red-700 text-red-700 hover:bg-red-50 font-medium py-3 px-6 rounded-md transition-colors">
                      Request Information
                    </button>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-600">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="ml-3 text-sm text-gray-600">
                        <span className="font-medium">Duration:</span> {course.duration}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-600">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="ml-3 text-sm text-gray-600">
                        <span className="font-medium">Start Date:</span> {course.startDate}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-600">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="ml-3 text-sm text-gray-600">
                        <span className="font-medium">Location:</span> {course.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">{course.title}</h1>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <span className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" /> {course.duration}
                </span>
                <span className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" /> Small Group
                </span>
                <span className="hidden sm:flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1" /> {course.location}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-2 md:mt-0">
              <div className="text-right">
                <p className="text-xs text-gray-500">Starting from</p>
                <p className="text-xl font-bold text-red-700">${course.price}</p>
              </div>
              <button className="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 sm:px-6 rounded-md transition-colors whitespace-nowrap">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

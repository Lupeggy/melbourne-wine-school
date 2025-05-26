'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  price: number;
  image: string;
  level: string;
  schedule: string[];
  whatYoullLearn: string[];
  instructor?: string;
  location?: string;
  startDate?: string;
  availableSeats?: number;
  category?: string;
  tags?: string[];
}

interface CourseDetailProps {
  course: Course;
}

export default function CourseDetail({ course }: CourseDetailProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    try {
      addToCart(course);
      setShowCartSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowCartSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleEnrollNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(course);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Course header */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 text-sm font-medium text-white bg-red-700 rounded-full">
                  {course.level}
                </span>
                {course.category && (
                  <span className="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-full">
                    {course.category}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {course.title}
              </h1>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl">
                {course.description}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4">
                {course.startDate && (
                  <div className="flex items-center text-white">
                    <svg className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Starts {course.startDate}</span>
                  </div>
                )}
                <div className="flex items-center text-white">
                  <svg className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.duration}</span>
                </div>
                {course.location && (
                  <div className="flex items-center text-white">
                    <svg className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{course.location}</span>
                  </div>
                )}
                {course.availableSeats !== undefined && (
                  <div className="flex items-center text-white">
                    <svg className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{course.availableSeats} seats remaining</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-80 bg-white rounded-lg shadow-xl overflow-hidden mt-8 md:mt-0">
              <div className="p-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                  <span className="ml-2 text-gray-500">/ course</span>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
                  <button
                    onClick={handleEnrollNow}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    Enroll Now
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`w-full flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 ${isAddingToCart ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                  
                  {showCartSuccess && (
                    <div className="mt-2 p-2 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
                      Course added to cart! <a href="/cart" className="font-medium text-green-800 hover:underline">View Cart</a>
                    </div>
                  )}
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Secure payment processing
                  </p>
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-medium text-gray-900">What's included:</h3>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Certificate of Completion</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Course Materials</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Expert Instruction</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">About This Course</h2>
              <p className="text-lg text-gray-600 mb-8">
                {course.longDescription}
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
              <ul className="space-y-4 mb-10">
                {course.whatYoullLearn.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Schedule</h3>
              <div className="space-y-4 mb-10">
                {course.schedule.map((session, index) => (
                  <div key={index} className="border-l-4 border-red-700 pl-6 py-3 bg-gray-50 rounded-r-lg">
                    <p className="font-medium text-gray-900">{session}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:mt-0">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Course Details</h3>
              <div className="space-y-6">
                {course.instructor && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Instructor</p>
                    <p className="mt-1 text-gray-900">{course.instructor}</p>
                  </div>
                )}
                {course.startDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                    <p className="mt-1 text-gray-900">{course.startDate}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="mt-1 text-gray-900">{course.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Level</p>
                  <p className="mt-1 text-gray-900">{course.level}</p>
                </div>
                {course.availableSeats !== undefined && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Available Seats</p>
                    <p className="mt-1 text-gray-900">{course.availableSeats}</p>
                  </div>
                )}
                {course.location && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="mt-1 text-gray-900">{course.location}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

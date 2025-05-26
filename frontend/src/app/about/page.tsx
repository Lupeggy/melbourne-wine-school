'use client';

import { Wine, Award, Users, MapPin, Mail, ChevronRight, Check, Sparkles, BookOpen, Users as UsersIcon, Globe, Award as AwardIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from '@/data/team';
import { wsetCourses } from '@/data/courses';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Image
            src="/images/about/hero-wine-tasting.jpg"
            alt="Wine tasting at Melbourne Wine School"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium tracking-wider">EST. 2023</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-black">
              Discover Our <span className="text-red-700">Wine Courses</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-8">
              Expert-led wine education for all levels, from passionate beginners to aspiring connoisseurs. Expand your knowledge and palate with our comprehensive courses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/courses" 
                className="bg-red-700 hover:bg-red-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center"
              >
                Explore Courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#our-story" 
                className="border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section id="our-story" className="relative py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Timeline */}
          <div className="relative pt-8">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-amber-500 to-amber-400 -ml-px"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16 md:space-y-24">
              {/* Item 1 */}
              <div className="relative flex flex-col md:flex-row items-center">
                {/* Content */}
                <div className="md:w-1/2 md:pr-16 mb-10 md:mb-0 md:text-right">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-700 mb-5 mx-auto md:ml-auto">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <div className="md:pl-4">
                      <span className="inline-block text-sm font-medium text-amber-700 mb-2">JUNE 2023</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">Our Humble Beginnings</h3>
                      <p className="text-gray-600 leading-relaxed">
                        What started as a shared passion among friends quickly grew into Melbourne Wine School. Our founders, a group of certified sommeliers and wine educators, set out to create a welcoming space for wine lovers of all levels to learn and explore.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Year Marker */}
                
                
                {/* Image */}
                <div className="w-full md:w-5/12 relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg group">
                  <Image 
                    src="/images/about/founding-team.jpg" 
                    alt="Founding team of Melbourne Wine School"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="hidden md:flex w-20 h-20 bg-gradient-to-br from-red-700 to-amber-700 rounded-full flex-shrink-0 items-center justify-center text-white font-bold text-xl z-10 mx-6 shadow-lg">
                  2023
                </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative flex flex-col md:flex-row items-center">
                {/* Content */}
                <div className="md:w-1/2 order-1 md:order-2 md:pl-16 mb-10 md:mb-0">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-700 mb-5">
                      <AwardIcon className="h-7 w-7" />
                    </div>
                    <div className="md:pr-4">
                      <span className="inline-block text-sm font-medium text-red-700 mb-2">MARCH 2024</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">WSET Accreditation Achieved</h3>
                      <p className="text-gray-600 leading-relaxed">
                        After rigorous evaluation, we proudly became an Approved Programme Provider for the Wine & Spirit Education Trust. This milestone allowed us to offer globally recognized certifications and elevate Melbourne's wine education standards.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Year Marker */}
                
                
                {/* Image */}
                <div className="w-full md:w-5/12 order-3 md:order-1 relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg group">
                  <Image 
                    src="/images/about/wset-certification.jpg" 
                    alt="WSET Certification"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="hidden md:flex w-20 h-20 bg-gradient-to-br from-red-700 to-red-800 rounded-full flex-shrink-0 items-center justify-center text-white font-bold text-xl z-10 mx-6 order-2 shadow-lg">
                  2024
                </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative flex flex-col md:flex-row items-center">
                {/* Content */}
                <div className="md:w-1/2 md:pr-16 mb-10 md:mb-0 md:text-right">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-700 mb-5 mx-auto md:ml-auto">
                      <UsersIcon className="h-7 w-7" />
                    </div>
                    <div className="md:pl-4">
                      <span className="inline-block text-sm font-medium text-red-700 mb-2">TODAY</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">A Thriving Wine Community</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Today, we're proud to be Melbourne's premier wine school, with thousands of graduates and a vibrant community. Our expert educators continue to inspire and guide wine enthusiasts on their journey through the world of wine.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Year Marker */}
                
                
                {/* Image */}
                <div className="w-full md:w-5/12 relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg group">
                  <Image 
                    src="/images/about/wine-class.jpg" 
                    alt="Wine class in session"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="hidden md:flex w-20 h-20 bg-gradient-to-br from-red-700 to-red-800 rounded-full flex-shrink-0 items-center justify-center text-white font-bold text-xl z-10 mx-6 shadow-lg">
                  Now
                </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
            <p className="text-xl text-gray-600">
              At Melbourne Wine School, we're driven by a passion for wine education and a commitment to excellence in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-700 mx-auto mb-6">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Education First</h3>
              <p className="text-gray-600">
                We believe in making wine education accessible, engaging, and enjoyable for everyone, from beginners to industry professionals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-700 mx-auto mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Perspective</h3>
              <p className="text-gray-600">
                We celebrate the diversity of the wine world, exploring both classic regions and emerging wine areas from around the globe.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-700 mx-auto mb-6">
                <UsersIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We foster a welcoming community where wine enthusiasts can connect, share, and grow their passion together.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Join Our Wine Journey</h3>
              <p className="text-lg md:text-xl text-red-100 mb-8">
                Whether you're starting your wine education or looking to deepen your expertise, we have a course that's perfect for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/courses" 
                  className="bg-white hover:bg-gray-100 text-red-700 font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center"
                >
                  Explore Courses
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/contact" 
                  className="border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WSET Course Offerings */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-sm font-semibold px-6 py-2 rounded-full mb-4 border border-red-100">
              OUR COURSES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">WSET Course Offerings</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-700 to-red-800 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Internationally recognized wine, spirits, and sake education programs for all levels of expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Wine Courses */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-red-700 to-red-800"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center text-red-700 mb-6">
                  <Wine className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Wine Education</h3>
                <ul className="space-y-3">
                  {wsetCourses
                    .filter(course => course.includes('Wine'))
                    .map((course, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{course}</span>
                      </li>
                    ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link 
                    href="/courses/wine" 
                    className="text-red-700 hover:text-red-800 font-medium inline-flex items-center group"
                  >
                    Explore Wine Courses
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Spirits Courses */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-red-600 to-red-800"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center text-red-700 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Spirits Education</h3>
                <ul className="space-y-3">
                  {wsetCourses
                    .filter(course => course.includes('Spirits'))
                    .map((course, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{course}</span>
                      </li>
                    ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link 
                    href="/courses/spirits" 
                    className="text-red-700 hover:text-red-800 font-medium inline-flex items-center group"
                  >
                    Explore Spirits Courses
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sake Courses */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-red-500 to-red-700"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sake Education</h3>
                <ul className="space-y-3">
                  {wsetCourses
                    .filter(course => course.includes('Sake'))
                    .map((course, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{course}</span>
                      </li>
                    ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link 
                    href="/courses/sake" 
                    className="text-red-600 hover:text-red-700 font-medium inline-flex items-center group"
                  >
                    Explore Sake Courses
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-8 border border-red-100 shadow-sm">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-700 mx-auto">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Not sure which course is right for you?</h3>
                <p className="text-gray-600 max-w-2xl">
                  Our education advisors are here to help you choose the perfect course based on your experience level and goals.
                </p>
              </div>
              <div className="mt-6 sm:mt-0 sm:ml-6">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-700 hover:bg-red-800 transition-colors"
                >
                  Get Course Advice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WSET Credentials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <Image 
                    src="/images/about/wset-certification-ceremony.jpg" 
                    alt="WSET Certification Ceremony"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                      <Award className="h-5 w-5 mr-2 text-yellow-300" />
                      <span className="text-sm font-medium">ACCREDITED PROVIDER</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-2">WSET Accredited</h2>
                    <p className="text-lg text-gray-200">Proudly delivering world-class wine education in Melbourne</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="max-w-lg mx-auto lg:mx-0">
                  <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                    WSET EDUCATION
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Globally Recognized Wine Education</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    As an Approved Programme Provider (APP) for the Wine & Spirit Education Trust (WSET), we're proud to offer internationally recognized qualifications that are respected across the wine and spirits industry worldwide.
                  </p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-700">
                          <Award className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">Expert Educators</h3>
                        <p className="mt-1 text-gray-600">
                          Our team includes WSET Level 4 Diploma holders and certified educators with years of industry experience.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-700">
                          <BookOpen className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">Comprehensive Curriculum</h3>
                        <p className="mt-1 text-gray-600">
                          From beginner to advanced levels, our courses cover wine, spirits, and sake with practical tasting components.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-700">
                          <Globe className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">Global Recognition</h3>
                        <p className="mt-1 text-gray-600">
                          WSET qualifications are recognized by employers and institutions worldwide, opening doors in the wine and hospitality industries.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/courses" 
                      className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-red-700 hover:bg-red-800 transition-colors"
                    >
                      View All Courses
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link 
                      href="/about/wset" 
                      className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      Learn About WSET
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-red-100 to-yellow-50 text-red-700 text-sm font-semibold px-6 py-2 rounded-full mb-4 border border-red-100">
              MEET OUR EDUCATORS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Expert Wine Educators</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-700 to-yellow-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry-leading professionals with extensive experience in wine education and the hospitality industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-50">
                {/* Member Image */}
                <div className="relative h-80 overflow-hidden">
                  {member.image ? (
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
                      <Users className="h-20 w-20 text-white/50" />
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                      {member.role && (
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                          {member.role}
                        </span>
                      )}
                      <p className="text-white/90 text-sm line-clamp-3 mb-4">
                        {member.bio[0]}
                      </p>
                      <button 
                        className="text-white text-sm font-medium flex items-center group-hover:opacity-100 opacity-0 group-hover:translate-y-0 translate-y-2 transition-all duration-300"
                        onClick={() => console.log(`View full bio of ${member.name}`)}
                      >
                        Read full bio
                        <svg 
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Member Info */}
                <div className="p-6">
                  
                  
                  {/* Expertise Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.bio[0]
                      .split(' ')
                      .filter(word => word.length > 5)
                      .slice(0, 3)
                      .map((word, i) => (
                        <span 
                          key={i} 
                          className="inline-block bg-gray-50 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200"
                        >
                          {word.replace(/[^\w\s]/gi, '')}
                        </span>
                      ))}
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-red-700 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-red-700 transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.4 0-.79-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-red-700 transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          
        </div>
      </section>

      {/* Location Section */}
      {/* Location Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-red-100 to-yellow-50 text-red-700 text-sm font-semibold px-6 py-2 rounded-full mb-4 border border-red-100">
              VISIT US
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Melbourne Campus</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-700 to-yellow-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Richmond, our modern facility is designed to provide the perfect environment for wine education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-50 text-red-700">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Our Address</h4>
                      <p className="mt-1 text-gray-600">
                        1/41-43 Stewart Street<br />
                        Richmond VIC 3121<br />
                        Australia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-50 text-red-700">
                        <Mail className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Email Us</h4>
                      <a href="mailto:mws@melbournewineschool.com.au" className="text-gray-600 hover:text-red-700 transition-colors">
                        mws@melbournewineschool.com.au
                      </a>
                      <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-50 text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Call Us</h4>
                      <a href="tel:+61312345678" className="text-gray-600 hover:text-red-700 transition-colors">
                        +61 3 1234 5678
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9:00 AM - 6:00 PM AEST</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Opening Hours</h4>
                  <ul className="space-y-3">
                    {[
                      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                      { day: 'Sunday', hours: 'Closed' },
                      { day: 'Public Holidays', hours: 'Closed' }
                    ].map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{item.day}</span>
                        <span className="font-medium text-gray-900">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a 
                    href="https://www.google.com/maps/place/1%2F41-43+Stewart+St,+Richmond+VIC+3121,+Australia/@-37.814869,144.9917363,17z/data=!3m1!4b1!4m6!3m5!1s0x6ad642b0e2c2f8f9:0x1c5c1c9fe8b1c7e5!8m2!3d-37.814869!4d144.9917363!16s%2Fg%2F11c5m3n9vj?entry=ttu" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-700 hover:bg-red-800 transition-colors"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Get Directions
                  </a>
                  <a 
                    href="mailto:mws@melbournewineschool.com.au" 
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <div className="relative w-full h-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8352533100927!2d144.9917363153189!3d-37.81486897975165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b0e2c2f8f9%3A0x1c5c1c9fe8b1c7e5!2sInspire9%20Richmond!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Melbourne Wine School Location"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
          
          
        </div>
      </section>
    </div>
  );
}

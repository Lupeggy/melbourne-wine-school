'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-bold text-foreground sm:text-5xl md:text-6xl">
              <span className="block">Discover the Art of</span>
              <span className="block text-primary">Wine Tasting</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join our expert-led wine courses and tastings in the heart of Melbourne. Perfect for both enthusiasts and professionals looking to deepen their wine knowledge.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-3">
              <Button size="lg" className="text-base bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 text-white">
                Browse Courses
              </Button>
              <Button variant="outline" size="lg" className="text-base border-primary text-primary hover:bg-primary/10">
                Upcoming Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full mb-4">
              Popular Courses
            </span>
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">
              Explore Our <span className="text-primary">Wine Courses</span>
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of students in our award-winning wine education programs, 
              designed for all levels from curious beginners to industry professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              {
                id: 'wine-fundamentals',
                title: 'Wine Fundamentals',
                description: 'Master the basics of wine tasting, grape varieties, and wine regions in this comprehensive beginner course.',
                duration: '4 weeks',
                price: 199,
                level: 'Beginner',
                image: '/wine-tasting.jpg',
                features: ['6 modules', 'Interactive tastings', 'Tasting notes', 'Certificate'],
                rating: 4.9,
                students: 1248
              },
              {
                id: 'wine-food-pairing',
                title: 'Wine & Food Pairing',
                description: 'Learn the art of matching wine with food to create perfect flavor combinations and enhance your dining experiences.',
                duration: '6 weeks',
                price: 299,
                level: 'Intermediate',
                image: '/wine-food-pairing.jpg',
                features: ['8 modules', 'Food & wine workshops', 'Recipe book', 'Certificate'],
                rating: 4.8,
                students: 856
              },
              {
                id: 'wset-level-2',
                title: 'WSET Level 2',
                description: 'Earn your WSET Level 2 Award in Wines with our expert-led program covering all major wine regions of the world.',
                duration: '8 weeks',
                price: 1299,
                level: 'Intermediate',
                image: '/wset-certification.jpg',
                features: ['12 modules', 'Official WSET materials', 'Exam included', 'Industry-recognized'],
                rating: 4.95,
                students: 2103
              },
            ].map((course) => (
              <div 
                key={course.id} 
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-border/50 hover:border-primary/20"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        course.level === 'Beginner' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {course.level}
                      </span>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-white/80 ml-1">({course.rating})</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">{course.title}</h3>
                    <p className="text-sm text-white/90 mt-1">
                      <span className="font-medium">{course.students.toLocaleString()}+</span> students enrolled
                    </p>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-5 flex-1">{course.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {course.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-5 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-foreground">${course.price}</span>
                        {course.id === 'wine-fundamentals' && (
                          <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <Button 
                        asChild 
                        className="bg-primary hover:bg-primary/90 text-white hover:shadow-lg transition-all"
                      >
                        <Link href={`/courses/${course.id}`}>
                          Enroll Now
                        </Link>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Starts {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center relative z-10">
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="group border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-colors text-primary"
            >
              <Link href="/courses" className="flex items-center gap-2">
                <span>View All Courses</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Button>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-foreground">Expert Instructors</div>
                  <div>Learn from certified wine professionals</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-foreground">Flexible Learning</div>
                  <div>Study at your own pace</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-foreground">Industry Recognition</div>
                  <div>Earn certificates from WSET</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4 py-4">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 text-sm border border-input bg-background rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
                  placeholder="Search courses..."
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  className="appearance-none block w-full pl-3 pr-10 py-2 text-sm border border-input bg-background rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
                  defaultValue="all"
                >
                  <option value="all">All Categories</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="wset">WSET</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Sort By */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <select
                  id="sort"
                  name="sort"
                  className="appearance-none block w-full pl-3 pr-10 py-2 text-sm border border-input bg-background rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
                  defaultValue="newest"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Reset Filters */}
            <Button 
              variant="ghost" 
              className="whitespace-nowrap text-primary hover:bg-primary/10"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Upcoming Courses</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Course Card */}
            <div className="bg-card text-card-foreground rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image
                  src="/wine-tasting.jpg"
                  alt="Wine Making Workshop"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 19.477 5.754 19 7.5 19s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 19 16.5 19c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Wine Fundamentals</h3>
                    <p className="text-sm text-muted-foreground mt-1">Perfect for beginners</p>
                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                      <span className="text-2xl font-bold">$199</span>
                      <span className="inline-flex items-center text-sm text-green-600 dark:text-green-400">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        5% from last month
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t">
                  <Button 
                    asChild 
                    variant="link" 
                    className="p-0 h-auto text-primary hover:no-underline w-full text-left justify-between group hover:text-primary/90"
                  >
                    <Link href="/courses/wine-fundamentals" className="group-hover:underline">
                      Learn more
                      <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Wine Enthusiast',
                content: 'The Wine Fundamentals course completely transformed how I appreciate wine. The instructors are incredibly knowledgeable!',
              },
              {
                name: 'Michael Chen',
                role: 'Restaurant Owner',
                content: 'The advanced tasting course helped me curate a better wine list for my restaurant. Highly recommended!',
              },
              {
                name: 'Emma Wilson',
                role: 'Hospitality Student',
                content: 'The wine making workshop was hands-on and educational. I learned so much about the winemaking process.',
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to start your wine journey?</span>
              <span className="block text-primary-foreground/90">Join our next tasting event.</span>
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-primary-foreground/80">
              Discover the world of wine with our expert-led courses and tastings. Perfect for both beginners and connoisseurs.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 lg:mt-0">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90 shadow-sm hover:bg-primary/10"
            >
              <Link href="/events">
                View Events
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-background text-background hover:bg-background/20 hover:text-background"
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

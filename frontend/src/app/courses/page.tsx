'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, Search, ChevronDown, Clock, Award, Wine, Calendar, DollarSign } from 'lucide-react';

// Define course types and levels for filtering
const courseTypes = ['wset', 'sake', 'wine', 'spirit', 'other'] as const;
type CourseType = typeof courseTypes[number];

const courseLevels = ['Level 1', 'Level 2', 'Level 3'] as const;
type CourseLevel = typeof courseLevels[number];

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  level: CourseLevel | string;
  type: CourseType;
  category: string;
  tags: string[];
}

const courses: Course[] = [
  {
    id: 'wset-wine-level1',
    title: 'WSET Level 1 in Wines',
    description: 'Introduction to wine styles, grape varieties, and service techniques.',
    duration: '1 day',
    price: 599,
    image: '/wset.jpg',
    level: 'Level 1',
    type: 'wset',
    category: 'Wine Education',
    tags: ['wine', 'beginner', 'wset', 'level-1']
  },
  {
    id: 'wset-wine-level2',
    title: 'WSET Level 2 in Wines',
    description: 'In-depth exploration of wine regions, grape varieties, and winemaking.',
    duration: '5 days',
    price: 1299,
    image: '/wine-tasting-advanced.jpg',
    level: 'Level 2',
    type: 'wset',
    category: 'Wine Education',
    tags: ['wine', 'intermediate', 'wset', 'level-2']
  },
  {
    id: 'wset-wine-level3',
    title: 'WSET Level 3 in Wines',
    description: 'Advanced study of wine regions, production, and business aspects of wine.',
    duration: '12 weeks',
    price: 2499,
    image: '/wine-tasting-advanced.jpg',
    level: 'Level 3',
    type: 'wset',
    category: 'Wine Education',
    tags: ['wine', 'advanced', 'wset', 'level-3']
  },
  {
    id: 'sake-level1',
    title: 'Sake Professional Course',
    description: 'Introduction to sake production, styles, and service.',
    duration: '1 day',
    price: 499,
    image: '/wine-tasting-advanced.jpg',
    level: 'Level 1',
    type: 'sake',
    category: 'Sake Education',
    tags: ['sake', 'beginner', 'level-1']
  },
  {
    id: 'wine-making',
    title: 'Wine Making Workshop',
    description: 'Experience the winemaking process from grape to bottle in this hands-on workshop.',
    duration: '1 day',
    price: 249,
    image: '/wine-making.jpg',
    level: 'Level 1',
    type: 'wine',
    category: 'Winemaking',
    tags: ['wine', 'winemaking', 'workshop', 'level-1']
  },
  {
    id: 'italian-wines',
    title: 'Italian Wines Masterclass',
    description: 'Explore the diverse wine regions of Italy and their signature grape varieties.',
    duration: '4 weeks',
    price: 279,
    image: '/italian-wines.jpg',
    level: 'Level 2',
    type: 'wine',
    category: 'Wine Regions',
    tags: ['wine', 'italy', 'regional', 'level-2']
  },
  {
    id: 'whiskey-appreciation',
    title: 'Whiskey Appreciation',
    description: 'Discover the world of whiskey, from Scotch to Bourbon and beyond.',
    duration: '3 weeks',
    price: 349,
    image: '/wine-tasting-advanced.jpg',
    level: 'Level 2',
    type: 'spirit',
    category: 'Spirits',
    tags: ['whiskey', 'spirits', 'tasting', 'level-2']
  }
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all-levels');
  const [selectedTypes, setSelectedTypes] = useState<CourseType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const router = useRouter();

  // Toggle favorite status for a course
  const toggleFavorite = (courseId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // Navigate to course details
  const navigateToCourse = (courseId: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/courses/${courseId}`);
  };
  
  // Get all unique tags from courses
  const allTags = Array.from(new Set(courses.flatMap(course => course.tags)));
  
  // Toggle course type filter
  const toggleTypeFilter = (type: CourseType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  // Toggle tag filter
  const toggleTagFilter = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel('all-levels');
    setSelectedTypes([]);
    setSelectedTags([]);
    setPriceRange([0, 2500]);
  };

  useEffect(() => {
    let result = [...courses];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by level
    if (selectedLevel !== 'all-levels') {
      result = result.filter(course => 
        course.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }
    
    // Filter by course types
    if (selectedTypes.length > 0) {
      result = result.filter(course => 
        selectedTypes.includes(course.type as CourseType)
      );
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(course =>
        selectedTags.every(tag => course.tags.includes(tag))
      );
    }
    
    // Filter by price range
    result = result.filter(course => 
      course.price >= priceRange[0] && course.price <= priceRange[1]
    );
    
    setFilteredCourses(result);
  }, [searchQuery, selectedLevel, selectedTypes, selectedTags, priceRange]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Discover Our Wine Courses
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-primary-100">
            Expert-led wine education for all levels, from passionate beginners to aspiring connoisseurs.
            Expand your knowledge and palate with our comprehensive courses.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - 1/4 width on large screens */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Filter Toggle - Mobile */}
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                {/* Expanded Filters */}
                <div className="hidden lg:block space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Filter Courses</h3>
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-800"
                    >
                      Clear all filters
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Course Type Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Course Type</h4>
                      <div className="space-y-2">
                        {courseTypes.map((type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              checked={selectedTypes.includes(type)}
                              onChange={() => toggleTypeFilter(type)}
                            />
                            <span className="ml-2 text-sm text-gray-700 capitalize">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Level Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Course Level</h4>
                      <select
                        id="level"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg transition-colors duration-200"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                      >
                        <option value="all-levels">All Levels</option>
                        <option value="Level 1">Level 1 - Beginner</option>
                        <option value="Level 2">Level 2 - Intermediate</option>
                        <option value="Level 3">Level 3 - Advanced</option>
                      </select>
                    </div>
                    
                    {/* Tags Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {allTags.slice(0, 12).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTagFilter(tag)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              selectedTags.includes(tag)
                                ? 'bg-primary-100 text-primary-800 border border-primary-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {tag.split('-').join(' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Price Range</h4>
                      <div className="px-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">${priceRange[0]}</span>
                          <span className="text-sm text-gray-500">${priceRange[1]}+</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="2500"
                          step="50"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Grid - 3/4 width on large screens */}
          <div className="lg:w-3/4">
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <span>Sort by:</span>
                <select 
                  id="sort"
                  name="sort"
                  className="ml-2 border-0 bg-transparent text-primary-700 font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rounded-md transition-colors duration-200"
                  defaultValue="newest"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="group flex flex-col overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="relative h-48">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-primary-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                            {course.type.toUpperCase()}
                          </span>
                          <span className="bg-white/90 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            {course.level}
                          </span>
                          {course.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="bg-white/80 text-gray-700 text-xs px-2 py-1 rounded-full">
                              {tag.split('-').join(' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {course.level}
                        </span>
                        <span className="text-sm font-medium text-gray-500">{course.duration}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                      
                      {/* Course Tags */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag.split('-').join(' ')}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center font-medium text-primary-700">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span className="text-lg">${course.price}</span>
                            <span className="text-xs text-gray-500 ml-1">/course</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/courses/${course.id}`}
                            className="flex-1 flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                          >
                            View Details
                          </Link>
                          <div 
                            onClick={(e) => navigateToCourse(course.id, e)}
                            className="relative cursor-pointer"
                          >
                            <button
                              onClick={(e) => toggleFavorite(course.id, e)}
                              className="ml-3 p-2 rounded-full bg-white text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                              aria-label={favorites[course.id] ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              {favorites[course.id] ? (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-6 w-6 text-red-500" 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path 
                                    fillRule="evenodd" 
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                    clipRule="evenodd" 
                                  />
                                </svg>
                              ) : (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-6 w-6" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No courses found</h3>
                <p className="mt-2 text-gray-500">
                  We couldn't find any courses matching your criteria. Try adjusting your filters.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLevel('all-levels');
                      setPriceRange([0, 1000]);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            )}

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Not sure which course is right for you?</h2>
              <p className="mt-2 text-gray-600">Contact our education advisors for personalized recommendations.</p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 md:py-4 md:text-lg md:px-8"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

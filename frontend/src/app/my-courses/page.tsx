import Image from 'next/image';
import Link from 'next/link';

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 'beginner',
    title: 'Wine Fundamentals',
    description: 'Learn the basics of wine tasting, grape varieties, and food pairing in this introductory course.',
    progress: 65,
    nextLesson: 'Week 3: Old World vs New World Wines',
    lessonsCompleted: 13,
    totalLessons: 20,
    lastAccessed: '2 days ago',
    image: '/wine-tasting.jpg',
    level: 'Beginner',
    instructor: 'Sarah Johnson',
    startDate: 'May 1, 2023',
    endDate: 'May 29, 2023'
  },
  {
    id: 'wine-making',
    title: 'Wine Making Workshop',
    description: 'Experience the winemaking process from grape to bottle in this hands-on workshop.',
    progress: 30,
    nextLesson: 'Fermentation Process',
    lessonsCompleted: 3,
    totalLessons: 10,
    lastAccessed: '1 week ago',
    image: '/wine-making.jpg',
    level: 'Beginner',
    instructor: 'Michael Chen',
    startDate: 'May 15, 2023',
    endDate: 'June 15, 2023'
  }
];

export default function MyCoursesPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            My Learning
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Continue your wine education journey
          </p>
        </div>

        <div className="space-y-8">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/4">
                  <div className="h-full w-full relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full">
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
                      <p className="mt-1 text-gray-600">{course.description}</p>
                      
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <span>Instructor: {course.instructor}</span>
                        <span className="mx-2">•</span>
                        <span>{course.lessonsCompleted} of {course.totalLessons} lessons completed</span>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-shrink-0">
                      <Link 
                        href={`/courses/${course.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Next up: {course.nextLesson}</p>
                        <p className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</p>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-4">
                        <Link 
                          href={`/courses/${course.id}`}
                          className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500"
                        >
                          View course details
                          <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Continue Your Learning Journey</h2>
            <p className="mt-2 text-gray-600">Explore more courses to expand your wine knowledge</p>
            <div className="mt-6">
              <Link 
                href="/courses"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

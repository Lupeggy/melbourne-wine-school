import { Wine, Award, BookOpen, Users, Clock, MapPin, ChevronDown, Star } from 'lucide-react';
import Link from 'next/link';

// CourseCard component remains the same as before
function CourseCard({ course }: { course: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <Wine className="h-12 w-12" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
            {course.level}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{course.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{course.seats} seats remaining</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${course.price}</span>
          <Link 
            href={`/courses/${course.id}`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

// Benefits data moved inside the component to avoid duplication

export default function WSETCoursesPage() {
  const courses = [
    {
      id: 'wset-level-1',
      title: 'WSET Level 1 Award in Wines',
      description: 'An introductory course for those starting a career in wine or pursuing an interest in wine.',
      level: 'Level 1',
      duration: '1 day (9:30am - 5:30pm)',
      price: 495,
      location: 'Melbourne CBD',
      seats: 12,
    },
    {
      id: 'wset-level-2',
      title: 'WSET Level 2 Award in Wines',
      description: 'A beginner- to intermediate-level qualification exploring wines and spirits.',
      level: 'Level 2',
      duration: '4 days (10:00am - 5:00pm)',
      price: 1295,
      location: 'Melbourne CBD',
      seats: 8,
    },
    {
      id: 'wset-level-3',
      title: 'WSET Level 3 Award in Wines',
      description: 'An advanced-level qualification for professionals working with wine and spirits.',
      level: 'Level 3',
      duration: '5 days + exam',
      price: 2495,
      location: 'Melbourne CBD',
      seats: 6,
    },
  ];

  const benefits = [
    {
      title: 'Globally Recognized Certification',
      description: 'WSET qualifications are recognized and respected worldwide in the wine and spirits industry.',
      icon: <Award className="h-8 w-8 text-primary-600" />,
    },
    {
      title: 'Structured Learning Path',
      description: 'Progressive levels that build your knowledge from beginner to expert level.',
      icon: <BookOpen className="h-8 w-8 text-primary-600" />,
    },
    {
      title: 'Industry Expert Educators',
      description: 'Learn from certified WSET educators with extensive industry experience.',
      icon: <Users className="h-8 w-8 text-primary-600" />,
    },
    {
      title: 'Practical Tasting Skills',
      description: 'Develop systematic tasting technique to evaluate wines like a professional.',
      icon: <Wine className="h-8 w-8 text-primary-600" />,
    }
  ];

  const faqs = [
    {
      question: 'What is WSET?',
      answer: 'The Wine & Spirit Education Trust (WSET) is the largest global provider of wine, spirits, and sake qualifications.',
    },
    {
      question: 'Do I need any prior knowledge?',
      answer: 'No prior knowledge is required for Level 1. Each level builds upon the previous one.',
    },
    {
      question: 'Is there an exam?',
      answer: 'Yes, each WSET level includes an exam to assess your knowledge and tasting abilities.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Wine className="h-8 w-8 mr-2" />
              <span className="text-sm font-semibold tracking-wider">WSET QUALIFICATIONS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">WSET Wine Courses in Melbourne</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Internationally recognized wine qualifications for enthusiasts and professionals alike.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#courses"
                className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium"
              >
                View Courses
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Study WSET?</h2>
            <p className="text-lg text-gray-600">
              The Wine & Spirit Education Trust (WSET) is the largest global provider of wine, spirits and sake qualifications. 
              Our courses are designed for both wine enthusiasts and professionals looking to enhance their knowledge and skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available Courses */}
        <section id="courses" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our range of WSET qualifications and find the perfect course for your level of expertise.
            </p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900">Filter Courses</h3>
              <p className="text-sm text-gray-500">Find the right course for your level</p>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Filter by:</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>All Levels</option>
                  <option>Level 1</option>
                  <option>Level 2</option>
                  <option>Level 3</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20 bg-primary-50 rounded-xl p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-12">What Our Students Say</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The WSET Level 2 course was incredibly comprehensive. The instructor's knowledge was exceptional, and the tasting sessions were invaluable."
                </p>
                <div className="flex items-center">
                  <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center text-primary-800 font-bold mr-4">
                    JD
                  </div>
                  <div>
                    <h4 className="font-medium">James D.</h4>
                    <p className="text-sm text-gray-500">WSET Level 2 Graduate</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "As a restaurant manager, the WSET certification has been instrumental in advancing my career. The course structure was perfect."
                </p>
                <div className="flex items-center">
                  <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center text-primary-800 font-bold mr-4">
                    SM
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah M.</h4>
                    <p className="text-sm text-gray-500">Restaurant Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left focus:outline-none">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-gray-500 transform transition-transform" />
                  </div>
                </button>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-primary-800 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your WSET Journey?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our next WSET course and take the first step towards becoming a certified wine professional.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium"
            >
              Contact Us
            </Link>
            <Link
              href="tel:+61396541055"
              className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md font-medium"
            >
              Call Now: (03) 9654 1055
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

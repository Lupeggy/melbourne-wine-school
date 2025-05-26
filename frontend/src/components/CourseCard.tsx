import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Award } from 'lucide-react';

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  image: string;
  startDate: string;
  location: string;
  seats: number;
  category: string;
};

export default function CourseCard({
  id,
  title,
  description,
  level,
  duration,
  price,
  image,
  startDate,
  location,
  seats,
  category,
}: CourseCardProps) {
  const levelColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          src={image || '/images/course-placeholder.jpg'} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${levelColors[level]}`}>
            {level}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <span className="text-lg font-bold text-primary-600">${price}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(startDate).toLocaleDateString('en-AU', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{seats} seats remaining</span>
          </div>
          {category === 'wset' && (
            <div className="flex items-center text-sm text-amber-700 bg-amber-50 px-2 py-1 rounded">
              <Award className="h-4 w-4 mr-2" />
              <span>WSET Certified Course</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Link 
            href={`/courses/${id}`} 
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            View Details
          </Link>
          <Link 
            href={`/enroll/${id}`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}

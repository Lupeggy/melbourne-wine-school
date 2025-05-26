'use client';

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the CourseDetail component with SSR disabled
const CourseDetail = dynamic(
  () => import('@/components/CourseDetail'),
  { ssr: false }
);

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

const courses: Record<string, Course> = {
  'wine-fundamentals': {
    id: 'wine-fundamentals',
    title: 'Wine Fundamentals',
    description: 'Learn the basics of wine tasting, grape varieties, and food pairing in this introductory course.',
    longDescription: 'This comprehensive course is designed for wine enthusiasts who want to build a solid foundation in wine knowledge. Over four weeks, you\'ll explore the major wine regions of the world, understand different grape varieties, and learn professional tasting techniques.',
    duration: '4 weeks',
    price: 199,
    image: '/wine-tasting.jpg',
    level: 'Beginner',
    schedule: [
      'Week 1: Introduction to Wine Tasting',
      'Week 2: Major Grape Varieties',
      'Week 3: Old World vs New World Wines',
      'Week 4: Food and Wine Pairing Basics'
    ],
    whatYoullLearn: [
      'How to taste wine like a professional',
      'Key characteristics of major grape varieties',
      'Understanding wine labels and terminology',
      'Basic food and wine pairing principles',
      'Wine serving and storage best practices'
    ],
    instructor: 'Jane Smith',
    location: 'Online & In-person',
    startDate: 'June 15, 2024',
    availableSeats: 12,
    category: 'Wine Education',
    tags: ['beginner', 'wine-tasting', 'fundamentals']
  },
  'wine-food-pairing': {
    id: 'wine-food-pairing',
    title: 'Wine & Food Pairing',
    description: 'Master the art of pairing wine with food',
    longDescription: 'Learn how to create perfect pairings between food and wine in this comprehensive course.',
    duration: '6 weeks',
    price: 299,
    image: '/wine-food.jpg',
    level: 'Intermediate',
    schedule: [
      'Week 1: Fundamentals of Food & Wine Pairing',
      'Week 2: Pairing with Proteins',
      'Week 3: Regional Pairings',
      'Week 4: Cheese & Wine',
      'Week 5: Dessert Wines',
      'Week 6: Creating Pairing Menus'
    ],
    whatYoullLearn: [
      'The science behind food and wine pairing',
      'How to balance flavors',
      'Classic food and wine combinations',
      'Creating your own pairings',
      'Hosting wine pairing dinners'
    ],
    instructor: 'John Doe',
    location: 'Downtown Campus',
    startDate: 'July 1, 2024',
    availableSeats: 8,
    category: 'Wine Education',
    tags: ['intermediate', 'food-pairing', 'wine']
  },
  'wset-level1': {
    id: 'wset-level1',
    title: 'WSET Level 1 in Wines',
    description: 'Introduction to wine for beginners',
    longDescription: 'A perfect introduction to the world of wine for those starting a career in wine or pursuing an interest in the subject.',
    duration: '1 day',
    price: 399,
    image: '/wset-level1.jpg',
    level: 'Beginner',
    schedule: [
      'Day 1: Tasting Techniques & Wine Styles',
      'Day 1: Grape Varieties & Winemaking',
      'Day 1: Food & Wine Pairing Basics'
    ],
    whatYoullLearn: [
      'The main types and styles of wine',
      'Common wine grapes and their characteristics',
      'How to store and serve wine',
      'The principles of food and wine pairing',
      'How to describe wine using the WSET Level 1 Systematic Approach to Tasting Wine® (SAT)'
    ],
    instructor: 'Sarah Johnson',
    location: 'Main Campus',
    startDate: 'June 10, 2024',
    availableSeats: 15,
    category: 'WSET',
    tags: ['wset', 'certification', 'beginner']
  }
};



export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses[params.id];

  if (!course) {
    notFound();
  }

  return (
    <main>
      <CourseDetail course={course} />
    </main>
  );
}

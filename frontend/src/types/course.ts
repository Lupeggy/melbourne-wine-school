export interface Course {
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

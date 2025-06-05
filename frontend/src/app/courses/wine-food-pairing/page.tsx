import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wine, Clock, BarChart2, Utensils, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WineFoodPairing() {
  const course = {
    title: "Wine & Food Pairing",
    description: "Master the art of pairing wine with food to enhance flavors and create memorable dining experiences. Learn the principles of matching wine with various cuisines and ingredients.",
    duration: "6 weeks",
    price: 299,
    level: "Intermediate",
    image: "/images/courses/wine-food-pairing.jpg",
    startDate: "April 15, 2024",
    schedule: "Tuesdays & Thursdays, 6:30 PM - 8:30 PM",
    location: "Melbourne CBD Campus & Online",
    instructor: "Chef Michael Langdon",
    highlights: [
      "Understand flavor profiles and how they interact",
      "Pair wine with different cuisines and cooking methods",
      "Handle challenging ingredients like artichokes and asparagus",
      "Create perfect cheese and charcuterie boards",
      "Plan wine-paired tasting menus"
    ],
    modules: [
      {
        title: "Fundamentals of Flavor",
        description: "Understanding taste components and how they interact with wine"
      },
      {
        title: "Classic Pairings",
        description: "Traditional wine and food combinations that never fail"
      },
      {
        title: "Regional Pairings",
        description: "Matching wines with international cuisines"
      },
      {
        title: "Advanced Pairing Techniques",
        description: "Working with umami, bitterness, and other challenging flavors"
      },
      {
        title: "Dessert and Fortified Wines",
        description: "Perfect pairings for sweet endings"
      },
      {
        title: "Practical Application",
        description: "Planning and executing a complete wine-paired menu"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Course Overview */}
            <Card className="overflow-hidden border-2 border-primary/20">
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {course.duration}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                <CardTitle className="text-3xl">Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 mb-6">
                  This comprehensive course will transform the way you think about wine and food. 
                  Whether you're a hospitality professional looking to enhance your menu or a wine 
                  enthusiast wanting to elevate your dining experiences, you'll gain practical skills 
                  and knowledge that you can immediately apply.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                <ul className="space-y-2 mb-6">
                  {course.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-3">Course Details</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Start Date</h4>
                      <p className="text-sm text-foreground/80">{course.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Schedule</h4>
                      <p className="text-sm text-foreground/80">{course.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-sm text-foreground/80">{course.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <BarChart2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Level</h4>
                      <p className="text-sm text-foreground/80">{course.level}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Course Curriculum</CardTitle>
                <CardDescription>
                  A comprehensive journey through wine and food pairing principles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">{module.title}</h4>
                          <p className="text-foreground/80 text-sm">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Course Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-4">
                  ${course.price}
                  <span className="text-base font-normal text-foreground/70"> AUD</span>
                </div>
                <p className="text-sm text-foreground/80 mb-6">
                  Includes all course materials, wine tastings, and a certificate upon completion.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Enroll Now
                </Button>
                <p className="text-xs text-foreground/60 mt-2 text-center">
                  Secure payment processing
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-medium">{course.instructor}</h4>
                    <p className="text-sm text-foreground/80">Master Sommelier & Chef</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-foreground/80">
                  With over 15 years of experience in fine dining and wine education, {course.instructor.split(' ')[0]} brings a wealth of knowledge about flavor combinations and culinary arts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  '12 hours of live instruction',
                  'Tasting notes and materials',
                  'Certificate of completion',
                  'Access to online resources',
                  'Small group learning environment'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Wine & Food Pairing?</h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Join our next session and start creating perfect wine and food combinations like a professional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

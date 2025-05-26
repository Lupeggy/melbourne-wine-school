import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const events = {
  'summer-wine-festival': {
    id: 'summer-wine-festival',
    title: 'Summer Wine Festival',
    description: 'Join us for a celebration of summer wines from around the world.',
    longDescription: 'The Summer Wine Festival is our annual celebration of the season\'s best wines. This year, we\'re featuring over 100 different wines from local and international producers. Meet the winemakers, attend educational seminars, and enjoy live music while you sample an incredible selection of summer wines.',
    date: '2023-12-15',
    time: '6:00 PM - 9:00 PM',
    location: 'Melbourne Convention Centre',
    address: '1 Convention Centre Pl, South Wharf VIC 3006',
    price: 79,
    capacity: 300,
    remainingSpots: 42,
    image: '/summer-festival.jpg',
    category: 'Festival',
    highlights: [
      'Taste over 100 different wines',
      'Meet the winemakers',
      'Live music and entertainment',
      'Gourmet food trucks',
      'Educational tasting sessions',
      'Exclusive festival discounts on wine purchases'
    ],
    schedule: [
      '6:00 PM - Doors Open',
      '6:30 PM - Welcome Address',
      '7:00 PM - Master Tasting Session',
      '8:00 PM - Live Music Performance',
      '9:00 PM - Event Concludes'
    ],
    featuredWines: [
      'Rosé from Provence',
      'New Zealand Sauvignon Blanc',
      'Australian Sparkling',
      'Spanish Albariño',
      'Italian Pinot Grigio'
    ]
  },
  // Add other events with similar structure
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = events[params.id as keyof typeof events];

  if (!event) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-AU', options);
  };

  const isSoldOut = event.remainingSpots <= 0;
  const isLowAvailability = event.remainingSpots > 0 && event.remainingSpots <= 20;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:justify-between">
          <div className="lg:w-2/3 lg:pr-8">
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {event.category}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {event.title}
              </h1>
              
              <div className="mt-6 flex items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{formatDate(event.date)}</span>
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{event.time}</span>
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">About This Event</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  <p>{event.longDescription}</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Event Highlights</h2>
                <ul className="mt-4 space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Event Schedule</h2>
                  <ul className="mt-4 space-y-3">
                    {event.schedule.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Featured Wines</h2>
                  <ul className="mt-4 space-y-2">
                    {event.featuredWines.map((wine, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{wine}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold text-gray-900">Location</h2>
                <div className="mt-4 flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-gray-700">{event.location}</p>
                    <p className="text-gray-500">{event.address}</p>
                    <div className="mt-4">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        View on map →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${event.price}</span>
                  {isLowAvailability && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Only {event.remainingSpots} spots left!
                    </span>
                  )}
                  {isSoldOut && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Sold Out
                    </span>
                  )}
                </div>
                
                <div className="mt-4">
                  <button
                    disabled={isSoldOut}
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${isSoldOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                  >
                    {isSoldOut ? 'Sold Out' : 'Book Now'}
                  </button>
                </div>

                {!isSoldOut && (
                  <p className="mt-3 text-center text-sm text-gray-500">
                    Secure your spot now. Limited availability.
                  </p>
                )}

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900">Share this event</h3>
                  <div className="mt-3 flex space-x-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        typeof window !== 'undefined' 
                          ? window.location.href 
                          : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${params ? `/events/${params.id}` : ''}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(event.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(event.title)}&body=Check out this event: ${encodeURIComponent(window.location.href)}`}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Email</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-10.5 6.5-10.5-6.5z" />
                        <path d="M12 15.25l9-5.57V6.75a3 3 0 00-3-3h-12a3 3 0 00-3 3v3.08l9 5.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Have questions?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Our event coordinators are here to help with any questions you might have about this event.
                </p>
                <div className="mt-6">
                  <a
                    href="/contact"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

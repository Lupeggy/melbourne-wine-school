import Image from 'next/image';
import Link from 'next/link';

const events = [
  {
    id: 'summer-wine-festival',
    title: 'Summer Wine Festival',
    description: 'Join us for a celebration of summer wines from around the world. Taste over 100 different wines and meet the winemakers.',
    date: '2023-12-15',
    time: '6:00 PM - 9:00 PM',
    location: 'Melbourne Convention Centre',
    price: 79,
    image: '/summer-festival.jpg',
    category: 'Festival',
  },
  {
    id: 'italian-wine-masterclass',
    title: 'Italian Wine Masterclass',
    description: 'Explore the diverse wine regions of Italy in this exclusive masterclass led by Master of Wine, Sarah Johnson.',
    date: '2023-11-22',
    time: '7:00 PM - 9:00 PM',
    location: 'The Wine Room',
    price: 120,
    image: '/italian-wine.jpg',
    category: 'Masterclass',
  },
  {
    id: 'sparkling-wine-workshop',
    title: 'Sparkling Wine Workshop',
    description: 'Learn about different methods of sparkling wine production and taste a selection of premium bubblies from around the world.',
    date: '2023-12-05',
    time: '6:30 PM - 8:30 PM',
    location: 'The Tasting Room',
    price: 95,
    image: '/sparkling-wine.jpg',
    category: 'Workshop',
  },
  {
    id: 'wine-and-cheese-pairing',
    title: 'Wine & Cheese Pairing Evening',
    description: 'Discover the perfect marriage of wine and cheese with our expert sommelier and fromager.',
    date: '2023-11-30',
    time: '7:00 PM - 9:30 PM',
    location: 'The Cellar Door',
    price: 85,
    image: '/wine-cheese.jpg',
    category: 'Tasting',
  },
];

export default function EventsPage() {
  const upcomingEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-AU', options);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Upcoming Events
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Join us for exclusive wine tastings, masterclasses, and special events.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={event.image}
                  alt={event.title}
                  layout="fill"
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-800 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {event.category}
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-red-800 font-semibold">
                  {formatDate(event.date)} • {event.time}
                </div>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">{event.title}</h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{event.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-red-800">${event.price}</span>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/events/${event.id}`}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition-colors duration-200"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-red-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Host Your Private Event With Us</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Looking to host a private wine tasting or corporate event? Our venue and expert sommeliers are available for private bookings.
          </p>
          <div className="mt-6">
            <Link
              href="/contact?enquiry=private-event"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-800 hover:bg-red-900 md:py-4 md:text-lg md:px-8 transition-colors duration-200"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900">Subscribe to Our Newsletter</h2>
          <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto">
            Be the first to know about upcoming events, exclusive tastings, and special offers.
          </p>
          <form className="mt-6 sm:flex max-w-md mx-auto">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-red-500 focus:border-red-500 sm:max-w-xs rounded-md transition-colors duration-200"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

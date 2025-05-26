import { MapPin, Clock, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-primary-700">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-700 to-primary-800 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-white sm:text-5xl md:text-6xl">
            Visit Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-100">
            We'd love to hear from you. Book an appointment or drop us a message.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="divide-y-2 divide-gray-200">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">
                Get in touch
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                We'd love to help you with your wine education journey. 
                Reach out and we'll respond as soon as possible.
              </p>
              
              <div className="mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <MapPin className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Visit us</h3>
                    <p className="mt-1 text-gray-600">
                      123 Wine Street<br />
                      Melbourne, VIC 3000
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <Clock className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Business hours</h3>
                    <p className="mt-1 text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <Mail className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email us</h3>
                    <p className="mt-1 text-gray-600">hello@melbournewineschool.com</p>
                  </div>
                </div>

                <div className="mt-6 flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <Phone className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Call us</h3>
                    <p className="mt-1 text-gray-600">+61 3 1234 5678</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 lg:col-span-2 bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="max-w-lg mx-auto lg:max-w-none">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                    Want To See Us In Person?
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      You are most welcome to come and see us in person. However, we can't guarantee we are always available so we ask that you book ahead to ensure you will be seen and taken care of.
                    </p>
                    <p className="font-medium text-gray-900">
                      Failure to make a booking may mean we are not quite ready when you arrive!
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <Link
                      href="/booking"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 transition-colors duration-200 md:py-4 md:text-lg md:px-8"
                    >
                      Book an Appointment
                    </Link>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-500">
                    <p>Or give us a call at <a href="tel:+61312345678" className="text-primary-700 hover:text-primary-900 font-medium">+61 3 1234 5678</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
            Find us on the map
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.840289123546!2d144.955925!3d-37.815207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%203000!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="w-full h-[450px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

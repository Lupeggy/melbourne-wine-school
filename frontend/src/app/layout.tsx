'use client';

import { ReactNode } from "react";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import FixedNavigation from "../components/FixedNavigation";
import LegalBanner from "../components/LegalBanner";
import { CartProvider } from "@/context/CartContext";

// Font setup
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <CartProvider>
          <div className="fixed top-0 left-0 right-0 z-50">
            <FixedNavigation />
            <LegalBanner />
          </div>
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-400 mb-8">
          <p>Melbourne Wine School acknowledges the Wurundjeri Woi Wurrung people of the Kulin Nation as the Traditional custodians of the lands on which we live and work.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Melbourne Wine School</h3>
            <p className="text-gray-400">Expert wine education and tastings in the heart of Melbourne.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/courses" className="text-gray-400 hover:text-white">Courses</a></li>
              <li><a href="/tastings" className="text-gray-400 hover:text-white">Tastings</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-white">Events</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="/refund" className="text-gray-400 hover:text-white">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Wine St, Melbourne VIC 3000</p>
              <p>Email: info@melbournewineschool.com.au</p>
              <p>Phone: (03) 1234 5678</p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Melbourne Wine School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

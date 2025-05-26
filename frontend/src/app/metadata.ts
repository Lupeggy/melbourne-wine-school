import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Melbourne Wine School | Expert Wine Education",
  description: "Discover the world of wine with expert-led courses and tastings in the heart of Melbourne. Perfect for enthusiasts and professionals alike.",
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
  openGraph: {
    title: 'Melbourne Wine School | Expert Wine Education',
    description: 'Discover the world of wine with expert-led courses and tastings in the heart of Melbourne.',
    url: 'https://melbournewineschool.com',
    siteName: 'Melbourne Wine School',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melbourne Wine School',
    description: 'Expert wine education in the heart of Melbourne',
    creator: '@melbwineschool',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

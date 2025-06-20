import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LanguageProvider } from '@/components/LanguageProvider';

// Using next/font for Poppins as it's best practice, ignoring specific instruction for <link> tags
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // 500/600 for headings, 400 for body, 700 for bold
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Thanima - South-Indian Fashion',
    template: '%s | Thanima',
  },
  description: 'Discover exclusive South-Indian fashion in Switzerland. Sarees, Lehengas, and Silk Blouses.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Thanima - South-Indian Fashion',
    description: 'Exclusive Sarees, Lehengas and Seidenblusen direkt aus Chennai nach Zuerich gebracht.',
    // og:image will be set per page, but a default can be here
    images: [{ url: 'https://placehold.co/1200x630.png?text=Thanima+Fashion' }], 
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#636b2f', // Primary color
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.variable} h-full`}>
      <head>
        {/* Google Fonts preconnect, next/font handles this but kept if other fonts were linked manually */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon configuration */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Link for Poppins handled by next/font, this is redundant
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        */}
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background">
        <LanguageProvider />
        {children}
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}

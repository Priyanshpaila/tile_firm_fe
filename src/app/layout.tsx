import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TileVista | Premium Tiles & Visualization',
  description: 'Discover, visualize, and bring your vision to life.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-charcoal selection:bg-brand-gold selection:text-brand-charcoal">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#2F3437', // Brand Charcoal
              color: '#F7F3EE', // Brand Cream
              border: '1px solid #B89B72', // Brand Gold
              borderRadius: '1.25rem',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '1rem 1.5rem',
            },
          }}
        />
      </body>
    </html>
  );
}


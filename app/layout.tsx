import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ModernNavbar } from './components/ModernNavbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { baseUrl } from './sitemap';
import AnimatedLayout from './components/AnimatedLayout';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Rifqi Agnia Mubarok - Portfolio',
    template: '%s | Rifqi Agnia Mubarok',
  },
  description: 'Full-stack developer passionate about creating modern web experiences.',
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    title: 'Rifqi Agnia Mubarok - Portfolio',
    description: 'Full-stack developer passionate about creating modern web experiences.',
    url: baseUrl,
    siteName: 'Rifqi Agnia Mubarok',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx('antialiased', GeistSans.variable, GeistMono.variable)}>
      <body className="min-h-screen text-white">
        {/* Main Layout Container */}
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="sidebar fixed left-0 top-0 w-80 h-screen p-8 z-50">
            {/* Profile Section */}
            <div className="mb-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 mb-4 flex items-center justify-center text-2xl font-bold">R</div>
              <h1 className="text-xl font-bold text-white mb-2">Rifqi Agnia Mubarok</h1>
              <p className="text-text-secondary text-sm">Full-stack Developer</p>
            </div>

            {/* Navigation */}
            <ModernNavbar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-80 min-h-screen">
            <div className="max-w-4xl mx-auto px-8 py-12">
              <AnimatedLayout>{children}</AnimatedLayout>
              <Footer />
            </div>
          </main>
        </div>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

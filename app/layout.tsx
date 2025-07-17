import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { baseUrl } from './sitemap';
import { title } from 'process';
import Link from 'next/link';
import Terminal from './components/Terminal';
import ButtonTerminal from './components/Terminal/ButtonTerminal';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Next.js Portfolio Starter',
    template: '%s | Next.js Portfolio Starter',
  },
  description: 'This is my portfolio.',
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
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

const socmeds = [
  {
    title: 'Medium',
    url: 'https://medium.com/@rifqiagniamubarok',
  },
  {
    title: 'Linkedin',
    url: 'https://www.linkedin.com/in/rifqiagniamubarok/',
  },
  {
    title: 'Github',
    url: 'https://github.com/rifqiagniamubarok',
  },
  // {
  //   title: 'Email',
  //   url: '',
  // },
];

const SocmedItem = ({ title, href }) => {
  return (
    <li className="[writing-mode:vertical-lr] rotate-180">
      <Link href={href}>{title}</Link>
    </li>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx('text-black bg-white dark:text-white dark:bg-black', GeistSans.variable, GeistMono.variable)}>
      <body className="antialiased max-w-xl  lg:mx-auto flex">
        <ButtonTerminal />
        <div className="h-screen flex flex-col justify-center items-center sticky top-0 left-0 z-10 gap-4 py-4">
          <div className="grow h-[80px] bg-gray-900 w-0.5"></div>
          <ul className="flex flex-col gap-4">
            {socmeds.map((socmed, index) => (
              <SocmedItem key={index} title={socmed.title} href={socmed.url} />
            ))}
          </ul>
          <div className="grow h-full bg-gray-900 w-0.5"></div>
        </div>
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0 grow mx-4 mt-8">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}

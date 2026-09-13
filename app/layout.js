import './globals.css';
import Navbar from './components/Navbar';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://ma23digital.vercel.app'),

  title: {
    default: 'MA23DIGITAL | Jasa Pembuatan Website & Custom System',
    template: '%s | MA23DIGITAL',
  },

  description:
    'MA23DIGITAL menyediakan jasa pembuatan website, custom system, web application, bug fixing, maintenance, integrasi API, serta invoice online gratis.',

  keywords: [
    'jasa pembuatan website',
    'jasa pembuatan web',
    'jasa web development',
    'jasa website custom',
    'custom website',
    'custom system',
    'software development',
    'web application',
    'bug fixing website',
    'maintenance website',
    'Laravel developer',
    'CodeIgniter developer',
    'Next.js developer',
    'invoice online gratis',
    'pembuat invoice gratis',
    'MA23DIGITAL',
  ],

  authors: [
    {
      name: 'Maulana Septiyadi',
    },
  ],

  creator: 'Maulana Septiyadi',
  publisher: 'MA23DIGITAL',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'MA23DIGITAL | Jasa Pembuatan Website & Custom System',
    description:
      'Jasa pembuatan website, custom system, bug fixing, maintenance, integrasi API, dan invoice online gratis.',
    url: 'https://ma23digital.vercel.app',
    siteName: 'MA23DIGITAL',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MA23DIGITAL - Jasa Pembuatan Website & Custom System',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MA23DIGITAL | Jasa Pembuatan Website & Custom System',
    description:
      'Jasa pembuatan website, custom system, bug fixing, maintenance, dan invoice online gratis.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
        {/* Google AdSense Script Placeholder */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
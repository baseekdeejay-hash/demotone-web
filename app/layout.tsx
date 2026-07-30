import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import SeoJsonLd from '@/components/SeoJsonLd';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

// Canonico = www: Vercel redirige el apex a www a nivel de dominio.
const SITE_URL = 'https://www.demotone.es';
const OG_IMAGE = `${SITE_URL}/og.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DEMOTONE — Techno · Tribal · Hardgroove · Acid',
    template: '%s · DEMOTONE'
  },
  description:
    'Demotone (alias Baseek). Productor, DJ y técnico de sonido afincado cerca de Barcelona. Techno, hardgroove, tribal y acid. Sets, lanzamientos y booking.',
  keywords: [
    'Demotone',
    'Baseek',
    'Techno',
    'Hardgroove',
    'Acid',
    'Tribal',
    'DJ Barcelona',
    'Productor techno',
    'DJ techno España',
    'Hardgroove España',
    'Booking DJ',
    'Tech house',
    'Música electrónica Barcelona'
  ],
  authors: [{ name: 'Demotone', url: SITE_URL }],
  creator: 'Demotone',
  publisher: 'Demotone',
  alternates: {
    canonical: SITE_URL
  },
  openGraph: {
    title: 'DEMOTONE — Techno · Tribal · Hardgroove · Acid',
    description:
      'Productor, DJ y técnico de sonido afincado cerca de Barcelona. Techno, hardgroove, tribal y acid.',
    url: SITE_URL,
    siteName: 'DEMOTONE',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'DEMOTONE — Techno · Tribal · Hardgroove'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEMOTONE — Techno · Tribal · Hardgroove',
    description: 'Productor, DJ y técnico de sonido. Techno, hardgroove, tribal y acid.',
    images: [OG_IMAGE]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  icons: {
    icon: '/favicon.svg'
  },
  category: 'music'
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="antialiased selection:bg-acid selection:text-ink-900">
        <SeoJsonLd />
        {children}
      </body>
    </html>
  );
}

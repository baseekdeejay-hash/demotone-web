import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://demotone.es'),
  title: {
    default: 'DEMOTONE — House / Tribal / Hardgroove',
    template: '%s · DEMOTONE'
  },
  description:
    'Demotone (alias Baseek). DJ, productor y técnico de sonido afincado cerca de Barcelona. House clásico, tribal y hardgroove. Sets, lanzamientos y booking.',
  keywords: [
    'Demotone',
    'Baseek',
    'House',
    'Tribal',
    'Hardgroove',
    'Tech House',
    'DJ',
    'Productor',
    'Barcelona',
    'España'
  ],
  authors: [{ name: 'Demotone' }],
  openGraph: {
    title: 'DEMOTONE — Techno / Hardgroove / Acid',
    description:
      'DJ y productor de Techno, Hardgroove y Acid. Sets, lanzamientos y booking.',
    url: 'https://demotone.es',
    siteName: 'DEMOTONE',
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEMOTONE',
    description: 'Techno · Hardgroove · Acid'
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="antialiased selection:bg-acid selection:text-ink-900">
        {children}
      </body>
    </html>
  );
}

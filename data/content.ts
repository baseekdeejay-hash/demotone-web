// ---------------------------------------------------------------
// CONTENIDO CENTRAL
// Editar aquí para actualizar textos, enlaces y datos del sitio.
// Las marcas TODO indican placeholders que sustituiremos juntos.
// ---------------------------------------------------------------

export const site = {
  name: 'DEMOTONE',
  aliasShort: 'BASEEK',
  domain: 'demotone.es',
  tagline: 'House · Tribal · Hardgroove',
  description:
    'DJ, productor y técnico de sonido afincado cerca de Barcelona. Sets que funden la elegancia del house clásico con grooves tribales y la energía del hardgroove.',
  heroImage: '/images/hero.jpg',
  heroImageAlt: 'Demotone',
  wordmark: '/images/wordmark.jpg',
  logoMono: '/images/logo-mono.jpg'
};

export const nav = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Bio', href: '#bio' },
  { label: 'Música', href: '#music' },
  { label: 'Sets', href: '#sets' },
  { label: 'Fechas', href: '#events' },
  { label: 'Booking', href: '#contact' }
];

// ---------------------------------------------------------------
// BIO — TODO: sustituir por bio real
// ---------------------------------------------------------------
export const bio = {
  image: '/images/bio.jpg',
  imageAlt: 'Retrato de Demotone',
  short:
    'DJ, productor y técnico de sonido nacido cerca de Barcelona. Más de dos décadas dedicadas a la música electrónica, con un sonido que combina la elegancia del house, los grooves del disco y la energía del hardgroove.',
  paragraphs: [
    'Nacido cerca de Barcelona, inició su trayectoria en la música electrónica a los 11 años, con una especial inclinación por el techno y el house. Empezó experimentando con mezclas a través de un par de Walkmans, hasta que adquirió sus primeras tornamesas y una mesa de mezclas de segunda mano. A los 14 años desarrolló un fuerte interés por la producción musical electrónica, formándose de manera autodidacta. A los 18 se graduó como técnico de sonido, experiencia que complementó trabajando con el equipo técnico de una de las principales emisoras de radio del país.',
    'Sus inicios como DJ le llevaron a actuar en diversas salas y locales de referencia de su zona, donde presentó sets enérgicos y cuidadosamente seleccionados de house, tribal y tech house. Apasionado del funk y el disco de los años 70, sus producciones fusionan el house y el tech house con los ritmos y grooves del disco y el soul, logrando una identidad sonora divertida y elegante.',
    'Durante las últimas dos décadas se ha dedicado en gran parte a la producción musical, y en los últimos años se ha adentrado en el mundo del live con cajas de ritmo y sintetizadores, con un aprendizaje constante que refina su técnica y crea un sonido potente: clásicos y elegantes elementos del house junto a su pasión por las bases tribales y el hardgroove más vibrante.'
  ],
  facts: [
    { label: 'Base', value: 'Barcelona · ES' },
    { label: 'Oficio', value: 'DJ · Productor · Live' },
    { label: 'Formación', value: 'Técnico de sonido' }
  ]
};

// ---------------------------------------------------------------
// MÚSICA — TODO: sustituir por tracks reales
// type: 'youtube' acepta videoId; 'soundcloud' acepta URL completa
// ---------------------------------------------------------------
export type Track = {
  title: string;
  type: 'youtube' | 'soundcloud';
  id: string; // videoId (YouTube) o URL (SoundCloud)
  label?: string;
  year?: string;
};

export const tracks: Track[] = [
  {
    title: 'Marsal Ventura & Jbill — Amanecer (Demotone Remix)',
    type: 'soundcloud',
    id: 'https://soundcloud.com/demotone/marsal-ventura-jbill-amanecer-demotone-remix',
    label: 'Addicting Records'
  }
  // Más tracks (YouTube) se añadirán cuando me pases los URLs.
];

// ---------------------------------------------------------------
// SETS / MIXES — TODO: sustituir por mixes reales
// ---------------------------------------------------------------
export type Mix = {
  title: string;
  type: 'youtube' | 'soundcloud';
  id: string;
  category: 'session' | 'live';
  venue?: string;
  date?: string;
  collaborator?: string;
};

export const mixes: Mix[] = [
  // ——— DJ Sessions ———
  {
    title: 'Hardgroove Techno Session 01',
    type: 'youtube',
    id: 'a40G1Zvawvk',
    category: 'session',
    venue: 'Teseracto Local'
  },
  {
    title: 'Hardgroove Techno Session 02',
    type: 'youtube',
    id: '4cGCF2mXhUw',
    category: 'session',
    venue: 'Teseracto Local'
  },
  {
    title: 'Techno Vinyl Set — w/ DJ Ukra',
    type: 'youtube',
    id: 'FSFzgEakOG4',
    category: 'session',
    collaborator: 'DJ Ukra',
    date: '02 / 2026'
  },
  // ——— Lives ———
  {
    title: 'Micro Set — Live',
    type: 'youtube',
    id: 'Qhyy2Rn8f7A',
    category: 'live',
    venue: 'Teseracto Local'
  }
];

// ---------------------------------------------------------------
// EVENTOS — TODO: agenda real
// ---------------------------------------------------------------
export type EventItem = {
  date: string;        // ISO o legible
  city: string;
  venue: string;
  country?: string;
  ticketUrl?: string;
  status?: 'confirmed' | 'soldout' | 'past';
};

export const events: EventItem[] = [
  // Cuando tengas fechas, añádelas aquí en orden cronológico, por ejemplo:
  // { date: '15 JUN', city: 'Barcelona', venue: 'Razzmatazz', country: 'ES',
  //   ticketUrl: 'https://...', status: 'confirmed' }
];

// ---------------------------------------------------------------
// CONTACTO / BOOKING — TODO: rellenar
// ---------------------------------------------------------------
export const contact = {
  bookingEmail: 'demotone.tech@gmail.com',
  pressEmail: 'demotone.tech@gmail.com', // mismo (se oculta el bloque duplicado)
  social: {
    instagram: 'https://www.instagram.com/demotone.tech/',
    soundcloud: 'https://soundcloud.com/demotone',
    youtube: 'https://www.youtube.com/@demotone',
    spotify:
      'https://open.spotify.com/intl-es/artist/1Jgbm29DkaP4DutFt42Zq0?si=IFGxm-1ZTYuPsZdwRNiGcQ',
    beatport: 'https://www.beatport.com/es/artist/demotone/443831',
    bandcamp: ''
  }
};

// ---------------------------------------------------------------
// CONTENIDO CENTRAL — edita aquí textos, enlaces y datos
// ---------------------------------------------------------------

export const site = {
  name: 'DEMOTONE',
  aliasShort: 'BASEEK',
  domain: 'demotone.es',
  tagline: 'Techno · Tribal · Hardgroove',
  description:
    'Productor, DJ y técnico de sonido afincado cerca de Barcelona. Amante de los vinilos, los ritmos rápidos y la contundencia sonora, apasionado de las cajas de ritmos y los sintetizadores. Sus sets fusionan techno y hardgroove con percusiones tribales, grooves industriales y la intensidad hipnótica del acid.',
  heroImage: '/images/hero.jpg',
  heroImageAlt: 'Demotone',
  wordmark: '/images/wordmark.jpg',
  logoMono: '/images/logo-mono.jpg'
};

export const nav = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Bio', href: '#bio' },
  { label: 'Música', href: '#music' },
  { label: 'Sets', href: '#sets' }
];

// ---------------------------------------------------------------
// BIO
// ---------------------------------------------------------------
export const bio = {
  image: '/images/bio.jpg',
  imageAlt: 'Retrato de Demotone',
  // Video con scroll-scrubbing (avanza al bajar, retrocede al subir).
  // Debe estar codificado con keyframe en cada frame o dara tirones (ver AGENTS.md).
  video: '/videos/bio.mp4',
  videoPoster: '/images/bio-poster.jpg',
  short:
    'DJ, productor y técnico de sonido nacido cerca de Barcelona. Más de dos décadas dedicadas a la música electrónica, con un sonido que combina la contundencia del techno, la energía del hardgroove y la intensidad de los ritmos tribales y los sonidos ácidos hipnóticos.',
  paragraphs: [
    'Nacido cerca de Barcelona, inició su trayectoria en la música electrónica a los 11 años, con una fuerte inclinación por la música electrónica, especialmente por la makina y el hardtrance de la época. Empezó experimentando con mezclas a través de un par de Walkmans, hasta que adquirió sus primeras tornamesas y una mesa de mezclas de segunda mano. A los 14 años desarrolló un gran interés por la producción musical electrónica, aprendiendo de manera autodidacta. A los 18 se graduó como técnico de sonido, experiencia que complementó realizando prácticas junto al equipo de DJs y locutores de una de las principales emisoras de radio del país.',
    'Sus inicios como DJ le llevaron a actuar en diversas salas y locales de referencia de su zona, donde presentó sets intensos y cuidadosamente construidos de techno, tribal y hardgroove. Fascinado por las percusiones contundentes, las líneas hipnóticas y la crudeza del acid, sus producciones fusionan grooves industriales, ritmos tribales y texturas analógicas, construyendo una identidad sonora potente, oscura y envolvente.',
    'Durante las últimas dos décadas se ha dedicado en gran parte a la producción musical, y en los últimos años se ha adentrado en el mundo del live con cajas de ritmo y sintetizadores, manteniendo un aprendizaje constante que refina su técnica y consolida un sonido marcado por la energía del hardgroove, las atmósferas hipnóticas y la contundencia del techno más intenso.'
  ],
  facts: [
    { label: 'Base', value: 'Barcelona · ES' },
    { label: 'Pasión', value: 'DJ · Productor · Live' },
    {
      label: 'Formación',
      value: 'Técnico de sonido · Iluminación · Captación de imagen · Fotografía'
    }
  ],
  extra:
    'Apasionado de las cajas de ritmos y los sintetizadores, entusiasta de las proyecciones mapping y la tecnología aplicada a la música, la iluminación y las artes visuales.'
};

// ---------------------------------------------------------------
// MÚSICA — tracks/releases
// ---------------------------------------------------------------
export type Track = {
  title: string;
  type: 'youtube' | 'soundcloud';
  id: string;
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
];

// ---------------------------------------------------------------
// SETS / MIXES
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
  {
    title: 'Hardgroove Techno Session 03',
    type: 'youtube',
    id: 'vtqU1bvpp24',
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
  {
    title: 'Hardgroove Techno Session 02',
    type: 'youtube',
    id: '4cGCF2mXhUw',
    category: 'session',
    venue: 'Teseracto Local'
  },
  {
    title: 'Hardgroove Techno Session 01',
    type: 'youtube',
    id: 'a40G1Zvawvk',
    category: 'session',
    venue: 'Teseracto Local'
  },
  {
    title: 'Micro Set — Live',
    type: 'youtube',
    id: 'Qhyy2Rn8f7A',
    category: 'live',
    venue: 'Teseracto Local'
  }
];

// ---------------------------------------------------------------
// CONTACTO / BOOKING
// ---------------------------------------------------------------
export const contact = {
  email: 'demotone.tech@gmail.com',
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

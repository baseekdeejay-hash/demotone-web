/**
 * Lista de sesiones DJ.
 *
 * Para anadir una nueva sesion:
 *  1. Sube el .mp3 a tu servidor (ej. http://143.47.48.85/music/sesiones/NOMBRE.mp3)
 *  2. Anade aqui un objeto con su metadata (cover opcional en /public/images/)
 *  3. Asegurate que el host del audio esta en ALLOWED_HOSTS de app/api/audio/route.ts
 */

export type Session = {
  slug: string;
  title: string;
  artist: string;
  description?: string;
  genres: string[];
  cover: string;
  audioSrc: string;
  uploadedAt: string; // ISO
  durationHint?: number; // segundos, opcional (wavesurfer lo detecta solo)
};

export const SESSIONS: Session[] = [
  {
    slug: 'house-on-wax-vol-3',
    title: 'House on Wax vol.3',
    artist: 'Baseek',
    description:
      'Sesion en vinilo. Selección de house clasico y tech house con grooves vibrantes.',
    genres: ['House', 'Tech House', 'Vinyl'],
    cover: '/images/hero-poster.jpg',
    audioSrc:
      'http://143.47.48.85/publico/musica/Baseek%20-%20House%20on%20Wax%20vol.3.mp3',
    uploadedAt: '2026-05-20T00:00:00Z'
  }
];

export function findSession(slug: string): Session | undefined {
  return SESSIONS.find((s) => s.slug === slug);
}

/** Devuelve la URL ya envuelta por el proxy (HTTPS-safe) */
export function proxiedAudioUrl(audioSrc: string): string {
  return `/api/audio?src=${encodeURIComponent(audioSrc)}`;
}

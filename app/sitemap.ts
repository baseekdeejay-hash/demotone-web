import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // URL canónica: la redirección 307 de Vercel manda apex -> www,
  // así que la canónica es www.
  const canonical = 'https://www.demotone.es';
  return [
    {
      url: canonical,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    }
  ];
}

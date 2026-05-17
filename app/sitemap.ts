import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://demotone.es';
  const lastModified = new Date();
  return [
    {
      url: base,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${base}/#bio`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${base}/#music`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${base}/#sets`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${base}/#contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ];
}

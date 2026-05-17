import { contact, site } from '@/data/content';

/**
 * Datos estructurados Schema.org tipo MusicGroup.
 * Ayuda a Google a entender que eres un artista musical,
 * lo que mejora el SEO y puede activar "rich results" (caja de info en búsquedas).
 */
export default function SeoJsonLd() {
  const sameAs = Object.values(contact.social).filter(Boolean);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'Demotone',
    alternateName: 'Baseek',
    url: 'https://demotone.es',
    image: 'https://demotone.es/images/hero-poster.jpg',
    logo: 'https://demotone.es/images/wordmark.jpg',
    description: site.description,
    genre: ['Techno', 'Hardgroove', 'Acid', 'Tribal'],
    foundingLocation: {
      '@type': 'Place',
      name: 'Barcelona, España'
    },
    sameAs,
    email: contact.email,
    member: {
      '@type': 'Person',
      name: 'Demotone',
      alternateName: 'Baseek',
      jobTitle: ['DJ', 'Productor', 'Técnico de sonido'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Barcelona',
        addressCountry: 'ES'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

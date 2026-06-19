import { MetadataRoute } from 'next';

// URL final del sitio. Cuando conecten el dominio propio, cambiá este valor
// (o definí NEXT_PUBLIC_SITE_URL al compilar).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chacralaperegrina.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-06-18'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

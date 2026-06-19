import { MetadataRoute } from 'next';

// URL final del sitio. Cuando conecten el dominio propio, cambiá este valor
// (o definí NEXT_PUBLIC_SITE_URL al compilar).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chacralaperegrina.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

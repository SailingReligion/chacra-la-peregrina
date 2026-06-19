import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  let siteUrl = process.env.NEXTAUTH_URL || 'https://chacralaperegrina.com';
  try {
    const { headers } = require('next/headers');
    const headersList = headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host');
    if (host) {
      const protocol = headersList.get('x-forwarded-proto') || 'https';
      siteUrl = `${protocol}://${host}`;
    }
  } catch {}

  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-06-18'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallowing specific 404 paths is not standard. 
        // Search engines typically handle 404s correctly with a noindex tag,
        // which Next.js adds to not-found.tsx pages.
        // disallow: ['/de/404', '/en/404'], 
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

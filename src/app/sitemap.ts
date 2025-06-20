import type { MetadataRoute } from 'next';
import { i18n, getLocalePath } from '@/lib/i18n';
import { getBaseUrl } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const { locales, defaultLocale } = i18n;

  const pages = ['', '/ueber-uns', '/kontakt']; // Base paths, will be localized

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      let localizedPath = page;
      if (page === '/ueber-uns') {
        localizedPath = locale === 'de' ? '/ueber-uns' : '/about-us';
      } else if (page === '/kontakt') {
        localizedPath = locale === 'de' ? '/kontakt' : '/contact';
      }
      
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${localizedPath}`,
        lastModified: new Date(),
        // changeFrequency and priority can be added if needed
      });
    });
  });

  return sitemapEntries;
}

import type { Locale } from './i18n';
// This type definition is an example, it should match the structure of your site-content.json
// You might want to generate this type from your JSON schema for better accuracy.
// For brevity, using 'any'. In a real project, define this properly.
export type SiteContent = any;

// In a server component or RSC context, you'd fetch this directly.
// For client components, you'd pass this as a prop or use context.
// This example assumes server-side fetching.

let contentCache: SiteContent | null = null;

async function loadContent(): Promise<SiteContent> {
  if (contentCache) {
    return contentCache;
  }
  // In Next.js, you can use process.cwd() to get the root directory
  // and then construct the path to public/site-content.json
  // For server components, direct import or fetch might be used.
  // Using fetch for broader compatibility (e.g. edge runtimes)
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/site-content.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch site content');
  }
  contentCache = await response.json();
  return contentCache!;
}


export async function getContent(locale: Locale): Promise<SiteContent> {
  const allContent = await loadContent();
  if (allContent[locale]) {
    return allContent[locale];
  }
  // Fallback to default locale if specific locale content not found
  return allContent[i18n.defaultLocale];
}

// Re-export i1n config for convenience
import { i18n } from './i18n';
export { i18n };

export function getBaseUrl() {
  if (typeof window !== 'undefined') return ''; 
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 9002}`;
}

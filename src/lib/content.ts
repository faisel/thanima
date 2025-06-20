
import type { Locale } from './i18n';
import fs from 'fs/promises';
import path from 'path';

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
  
  try {
    // Construct the path to public/site-content.json
    const filePath = path.join(process.cwd(), 'public', 'site-content.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    contentCache = JSON.parse(fileContent);
    return contentCache!;
  } catch (error) {
    console.error('Failed to load site content:', error);
    throw new Error('Failed to fetch site content');
  }
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
  // Fallback to NEXT_PUBLIC_BASE_URL if VERCEL_URL is not available, then localhost
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  return `http://localhost:${process.env.PORT || 9002}`;
}


import Link from 'next/link';
import { getContent, type Locale, i18n } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { unstable_setRequestLocale } from 'next-intl/server';


export default async function NotFoundPage({ params }: { params: { lang: Locale } }) {
  // The 'params' object might not have 'lang' in some Next.js versions for root not-found.
  // However, for a /[lang]/not-found.tsx, 'lang' should be available.
  // If not, fall back to default or try to infer.
  const lang = params?.lang && i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale;
  unstable_setRequestLocale(lang);
  const content = await getContent(lang);
  const translations = content.notFound;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4 py-16 animate-fade-in">
      <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold font-headline headline-text mb-4">
        {translations.title}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
        {translations.message}
      </p>
      <Button asChild size="lg" className="transform transition-transform hover:scale-105">
        <Link href={`/${lang}`}>
          {translations.button}
        </Link>
      </Button>
    </div>
  );
}

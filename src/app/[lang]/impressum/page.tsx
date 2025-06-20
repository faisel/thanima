
import { getContent, type Locale, i18n } from '@/lib/content';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  unstable_setRequestLocale(params.lang);
  const content = await getContent(params.lang);
  return {
    title: content.nav.imprint,
    description: `Impressum - ${content.site.title}`,
  };
}

export default async function ImpressumPage({ params: { lang } }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(lang);
  const content = await getContent(lang);

  return (
    <div className="container-max-width py-12 md:py-20 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-headline font-semibold headline-text mb-8">
        {content.nav.imprint}
      </h1>
      <div className="prose dark:prose-invert max-w-none text-foreground/80">
        <p>
          {lang === 'de' ? 'Dies ist eine Platzhalterseite für das Impressum.' : 'This is a placeholder page for the Imprint.'}
        </p>
        <p>Thanima GmbH</p>
        <p>Musterstrasse 12</p>
        <p>8000 Zürich, Schweiz</p>
        <p>Email: info@thanima.ch</p>
        <p>Telefon: +41 79 123 45 67</p>
        <p>Handelsregisternummer: CHE-123.456.789</p>
        <p>Mehrwertsteuernummer: CHE-123.456.789 MWST</p>
      </div>
    </div>
  );
}

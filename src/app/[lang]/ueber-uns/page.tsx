import { getContent, type Locale, i18n } from '@/lib/content';
import { PartnerCard } from '@/components/about/PartnerCard';
import { LazyImage } from '@/components/ui/LazyImage';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return [{ lang: 'de' }]; // Only for German path
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  unstable_setRequestLocale(lang);
  const content = await getContent(lang);
  return {
    title: content.nav.about,
    description: content.about.mission.headline,
     openGraph: {
      images: [{ url: content.about.banner.image, alt: content.about.banner.headline }],
    },
  };
}

export default async function UeberUnsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  unstable_setRequestLocale(lang);
  if (lang === 'en') {
    // This page should only be accessible via /de/ueber-uns
    // English users should be redirected to /en/about-us
    return null;
  }
  const content = await getContent(lang);

  return (
    <div className="space-y-16">
      <section className="py-12 md:py-20">
        <div className="container-max-width">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-semibold headline-text mb-6">
              {content.about.mission.headline}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              {content.about.mission.text}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted">
        <div className="container-max-width">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold headline-text text-center mb-12">
            Unsere Gründerinnen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.about.partners.map((partner: any, index: number) => (
              <PartnerCard key={index} partner={partner} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

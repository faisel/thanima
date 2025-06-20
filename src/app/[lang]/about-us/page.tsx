import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getContent } from '@/lib/content';
import { PartnerCard } from '@/components/about/PartnerCard';
import type { Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  unstable_setRequestLocale(lang);
  const content = await getContent(lang);
  return {
    title: content.nav.about,
    description: content.about.mission.headline,
  };
}

export default async function AboutUsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  unstable_setRequestLocale(lang);
  if (lang === 'de') {
    // This page should only be accessible via /en/about-us
    // German users should be redirected to /de/ueber-uns
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
            Our Founders
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

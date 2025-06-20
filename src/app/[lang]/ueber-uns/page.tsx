import { getContent, type Locale, i18n } from '@/lib/content';
import { PartnerCard } from '@/components/about/PartnerCard';
import { LazyImage } from '@/components/ui/LazyImage';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return [{ lang: 'de' }]; // Only for German path
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  unstable_setRequestLocale(params.lang);
  const content = await getContent(params.lang);
  return {
    title: content.nav.about,
    description: content.about.mission.headline,
     openGraph: {
      images: [{ url: content.about.banner.image, alt: content.about.banner.headline }],
    },
  };
}

export default async function UeberUnsPage({ params: { lang } }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(lang);
  if (lang !== 'de') {
    // This page should only be accessible via /de/ueber-uns
    // The routing/middleware should handle this, but as a safeguard:
    // import { notFound } from 'next/navigation'; notFound();
  }
  const content = await getContent(lang);
  const { banner, partners, mission } = content.about;

  return (
    <div className="animate-fade-in">
      <section className="relative h-[40vh] md:h-[50vh] w-full">
        <LazyImage
          src={banner.image}
          alt={banner.alt || banner.headline}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
          data-ai-hint={banner.data_ai_hint}
        />
        <div className="absolute inset-0 bg-secondary/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-semibold text-white text-center drop-shadow-lg animate-slide-up-fade">
            {banner.headline}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container-max-width">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold headline-text text-center mb-12 md:mb-16">
            {lang === 'de' ? 'Unsere Gründerinnen' : 'Our Founders'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {partners.map((partner: any, index: number) => (
              <PartnerCard key={index} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted">
        <div className="container-max-width text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold headline-text mb-6">
            {mission.headline}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {mission.text}
          </p>
        </div>
      </section>
    </div>
  );
}

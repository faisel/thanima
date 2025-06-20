import { getContent, type Locale, i18n } from '@/lib/content';
import { HeroSlider } from '@/components/home/HeroSlider';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { unstable_setRequestLocale } from 'next-intl/server';


export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(lang);
  const content = await getContent(lang);

  return (
    <div>
      <HeroSlider slides={content.home.banner} locale={lang} />
      
      <section className="py-12 md:py-20 bg-muted">
        <div className="container-max-width text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold headline-text mb-4">
            {content.home.intro.headline}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            {content.home.intro.text}
          </p>
        </div>
      </section>

      <ProductShowcase products={content.home.products} />

      <section className="py-12 md:py-20">
        <div className="container-max-width text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold headline-text mb-6">
              {lang === 'de' ? 'Entdecken Sie unsere Kollektionen' : 'Explore Our Collections'}
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
              {lang === 'de' ? 'Von zeitlosen Klassikern bis zu modernen Designs, finden Sie Ihr perfektes Stück.' : 'From timeless classics to modern designs, find your perfect piece.'}
            </p>
            <Button asChild size="lg" className="group transform transition-transform hover:scale-105">
              <Link href={lang === 'de' ? `/${lang}/kontakt` : `/${lang}/contact`}>
                {lang === 'de' ? 'Kontakt aufnehmen' : 'Get in Touch'}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

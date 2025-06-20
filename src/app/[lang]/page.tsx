import { getContent, type Locale, i18n } from '@/lib/content';
import { HeroSlider } from '@/components/home/HeroSlider';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }];
}

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  unstable_setRequestLocale(lang);
  const content = await getContent(lang);

  return (
    <div className="space-y-16">
      <HeroSlider slides={content.home.banner} locale={lang} />
      <ProductShowcase products={content.home.products} />
    </div>
  );
}

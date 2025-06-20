import { getContent, type Locale, i18n } from '@/lib/content';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapPlaceholder } from '@/components/contact/MapPlaceholder';
import { LazyImage } from '@/components/ui/LazyImage';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return [{ lang: 'en' }]; // Only for English path
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  unstable_setRequestLocale(params.lang);
  const content = await getContent(params.lang);
  return {
    title: content.nav.contact,
    description: `Contact Switzerathi: ${content.contact.address.line1}, ${content.contact.address.line2}`,
     openGraph: {
      images: [{ url: content.contact.banner.image, alt: content.contact.banner.headline }],
    },
  };
}

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(lang);
  if (lang !== 'en') {
    // Safeguard
  }
  const content = await getContent(lang);
  const { banner, address, form: formTranslations } = content.contact;

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
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
             <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-headline font-semibold headline-text mb-6">
                  {lang === 'de' ? 'Kontaktinformation' : 'Contact Information'}
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <p>{address.line1}<br />{address.line2}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <a href={`tel:${address.phone.replace(/\s/g, '')}`} className="hover:text-primary">{address.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <a href={`mailto:${address.email}`} className="hover:text-primary">{address.email}</a>
                  </div>
                </div>
              </div>
               <div>
                 <h3 className="text-xl font-semibold headline-text mb-4">
                    {lang === 'de' ? 'Unser Standort' : 'Our Location'}
                  </h3>
                <MapPlaceholder 
                    lat={address.map.lat} 
                    lng={address.map.lng} 
                    zoom={address.map.zoom}
                    altText={content.contact.mapImageAlt}
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-semibold headline-text mb-6">
                {lang === 'de' ? 'Schreiben Sie uns' : 'Send Us a Message'}
              </h2>
              <ContactForm translations={formTranslations} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

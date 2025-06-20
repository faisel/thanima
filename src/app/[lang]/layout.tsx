import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';
import { getContent, type Locale, i18n, getLocalePath } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  if (!i18n.locales.includes(params.lang)) {
    // This should ideally not be reached if generateStaticParams is correct
    // and middleware handles unknown locales.
    return {}; 
  }
  const content = await getContent(params.lang);
  return {
    title: {
      default: content.site.title,
      template: `%s | ${content.site.title}`,
    },
    description: content.site.description,
    openGraph: {
      title: content.site.title,
      description: content.site.description,
      locale: params.lang,
      // Assuming first banner image for default OG image
      images: content.home.banner[0] ? [{ url: content.home.banner[0].image, alt: content.home.banner[0].alt || content.site.title }] : [],
    },
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        'de-CH': '/de',
        'en-CH': '/en',
        'x-default': `/${i18n.defaultLocale}`
      },
    },
  };
}

// Helper to get paths for language switcher considering current page
function getLanguageSwitchPaths(currentPath: string, currentLocale: Locale): { de: string, en: string } {
  const pathWithoutLocale = currentPath.replace(`/${currentLocale}`, '') || '/';
  let dePath = `/de${pathWithoutLocale}`;
  let enPath = `/en${pathWithoutLocale}`;

  // Handle specific path translations
  // Example: if current is /en/about-us, switch to DE should be /de/ueber-uns
  if (currentLocale === 'en' && pathWithoutLocale === '/about-us') {
    dePath = '/de/ueber-uns';
  } else if (currentLocale === 'de' && pathWithoutLocale === '/ueber-uns') {
    enPath = '/en/about-us';
  } else if (currentLocale === 'en' && pathWithoutLocale === '/contact') {
    dePath = '/de/kontakt';
  } else if (currentLocale === 'de' && pathWithoutLocale === '/kontakt') {
    enPath = '/en/contact';
  }
  // Add more specific translations if needed, or generalize using LocalePathnames

  return { de: dePath, en: enPath };
}


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale, path?: string[] };
}) {
  if (!i18n.locales.includes(params.lang)) {
    notFound();
  }
  const content = await getContent(params.lang);
  
  // This is a placeholder for the current path logic.
  // In a real app, this would come from usePathname() on client or derived on server.
  // For server layout, we can approximate it or pass it down if needed for lang switcher.
  // For now, language switcher might need to be more client-side aware or paths pre-calculated.
  // Simplified approach: Header takes current paths for DE/EN language switch.
  // This requires knowing the equivalent path in the other language.
  // Let's assume currentPath for now is just base for simplicity in this server component.
  // A more robust solution would involve a client component for pathname or more complex server logic.
  // For now, the lang switcher will get simple root paths for other lang.
  // The actual path translation will be handled by the Link components in LanguageSwitcher based on usePathname.
  // This part is tricky because the layout is a Server Component.
  // For now, passing root paths; LanguageSwitcher needs to be smart.
  // Updated: Pre-calculating paths for switcher.
  // A simple way to get current path in Server Component (relative to [lang]):
  // const currentRelativePath = params.path ? `/${params.path.join('/')}` : '/';
  // This is not directly available. We rely on client-side usePathname in LanguageSwitcher or Header.
  // For the Header props, let's pass simplified paths for now.
  const langSwitchPaths = getLanguageSwitchPaths(params.path ? `/${params.path.join('/')}` : '/', params.lang);


  return (
    <html lang={params.lang} className="h-full">
      <body className="flex flex-col min-h-screen bg-background">
        <Header
          locale={params.lang}
          navItems={[
            { href: `/${params.lang}`, label: content.nav.home, ariaLabel: content.nav.home },
            { href: getLocalePath(params.lang, '/ueber-uns'), label: content.nav.about, ariaLabel: content.nav.about },
            { href: getLocalePath(params.lang, '/kontakt'), label: content.nav.contact, ariaLabel: content.nav.contact },
          ]}
          langSwitchPaths={langSwitchPaths}
          translations={{
            logoAlt: content.site.title,
            navHome: content.nav.home,
            navAbout: content.nav.about,
            navContact: content.nav.contact,
          }}
        />
        <main className="flex-grow">
          {children}
        </main>
        <Footer 
          locale={params.lang}
          translations={{
            imprint: content.nav.imprint,
            privacy: content.nav.privacy,
            social: content.footer.social,
          }}
        />
        <ScrollToTopButton />
        <CookieConsentBanner 
          locale={params.lang} 
          translations={content.cookieConsent}
          privacyPolicyPath={`/${params.lang}/datenschutz`} // Assuming datenschutz/privacy path
        />
      </body>
    </html>
  );
}

export const i18n = {
  defaultLocale: 'de',
  locales: ['de', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const LocalePathnames: Record<Locale, Record<string, string>> = {
  de: {
    '/': '/',
    '/about-us': '/ueber-uns',
    '/contact': '/kontakt',
    '/impressum': '/impressum',
    '/datenschutz': '/datenschutz',
  },
  en: {
    '/': '/',
    '/ueber-uns': '/about-us',
    '/kontakt': '/contact',
    '/impressum': '/impressum',
    '/datenschutz': '/datenschutz',
  }
};

export function getLocalePath(locale: Locale, path: string): string {
  return LocalePathnames[locale][path] || path;
}

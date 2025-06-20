import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, LocalePathnames } from '@/lib/i18n';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = [...i18n.locales];

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (e) {
    // Catch error if matchLocale throws (e.g. empty languages array)
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  // If locale is present, check for path translations
  const localePrefix = i18n.locales.find(loc => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`);
  if (localePrefix) {
    const pathWithoutLocale = pathname.replace(`/${localePrefix}`, '') || '/';
    const targetLocale = localePrefix as keyof typeof LocalePathnames;
    
    // Check if this path should be translated for the *other* locale
    for (const sourceLocale in LocalePathnames) {
      if (sourceLocale !== targetLocale) {
        const translatedPath = Object.keys(LocalePathnames[sourceLocale as keyof typeof LocalePathnames]).find(
          key => LocalePathnames[sourceLocale as keyof typeof LocalePathnames][key] === pathWithoutLocale
        );
        if (translatedPath && LocalePathnames[targetLocale][translatedPath]) {
           // This situation should not happen if links are generated correctly.
           // This logic is more for switching language on a page that has an equivalent.
        }
      }
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',
  ],
};

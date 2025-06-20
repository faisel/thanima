"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { i18n, LocalePathnames } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  dePath?: string; // Pre-calculated target path for DE
  enPath?: string; // Pre-calculated target path for EN
}

export function LanguageSwitcher({ currentLocale, dePath, enPath }: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getSwitchPath(targetLocale: Locale): string {
    if (targetLocale === 'de' && dePath) return dePath;
    if (targetLocale === 'en' && enPath) return enPath;

    // Fallback logic if specific paths not provided (should not happen with pre-calculation)
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    
    if (targetLocale === 'de') {
      // Is current English path translatable to German?
      const deEquivalent = Object.keys(LocalePathnames.de).find(key => LocalePathnames.de[key] === pathWithoutLocale);
      if (deEquivalent) return `/de${deEquivalent}`;
      // Or is current path an English specific one?
      if (LocalePathnames.en[pathWithoutLocale]) return `/de${LocalePathnames.en[pathWithoutLocale]}`;
    } else { // targetLocale === 'en'
      // Is current German path translatable to English?
      const enEquivalent = Object.keys(LocalePathnames.en).find(key => LocalePathnames.en[key] === pathWithoutLocale);
      if (enEquivalent) return `/en${enEquivalent}`;
      // Or is current path a German specific one?
      if (LocalePathnames.de[pathWithoutLocale]) return `/en${LocalePathnames.de[pathWithoutLocale]}`;
    }
    return `/${targetLocale}${pathWithoutLocale}`;
  }


  return (
    <div className="flex items-center border border-header-custom-foreground/50 rounded-md overflow-hidden">
      {i18n.locales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          <Button
            key={locale}
            variant="ghost"
            size="sm"
            asChild
            className={`
              h-auto px-3 py-1 rounded-none
              ${isActive ? 'bg-primary text-primary-foreground cursor-default' : 'text-header-custom-foreground hover:bg-primary/10'}
              focus-visible:ring-ring focus-visible:ring-offset-header-custom-background
            `}
          >
            <Link href={isActive ? '#' : getSwitchPath(locale)} aria-current={isActive ? 'true' : undefined}>
              {locale.toUpperCase()}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}

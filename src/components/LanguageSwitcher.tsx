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
    // If pre-calculated paths are provided, use them
    if (targetLocale === 'de' && dePath) return dePath;
    if (targetLocale === 'en' && enPath) return enPath;

    // Extract the path without locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    
    // First, check if the current path has a direct translation in the target locale
    const targetPathnames = LocalePathnames[targetLocale];
    const translatedPath = targetPathnames[pathWithoutLocale];
    
    if (translatedPath) {
      return `/${targetLocale}${translatedPath}`;
    }
    
    // If not found directly, check if the current path is a translated path that should be reversed
    // Look for the current path in the target locale's pathnames values to find the original key
    const reverseTranslatedPath = Object.entries(targetPathnames).find(
      ([key, value]) => value === pathWithoutLocale
    );
    
    if (reverseTranslatedPath) {
      const [originalKey] = reverseTranslatedPath;
      return `/${targetLocale}${originalKey}`;
    }
    
    // Fallback: just change the locale prefix
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

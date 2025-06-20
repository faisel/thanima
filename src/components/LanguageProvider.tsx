'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { i18n } from '@/lib/i18n';

export function LanguageProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname
    const locale = i18n.locales.find(loc => 
      pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
    ) || i18n.defaultLocale;

    // Set the lang attribute on the html element
    document.documentElement.lang = locale;
  }, [pathname]);

  return null;
} 
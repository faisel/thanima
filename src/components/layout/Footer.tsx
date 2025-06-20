"use client";
import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

// Placeholder TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
  </svg>
);

interface FooterProps {
  locale: Locale;
  translations: {
    imprint: string;
    privacy: string;
    social: string;
  };
}

export function Footer({ locale, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky bottom-0 z-[1000] mt-auto w-full bg-muted py-8 text-muted-foreground">
      <div className="container-max-width flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-sm">
          &copy; {currentYear} Switzerathi. All rights reserved.
        </div>
        <nav className="flex gap-4 text-sm" aria-label="Footer legal links">
          <Link href={`/${locale}/impressum`} className="hover:text-primary transition-colors">
            {translations.imprint}
          </Link>
          <Link href={`/${locale}/datenschutz`} className="hover:text-primary transition-colors">
            {translations.privacy}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden md:inline">{translations.social}:</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-primary transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="hover:text-primary transition-colors"
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

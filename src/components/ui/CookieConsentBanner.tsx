"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CookieConsentBannerProps {
  locale: string;
  translations: {
    message: string;
    accept: string;
    learnMore?: string; // Optional
  };
  privacyPolicyPath: string;
}

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

export function CookieConsentBanner({ locale, translations, privacyPolicyPath }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    if (localStorage.getItem(COOKIE_CONSENT_KEY) !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[1200] bg-background border-t border-border p-4 shadow-lg",
        "transform transition-transform duration-500 ease-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="container-max-width flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 id="cookie-consent-title" className="sr-only">Cookie Consent</h2>
          <p id="cookie-consent-description" className="text-sm text-foreground">
            {translations.message}
            {translations.learnMore && (
               <Link href={privacyPolicyPath} className="underline hover:text-primary ml-1">
                 {translations.learnMore}
               </Link>
            )}
          </p>
        </div>
        <Button onClick={handleAccept} className="w-full md:w-auto whitespace-nowrap">
          {translations.accept}
        </Button>
      </div>
    </div>
  );
}

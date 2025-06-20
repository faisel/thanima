// @ts-nocheck
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu as MenuIcon, ShoppingBag } from 'lucide-react'; // Assuming ShoppingBag for logo placeholder

interface NavItem {
  href: string;
  label: string;
  ariaLabel: string;
}

interface HeaderProps {
  navItems: NavItem[];
  locale: Locale;
  langSwitchPaths: { de: string; en: string };
  translations: {
    logoAlt: string;
    navHome: string;
    navAbout: string;
    navContact: string;
  };
}

const SiteLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Switzerathi Logo">
    <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))" />
    <text x="50" y="62" fontSize="32" fill="hsl(var(--primary-foreground))" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="600">SA</text>
  </svg>
);


export function Header({ navItems, locale, langSwitchPaths, translations }: HeaderProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}`, label: translations.navHome, key: 'home' },
    { href: locale === 'de' ? `/${locale}/ueber-uns` : `/${locale}/about-us`, label: translations.navAbout, key: 'about' },
    { href: locale === 'de' ? `/${locale}/kontakt` : `/${locale}/contact`, label: translations.navContact, key: 'contact' },
  ];
  
  const renderNavLinks = (isMobile = false) => navLinks.map((item) => {
    const isActive = pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href));
    return (
      <Link
        key={item.key}
        href={item.href}
        aria-label={item.label}
        className={`relative py-2 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-header-custom-background
          ${isActive ? 'text-primary' : 'text-header-custom-foreground'}
          ${isMobile ? 'block w-full text-lg py-3' : 'px-3'}
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
          ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </Link>
    );
  });


  return (
    <header className="sticky top-0 z-[1100] w-full bg-header-custom-background text-header-custom-foreground shadow-md">
      <div className="container-max-width flex h-16 items-center justify-between lg:h-20">
        <Link href={`/${locale}`} aria-label={translations.logoAlt || "Homepage"} className="flex items-center gap-2">
          <SiteLogo />
          <span className="hidden sm:inline font-headline font-semibold text-lg">Switzerathi</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4" aria-label="Main navigation">
          {renderNavLinks()}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitcher currentLocale={locale} dePath={langSwitchPaths.de} enPath={langSwitchPaths.en} />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <MenuIcon className="h-6 w-6 text-header-custom-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-header-custom-background text-header-custom-foreground p-6">
                <div className="mt-8 flex flex-col space-y-4">
                  {renderNavLinks(true)}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

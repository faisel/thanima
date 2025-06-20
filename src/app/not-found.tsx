// This is a global not-found file. 
// Ideally, middleware redirects to /[lang] and then /[lang]/not-found.tsx handles it.
// This serves as a fallback.
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { i18n } from '@/lib/i18n';

export default function GlobalNotFound() {
  // Since we don't know the user's preferred locale here,
  // redirect to the default locale's homepage.
  const defaultLocale = i18n.defaultLocale;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-16 bg-background">
      <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold font-headline headline-text mb-4">
        Page Not Found
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link href={`/${defaultLocale}`}>
          Go to Homepage ({defaultLocale.toUpperCase()})
        </Link>
      </Button>
    </div>
  );
}

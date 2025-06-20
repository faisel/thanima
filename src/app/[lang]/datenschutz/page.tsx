
import { getContent, type Locale, i18n } from '@/lib/content';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  unstable_setRequestLocale(params.lang);
  const content = await getContent(params.lang);
  return {
    title: content.nav.privacy,
    description: `Datenschutzerklärung - ${content.site.title}`,
  };
}

export default async function DatenschutzPage({ params: { lang } }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(lang);
  const content = await getContent(lang);

  return (
    <div className="container-max-width py-12 md:py-20 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-headline font-semibold headline-text mb-8">
        {content.nav.privacy}
      </h1>
      <div className="prose dark:prose-invert max-w-none text-foreground/80">
        <p>
          {lang === 'de' ? 'Dies ist eine Platzhalterseite für die Datenschutzerklärung.' : 'This is a placeholder page for the Privacy Policy.'}
        </p>
        <h2>1. Einleitung</h2>
        <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie darüber, wie wir Ihre personenbezogenen Daten erheben, verarbeiten und nutzen.</p>
        
        <h2>2. Verantwortliche Stelle</h2>
        <p>Switzerathi GmbH, Musterstrasse 12, 8000 Zürich, Schweiz. Email: info@switzerathi.ch</p>

        <h2>3. Erhebung und Verarbeitung von personenbezogenen Daten</h2>
        <p>Wir erheben und verarbeiten personenbezogene Daten, die Sie uns freiwillig zur Verfügung stellen, z.B. bei der Kontaktaufnahme über unser Kontaktformular. Dies können Name, E-Mail-Adresse und Ihre Nachricht sein.</p>

        <h2>4. Cookies</h2>
        <p>Unsere Webseite verwendet Cookies, um die Benutzerfreundlichkeit zu verbessern. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie können die Verwendung von Cookies in Ihren Browsereinstellungen deaktivieren.</p>

        <h2>5. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Bitte kontaktieren Sie uns hierfür unter den oben genannten Kontaktdaten.</p>

        <h2>6. Änderungen dieser Datenschutzerklärung</h2>
        <p>Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die jeweils aktuelle Version finden Sie auf unserer Webseite.</p>
        <p>Stand: {new Date().toLocaleDateString(lang)}</p>
      </div>
    </div>
  );
}

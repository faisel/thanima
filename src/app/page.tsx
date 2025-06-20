import { redirect } from 'next/navigation';
import { i18n } from '@/lib/i18n';

export default function RootPage() {
  // For static export, redirect to default locale
  redirect(`/${i18n.defaultLocale}`);
} 
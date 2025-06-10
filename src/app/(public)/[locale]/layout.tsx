import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import Document from '@/components/Document';
import { locales } from '@/config';
// import PublicNavigationLocaleSwitcher from './PublicNavigationLocaleSwitcher';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const metadata: Metadata = {
  title: 'Pi Group'
};
export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming locale is valid
  const { locale } = await params;
  if (!hasLocale(locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);
  return (
    <Document locale={locale}>
      <NextIntlClientProvider>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </NextIntlClientProvider>
    </Document>
  );
}

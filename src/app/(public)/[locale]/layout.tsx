import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import Document from '@/components/Document';
import { locales } from '@/config';
import PublicNavigation from './PublicNavigation';
// import PublicNavigationLocaleSwitcher from './PublicNavigationLocaleSwitcher';
import { FooterContact } from '@/components/footer/FooterContact';
import { Footer } from '@/components/footer/Footer';
type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const metadata: Metadata = {
  title: 'next-intl-mixed-routing (public)'
};
export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming locale is valid
  const headersList = await headers();
  const pathname = headersList.get('x-pathname');
  const isContactPage = pathname === "/contact";
  const { locale } = await params;
  if (!hasLocale(locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);
  return (
    <Document locale={locale}>
      <NextIntlClientProvider>
        <div>
          <PublicNavigation />
          <div>{children}</div>
        </div>
        {isContactPage ? (
          <FooterContact />
        ) : (
          <Footer />
        )}
      </NextIntlClientProvider>
    </Document>
  );
}

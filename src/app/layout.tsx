import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import Document from '@/components/Document';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
 
  return (
    <Document locale={locale}>
      <NextIntlClientProvider>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </NextIntlClientProvider>
    </Document>
  );
}
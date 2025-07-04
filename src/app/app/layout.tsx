import {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import Document from '@/components/Document';
import AppNavigationLocaleSwitcher from './AppNavigationLocaleSwitcher';
import Logout from './Logout';
type Props = {
  children: ReactNode;
};
export const metadata: Metadata = {
  title: 'Pi Group'
};
export default async function LocaleLayout({children}: Props) {
  const locale = await getLocale();
  return (
    <Document locale={locale}>
      <NextIntlClientProvider>
        <div className="flex">
          <div className="flex min-h-[100vh] w-[270px] shrink-0 flex-col justify-between bg-slate-100 p-8">
            <div className="flex items-center justify-between">
              <AppNavigationLocaleSwitcher />
              <Logout />
            </div>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </NextIntlClientProvider>
    </Document>
  );
}

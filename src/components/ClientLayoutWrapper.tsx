'use client';
import { usePathname } from 'next/navigation';
import PublicNavigation from '@/components/PublicNavigation';
import { FooterContact } from '@/components/footer/FooterContact';
import { Footer } from '@/components/footer/Footer';
import { ScrollRefsProvider } from '@/context/ScrollRefsContext';
export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isContactPage = pathname === '/en/contact' || pathname === '/vi/lien-he';
  const shouldHideOverflow = pathname === '/en' || pathname === '/vi';
  return (
    <>
      <div>
        <ScrollRefsProvider>
          <PublicNavigation />
          <div className={shouldHideOverflow ? 'overflow-x-hidden' : ''}>
            {children}
          </div>
        </ScrollRefsProvider>
      </div>
      {isContactPage ? <FooterContact /> : <Footer />}
    </>
  );
}

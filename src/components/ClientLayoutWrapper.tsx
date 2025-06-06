'use client';
import { usePathname } from 'next/navigation';
import PublicNavigation from '@/components/PublicNavigation';
import { FooterContact } from '@/components/footer/FooterContact';
import { Footer } from '@/components/footer/Footer';
export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isContactPage = pathname === '/en/contact' || pathname === '/vi/lien-he';
  const shouldHideOverflow = pathname === '/en' || pathname === '/vi';
  return (
    <>
      <div>
        <PublicNavigation />
        <div className={shouldHideOverflow ? 'overflow-x-hidden' : ''}>
          {children}
        </div>
      </div>
      {isContactPage ? <FooterContact /> : <Footer />}
    </>
  );
}

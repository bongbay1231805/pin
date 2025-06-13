'use client';
import { usePathname } from 'next/navigation';
import PublicNavigation from '@/components/PublicNavigation';
import { FooterContact } from '@/components/footer/FooterContact';
import { Footer } from '@/components/footer/Footer';
import { ScrollRefsProvider } from '@/context/ScrollRefsContext';
import { useEffect } from 'react';
export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/").pop();
  const isContactPage = pathname === 'contact';
  const shouldHideOverflow = pathname === 'en' || pathname === 'vi' || pathname === 'digitalcity';
  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelectorAll('canvas').forEach((el) => {
        const style = getComputedStyle(el);
        const zIndex = parseInt(style.zIndex || '0');
        if (
          style.position === 'fixed' &&
          style.pointerEvents === 'none' &&
          zIndex >= 1000000000
        ) {
          el.remove();
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
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
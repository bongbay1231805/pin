'use client';
import { usePathname } from 'next/navigation';
import PublicNavigation from '@/components/PublicNavigation';
import { FooterContact } from '@/components/footer/FooterContact';
import { Footer } from '@/components/footer/Footer';
import { ScrollRefsProvider } from '@/context/ScrollRefsContext';
import { NewsCategoryProvider } from '@/context/NewsCategoryContext';

import { useEffect } from 'react';
import {Footer404} from '@/components/footer/Footer404';
export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/").pop();
  const isContactPage = pathname === 'contact' || pathname === 'lien-he';
  const isNotFoundPage = pathname === 'not-found' || pathname === '404';
  // const shouldHideOverflow = pathname === '' || pathname === 'do-thi-so-picity' || pathname === 'digitalcity';
  const shouldHideOverflow = pathname === '';
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
        <ScrollRefsProvider><></>
          <NewsCategoryProvider>
            <PublicNavigation />
            <div className={shouldHideOverflow ? 'overflow-x-hidden' : ''}>
              {children}
            </div>
          </NewsCategoryProvider>
        </ScrollRefsProvider>
      </div>
      
      {isNotFoundPage ? <Footer404 /> : (isContactPage ? <FooterContact /> : <Footer />)} 
    </>
  );
}
'use client'; 
// import { Locale} from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';
import ClientUseRef from '@/components/client/UseRef';
import Utilitie from '@/components/home/Utilitie';
import { SmartCity } from '@/components/home/SmartCity';
import SkyPart from '@/components/home/SkyPart';
import { Values } from '@/components/home/Values';
import { Partners } from '@/components/home/Partners';
import { useEffect } from 'react';
// type Props = {
//   params: Promise<{ locale: Locale }>;
// };
export default function Index() {
  useEffect(() => {
    const boxes = document.querySelectorAll('.boxanimation');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('show');
          } else {
            el.classList.remove('show');
          }
        });
      },
      {
        // threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0, 0.1, 0.2,...1
        threshold: 0, // 0, 0.1, 0.2,...1
      }
    );
    boxes.forEach(box => observer.observe(box));
    return () => boxes.forEach(box => observer.unobserve(box));
  }, []);
  return (
    <>
      <ClientUseRef />
      <Utilitie />
      <div className='relative h-[880px]'>
        <SmartCity />
      </div>
      <div className="mx-auto max-w-[1582px] ">
        <SkyPart />
      </div>
      <div className="mx-auto max-w-[1582px] border-b-1 border-gray-2">
        <Values />
      </div>
      <div className='mb-[96px]'>
        <Partners />
      </div>
    </>
  );
}

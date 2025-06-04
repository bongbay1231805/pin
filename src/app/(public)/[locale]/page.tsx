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
        threshold: 0.2, // 0, 0.1, 0.2,...1
      }
    );
    boxes.forEach(box => observer.observe(box));
    return () => boxes.forEach(box => observer.unobserve(box));
  }, []);
  return (
    <>
      <ClientUseRef />
      <Utilitie />
      <SmartCity />
      <div className="mx-auto max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px] boxanimation">
        <SkyPart />
      </div>
      <div className="mx-auto max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px] boxanimation border-b-1 border-gray-2">
        <Values />
      </div>
      <div className='mb-[5%] 2xl:mb-[96px]'>
        <Partners />
      </div>
    </>
  );
}

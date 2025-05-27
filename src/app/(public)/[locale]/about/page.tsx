'use client'; 
// import { Locale } from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';
import { useEffect } from 'react';
import { Hero } from "@/components/about/Hero"
import { Stats } from "@/components/about/Stats"
import { Timeline } from "@/components/about/Timeline"
import { Philosophy } from "@/components/about/Philosophy"
import { Partners } from "@/components/home/Partners"
import { Business } from "@/components/about/Business"
// import PageTitle from '@/components/PageTitle';
// type Props = {
//   params: Promise<{ locale: Locale }>;
// };
export default function About() {
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
  // const { locale } = use(params);
  // Enable static rendering
  // setRequestLocale(locale);
  // const t = useTranslations('About');
  return (
    <>
      <Hero />
      <Stats />
      <Timeline />
      <Philosophy />
      <Business />
      <div className='mb-[96px]'>
        <Partners />
      </div>
    </>
  );
}

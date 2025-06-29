// import { Locale } from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';
import { Hero } from "@/components/about/Hero"
import { Stats } from "@/components/about/Stats"
import { Timeline } from "@/components/about/Timeline"
import { TimelineMobile } from "@/components/about/TimelineMobile"
import { Philosophy } from "@/components/about/Philosophy"
import { Partners } from "@/components/home/Partners"
import { Business } from "@/components/about/Business"
// import PageTitle from '@/components/PageTitle';
// type Props = {
//   params: Promise<{ locale: Locale }>;
// };
export default async function About() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/about', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const { custom_fields } = data;
  return (
    <>
      <Hero />
      <Stats custom_fields={custom_fields} />
      
      <div className="hidden sm:block tl-pc">
        <Timeline custom_fields={custom_fields} />
      </div>

      <div className="sm:hidden tl-mobile">
        <TimelineMobile custom_fields={custom_fields} />
      </div>
      

      <Philosophy custom_fields={custom_fields} />
      <Business custom_fields={custom_fields} />
      <div className='boxanimation fade-in-up-medium mb-[5%] 2xl:mb-[96px]'>
        <Partners custom_fields={custom_fields} />
      </div>
    </>
  );
}

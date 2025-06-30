// import { Locale } from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';
import {Hero} from '@/components/about/Hero';
import {Stats} from '@/components/about/Stats';
import {Timeline} from '@/components/about/Timeline';
import {Philosophy} from '@/components/about/Philosophy';
import {Partners} from '@/components/home/Partners';
import {Business} from '@/components/about/Business';
// import PageTitle from '@/components/PageTitle';
// type Props = {
//   params: Promise<{ locale: Locale }>;
// };
export default async function About() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/about', {
    cache: 'no-store'
  });
  const {data} = await res.json();
  const {custom_fields} = data;
  const {image} = data;
  console.log(image);
  return (
    <>
      <Hero image={image} />
      <Stats custom_fields={custom_fields} />
      <Timeline custom_fields={custom_fields} />
      <Philosophy custom_fields={custom_fields} />
      <Business custom_fields={custom_fields} />
      <div className="boxanimation fade-in-up-medium mb-[5%] 2xl:mb-[96px]">
        <Partners
          title={custom_fields.field_19 || custom_fields.field_19_add}
          logoDataRaw={custom_fields.about_logo_partner}
        />
      </div>
    </>
  );
}

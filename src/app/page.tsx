import ClientUseRef from '@/components/client/UseRef';
import Utilitie from '@/components/home/Utilitie';
import {SmartCity} from '@/components/home/SmartCity';
import SkyPart from '@/components/home/SkyPart';
import {Values} from '@/components/home/Values';
import {Partners} from '@/components/home/Partners';
import {getUserLocale} from '@/db';
import {Metadata} from 'next';


export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/home/lang', {
    cache: 'no-store'
  });
  const currentLocale = await getUserLocale();
  const { data: post } = await res.json();

  return {
    title: post[currentLocale].seo_meta[0].seo_title || post[currentLocale].name,
    description: post[currentLocale].seo_meta[0].seo_description || post[currentLocale].seo_description,
    openGraph: {
      title: post[currentLocale].seo_meta[0].seo_title || post[currentLocale].name,
      description: post[currentLocale].seo_meta[0].seo_description || post[currentLocale].seo_description,
      images: [
        {
          url:
            `https://admin.pigroup.vn/storage/${post[currentLocale].seo_meta[0].seo_image || post[currentLocale].image}` ||
            '/logo.png'
        }
      ]
    }
  };
}


export default async function Home() {
  const res = await fetch('https://admin.pigroup.vn/api/pages/home/lang', {
    cache: 'no-store'
  });
  const currentLocale = await getUserLocale();
  const {data} = await res.json();
  const {custom_fields} = data[currentLocale];
  return (
    <>
      <ClientUseRef custom_fields={custom_fields} />
      <Utilitie />
      <SmartCity custom_fields={custom_fields} />
      <div className="mx-auto w-full px-[30px] nd:px-0 md:max-w-[85%] boxanimation">
        <SkyPart custom_fields={custom_fields} />
      </div>
      <div className="mx-auto w-full px-[30px] nd:px-0 md:max-w-[85%]  boxanimation border-b-1 border-gray-2">
        <Values custom_fields={custom_fields} />
      </div>
      <Partners
        title={custom_fields.field_19 || custom_fields.field_19_add}
        logoDataRaw={custom_fields.home_logo_partner}
      />
    </>
  );
}

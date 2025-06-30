// import { Locale} from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';
import ClientUseRef from '@/components/client/UseRef';
import Utilitie from '@/components/home/Utilitie';
import {SmartCity} from '@/components/home/SmartCity';
import SkyPart from '@/components/home/SkyPart';
import {Values} from '@/components/home/Values';
import {Partners} from '@/components/home/Partners';
// type Props = {
//   params: Promise<{ locale: Locale }>;
// };
export default async function Home() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/home', {
    cache: 'no-store'
  });
  const {data} = await res.json();
  const {custom_fields} = data;
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

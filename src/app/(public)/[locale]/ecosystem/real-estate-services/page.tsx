import Detail2 from "@/components/ecosystem/Detail2";
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Dịch vụ Bất động sản',
  description: 'Dịch vụ Bất động sản',
};
export default async function EcosystemDetail() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/real-estate-services', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const { custom_fields } = data;
  return (
    <>
      <div>
        <Detail2 custom_fields={custom_fields} />
      </div>
    </>
  )
}
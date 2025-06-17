import Detail3 from "@/components/ecosystem/Detail3";
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Quản lý và vận hành',
  description: 'Quản lý và vận hành',
};
export default async function EcosystemDetail() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/management-operation', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const { custom_fields } = data;
  return (
    <>
      <div>
        <Detail3 custom_fields={custom_fields}/>
      </div>
    </>
  )
}
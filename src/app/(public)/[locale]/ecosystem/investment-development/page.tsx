import Detail1 from "@/components/ecosystem/Detail1";
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Đầu tư & phát triển dự án',
  description: 'Đầu tư & phát triển dự án',
};
export default async function EcosystemDetail() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/investment-development', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const { custom_fields } = data;
  return (
    <>
      <div>
        <Detail1 custom_fields={custom_fields} />
      </div>
    </>
  )
}
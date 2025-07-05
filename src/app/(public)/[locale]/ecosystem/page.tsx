import MasonryGrid from "@/components/ecosystem/MasonryGrid";
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hệ sinh thái',
  description: 'Hệ sinh thái',
};
export default async function Ecosystem() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/ecosystem', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const { custom_fields } = data;
  const {field_ecosystem} = custom_fields;
  console.log(field_ecosystem)
  return (
    <>
      <div>
        <MasonryGrid custom_fields={field_ecosystem} />
      </div>
    </>
  )
}
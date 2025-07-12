import MasonryGrid from "@/components/ecosystem/MasonryGrid";
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
export const metadata: Metadata = {
  title: 'Hệ sinh thái',
  description: 'Hệ sinh thái',
};
export default async function Ecosystem() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/ecosystem/lang', {
    cache: 'no-store',
  });
  const currentLocale = await getUserLocale();
  const {data} = await res.json();
  const { custom_fields } = data[currentLocale];
  const {field_ecosystem} = custom_fields;
  return (
    <>
      <div>
        <MasonryGrid custom_fields={field_ecosystem} />
      </div>
    </>
  )
}
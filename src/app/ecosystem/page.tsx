import MasonryGrid from "@/components/ecosystem/MasonryGrid";
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('Ecosystem.title'),
    description: t('Ecosystem.title')
  };
}

export default async function Ecosystem() {
  const res = await fetch('https://admin.pigroup.vn/api/pages/he-sinh-thai/lang', {
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
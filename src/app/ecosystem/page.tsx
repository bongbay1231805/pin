import MasonryGrid from "@/components/ecosystem/MasonryGrid";
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
import { getTranslations } from "next-intl/server";
// import {getTranslations} from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  // const t = await getTranslations();

  const res = await fetch('https://admin.pigroup.vn/api/pages/he-sinh-thai/lang', {
    cache: 'no-store'
  });
  const currentLocale = await getUserLocale();
  const { data: post } = await res.json();
  const t = await getTranslations();
  if (!post) {
     return {
      title: t('NEWS.articleNotExist'),
      description: t('NEWS.noContent')
    };
  }

  return {
    title: post[currentLocale].seo_meta[0].seo_title || post[currentLocale].name,
    description: post[currentLocale].seo_meta[0].seo_description || post[currentLocale].seo_description,
    openGraph: {
      title: post[currentLocale].seo_meta[0].seo_title || post[currentLocale].name,
      description: post[currentLocale].seo_meta[0].seo_description || post[currentLocale].seo_description,
      images: [
        {
          //seo_image Sửa lỗi logic URL: '/storage/' không phải là URL hợp lệ.
          // Giả sử domain admin là nơi chứa ảnh
          url:
            `https://admin.pigroup.vn/storage/${post[currentLocale].seo_meta[0].seo_image || post[currentLocale].image}` ||
            '/logo.png'
        }
      ]
    }
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
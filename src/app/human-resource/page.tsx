import React from "react";
import Hero from "@/components/work/Hero";
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
// export const metadata: Metadata = {
//   title: 'Phát triển nhân lực',
//   description: 'Phát triển nhân lực',
// };

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/phat-trien-nhan-luc/lang', {
    cache: 'no-store'
  });
  const currentLocale = await getUserLocale();
  const { data: post } = await res.json();
  if (!post) {
    return {
      title: 'Bài viết không tồn tại',
      description: 'Không tìm thấy bài viết này.'
    };
  }

  return {
    title: post?.[currentLocale]?.seo_meta[0]?.seo_title || post[currentLocale].name,
    description: post?.[currentLocale]?.seo_meta[0]?.seo_description || post[currentLocale].seo_description,
    openGraph: {
      title: post?.[currentLocale]?.seo_meta[0]?.seo_title || post[currentLocale].name,
      description: post?.[currentLocale]?.seo_meta[0]?.seo_description || post[currentLocale].seo_description,
      images: [
        {
          //seo_image Sửa lỗi logic URL: '/storage/' không phải là URL hợp lệ.
          // Giả sử domain admin là nơi chứa ảnh
          url:
            `https://admin.pigroup.vn/storage/${post?.[currentLocale]?.seo_meta[0]?.seo_image || post[currentLocale].image}` ||
            '/logo.png'
        }
      ]
    }
  };
}

export default async function Human() {
  const res = await fetch('https://admin.pigroup.vn/api/careers', {
  // const res = await fetch('https://admin.pigroup.vn/api/categories/human/posts', {
    cache: 'no-store',
  });
   const resPage = await fetch('https://admin.pigroup.vn/api/pages/phat-trien-nhan-luc/lang', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const {data:dataPage} = await resPage.json();
  
  const currentLocale = await getUserLocale();
  return (
    <>
      <Hero data={data} dataPage={dataPage[currentLocale]} />
    </>
  );
}
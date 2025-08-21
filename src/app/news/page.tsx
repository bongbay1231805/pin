import NewsClient from '@/components/news/NewsClient';
import { Suspense } from 'react';
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/tin-tuc/lang', {
    cache: 'no-store',
  });
  const { data: post } = await res.json();
  console.log('post ', post)
  const currentLocale = await getUserLocale();
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

async function NewsPage() {
  const currentPage = 1;
  const res = await fetch(`https://admin.pigroup.vn/api/posts?page=${currentPage}&filter=1`, {
    cache: 'no-store',
  });
  const json = await res.json();
  const { data } = json;
  return (
      <Suspense fallback={<div>Đang tải tìm kiếm...</div>}>
        <NewsClient initialPage={currentPage} initialData={data} />
      </Suspense>    
  );
}
export default NewsPage;
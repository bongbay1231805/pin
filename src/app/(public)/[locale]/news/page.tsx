import NewsClient from '@/components/news/NewsClient';
import { Suspense } from 'react';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/news', {
    cache: 'no-store',
  });
  const { data: post } = await res.json();
  if (!post) {
    return {
      title: 'Bài viết không tồn tại',
      description: 'Không tìm thấy bài viết này.'
    };
  }

  return {
    title: post.seo_meta[0].seo_title || post.name,
    description: post.seo_meta[0].seo_description || post.seo_description,
    openGraph: {
      title: post.seo_meta[0].seo_title || post.name,
      description: post.seo_meta[0].seo_description || post.seo_description,
      images: [
        {
          //seo_image Sửa lỗi logic URL: '/storage/' không phải là URL hợp lệ.
          // Giả sử domain admin là nơi chứa ảnh
          url:
            `https://admin.pigroup.tqdesign.vn/storage/${post.seo_meta[0].seo_image || post.image}` ||
            '/logo.png'
        }
      ]
    }
  };
}

async function NewsPage() {
  const currentPage = 1;
  const res = await fetch(`https://admin.pigroup.tqdesign.vn/api/posts?page=${currentPage}`, {
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
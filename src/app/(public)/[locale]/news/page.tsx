import NewsClient from '@/components/news/NewsClient';
import { Suspense } from 'react';


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
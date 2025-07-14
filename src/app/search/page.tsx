import NewsClient from '@/components/news/NewsClient'; // Giả sử NewsClient có thể nhận prop searchKeyword
import { Suspense } from 'react';
// Định nghĩa props cho Server Component, bao gồm searchParams
// interface SearchPageProps {
//   searchParams?: {
//     keyword?: string; // Tên của query parameter bạn muốn lấy
//   };
// }

async function SearchPage() {
  const currentPage = 1;
  const res = await fetch(`https://admin.pigroup.vn/api/posts?page=${currentPage}`, {
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

export default SearchPage;
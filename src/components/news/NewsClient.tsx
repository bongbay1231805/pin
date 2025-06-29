'use client';
import { useEffect, useState } from 'react';
import PaginationExample from './PaginationExample';
import News from './News';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams để lấy keyword từ URL


type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};
type Props = {
  initialPage: number;
  initialData: any;
};
export default function NewsClient({ initialPage, initialData }: Props) {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('keyword') || '';

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [paginationLinks, setPaginationLinks] = useState<PaginationLink[]>(initialData.links);
  const [posts, setPosts] = useState(initialData.data);
  useEffect(() => {
    const fetchData = async () => {
      let apiUrl = `https://admin.pigroup.tqdesign.vn/api/posts?page=${currentPage}`;

      // Thêm tham số tìm kiếm vào URL nếu có từ khóa
      if (searchKeyword.trim() !== '') {
        apiUrl += `&q=${encodeURIComponent(searchKeyword.trim())}`; // Sử dụng 'q' cho API tìm kiếm
      }

      console.log('Fetching URL in NewsClient:', apiUrl); // Debugging

      try {
        const res = await fetch(apiUrl, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        const { data } = json; // data ở đây là đối tượng chứa 'data' (bài viết) và 'links' (phân trang)

        setPaginationLinks(data.links);
        setPosts(data.data);
      } catch (e: any) {
        console.error("Error fetching data in NewsClient:", e);
      } finally {
      }
    };
    fetchData();
  }, [currentPage]);
  return (
    <div>
      {/* Hiển thị danh sách bài viết */}
      <News posts={posts} />
      {/* Phân trang */}
      {paginationLinks.length > 3 && (
        <div className="pb-[90px]">
          <PaginationExample links={paginationLinks} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}

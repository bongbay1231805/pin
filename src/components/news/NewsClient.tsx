'use client';
import { useEffect, useState } from 'react';
import PaginationExample from './PaginationExample';
import News from './News';
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
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [paginationLinks, setPaginationLinks] = useState<PaginationLink[]>(initialData.links);
  const [posts, setPosts] = useState(initialData.data);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://admin.pigroup.tqdesign.vn/api/posts?page=${currentPage}`, {
        cache: 'no-store',
      });
      const json = await res.json();
      const { data } = json;
      setPaginationLinks(data.links);
      setPosts(data.data);
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

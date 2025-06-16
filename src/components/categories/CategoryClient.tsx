'use client';
import { useEffect, useState } from 'react';
import PaginationExample from '../news/PaginationExample';
import News from '../news/News';
type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};
type Props = {
  initialPage: number;
  initialData: any;
  apiPath: string; // mới
};
export default function CategoryClient({ initialPage, initialData, apiPath }: Props) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [paginationLinks, setPaginationLinks] = useState<PaginationLink[]>(initialData.links);
  const [posts, setPosts] = useState(initialData.data);
  useEffect(() => {
    if (currentPage === initialPage) return;
    const fetchData = async () => {
      const res = await fetch(`${apiPath}?page=${currentPage}`, {
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
      <div className="pb-[90px]">
        <PaginationExample links={paginationLinks} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

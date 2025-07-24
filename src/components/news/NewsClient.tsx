'use client';
import { useEffect, useState } from 'react';
import PaginationExample from './PaginationExample';
import News from './News';
import { useSearchParams } from 'next/navigation';


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
  // Lấy searchKeyword từ URL. useSearchParams sẽ tự động re-render khi URL params thay đổi.
  const searchKeyword = searchParams.get('keyword') || ''; 

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [paginationLinks, setPaginationLinks] = useState<PaginationLink[]>(initialData.links);
  const [posts, setPosts] = useState(initialData.data);

  useEffect(() => {
    // Mỗi khi searchKeyword thay đổi, reset về trang 1
    // Điều này đảm bảo rằng khi bạn tìm kiếm một từ khóa mới, kết quả sẽ bắt đầu từ trang đầu tiên.
    setCurrentPage(1); 
    // Nếu bạn muốn giữ lại trang hiện tại khi chỉ thay đổi từ khóa (ít phổ biến cho tìm kiếm mới),
    // bạn có thể bỏ dòng trên và chỉ thêm searchKeyword vào dependency array.
  }, [searchKeyword]); // Chạy lại khi searchKeyword thay đổi

  useEffect(() => {
    const fetchData = async () => {
      let apiUrl = `https://admin.pigroup.vn/api/posts?page=${currentPage}`;

      // Thêm tham số tìm kiếm vào URL nếu có từ khóa
      if (searchKeyword.trim() !== '') {
        apiUrl += `&q=${encodeURIComponent(searchKeyword.trim())}`; // Sử dụng 'q' cho API tìm kiếm
      }

      console.log('Fetching URL in NewsClient:', apiUrl); // Debugging

      try {
        const res = await fetch(apiUrl, {
          cache: 'no-store', // Đảm bảo không cache dữ liệu
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        const { data } = json; // data ở đây là đối tượng chứa 'data' (bài viết) và 'links' (phân trang)
        console.log("data", data)
        setPaginationLinks(data.links);
        setPosts(data.data);
      } catch (e: any) {
        console.error("Error fetching data in NewsClient:", e);
      }
    };
    fetchData();
  }, [currentPage, searchKeyword]); // *** THÊM searchKeyword VÀO ĐÂY ***

  return (
    <div>
      {/* Hiển thị danh sách bài viết */}
      <News posts={posts} />
      {/* Phân trang */}
      {paginationLinks.length > 3 && (
        <div className="pb-[50px]">
          <PaginationExample links={paginationLinks} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}
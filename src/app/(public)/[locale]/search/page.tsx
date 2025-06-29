// app/search/page.tsx
// Đây là Server Component, không cần 'use client' ở đây

import NewsClient from '@/components/news/NewsClient'; // Giả sử NewsClient có thể nhận prop searchKeyword

// Định nghĩa props cho Server Component, bao gồm searchParams
interface SearchPageProps {
  searchParams?: {
    keyword?: string; // Tên của query parameter bạn muốn lấy
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const currentPage = 1; // Bạn có thể thêm logic phân trang sau nếu cần
  const keyword = searchParams?.keyword || ''; // Lấy keyword từ URL, mặc định là chuỗi rỗng
  console.log(keyword)
  // Xây dựng URL API
  let apiUrl = `https://admin.pigroup.tqdesign.vn/api/posts?page=${currentPage}`;

  if (keyword.trim() !== '') {
    // Thêm tham số tìm kiếm vào URL nếu có keyword
    apiUrl += `&q=${encodeURIComponent(keyword.trim())}`; // Sử dụng 'q' như tham số tìm kiếm của API
  }

  console.log('Fetching URL:', apiUrl); // Debugging: Xem URL được gọi là gì

  const res = await fetch(apiUrl, {
    cache: 'no-store', // Đảm bảo luôn fetch dữ liệu mới
  });

  

  if (!res.ok) {
    // Xử lý lỗi nếu fetch không thành công
    console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    // Tùy chọn: ném lỗi, hiển thị trang lỗi, hoặc trả về dữ liệu rỗng/fallback
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Không thể tải dữ liệu tìm kiếm. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  const json = await res.json();
  console.log(json)
  const { data } = json;

  // Giả sử NewsClient có thể nhận thêm prop 'searchKeyword' để hiển thị tiêu đề tìm kiếm
  // hoặc bạn có thể truyền keyword vào initialData để NewsClient xử lý.
  return (
    <NewsClient
      initialPage={currentPage}
      initialData={data}
    />
  );
}

export default SearchPage;
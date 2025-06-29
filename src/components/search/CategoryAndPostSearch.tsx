// components/search/CategoryAndPostSearch.tsx
"use client"; // Đảm bảo đây là Client Component
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter để điều hướng

const CategoryAndPostSearch: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const router = useRouter(); // Khởi tạo router

  // Hàm xử lý khi người dùng nhập vào input
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  // Hàm xử lý khi click vào icon SVG hoặc khi Enter trong input
  const performSearch = () => {
    if (searchKeyword.trim() !== '') {
      // Điều hướng đến trang /search với query parameter 'keyword'
      router.push(`/search?keyword=${encodeURIComponent(searchKeyword.trim())}`);
    } else {
      // Nếu từ khóa rỗng, có thể điều hướng đến /search mà không có query
      // hoặc hiển thị thông báo, tùy thuộc vào UX bạn muốn.
      // Hiện tại sẽ điều hướng về /search không có query.
      router.push('/search');
    }
  };

  // Hàm xử lý khi nhấn phím trong input (để bắt phím Enter)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className='absolute top-1/2 -translate-y-1/2 right-0 max-[400px] m-auto flex items-center'> {/* Thêm flex và items-center để căn chỉnh */}
      {/* Input tìm kiếm */}
      <input
        id="search-keyword-input"
        type="text"
        value={searchKeyword}
        onChange={handleKeywordChange}
        onKeyDown={handleKeyDown} // Bắt sự kiện nhấn phím
        placeholder="Tìm kiếm bài viết..."
        className="h-[25px] w-full p-2 border border-[#ccc] rounded-[4px] focus:outline-none focus:border-[#cfa176] text-[13px] 2xl:text-[17px] text-gray-700 mr-[10px]" // Thêm margin-right cho input
      />

      {/* Button Search SVG */}
      {/* Thay đổi button để chỉ kích hoạt performSearch khi click */}
      <button
        onClick={performSearch} // Gán hàm performSearch vào onClick
        className='bg-none border-none cursor-pointer p-0 flex items-center justify-center'
        aria-label="Search"
      >
        <svg className="w-[16px] h-[16px]" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.57882 16.3047C2.34337 15.0432 1.50543 13.4468 1.16891 11.7135C0.829613 9.97527 1.00384 8.17588 1.67032 6.53507C2.33111 4.90348 3.45924 3.50349 4.91306 2.51093C7.86274 0.496355 11.7459 0.496355 14.6956 2.51093C16.1494 3.50349 17.2775 4.90348 17.9383 6.53507C18.6048 8.17588 18.779 9.97527 18.4397 11.7135C18.1032 13.4468 17.2653 15.0432 16.0298 16.3047C14.3937 17.9837 12.1487 18.9307 9.80432 18.9307C7.45995 18.9307 5.21498 17.9837 3.57882 16.3047V16.3047Z" stroke="#20446F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.82041 4.21788C9.2712 4.27608 8.87315 4.76848 8.93135 5.31769C8.98954 5.8669 9.48194 6.26494 10.0312 6.20675L9.82041 4.21788ZM12.5233 7.67495C12.7387 8.18353 13.3255 8.42128 13.8341 8.20598C14.3427 7.99067 14.5804 7.40383 14.3651 6.89525L12.5233 7.67495ZM16.8647 15.4599C16.4738 15.0697 15.8406 15.0703 15.4505 15.4611C15.0603 15.852 15.0609 16.4852 15.4517 16.8753L16.8647 15.4599ZM20.2915 21.7066C20.6824 22.0968 21.3156 22.0962 21.7058 21.7053C22.0959 21.3145 22.0954 20.6813 21.7045 20.2911L20.2915 21.7066ZM9.92578 5.21231L10.0312 6.20675C11.0945 6.09407 12.1065 6.69022 12.5233 7.67495L13.4442 7.2851L14.3651 6.89525C13.6049 5.09953 11.7596 4.01241 9.82041 4.21788L9.92578 5.21231ZM16.1582 16.1676L15.4517 16.8753L20.2915 21.7066L20.998 20.9989L21.7045 20.2911L16.8647 15.4599L16.1582 16.1676Z" fill="#20446F" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryAndPostSearch;
// components/search/SearchPostsDropdown.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Cập nhật interface props
interface SearchPostsDropdownProps {
  searchKeyword: string; // Đây là prop mà component này mong đợi
}

interface Post {
  id: number;
  title: string;
  slug: string; // Thêm slug nếu bài viết có slug để tạo URL
  // Thêm các trường khác của bài viết nếu cần
}

const SearchPostsDropdown: React.FC<SearchPostsDropdownProps> = ({ searchKeyword }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();
  useEffect(() => {
    // Kiểm tra an toàn: đảm bảo searchKeyword là một chuỗi và không null/undefined
    if (typeof searchKeyword !== 'string' || searchKeyword === null) {
      console.error("searchKeyword received is not a string or is null:", searchKeyword);
      setPosts([]); // Xóa danh sách bài viết để tránh hiển thị sai
      return; // Thoát sớm
    }

    // Chỉ fetch dữ liệu nếu có từ khóa tìm kiếm
    if (searchKeyword.trim() === '') {
      setPosts([]); // Xóa danh sách bài viết nếu không có từ khóa
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Địa chỉ API của bạn (ví dụ)
        // THAY THẾ 'http://your-cms-url/api/posts' BẰNG ENDPOINT THỰC TẾ CỦA BẠN
        // Giả sử API của bạn hỗ trợ tìm kiếm bằng query parameter 'q'
        const apiUrl = `http://your-cms-url/api/posts?q=${encodeURIComponent(searchKeyword)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce search input để tránh gọi API quá thường xuyên
    const handler = setTimeout(() => {
      fetchPosts();
    }, 300); // Đợi 300ms sau khi người dùng ngừng gõ

    return () => {
      clearTimeout(handler); // Clear timeout nếu từ khóa thay đổi trước khi fetch
    };
  }, [searchKeyword]); // Dependency là searchKeyword

  return (
    <div className='bg-white rounded-[4px] shadow-md max-h-[300px] overflow-y-auto'>
      {loading && <p className="p-2 text-center text-gray-600">{t('NEWS.search')}...</p>}
      {error && <p className="p-2 text-center text-red-500">Lỗi: {error}</p>}
      {!loading && !error && posts.length === 0 && searchKeyword.trim() !== '' && (
        <p className="p-2 text-center text-gray-600">{t('NEWS.noContent')}</p>
      )}
      {!loading && !error && posts.length > 0 && (
        <ul className="list-none p-0 m-0">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-gray-200 last:border-b-0">
              {/* Giả sử mỗi bài viết có một slug để tạo URL chi tiết */}
              <Link href={`/posts/${post.slug}`} className="block p-3 text-blue-700 hover:bg-gray-100">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && searchKeyword.trim() === '' && (
        <p className="p-2 text-center text-gray-600">Vui lòng nhập từ khóa để tìm kiếm.</p>
      )}
    </div>
  );
};

export default SearchPostsDropdown;
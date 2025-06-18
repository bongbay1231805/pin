"use client"; // Đảm bảo đây là Client Component trong App Router
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/navigation'; // Sử dụng useRouter từ next/navigation cho App Router
import CustomSelectOption from './CustomSelectOption';
// 1. Định nghĩa kiểu dữ liệu cho một bài post từ API
interface Post {
  id: number;
  name: string;
  description: string;
  content: string;
  is_featured: number;
  image: string | null;
  created_at: string;
  slug: string;
  custom_fields: {
    vi_tri_tuyen_dung: string;
    so_luong: string;
    thoi_han: string;
  };
}
// 2. Định nghĩa kiểu dữ liệu cho phản hồi từ API
interface ApiResponse {
  data: {
    current_page: number;
    data: Post[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  category: {
    name: string;
    description: string;
  };
}
// 3. Định nghĩa kiểu dữ liệu cho option trong react-select
interface SelectOption {
  value: string;
  label: string;
  image?: string | null;
}
// 4. Định nghĩa Props cho component SearchPostsDropdown
interface SearchPostsDropdownProps {
  categorySlug: string; // Tên prop mới để truyền slug của chuyên mục
}
// Cố định currentPage như bạn yêu cầu
const currentPage = 1;
const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided, // Keep the default styles
    backgroundColor: '#fff', // Custom background for the control (input area)
    borderColor: state.isFocused ? '#555' : '#555', // Custom border color on focus
    boxShadow: state.isFocused ? '0 0 0 1px #cfa176' : 'none',
    '&:hover': {
      borderColor: '#cfa176', // Custom border color on hover
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided, // Keep the default styles
    backgroundColor: state.isFocused
      ? '#cfa176' // Background when option is hovered/focused
      : state.isSelected
        ? '#cfa176'  // Background when option is selected
        : 'white',    // Default background
    color: state.isSelected ? 'white' : '#555', // Text color
    cursor: 'pointer',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#cfa176', // Color of the selected value displayed in the control
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'white', // Background of the dropdown menu itself
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#888', // Color of the placeholder text
  }),
};
const SearchPostsDropdown: React.FC<SearchPostsDropdownProps> = ({ categorySlug }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = `https://admin.pigroup.tqdesign.vn/api/categories/${categorySlug}/posts?page=${currentPage}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setPosts(result.data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [categorySlug]);
  if (loading) {
    return <div>Đang tải bài viết chuyên mục "{categorySlug}"...</div>;
  }
  if (error) {
    return <div>Lỗi khi tải bài viết: {error}</div>;
  }
  const options: SelectOption[] = posts.map(p => ({
    value: p.slug,
    label: p.name,
    image: p.image
  }));
  const handleChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      router.push(`/posts/${selectedOption.value}`);
    }
  };
  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <Select<SelectOption>
        options={options}
        onChange={handleChange}
        placeholder={`Tìm bài viết trong ${categorySlug}...`}
        isClearable={true}
        isSearchable={true}
        noOptionsMessage={() => "Không tìm thấy bài viết"}
        styles={customStyles}
        components={{ Option: CustomSelectOption }} // <-- Gán CustomSelectOption ở đây
      />
    </div>
  );
};
export default SearchPostsDropdown;
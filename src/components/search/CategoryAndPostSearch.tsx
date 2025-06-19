"use client"; // Đảm bảo đây là Client Component
import React, { useState } from 'react';
import Select from 'react-select';
import SearchPostsDropdown from './SearchPostsDropdown';
// Định nghĩa kiểu dữ liệu cho chuyên mục
interface Category {
  slug: string;
  name: string;
}
// Dữ liệu chuyên mục của bạn (đã được định dạng lại để dễ dùng với react-select)
const categoriesData: Category[] = [
  { slug: 'tin-thi-truong', name: "Tin Thị Trường " },
  { slug: 'tin-pi-group', name: "Tin Pi Group" },
  { slug: 'tin-dau-thau', name: "Tin Đấu Thầu" }
];
// Kiểu dữ liệu cho option trong react-select (cho chuyên mục)
interface CategorySelectOption {
  value: string; // sẽ là slug
  label: string; // sẽ là tên chuyên mục
}
const CategoryAndPostSearch: React.FC = () => {
  // State để quản lý việc hiển thị/ẩn khối search
  const [showSearchBlock, setShowSearchBlock] = useState<boolean>(false);
  // State để lưu trữ slug của chuyên mục được chọn
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  // Chuyển đổi dữ liệu categoriesData sang định dạng options cho react-select
  const categoryOptions: CategorySelectOption[] = categoriesData.map(cat => ({
    value: cat.slug,
    label: cat.name
  }));
  const handleCategoryChange = (option: CategorySelectOption | null) => {
    if (option) {
      setSelectedCategorySlug(option.value);
    } else {
      setSelectedCategorySlug(null);
    }
  };
  // Hàm xử lý khi click vào button search SVG
  const handleSearchButtonClick = () => {
    setShowSearchBlock(!showSearchBlock); // Đảo ngược trạng thái hiển thị
  };
  // --- CUSTOM STYLES FOR REACT-SELECT ---
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided, // Keep the default styles
      backgroundColor: '#fff', // Custom background for the control (input area)
      borderColor: state.isFocused ? '#555' : '#555', // Custom border color on focus
      boxShadow: state.isFocused ? 'none' : 'none',
      '&:hover': {
        borderColor: '#555', // Custom border color on hover
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
      '&:hover': {
         color: 'white' // Custom border color on hover
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#555', // Color of the selected value displayed in the control
      '&:hover': {
        color: 'white' // Custom border color on hover
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white', // Background of the dropdown menu itself
      // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow
      '&:hover': {
        color: 'white', // Custom border color on hover
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#555', // Color of the placeholder text
    }),
  };
  // --- END CUSTOM STYLES ---
  return (
    <div className='absolute top-1/2 -translate-y-1/2 right-0 max-[400px] m-auto'>
      {/* Button Search SVG */}
      <button
        onClick={handleSearchButtonClick}
        className='bg-none border-none cursor-pointer p-0 flex items-center justify-center'
        aria-label="Toggle Search" // Thêm cho khả năng tiếp cận
      >
        <span className='mr-[250px] text-[12px] 2xl:text-[16px] cursor-pointer font-regular text-gray-5 hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 '>{showSearchBlock ? "Tìm kiếm" : "Tìm kiếm"}</span>
        <svg className="w-[16px] h-[16px]" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.57882 16.3047C2.34337 15.0432 1.50543 13.4468 1.16891 11.7135C0.829613 9.97527 1.00384 8.17588 1.67032 6.53507C2.33111 4.90348 3.45924 3.50349 4.91306 2.51093C7.86274 0.496355 11.7459 0.496355 14.6956 2.51093C16.1494 3.50349 17.2775 4.90348 17.9383 6.53507C18.6048 8.17588 18.779 9.97527 18.4397 11.7135C18.1032 13.4468 17.2653 15.0432 16.0298 16.3047C14.3937 17.9837 12.1487 18.9307 9.80432 18.9307C7.45995 18.9307 5.21498 17.9837 3.57882 16.3047V16.3047Z" stroke="#20446F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.82041 4.21788C9.2712 4.27608 8.87315 4.76848 8.93135 5.31769C8.98954 5.8669 9.48194 6.26494 10.0312 6.20675L9.82041 4.21788ZM12.5233 7.67495C12.7387 8.18353 13.3255 8.42128 13.8341 8.20598C14.3427 7.99067 14.5804 7.40383 14.3651 6.89525L12.5233 7.67495ZM16.8647 15.4599C16.4738 15.0697 15.8406 15.0703 15.4505 15.4611C15.0603 15.852 15.0609 16.4852 15.4517 16.8753L16.8647 15.4599ZM20.2915 21.7066C20.6824 22.0968 21.3156 22.0962 21.7058 21.7053C22.0959 21.3145 22.0954 20.6813 21.7045 20.2911L20.2915 21.7066ZM9.92578 5.21231L10.0312 6.20675C11.0945 6.09407 12.1065 6.69022 12.5233 7.67495L13.4442 7.2851L14.3651 6.89525C13.6049 5.09953 11.7596 4.01241 9.82041 4.21788L9.92578 5.21231ZM16.1582 16.1676L15.4517 16.8753L20.2915 21.7066L20.998 20.9989L21.7045 20.2911L16.8647 15.4599L16.1582 16.1676Z" fill="#20446F" />
        </svg>
      </button>
      {/* Khối search hiển thị/ẩn dựa trên showSearchBlock */}
      {showSearchBlock && (
        <div className='absolute w-[400px] right-0 top-[30px] border-[1px] border-solid border-[#555] rounded-[8px] p-[15px] bg-[#f9f9f9]'>
          {/* Dropdown để chọn chuyên mục */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="category-select" className='block mb-[5px] text-[16px]'>Chọn chuyên mục:</label>
            <Select<CategorySelectOption>
              id="category-select"
              options={categoryOptions}
              onChange={handleCategoryChange}
              placeholder="Chọn một chuyên mục..."
              isClearable={true}
              isSearchable={false}
              styles={customStyles}
            />
          </div>
          {/* Hiển thị SearchPostsDropdown nếu đã có chuyên mục được chọn */}
          {selectedCategorySlug ? (
            <SearchPostsDropdown categorySlug={selectedCategorySlug} />
          ) : (
            null
          )}
        </div>
      )}
    </div>
  );
};
export default CategoryAndPostSearch;
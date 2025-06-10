'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Định nghĩa kiểu dữ liệu cho props của component
interface ToggleSectionProps {
  headerContent: React.ReactNode; // Nội dung của phần header (có thể là JSX, chuỗi,...)
  children: React.ReactNode;     // Nội dung sẽ được ẩn/hiện khi toggle
  initialOpen?: boolean;         // Mặc định ban đầu là ẩn hay hiện (optional)
}
export default function Detail1() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); // Ref to access the content div directly
  const [contentHeight, setContentHeight] = useState('0px'); // State to control the max-height for animation
  useEffect(() => {
    if (contentRef.current) {
      // When opening, set max-height to the actual scrollHeight of the content
      // This allows the content to expand fully.
      // A small timeout ensures the height calculation happens after the ref is available.
      if (isOpen) {
        // setContentHeight(`${contentRef.current.scrollHeight}px`);
        setContentHeight('100%');
      } else {
        // When closing, set max-height to 0, which will collapse the content.
        // When closing, set max-height to 0, which will collapse the content.
        setContentHeight('10px');
      }
    }
  }, [isOpen]); // Re-run this effect whenever 'isOpen' changes
  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="relative mx-auto h-[100vh] w-[100vw]  text-center pt-[175px]">
        <div className="relative mx-auto top-[25%] max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px]">
          <h2 className='absolute  z-10 left-0 text-left  uppercase font-bold text-white text-[55px]'>đầu tư & <br/> phát triển dự án</h2>
        </div>
        <Image fill src="/fecosystem/detail/development.png" alt="Smart City Features" className="object-fill"></Image>
      </div>
      <div className="mx-auto px-[10px] max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px] pb-[115px]">
        <div className='grid md:grid-cols-2 gap-12 pb-[100px]'>
          <div className='border-t-1 border-gray-8 mt-[20px]'>
            <h3 className='text-yellow-1 text-[20px] sm:text-[25px] lg:text-[30px] font-bold px-[70px] py-[25px] border-b-1 border-gray-8'>PICITY HIGH PARK</h3>
            <p className='text-[17px] text-gray-5 px-[70px] py-[25px] border-b-1 border-gray-8'>Đại đô thị lớn nhất Quận 12 sở hữu hệ tiện ích chuẩn resort với hơn 2.500 sản phẩm căn hộ, shophouse, nhà phố thương mại. Picity High Park là tổ ấm an cư của hơn 10.000 cư dân văn minh, hạnh phúc.</p>
            <div className='py-[25px] border-b-1 border-gray-8'>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/map.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Vị Trí:</span>Quận 12, TP. HCM</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/area.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Quy Mô:</span>14.325,90 m²</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Loại hình sản phẩm:</span>Khu đô thị</p>
            </div>
            <div onClick={toggleVisibility} ref={contentRef} style={{ maxHeight: contentHeight }} className={`relative leading-[1.7rem] px-[70px] border-gray-8  ${isOpen ? 'py-[32px] [&>p]:opacity-100 border-b-1' : '[&>p]:opacity-0'} transition-all duration-500 ease-in-out}`}>
              <svg className={`absolute rounded-full left-[70px] ${isOpen ? 'rotate-180 top-[calc(100%-10px)] bg-blue-5' : 'top-[-10px] bg-white'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9.5" stroke={`${isOpen ? '#fff' : '#4C73A8'}`} />
                <path d="M6 9L9.93461 13.0643L13.9989 9.12974" stroke={`${isOpen ? '#fff' : '#4C73A8'}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p><strong>Mật độ xây dựng:</strong> 23%</p>
              <p><strong>Đơn vị thiết kế kiến trúc:</strong> Humphreys and Partners Architects (Mỹ)</p>
              <p><strong>Đơn vị thiết kế cảnh quan:</strong> Belt Collins International (HongKong)</p>
              <p><strong>Đơn vị thi công xây dựng:</strong> Unicons (Thành viên Coteccons Group) và Tập đoàn Xây dựng Hòa Bình</p>
            </div>
            <div className='flex justify-end px-[70px] py-[25px]'>
              <Link href="/" className="hvr-bounce-to-right flex uppercase items-center justify-center text-yellow-1 font-semibold w-[261] h-[50] border border-yellow-1 hover:text-white">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
          <div className='relative'>
            <Image
              src="/fecosystem/detail/detail-1.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden h-[80%]!"
            />
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-12 pb-[100px]'>
          <div className='relative'>
            <Image
              src="/fecosystem/detail/detail-2.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden"
            />
          </div>
          <div className='border-t-1 border-gray-8 mt-[20px]'>
            <h3 className='text-yellow-1 text-[20px] sm:text-[25px] lg:text-[30px] font-bold px-[70px] py-[25px] border-b-1 border-gray-8'>PICITY SKY PARK</h3>
            <p className='text-[17px] text-gray-5 px-[70px] py-[25px] border-b-1 border-gray-8'>Tọa lạc trên trục đại lộ Phạm Văn Đồng, Picity Sky Park tiên phong ứng dụng công nghệ 4.0 (tích hợp IoT & AI) và hệ tiện ích 5* mang đến trải nghiệm sống hiện đại, chuẩn quốc tế cho cư dân đô thị.</p>
            <div className='py-[25px] border-b-1 border-gray-8'>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/map.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Vị Trí:</span>Dĩ An, Bình Dương</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/area.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Quy Mô:</span>10.611 m²</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Loại hình sản phẩm:</span>Khu đô thị</p>
            </div>
            <div onClick={toggleVisibility} ref={contentRef} style={{ maxHeight: contentHeight }} className={`relative leading-[1.7rem] px-[70px] border-gray-8  ${isOpen ? 'py-[32px] [&>p]:opacity-100 border-b-1' : '[&>p]:opacity-0'} transition-all duration-500 ease-in-out}`}>
              <svg className={`absolute rounded-full left-[70px] ${isOpen ? 'rotate-180 top-[calc(100%-10px)] bg-blue-5' : 'top-[-10px] bg-white'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9.5" stroke="#4C73A8" />
                <path d="M6 9L9.93461 13.0643L13.9989 9.12974" stroke={`${isOpen ? '#fff' : '#4C73A8'}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p><strong>Mật độ xây dựng:</strong> 23%</p>
              <p><strong>Đơn vị thiết kế kiến trúc:</strong> Humphreys and Partners Architects (Mỹ)</p>
              <p><strong>Đơn vị thiết kế cảnh quan:</strong> Belt Collins International (HongKong)</p>
              <p><strong>Đơn vị thi công xây dựng:</strong> Unicons (Thành viên Coteccons Group) và Tập đoàn Xây dựng Hòa Bình</p>
            </div>
            <div className='flex justify-end px-[70px] py-[25px]'>
              <Link href="/" className="hvr-bounce-to-right flex uppercase items-center justify-center text-yellow-1 font-semibold w-[261] h-[50] border border-yellow-1 hover:text-white">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-12'>
          <div className='border-t-1 border-gray-8 mt-[20px]'>
            <h3 className='text-yellow-1 text-[20px] sm:text-[25px] lg:text-[30px] font-bold px-[70px] py-[25px] border-b-1 border-gray-8'>PRIME MASTER</h3>
            <p className='text-[17px] text-gray-5 px-[70px] py-[25px] border-b-1 border-gray-8'>Prime Master là tuyên ngôn về một chuẩn mực sống đỉnh cao, nơi hội tụ đẳng cấp sống thượng lưu, nghệ thuật kiến tạo không gian và giá trị sống trường tồn. Tại Prime Master, mỗi tư dinh là một kiệt tác nghệ thuật được "may đo" tinh xảo, phản ánh lối sống độc bản của những chủ nhân không chỉ thành đạt, mà còn biết cách định hình phong cách sống mang tính biểu tượng.</p>
            <div className='py-[25px] border-b-1 border-gray-8'>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/map.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Vị Trí:</span>Quận 12, TP. HCM</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/area.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Quy Mô:</span>14.325,9 m²</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Nhà phố liền kề</span>Khu đô thị</p>
            </div>
            <div onClick={toggleVisibility} ref={contentRef} style={{ maxHeight: contentHeight }} className={`relative leading-[1.7rem] px-[70px] border-gray-8  ${isOpen ? 'py-[32px] [&>p]:opacity-100 border-b-1' : '[&>p]:opacity-0'} transition-all duration-500 ease-in-out}`}>
              <svg className={`absolute rounded-full left-[70px] ${isOpen ? 'rotate-180 top-[calc(100%-10px)] bg-blue-5' : 'top-[-10px] bg-white'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9.5" stroke="#4C73A8" />
                <path d="M6 9L9.93461 13.0643L13.9989 9.12974" stroke={`${isOpen ? '#fff' : '#4C73A8'}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p><strong>Mật độ xây dựng:</strong> 23%</p>
              <p><strong>Đơn vị thiết kế kiến trúc:</strong> Humphreys and Partners Architects (Mỹ)</p>
              <p><strong>Đơn vị thiết kế cảnh quan:</strong> Belt Collins International (HongKong)</p>
              <p><strong>Đơn vị thi công xây dựng:</strong> Unicons (Thành viên Coteccons Group) và Tập đoàn Xây dựng Hòa Bình</p>
            </div>
            <div className='flex justify-end px-[70px] py-[25px]'>
              <Link href="/" className="hvr-bounce-to-right flex uppercase items-center justify-center text-yellow-1 font-semibold w-[261] h-[50] border border-yellow-1 hover:text-white">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
          <div className='relative'>
            <Image
              src="/fecosystem/detail/detail-3.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
}
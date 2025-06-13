'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PaginationExample from './PaginationExample';
// Define keys for each project section to manage their states
const PROJECT_KEYS = {
  PICITY_HIGH_PARK: 'picityHighPark',
  PICITY_SKY_PARK: 'picitySkyPark',
  PRIME_MASTER: 'primeMaster',
};
export default function Detail1() {
  // State to manage open/closed status for each section
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({
    [PROJECT_KEYS.PICITY_HIGH_PARK]: false, // Initially closed, or true if you want it open
    [PROJECT_KEYS.PICITY_SKY_PARK]: false,
    [PROJECT_KEYS.PRIME_MASTER]: false,
  });
  // Refs for each content section to get their scrollHeight
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // State to manage maxHeight for animation for each section
  const [contentMaxHeights, setContentMaxHeights] = useState<Record<string, string>>({
    [PROJECT_KEYS.PICITY_HIGH_PARK]: '106px', // Initial collapsed height
    [PROJECT_KEYS.PICITY_SKY_PARK]: '106px',
    [PROJECT_KEYS.PRIME_MASTER]: '106px',
  });
  useEffect(() => {
    // Update max-height when openStates change
    const newMaxHeights = { ...contentMaxHeights };
    let updateNeeded = false;
    Object.keys(PROJECT_KEYS).forEach(keyName => {
      const projectKey = PROJECT_KEYS[keyName as keyof typeof PROJECT_KEYS];
      const ref = contentRefs.current[projectKey];
      const isOpen = openStates[projectKey];
      // Khi đóng, maxHeight là 0 để thu gọn hoàn toàn. Khi mở, tính scrollHeight.
      const targetHeight = isOpen ? (ref ? `${ref.scrollHeight}px` : 'auto') : '106px';
      if (newMaxHeights[projectKey] !== targetHeight) {
        newMaxHeights[projectKey] = targetHeight;
        updateNeeded = true;
      }
    });
      setContentMaxHeights(newMaxHeights);
  }, [openStates, contentMaxHeights]); // Thêm contentMaxHeights vào dependency array để đảm bảo effect chạy lại khi cần
  const toggleVisibility = (projectKey: string) => {
    setOpenStates(prevStates => ({
      ...prevStates,
      [projectKey]: !prevStates[projectKey],
    }));
  };
  return (
    <>
      <div className="relative mx-auto h-[500px] md:h-[100vh] w-[100vw]  text-center pt-[20%] md:pt-[175px]">
        <div className="relative mx-auto top-[30%] max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px]">
          <h2 className='absolute  z-10 left-0 text-left  uppercase font-bold text-white leading-[48px] 2xl:leading-[56px] text-[38px] 2xl:text-[46px]'>đầu tư & <br /> phát triển dự án</h2>
        </div>
        <Image fill src="/fecosystem/detail/development.png" alt="Smart City Features" className="object-fill"></Image>
      </div>
      <div className="mx-auto px-[10px] max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px] mb-[55px] xl:mb-[87px]">
        <div className='grid grid-cols-[46%_1fr] gap-12 mb-[50px] mt-[100px]'>
          <div className='border-t-1 border-gray-8 mt-[15px] order-1  md:order-0 text-[13px] 2xl:text-[17px]'>
            <h3 className='text-yellow-1 text-[20px] 2xl:text-[26px] font-bold px-[50px] py-[12px] border-b-1 border-gray-8'>PICITY HIGH PARK</h3>
            <p className='text-gray-6 text-justify px-[50px] py-[16px] border-b-1 border-gray-8'>Đại đô thị lớn nhất Quận 12 sở hữu hệ tiện ích chuẩn resort với hơn 2.500 sản phẩm căn hộ, shophouse, nhà phố thương mại. Picity High Park là tổ ấm an cư của hơn 10.000 cư dân văn minh, hạnh phúc.</p>            
            {/* Div cha cho phần toggle, không có padding top/bottom */}
            <div style={{ maxHeight: contentMaxHeights[PROJECT_KEYS.PICITY_HIGH_PARK] }} className={`relative text-gray-6 leading-[24px] px-[50px] border-gray-8 border-b-1 overflow-hidden transition-all duration-500 ease-in-out`}>
              {/* Div con để lấy scrollHeight và áp dụng padding */}
              <div ref={(el:any) => contentRefs.current[PROJECT_KEYS.PICITY_HIGH_PARK] = el || null} className="pt-[12px] pb-[18px]">
              <div className='grid gap-[1px]'>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/map.svg" alt="map" /><span className='font-bold'>Vị Trí:</span>Quận 12, TP. HCM</p>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/area.svg" alt="map" /><span className='font-bold'>Quy Mô:</span>14.325,90 m²</p>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='font-bold'>Loại hình sản phẩm:</span>Khu đô thị</p>
              </div>
                <div className={`hide-info transition-opacity duration-500 ease-in-out ${openStates[PROJECT_KEYS.PICITY_HIGH_PARK] ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Mật độ xây dựng:</strong> 23%</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thiết kế kiến trúc:</strong> Humphreys and Partners Architects (Mỹ)</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thiết kế cảnh quan:</strong> Belt Collins International (HongKong)</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thi công xây dựng:</strong> Unicons (Thành viên Coteccons Group) và Tập đoàn Xây dựng Hòa Bình</span></p>
              </div>              
              </div>
            </div>
            {/* Nút SVG được đặt bên ngoài div có maxHeight để không bị cắt */}
            <div className="relative px-[50px] h-[24px]"> {/* Container cho nút SVG */}
              <svg onClick={() => toggleVisibility(PROJECT_KEYS.PICITY_HIGH_PARK)} className={`absolute rounded-full left-[20px] top-[-8px] cursor-pointer transition-all duration-300 ease-in-out ${openStates[PROJECT_KEYS.PICITY_HIGH_PARK] ? 'rotate-180 bg-blue-5' : 'bg-white'}`} width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9.5" stroke="#4C73A8" />
                <path d="M6 9L9.93461 13.0643L13.9989 9.12974" stroke={`${openStates[PROJECT_KEYS.PICITY_HIGH_PARK] ? '#fff' : '#4C73A8'}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className='flex justify-end pr-[36px] pt-[20px]'>
              <Link href="/" className="hvr-bounce-to-right flex text-[12px] 2xl:text-[16px] uppercase items-center justify-center text-yellow-1 font-semibold w-[160px] h-[30px] border border-yellow-1 hover:text-white">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
          <div className='relative h-[388px]'>
            <Image
              src="/fecosystem/detail/detail-1.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden"
            />
          </div>
        </div>
        <div className='grid grid-cols-[1fr_46%] gap-12 mb-[50px] mt-[100px]'>
          <div className='relative h-[388px]'>
            <Image
              src="/fecosystem/detail/detail-2.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden"
            />
          </div>
          <div className='border-t-1 border-gray-8 mt-[15px] order-1  md:order-0 text-[13px] 2xl:text-[17px]'>
            <h3 className='text-yellow-1 text-[20px] 2xl:text-[26px] font-bold px-[50px] py-[12px] border-b-1 border-gray-8'>PICITY SKY PARK</h3>
            <p className='text-gray-6 text-justify px-[50px] py-[16px] border-b-1 border-gray-8'>Tọa lạc trên trục đại lộ Phạm Văn Đồng, Picity Sky Park tiên phong ứng dụng công nghệ 4.0 (tích hợp IoT & AI) và hệ tiện ích 5* mang đến trải nghiệm sống hiện đại, chuẩn quốc tế cho cư dân đô thị.</p>            
            <div style={{ maxHeight: contentMaxHeights[PROJECT_KEYS.PICITY_SKY_PARK] }} className={`relative text-gray-6 leading-[24px] px-[50px] border-gray-8 border-b-1 overflow-hidden transition-all duration-500 ease-in-out`}>
              <div ref={(el:any) => contentRefs.current[PROJECT_KEYS.PICITY_SKY_PARK] = el || null} className="pt-[12px] pb-[18px]">
              <div className='grid gap-[1px]'>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/map.svg" alt="map" /><span className='font-bold'>Vị Trí:</span>Dĩ An, Bình Dương</p>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/area.svg" alt="map" /><span className='font-bold'>Quy Mô:</span>10.611 m²</p>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='font-bold'>Loại hình sản phẩm:</span>Khu đô thị</p>
              </div>
                <div className={`hide-info transition-opacity duration-500 ease-in-out ${openStates[PROJECT_KEYS.PICITY_SKY_PARK] ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Mật độ xây dựng:</strong> 23%</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thiết kế kiến trúc:</strong> Humphreys and Partners Architects (Mỹ)</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thiết kế cảnh quan:</strong> Belt Collins International (HongKong)</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thi công xây dựng:</strong> Unicons (Thành viên Coteccons Group) và Tập đoàn Xây dựng Hòa Bình</span></p>
              </div>              
              </div>
            </div>
            <div className="relative px-[50px] h-[24px]">
              <svg onClick={() => toggleVisibility(PROJECT_KEYS.PICITY_SKY_PARK)} className={`absolute rounded-full left-[20px] top-[-8px] cursor-pointer transition-all duration-300 ease-in-out ${openStates[PROJECT_KEYS.PICITY_SKY_PARK] ? 'rotate-180 bg-blue-5' : 'bg-white'}`} width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9.5" stroke="#4C73A8" />
                <path d="M6 9L9.93461 13.0643L13.9989 9.12974" stroke={`${openStates[PROJECT_KEYS.PICITY_SKY_PARK] ? '#fff' : '#4C73A8'}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className='flex justify-end pr-[36px] pt-[20px]'>
              <Link href="/" className="hvr-bounce-to-right flex text-[12px] 2xl:text-[16px] uppercase items-center justify-center text-yellow-1 font-semibold w-[160px] h-[30px] border border-yellow-1 hover:text-white">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>          
        </div>
        <div className='grid grid-cols-[46%_1fr] gap-12 mb-[50px] mt-[100px]'>
          <div className='border-t-1 border-gray-8 mt-[15px] order-1  md:order-0 text-[13px] 2xl:text-[17px]'>
            <h3 className='text-yellow-1 text-[20px] 2xl:text-[26px] font-bold px-[50px] py-[12px] border-b-1 border-gray-8'>PRIME MASTER</h3>
            <p className='text-gray-6 text-justify px-[50px] py-[16px] border-b-1 border-gray-8'>Prime Master là tuyên ngôn về một chuẩn mực sống đỉnh cao, nơi hội tụ đẳng cấp sống thượng lưu, nghệ thuật kiến tạo không gian và giá trị sống trường tồn. Tại Prime Master, mỗi tư dinh là một kiệt tác nghệ thuật được "may đo" tinh xảo, phản ánh lối sống độc bản của những chủ nhân không chỉ thành đạt, mà còn biết cách định hình phong cách sống mang tính biểu tượng.</p>            
            <div style={{ maxHeight: contentMaxHeights[PROJECT_KEYS.PRIME_MASTER] }} className={`relative text-gray-6 leading-[24px] px-[50px] border-gray-8 border-b-1 verflow-hidden transition-all duration-500 ease-in-out`}>
              <div ref={(el:any) => contentRefs.current[PROJECT_KEYS.PRIME_MASTER] = el || null} className="pt-[12px] pb-[18px]">
              <div className='grid gap-[1px]'>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/map.svg" alt="map" /><span className='font-bold'>Vị Trí:</span>Quận 12, TP. HCM</p>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/area.svg" alt="map" /><span className='font-bold'>Quy Mô:</span>14.325,90 m²</p>
                <p className='flex items-center gap-[8px]'><img width={11} height={11} src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='font-bold'>Loại hình sản phẩm:</span>Khu đô thị</p>
              </div>
                <div className={`hide-info transition-opacity duration-500 ease-in-out ${openStates[PROJECT_KEYS.PRIME_MASTER] ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Mật độ xây dựng:</strong> 23%</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thiết kế kiến trúc:</strong> Humphreys and Partners Architects (Mỹ)</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thiết kế cảnh quan:</strong> Belt Collins International (HongKong)</span></p>
                <p className='flex items-start gap-[8px]'><img className='mt-[8px]' width={8} height={8} src="/fecosystem/detail/circle.svg"/><span><strong>Đơn vị thi công xây dựng:</strong> Unicons (Thành viên Coteccons Group) và Tập đoàn Xây dựng Hòa Bình</span></p>
              </div>              
              </div>
            </div>
            <div className="relative px-[50px] h-[24px]">
              <svg onClick={() => toggleVisibility(PROJECT_KEYS.PRIME_MASTER)} className={`absolute rounded-full left-[20px] top-[-8px] cursor-pointer transition-all duration-300 ease-in-out ${openStates[PROJECT_KEYS.PRIME_MASTER] ? 'rotate-180 bg-blue-5' : 'bg-white'}`} width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9.5" stroke="#4C73A8" />
                <path d="M6 9L9.93461 13.0643L13.9989 9.12974" stroke={`${openStates[PROJECT_KEYS.PRIME_MASTER] ? '#fff' : '#4C73A8'}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className='flex justify-end pr-[36px] pt-[20px]'>
              <Link href="/" className="hvr-bounce-to-right flex text-[12px] 2xl:text-[16px] uppercase items-center justify-center text-yellow-1 font-semibold w-[160px] h-[30px] border border-yellow-1 hover:text-white">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
          <div className='relative h-[388px]'>
            <Image
              src="/fecosystem/detail/detail-3.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden"
            />
          </div>
        </div>        
      </div>
      <div className='pb-[120px]'>
        <PaginationExample />
      </div>
    </>
  );
}
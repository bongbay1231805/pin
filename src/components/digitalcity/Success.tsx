'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

export default function Success({ custom_fields }: any) {
  useScrollReveal();

  const [activeBox, setActiveBox] = useState<number>(1); // Mặc định tab 1 active

  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return null;
    }
  }

  const { digitalcity_success } = custom_fields;
  const digitalcitysuccess = convertJsonStringToArrayOrObject(digitalcity_success);

  const totalImages = digitalcitysuccess.length;

  // Hàm xử lý khi click nút trái (Previous)
  const goToPrev = () => {
    setActiveBox((prevActiveBox) => {
      if (prevActiveBox === 1) {
        return totalImages;
      }
      return prevActiveBox - 1;
    });
  };

  // Hàm xử lý khi click nút phải (Next)
  const goToNext = () => {
    setActiveBox((prevActiveBox) => {
      if (prevActiveBox === totalImages) {
        return 1;
      }
      return prevActiveBox + 1;
    });
  };

  return (
    // Outer container (overall area for tabs, image, and controls)
    <div className="boxanimation fade-in-up-medium relative mx-auto max-w-[85%] h-[200px] md:h-[570px] mb-[120px] md:mb-[170px]">

      {/* Tabs container - Moved to top, centered, flex-row */}
      <div className='z-20 pb-[30px] flex flex-row justify-center items-center space-x-2 md:space-x-4 text-[12px] md:text-[16px] font-bold whitespace-nowrap'>
        {digitalcitysuccess.map((digitalcsuccess: any, index: number) => {
          const isCurrentActive = activeBox === index + 1;

          return (
            <div
              key={index + "box"}
              onClick={() => setActiveBox(index + 1)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full cursor-pointer
                transition-colors duration-300 ease-in-out
                ${isCurrentActive ? 'bg-yellow-1 text-white' : 'bg-gray-200 text-gray-700 hover:bg-yellow-1 hover:text-white'}
              `}
            >
              <p className="uppercase">
                {digitalcsuccess[0].value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main content area for image AND buttons. This div will control their relative positions. */}
      {/* We apply the padding here to create space for buttons around the image */}
      <div className="relative w-full mt-0 px-[30px] md:px-[50px] success-slider">
        {/* Image specific container - This div ensures the image doesn't fill the padding area */}
        <div className="relative w-full h-full"> {/* Removed px- from here, now applied to parent */}
            {digitalcitysuccess.map((digitalcsuccess: any, index: number) => (
              <img
                key={index + 1}
                src={`https://admin.pigroup.vn/storage/${digitalcsuccess[1].value}`}
                alt={digitalcsuccess[0].value}
                className={`rounded-[20px] transition-opacity duration-500 ease-in-out max-w-[100%] h-auto ${activeBox === index + 1 ? 'opacity-100' : 'opacity-0 absolute top-0'}`}
              />
            ))}
        </div>

        {/* Navigation Buttons - positioned relative to their direct parent (the px-padded div) */}
        {/* Nút trái */}
        <button
          onClick={goToPrev}
          className="absolute left-[-20px] sm:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full z-30
                     hover:bg-opacity-75 transition-colors duration-200 focus:outline-none text-yellow-1 rounded-full"
          aria-label="Previous image"
        >
          {/* Bạn có thể dùng icon SVG hoặc ký tự mũi tên */}
          <ChevronLeft size={24} />
        </button>

        {/* Nút phải */}
        <button
          onClick={goToNext}
          className="absolute right-[-20px] sm:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full z-30
                     hover:bg-opacity-75 transition-colors duration-200 focus:outline-none text-yellow-1 rounded-full"
          aria-label="Next image"
        >
          {/* Bạn có thể dùng icon SVG hoặc ký tự mũi tên */}
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
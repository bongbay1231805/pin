'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
export default function Success({ custom_fields }: any) {
  useScrollReveal(); // dùng mặc định `.boxanimation`
  const images = [
    { id: 1, src: '/fdigitalcity/digitalcity-22.png', alt: 'Picity Sky Park 1' },
    { id: 2, src: '/fdigitalcity/digitalcity-22.png', alt: 'Picity Sky Park 2' },
    { id: 3, src: '/fdigitalcity/digitalcity-22.png', alt: 'Picity Sky Park 3' },
  ];
  const [hoveredBox, setHoveredBox] = useState<number>(1);
  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return null; // Return null or throw the error, depending on your error handling preference
    }
  }
  const {digitalcity_success} = custom_fields;
  const digitalcitysuccess = convertJsonStringToArrayOrObject(digitalcity_success);
  return (
    <div className="flex items-start justify-end relative mx-auto max-w-[85%] h-[570px] mb-[65px]">
      {digitalcitysuccess.map((digitalcsuccess:any,index:number) => (
        <Image
          key={index+1}
          src={`https://admin.pigroup.tqdesign.vn/storage/${digitalcsuccess[1].value}`}
          alt={digitalcsuccess[0].value}
          fill
          className={`w-[calc(100%-45px)]! transition-opacity duration-500 ease-in-out ${(hoveredBox === index+1)? 'opacity-100' : 'opacity-0 absolute'}`}
        />
      ))}
      <div className='relative z-10 flex flex-col mt-[66px] text-center text-[12px] md:text-[30px] font-bold'>
        {digitalcitysuccess.map((digitalcsuccess:any,index:number) => (
          <div
            key={index + "box"}
            // Khi chuột vào, set active cho box đó
            onMouseEnter={() => setHoveredBox(index+1)}
            // Xóa bỏ onMouseLeave hoặc để trống để giữ trạng thái
            // onMouseLeave={() => { /* Do nothing */ }}
            // Nếu bạn muốn có một số hành vi khi chuột rời khỏi toàn bộ khu vực hộp,
            // bạn có thể đặt onMouseLeave trên div cha của các box.
            // Nhưng để giữ trạng thái khi rời box con, chúng ta bỏ qua onMouseLeave ở đây.
            // Tailwind classes cho vị trí và style
            className={`
                ${index + 1 === 1 ? "top-[-15px]" : ""}
                ${index + 1 === 2 ? "top-[40px]" : ""}
                ${index + 1 === 3 ? "top-[95px]" : ""}
                flex justify-end overflow-hidden absolute items-center rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[10px]
                h-[45px] w-[395px] right-0 cursor-pointer
                text-[20px] font-bold text-white
                transition-colors duration-300 ease-in-out
                // Trạng thái active cho box
                ${hoveredBox === index + 1 ? 'bg-yellow-1 [&>p]:opacity-100 [&>div]:bg-yellow-1' : 'hover:bg-yellow-1 hover:[&>p]:opacity-100 hover:[&>div]:bg-yellow-1'}
              `}
          >
            <p className="grow text-center opacity-0 transition-opacity duration-300 ease-in-out uppercase">
              {digitalcsuccess[0].value}
            </p>
            <div className="w-[45px] flex items-center justify-center h-full bg-blue-1 transition-colors duration-300 ease-in-out">
              <span>{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
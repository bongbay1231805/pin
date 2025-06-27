'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

interface HorizontalImageScrollerProps {
  imageUrls: string[];
  openPopup: (src: string) => void;
}

const HorizontalImageScroller: React.FC<HorizontalImageScrollerProps> = ({
  imageUrls,
  openPopup,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown = true;
    scrollRef.current.classList.add('cursor-grabbing');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown = false;
    scrollRef.current?.classList.remove('cursor-grabbing');
  };

  const onMouseUp = () => {
    isDown = false;
    scrollRef.current?.classList.remove('cursor-grabbing');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Logic onScroll (looping) của bạn, giữ nguyên
  const onScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollWidth = container.scrollWidth / 2;
    if (container.scrollLeft >= scrollWidth) {
      container.scrollLeft = container.scrollLeft - scrollWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft = container.scrollLeft + scrollWidth;
    }
  };

  return (
    <div
      ref={scrollRef}
      // Đặt một chiều cao cụ thể cho container này, ví dụ 250px,
      // để các ảnh bên trong có thể sử dụng `fill`
      className="overflow-x-auto scrollbar-hide cursor-grab select-none h-[250px]" 
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onScroll={onScroll} // Giữ lại nếu bạn muốn logic loop
    >
      {/* Container cho các ảnh. 
        `px-[30px]` sẽ tạo padding bên trong, ảnh sẽ có khoảng trống 30px ở mỗi bên.
      */}
      <div className="flex gap-[15px] h-full px-[30px] pb-2">
        {imageUrls.map((src: string, i: number) => (
          <div
            key={i}
            className="
              relative flex-none /* Đảm bảo item không co lại */
              aspect-w-16 aspect-h-9 /* Giữ tỷ lệ khung hình cho mỗi ảnh */
              w-[calc(100%-45px)] /* 1 item trên mobile, trừ đi 30px padding tổng + 15px gap (1/2 gap mỗi bên) */
              min-w-[calc(100%-45px)] /* Đảm bảo không co nhỏ hơn */
              
              bg-[#ECF5FA]/30 border-[25px] border-[#ECF5FA]/30 rounded-[5px]
              
              grid items-center justify-center /* Canh giữa nội dung ảnh */
            "
          >
            <Image
              onClick={() => openPopup(src)}
              src={src}
              alt={`Image ${i + 1}`}
              fill // Ảnh lấp đầy div cha
              style={{ objectFit: 'cover' }} // Đảm bảo ảnh không bị méo, cắt phần thừa
              className="rounded-[5px]" // Áp dụng bo tròn góc cho ảnh
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalImageScroller;
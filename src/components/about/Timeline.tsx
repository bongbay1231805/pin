// components/Timeline.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useScrollRefs } from '@/context/ScrollRefsContext';

export function Timeline({ custom_fields }: any) {
  // const { threeRef } = useScrollRefs();
  const { field_12_about, slider_about } = custom_fields;

  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON string:', error);
      return null;
    }
  }

  const sliderabout = convertJsonStringToArrayOrObject(slider_about) || [];

  const autoplay = useRef(
    Autoplay({
      delay: 1000000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnLastSnap: true
    })
  );

  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false, 
      // slidesToScroll: 1,
      watchDrag: false,
    },
    [autoplay.current]
  );

  // Bắt đầu từ index 1 (năm 2015)
  const [selectedIndex, setSelectedIndex] = useState(8);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const fixedDivRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;

    if (autoplay.current && embla) {
      autoplay.current.reset(); // Reset timer sau khi người dùng vuốt
    }

    if (Math.abs(distance) > minSwipeDistance) {
      distance > 0 ? scrollNext() : scrollPrev();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Chặn scroll mặc định khi swipe
  };

  useEffect(() => {
    if (!embla) return;

    // Cuộn đến index 1 (slide năm 2015) khi component mount
    // Đảm bảo sliderabout có đủ phần tử trước khi cuộn
    if (sliderabout.length > 1) {
      embla.scrollTo(8, false); // false để cuộn ngay lập tức mà không có animation
    }

    const onSelect = () => {
      const currentSnap = embla.selectedScrollSnap();
      setSelectedIndex(currentSnap);

      // --- LOGIC MỚI CHO NÚT TRÁI ---
      // Ẩn nút trái khi index hiện tại là 1 (năm 2015)
      setCanScrollPrev(currentSnap > 1);

      // --- LOGIC MỚI CHO NÚT PHẢI ---
      // Ẩn nút phải khi index hiện tại là sliderabout.length - 2 (năm 2023 là gần cuối)
      // Giả sử năm 2023 là phần tử cuối cùng thứ 2 trong mảng, hoặc bạn muốn nó ẩn đi trước slide cuối cùng
      // Nếu 2023 là index 7 và tổng số slide là 9 (index 0-8), thì nó là length - 2
      // Nếu bạn muốn ẩn nó khi đến slide cuối cùng (2024), thì chỉ cần !embla.canScrollNext()
      setCanScrollNext(currentSnap < sliderabout.length - 2);
    };

    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
    onSelect(); // Gọi lần đầu để thiết lập trạng thái ban đầu
    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', onSelect);
    };
  }, [embla, sliderabout.length]); // Thêm sliderabout.length vào dependency array

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  const scrollTo = (index: number) => {
    if (embla && index >= 0 && index < sliderabout.length) {
      embla.scrollTo(index);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);


  const currentEvent = sliderabout && sliderabout[selectedIndex] ? sliderabout[selectedIndex] : null;
  console.log('selectedIndex >>> ', selectedIndex)
  console.log('currentEvent >>> ', currentEvent)

  return (
    <div
    >
      <h2 className="text-[22px] sm:text-[28px] 2xl:text-[45px] text-yellow-1 font-bold text-center mb-[0px] sm:mb-12">
        {field_12_about} 
      </h2>

      <div className="carousel-bg relative h-[360px] 2xl:h-[400px] flex items-center justify-center">
        {/* Div cố định ở giữa */}
        <div
          ref={fixedDivRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          data-embla-draggable="false"
          className="absolute z-20 w-[300px] h-[300px] 2xl:w-[360px] 2xl:h-[360px] timeline-item active rounded-full text-center flex flex-col items-center justify-center p-4 bg-white border-1 border-yellow-500"
        >
          {currentEvent && (
            <div className="bg w-full h-full flex flex-col items-center justify-center text-center pb-[20px]">
              <div className="text-[26px] 2xl:text-[32px] title font-bold mb-2 text-yellow-1">
                {currentEvent[0]?.value || ''}
              </div>
              {currentEvent[1]?.value && (
                <div
                  className="text-[13px] 2xl:text-[15px]"
                  dangerouslySetInnerHTML={{ __html: currentEvent[1].value }}
                />
              )}
              {currentEvent[2]?.value && (
                <div
                  className="relative text-[13px] 2xl:text-[15px] mt-[20px]"
                  dangerouslySetInnerHTML={{ __html: currentEvent[2].value }}
                />
              )}
            </div>
          )}
        </div>

        {/* Nút trái */}
        <button
          onClick={scrollPrev}
          className={`absolute arrow cursor-pointer z-10 sm:left-0 left-[-20px] top-1/2 -translate-y-1/2 scale-[1.1] text-yellow-1 rounded-full p-2 ${
            canScrollPrev ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronLeft />
        </button>

        {/* Carousel */}
        {sliderabout.length > 0 && (
          <div className="overflow-hidden max-w-[86%]" ref={emblaRef}>
            <div className="flex">
              {sliderabout.map((event: any, index: number) => (
                <div
                  key={index}
                  className="flex-none min-w-[33.333%] flex justify-center items-center p-6 cursor-pointer"
                  // onClick={() => scrollTo(index)}
                >
                  <div className="w-[300px] h-[300px] 2xl:w-[360px] 2xl:h-[360px] timeline-item rounded-full transition-all duration-300 text-center flex flex-col items-center justify-center p-4 bg-white">
                    <div className="hidden md:flex bg w-full h-full flex-col items-center justify-center text-center pb-[20px]">
                      <div className="text-[26px] 2xl:text-[32px] title font-bold mb-2 text-yellow-1">
                        {event[0]?.value}
                      </div>
                      {event[1]?.value && (
                        <div
                          className="text-[13px] 2xl:text-[15px]"
                          dangerouslySetInnerHTML={{ __html: event[1].value }}
                        />
                      )}
                      {event[2]?.value && (
                        <div
                          className="relative text-[13px] 2xl:text-[15px] mt-[20px]"
                          dangerouslySetInnerHTML={{ __html: event[2].value }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nút phải */}
        <button
          onClick={scrollNext}
          className={`absolute arrow cursor-pointer z-10 sm:right-0 right-[-20px] top-1/2 -translate-y-1/2 scale-[1.1] text-yellow-1 rounded-full p-2 ${
            canScrollNext ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
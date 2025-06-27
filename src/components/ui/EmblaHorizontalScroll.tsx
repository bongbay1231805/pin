'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import convertJsonStringToArrayOrObject from '@/hooks/useConvertJsonToArray'; // Đảm bảo đúng đường dẫn của hook này

type HorizontalScrollProps = {
  custom_fields: any;
};

const EmblaHorizontalScroll: React.FC<HorizontalScrollProps> = ({
  custom_fields
}) => {
  const { digitalcity_slider_horizoltal } = custom_fields;
  // Chuyển đổi dữ liệu JSON từ custom_fields thành mảng slides
  const slides = convertJsonStringToArrayOrObject(digitalcity_slider_horizoltal) || [];

  // Khởi tạo Embla Carousel với các tùy chọn
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true, // Bật tính năng lặp vô hạn
      align: 'start', // Căn chỉnh các slide bắt đầu từ cạnh
      // slidesToScroll: 1, // Cuộn từng slide một (mặc định)
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })] // Plugin Autoplay
  );

  return (
    <div className="embla relative overflow-hidden">
      {/* Viewport của Embla Carousel */}
      <div className="embla__viewport" ref={emblaRef}>
        {/* Container chứa các slide, dùng flex và gap để tạo khoảng cách */}
        {/* Điều chỉnh gap-[40px] nếu bạn muốn khoảng cách khác */}
        <div className="embla__container flex gap-[40px] h-[222px]">
          {slides.map((text: any, i: number) => (
            <div
              key={i}
              className={`
                embla__slide
                flex-none /* Đảm bảo slide không co lại */
                
                /* Cấu hình responsive cho width và min-width của mỗi slide */
                /* Tính toán: (100% / số_lượng_slide) - (gap_giữa_slide * (số_lượng_slide - 1) / số_lượng_slide) */
                /* Ở đây gap là 40px */

                /* Mobile (mặc định): 1 item */
                w-[calc(100%-0px)] /* Đặt 100% full width trên mobile, không trừ gap */
                sm:w-[calc(100%-0px)] /* Giữ 1 item trên sm */
                md:w-[calc(100%-0px)] /* Giữ 1 item trên md */

                /* PC (lg, xl, 2xl): 5 item */
                /* (100% / 5) - (40px * 4 / 5) = 20% - 32px */
                lg:w-[calc(20%-32px)] /* Ví dụ cho 5 item trên lg */
                xl:w-[calc(20%-32px)] /* Ví dụ cho 5 item trên xl */
                2xl:w-[calc(20%-32px)] /* Ví dụ cho 5 item trên 2xl */

                /* Min-width cũng tương tự để đảm bảo không bị co */
                min-w-[calc(100%-0px)]
                sm:min-w-[calc(100%-0px)]
                md:min-w-[calc(100%-0px)]
                lg:min-w-[calc(20%-32px)]
                xl:min-w-[calc(20%-32px)]
                2xl:min-w-[calc(20%-32px)]


                /* Các style khác của slide item */
                grid items-center bg-blue-1 rounded-[20px] h-full content-evenly hover:bg-yellow-1 duration-500
              `}
            >
              <div
                className="grid justify-center items-center"
                dangerouslySetInnerHTML={{ __html: text[0].value }}
              ></div>
              <h4 className="uppercase text-white px-[20px] text-[14px] text-center font-bold">
                {text[1].value}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Nút điều hướng (Previous & Next) */}
      {emblaApi && (
        <>
          <button
            className="embla__prev absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-200 rounded-full z-10 hidden md:block"
            onClick={() => emblaApi.scrollPrev()}
          >
            &#x2190; {/* Ký tự mũi tên trái */}
          </button>
          <button
            className="embla__next absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-200 rounded-full z-10 hidden md:block"
            onClick={() => emblaApi.scrollNext()}
          >
            &#x2192; {/* Ký tự mũi tên phải */}
          </button>
        </>
      )}
    </div>
  );
};

export default EmblaHorizontalScroll;
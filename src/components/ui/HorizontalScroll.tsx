'use client';

import convertJsonStringToArrayOrObject from '@/hooks/useConvertJsonToArray';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {ChevronLeft, ChevronRight} from 'lucide-react'; // Giữ lại icon hoặc thay thế

// Import file CSS cho Embla (bạn sẽ tạo file này ở bước 3)
import './embla.css';

type HorizontalScrollProps = {
  custom_fields: any;
};

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({custom_fields}) => {
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
      stopOnMouseEnter: true
    })
  );
  // 1. Cấu hình Embla
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true, // Cho phép lặp vô tận
      align: 'center', // Căn chỉnh các slide từ bên trái
      slidesToScroll: 1 // Mỗi lần bấm next/prev chỉ cuộn 1 item
    },
    [autoplay.current]
  );

  const [items, setItems] = useState<any[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // 2. Xử lý logic cho nút bấm
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // 3. Lắng nghe sự kiện của Embla để cập nhật trạng thái nút bấm
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Cập nhật khi carousel re-initialize (vd: resize)
    onSelect(); // Cập nhật trạng thái ban đầu

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  // Lấy dữ liệu
  useEffect(() => {
    const {digitalcity_slider_horizoltal} = custom_fields;
    if (digitalcity_slider_horizoltal) {
      const parsedItems = convertJsonStringToArrayOrObject(
        digitalcity_slider_horizoltal
      );
      setItems(parsedItems);
    }
  }, [custom_fields]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="relative max-w-screen-xl mx-auto technology-carousel">
      {/* 4. Cấu trúc JSX cho Embla */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item: any, i: number) => (
            <div className="embla__slide" key={i}>
              <div className="grid items-center bg-blue-1 rounded-[20px] h-[222px] content-evenly hover:bg-yellow-1 duration-500">
                <div
                  className="grid justify-center items-center"
                  dangerouslySetInnerHTML={{__html: item[0]?.value || ''}}
                ></div>
                <h4 className="uppercase text-white px-[20px] text-[14px] text-center font-bold">
                  {item[1]?.value || ''}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nút Previous */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev && !emblaApi?.internalEngine().options.loop}
        className="absolute arrow cursor-pointer top-1/2 left-[-20px] md:left-[-50px] -translate-y-1/2 z-10 text-yellow-1 rounded-full p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Nút Next */}
      <button
        onClick={scrollNext}
        disabled={!canScrollNext && !emblaApi?.internalEngine().options.loop}
        className="absolute arrow cursor-pointer top-1/2 right-[-20px] md:right-[-50px] -translate-y-1/2 z-10 text-yellow-1 rounded-full p-2"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HorizontalScroll;

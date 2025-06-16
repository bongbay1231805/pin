'use client';
import React, { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollRefs } from '@/context/ScrollRefsContext'
export function Timeline({ custom_fields }: any) {
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef } = useScrollRefs();
  const { field_12_about, slider_about } = custom_fields;
  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return null; // Return null or throw the error, depending on your error handling preference
    }
  }
  const sliderabout = convertJsonStringToArrayOrObject(slider_about);
  const timelineEvents = [
    {
      year: '2008',
      description1: 'Thành lập <br/> <strong>Tập đoàn Pi Group</strong>',
      description2: '',
    },
    {
      year: '2015',
      description1: 'Thành lập Công ty CP <br/> Tư vấn Thiết kế Xây dựng<br/><strong>Ngôi Nhà Thông Minh</strong>',
      description2: '',
    },
    {
      year: '2016',
      description1: 'Hoàn tất M&A: <br/> Công ty TNHH MTV Đầu tư <br/> Phát triển <strong>Gia Cư</strong> và <br/> Công ty CP Địa ốc <strong>Phương Đông</strong>',
      description2: '<span></span>Thành lập Công ty <br/> <strong>CP ECOE Việt Nam</strong>',
    },
    {
      year: '2017',
      description1: 'Thành lập Công ty CP <br/> Đầu tư - Xây dựng <strong>Winbuild</strong>',
      description2: '<span></span>M&A thành công <br/>Công ty CP  <strong>Đông Quang</strong>',
    }
  ];
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [autoplay.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Cập nhật selected index mỗi lần carousel thay đổi
  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
    };
    embla.on('select', onSelect);
    onSelect();
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);
  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();
  return (
    <section ref={threeRef} className="bg-white timeline-carousel py-16">
      <div className="mx-auto max-w-[80%] md:max-w-[80%] 2xl:max-w-[1380px]">
        <h2 className="text-[36px] 2xl:text-[40px] text-yellow-1 font-bold text-center mb-12">{field_12_about}</h2>
        <div className="carousel-bg relative ">
          {/* Nút trái */}
          <button
            onClick={scrollPrev}
            className="absolute arrow cursor-pointer z-10 left-0 top-1/2 -translate-y-1/2 scale-[1.1] text-yellow-1 rounded-full p-2"
          >
            <ChevronLeft />
          </button>
          {/* Carousel */}
          <div className="overflow-hidden max-w-[86%] ml-[7%]" ref={emblaRef}>
            <div className="flex">
              {sliderabout.map((event: any, index: number) => {
                const isActive = index === selectedIndex;
                return (
                  <div
                    key={index}
                    className="flex-none min-w-[33.333%] flex justify-center items-center p-6 cursor-pointer"
                    onClick={() => embla && embla.scrollTo(index)}
                  >
                    <div
                      className={`w-[300px] h-[300px] 2xl:w-[360px] 2xl:h-[360px] timeline-item rounded-full transition-all duration-300 text-center flex flex-col items-center justify-center p-4 bg-white ${isActive
                        ? 'border-1 active border-yellow-500'
                        : 'opacity-100'
                        }`}
                    >
                      <div className="bg w-full h-full flex flex-col items-center justify-center text-center pb-[20px]">
                        <div className="text-[26px] 2xl:text-[32px] title font-bold mb-2 text-yellow-1">{event[0].value}</div>
                        {
                          event[1].value != '' ? (
                            <div
                              className="text-[13px] 2xl:text-[15px]"
                              dangerouslySetInnerHTML={{ __html: event[1].value }}
                            />
                          ) : null
                        }
                        {
                          event[2].value != '' ? (
                            <div
                              className="relative text-[13px] 2xl:text-[15px] mt-[20px]"
                              dangerouslySetInnerHTML={{ __html: event[2].value }}
                            />
                          ) : null
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Nút phải */}
          <button
            onClick={scrollNext}
            className="absolute arrow cursor-pointer z-10 right-0 top-1/2 -translate-y-1/2 scale-[1.1] text-yellow-1 rounded-full p-2"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

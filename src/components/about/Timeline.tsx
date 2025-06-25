'use client';
import React, {useEffect, useRef, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useScrollRefs} from '@/context/ScrollRefsContext';
export function Timeline({custom_fields}: any) {
  const {oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef} =
    useScrollRefs();
  const {field_12_about, slider_about} = custom_fields;
  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error('Error parsing JSON string:', error);
      return null; // Return null or throw the error, depending on your error handling preference
    }
  }
  const sliderabout = convertJsonStringToArrayOrObject(slider_about);
  console.log(slider_about);
  const timelineEvents = [
    {
      year: '2008',
      description1: 'Thành lập <br/> <strong>Tập đoàn Pi Group</strong>',
      description2: ''
    },
    {
      year: '2015',
      description1:
        'Thành lập Công ty CP <br/> Tư vấn Thiết kế Xây dựng<br/><strong>Ngôi Nhà Thông Minh</strong>',
      description2: ''
    },
    {
      year: '2016',
      description1:
        'Hoàn tất M&A: <br/> Công ty TNHH MTV Đầu tư <br/> Phát triển <strong>Gia Cư</strong> và <br/> Công ty CP Địa ốc <strong>Phương Đông</strong>',
      description2:
        '<span></span>Thành lập Công ty <br/> <strong>CP ECOE Việt Nam</strong>'
    },
    {
      year: '2017',
      description1:
        'Thành lập Công ty CP <br/> Đầu tư - Xây dựng <strong>Winbuild</strong>',
      description2:
        '<span></span>M&A thành công <br/>Công ty CP  <strong>Đông Quang</strong>'
    }
  ];
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnLastSnap: true // dừng slide cuối ở autoplay
    })
  );
  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: false, // không lặp lại slide
      align: 'center',
      skipSnaps: false,
      slidesToScroll: 1
    },
    [autoplay.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false); // <-- THÊM DÒNG NÀY
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Reference cho div cố định ở giữa
  const fixedDivRef = useRef<HTMLDivElement>(null);

  // State để xử lý vuốt trên div cố định
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50; // Khoảng cách vuốt tối thiểu để kích hoạt chuyển slide (pixels)

  // Xử lý sự kiện chạm bắt đầu
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Xử lý sự kiện chạm kết thúc
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;

    // Kích hoạt Autoplay plugin để tiếp tục sau khi tương tác kết thúc nếu muốn
    if (autoplay.current && embla) {
      autoplay.current.reset(); // Reset autoplay timer after interaction
      // If stopOnInteraction is false, it will continue automatically.
      // If stopOnInteraction is true, it means interaction itself stops it,
      // so you might want to restart it manually here if that's the desired behavior.
      // For this specific setup (stopOnInteraction: true), this line alone might not restart it.
      // You'd need to manually call autoplay.current.play() or similar if you want it to restart
      // despite stopOnInteraction being true.
      // Given your current config `stopOnInteraction: true`, this interaction will stop autoplay.
      // If you want it to restart, you might need:
      // autoplay.current.play()
    }

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Vuốt sang trái (chuyển slide kế tiếp)
        scrollNext();
      } else {
        // Vuốt sang phải (chuyển slide trước)
        scrollPrev();
      }
    }
  };

  // Cập nhật selected index mỗi lần carousel thay đổi
  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
    };
    embla.on('select', onSelect);
    embla.on('reInit', onSelect); // Thêm listener cho sự kiện reInit
    onSelect();
    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', onSelect);
    };
  }, [embla]);
  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  // Lấy sự kiện hiện tại đang được chọn để hiển thị trong div cố định (tăng selectedIndex lên 1 để tới slide 2)
  const currentEvent =
    sliderabout && sliderabout[selectedIndex]
      ? sliderabout[selectedIndex + 1]
      : null;

  return (
    <section
      ref={threeRef}
      className="mx-auto w-full px-[30px] md:px-0 md:max-w-[85%] 2xl:max-w-[1380px] bg-white timeline-carousel lg:py-16"
    >
      <div className="">
        <h2 className="text-[22px] sm:text-[28px] 2xl:text-[45px] text-yellow-1 font-bold text-center mb-[0px] sm:mb-12">
          {field_12_about}
        </h2>
        <div className="carousel-bg relative h-[360px] 2xl:h-[400px] flex items-center justify-center">
          {/* Div cố định ở giữa */}
          <div
            ref={fixedDivRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            data-embla-draggable="false"
            className="absolute z-20 w-[300px] h-[300px] 2xl:w-[360px] 2xl:h-[360px] timeline-item active rounded-full text-center flex flex-col items-center justify-center p-4 bg-white border-1 border-yellow-500"
          >
            {currentEvent && (
              <div className="bg w-full h-full flex flex-col items-center justify-center text-center pb-[20px]">
                <div className="text-[26px] 2xl:text-[32px] title font-bold mb-2 text-yellow-1">
                  {currentEvent[0].value || ''}
                </div>
                {currentEvent[1].value ? (
                  <div
                    className="text-[13px] 2xl:text-[15px]"
                    dangerouslySetInnerHTML={{
                      __html: currentEvent[1].value || ''
                    }}
                  />
                ) : null}
                {currentEvent[2].value ? (
                  <div
                    className="relative text-[13px] 2xl:text-[15px] mt-[20px]"
                    dangerouslySetInnerHTML={{
                      __html: currentEvent[2].value || ''
                    }}
                  />
                ) : null}
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
          <div className="overflow-hidden max-w-[86%]" ref={emblaRef}>
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
                      className={`w-[300px] h-[300px] 2xl:w-[360px] 2xl:h-[360px] timeline-item rounded-full transition-all duration-300 text-center flex flex-col items-center justify-center p-4 bg-white 
                      `}
                    >
                      <div className="hidden md:flex bg w-full h-full flex-col items-center justify-center text-center pb-[20px]">
                        <div className="text-[26px] 2xl:text-[32px] title font-bold mb-2 text-yellow-1">
                          {event[0].value}
                        </div>
                        {event[1].value != '' ? (
                          <div
                            className="text-[13px] 2xl:text-[15px]"
                            dangerouslySetInnerHTML={{__html: event[1].value}}
                          />
                        ) : null}
                        {event[2].value != '' ? (
                          <div
                            className="relative text-[13px] 2xl:text-[15px] mt-[20px]"
                            dangerouslySetInnerHTML={{__html: event[2].value}}
                          />
                        ) : null}
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
            className={`absolute arrow cursor-pointer z-10 sm:right-0 right-[-20px] top-1/2 -translate-y-1/2 scale-[1.1] text-yellow-1 rounded-full p-2 ${
              canScrollNext ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

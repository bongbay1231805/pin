'use client';
import Slider from 'react-slick';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import React-Slick's CSS (đảm bảo đã cài đặt và import ở _app.tsx hoặc layout.tsx)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// --- Custom Arrow Components ---
const SampleNextArrow: React.FC<any> = ({ onClick }) => {
  return (
    <button
      // Thay đổi các lớp Tailwind tại đây:
      // Loại bỏ 'hidden md:inline-flex'
      // Thêm 'inline-flex' để luôn hiển thị
      // Điều chỉnh vị trí cho mobile: 'right-[10px]' (hoặc giá trị phù hợp)
      className="inline-flex items-center justify-center absolute right-[10px] top-1/2 -translate-y-1/2 z-10 hover:bg-opacity-75 transition-colors duration-200 focus:outline-none text-yellow-1 rounded-full"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight size={24} />
    </button>
  );
};

const SamplePrevArrow: React.FC<any> = ({ onClick }) => {
  return (
    <button
      // Thay đổi các lớp Tailwind tại đây:
      // Loại bỏ 'hidden md:inline-flex'
      // Thêm 'inline-flex' để luôn hiển thị
      // Điều chỉnh vị trí cho mobile: 'left-[10px]' (hoặc giá trị phù hợp)
      className="inline-flex items-center justify-center absolute left-[10px] top-1/2 -translate-y-1/2 z-10 hover:bg-opacity-75 transition-colors duration-200 focus:outline-none text-yellow-1 rounded-full"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft size={24} />
    </button>
  );
};

type SlickCarouselCenterType = any[];

interface SlickCarouselCenterProps {
  slides: SlickCarouselCenterType;
}

const SlickCarouselCenter: React.FC<SlickCarouselCenterProps> = ({ slides }) => {
  const settings = {
    dots: false,
    infinite: true,
    cssEase: 'linear',
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '10px',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // Lg breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
          className: 'center-with-scale',
        },
      },
      {
        breakpoint: 1024, // md breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
          className: 'center-with-scale',
        },
      },
      {
        breakpoint: 768, // sm breakpoint (tablet)
        settings: {
          slidesToShow: 1, // Để hiển thị 1 slide trên tablet/mobile
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
          className: 'center-with-scale',
        },
      },
      {
        breakpoint: 480, // xs breakpoint (mobile)
        settings: {
          slidesToShow: 1, // Để hiển thị 1 slide trên mobile
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
          className: 'center-with-scale',
        },
      },
    ],
  };

  return (
    <section className={`relative mx-auto max-w-full md:max-w-[85%] 2xl:max-w-[1645px]`}>
      <Slider {...settings}>
        {slides.map((event: any, index: number) => (
          <div key={index}>
                <div className="slick-ii relative rounded-[10px] overflow-hidden mx-[0px]">
                  <Image
                    src={`https://admin.pigroup.vn/storage/${event[0].value}`}
                    alt="event"
                    width={1000}
                    height={600}
                    className="block w-full rounded-[10px]"
                  />
                  
                  {!!event[1] && event[1].value ? (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent"></div>
                  ) : null}

                  {!!event[1] && event[1].value ? (
                  <h3
                    className="absolute bottom-[15px] 2xl:bottom-[20px] text-[13px] sm:text-[16px] 2xl:text-[26px] font-bold text-center uppercase text-white z-20 w-full"
                    dangerouslySetInnerHTML={{ __html: event[1].value }}
                  ></h3>
                ) : null}
                </div>

                
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SlickCarouselCenter;
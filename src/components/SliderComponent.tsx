import {useEffect, useState, useRef, ReactNode} from 'react';

// const slideData = [
//   {
//     image:
//       "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
//     caption: "SẢNH ĐÓN TIẾP SANG TRỌNG",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop",
//     caption: "PHÒNG TẬP HIỆN ĐẠI",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop",
//     caption: "HỒ BƠI VÔ CỰC",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1613910352529-6e676f4142b4?q=80&w=1974&auto=format&fit=crop",
//     caption: "KHU VỰC NGOÀI TRỜI",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1568605117036-5fe5e7185743?q=80&w=2070&auto=format&fit=crop",
//     caption: "PHÒNG GIẢI TRÍ & KARAOKE",
//   },
// ];

type Props = {
  slides: any [];
};

export default function SliderComponent({ slides }: Props) {
  const slideData = slides.map((item: any) => {
    return {
      image: `https://admin.pigroup.vn/storage/${item[0].value}`,
      caption: item[0].slug
    }
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const autoPlayRef: any = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = slideData.length;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, []);

  const getOffsetStyles = (index: number) => {
    let offset = index - currentIndex;
    if (offset > totalSlides / 2) offset -= totalSlides;
    if (offset < -totalSlides / 2) offset += totalSlides;

    const isCenter = offset === 0;
    return {
      transform: `translateX(${offset * 55}%) scale(${isCenter ? 1 : 0.8})`,
      zIndex: isCenter ? 20 : 10 - Math.abs(offset),
      opacity: isCenter ? 1 : 0.4,
      filter: isCenter ? "blur(0px)" : "blur(4px)",
    };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-white overflow-hidden">
      <div className="w-full max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-[#a88a5f] tracking-widest">
          TIỆN ÍCH 5<span className="text-3xl align-middle">★</span>
        </h2>
        <h3 className="mt-2 text-xl font-bold tracking-wider text-gray-700 uppercase">
          NGHỈ DƯỠNG CHUẨN RESORT
        </h3>
      </div>

      <div
        className="relative flex items-center justify-center w-full mt-12 h-[350px] md:h-[550px]"
        onMouseEnter={() => clearInterval(autoPlayRef.current)}
        onMouseLeave={() => (autoPlayRef.current = setInterval(nextSlide, 5000))}
      >
        <button
          onClick={prevSlide}
          className="absolute left-0 z-30 p-2 -translate-y-1/2 bg-white/80 border border-gray-200 rounded-full shadow-lg top-1/2 hover:scale-110 focus:ring-2 md:left-10 backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-gray-800 md:w-8 md:h-8"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="relative w-full h-full perspective-1200">
          {slideData.map((data, index) => (
            <div
              key={index}
              className="slider-item absolute w-full h-full md:w-4/5 lg:w-3/5 top-0 left-0 right-0 mx-auto cursor-pointer transition-all duration-700 ease-in-out"
              style={getOffsetStyles(index)}
              onClick={() => goToSlide(index)}
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={data.image}
                  alt={data.caption}
                  className={`object-cover w-full h-full transition-transform duration-[8000ms] ease-out ${
                    index === currentIndex ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-gradient-to-t from-black/70 to-transparent rounded-b-xl md:p-6">
                  <h3 className="text-sm font-semibold tracking-widest uppercase drop-shadow-lg md:text-base">
                    {data.caption}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-30 p-2 -translate-y-1/2 bg-white/80 border border-gray-200 rounded-full shadow-lg top-1/2 hover:scale-110 focus:ring-2 md:right-10 backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-gray-800 md:w-8 md:h-8"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="z-30 flex justify-center mt-12 space-x-4">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:bg-gray-400 ${
              index === currentIndex
                ? "bg-[#a88a5f] scale-125 shadow-md"
                : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

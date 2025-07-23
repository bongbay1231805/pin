import {useEffect, useState, useRef} from 'react';


type Props = {
  slides: any [];
};

export default function SliderComponent({ slides }: Props) {
  const slideData = slides.map((item: any) => {
    return {
      image: `https://admin.pigroup.vn/storage/${item[0].value}`,
      caption: item?.[1]?.value ?? ''
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
      transform: `translateX(${offset * 64}%) scale(${isCenter ? 1 : 0.8})`,
      zIndex: isCenter ? 20 : 10 - Math.abs(offset),
      opacity: isCenter ? 1 : 0.4,
      filter: isCenter ? "blur(0px)" : "blur(4px)",
    };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-white overflow-hidden">
      <div
        className="relative flex items-center justify-center w-full h-[350px] md:h-[550px]"
        onMouseEnter={() => clearInterval(autoPlayRef.current)}
        onMouseLeave={() => (autoPlayRef.current = setInterval(nextSlide, 5000))}
      >
        <button
          onClick={prevSlide}
          className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full z-30   hover:bg-opacity-75 transition-colors duration-200 focus:outline-none text-yellow-1 rounded-full"
          aria-label="Previous Slide"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>
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
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-gradient-to-t from-black/70 to-transparent rounded-b-xl md:p-6">
                  {/*<h3 className="text-sm font-semibold tracking-widest uppercase drop-shadow-lg md:text-base">*/}
                  {/*  {data.caption}*/}
                  {/*</h3>*/}
                  <h4
                    className="text-[16px] font-semibold text-center text-white uppercase">{data.caption}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full z-30   hover:bg-opacity-75 transition-colors duration-200 focus:outline-none text-yellow-1 rounded-full"
          aria-label="Next Slide"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
        </button>
      </div>

      <div className="z-30 flex justify-center mt-12 space-x-4">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 hover:bg-gray-400 ${
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

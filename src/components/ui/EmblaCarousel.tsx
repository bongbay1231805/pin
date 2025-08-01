import React from 'react';
import {EmblaOptionsType} from 'embla-carousel';
// import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './emblaCarousel.module.css';
import Link from 'next/link';
import Image from 'next/image';
type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
};
const EmblaCarousel: React.FC<PropType> = (props) => {
  const {slides, options} = props;
  // const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white" // Kích thước và màu sắc của icon
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
      />
    </svg>
  );

  return (
    <section className={`bg-blue-1 rounded-[16px] ${styles.embla}`}>
      <div className={`${styles.embla__viewport}`} ref={emblaRef}>
        <div
          className={`pl-[80px] sm:pl-[100px] pr-[20px] sm:pr-[40px] h-[120px] sm:h-[110px] 2xl:h-[150px] ${styles.embla__container}`}
        >
          
          {slides.map((slide, index) => (
            <div
              className="relative min-h-[100%] flex flex-col justify-center"
              key={index}
            >
              <h3 className="sm:text-[22px] text-[18px] 2xl:text-[35px] font-bold text-yellow-1 uppercase reveal-text">
                {slide[0].value}
              </h3>
              <p className="sm:text-[16px] text-[14px]  2xl:text-[28px] text-gray-2 font-medium uppercase reveal-text">
                {slide[1].value}
              </p>


              {/* { <Link
                href={slide[3].value}
                className="mt-[10px] md:mt-[0] md:absolute text-[13px] 2xl:text-[17px] right-[5px] top-1/2 md:-translate-y-1/2 flex items-center border-text-white border-[1px] justify-center text-white font-semibold px-[20px] w-[138px] 2xl:w-[170px] h-[30px] hover:border-yellow-1 hover:text-yellow-1 reveal-text"
              >
                <span className="uppercase">{slide[2].value}</span>
              </Link> } */}

              <Link
                href={slide[3].value || "javascript:void(0);"}
                target={slide[3].value ? "_blank" : ""}
                className={`reveal-text flex items-center justify-center transition-all duration-300 ease-in-out    absolute bottom-2 -right-1 w-12 h-12        
                  md:absolute
                  md: text-[13px] md:right-[60px] md:top-1/2 md:-translate-y-1/2 md:flex md:items-center md:border-text-white md:border-[1px] md:justify-center md:text-white md:font-semibold md:w-[138px] md:h-[30px] md:hover:border-yellow-1 md:hover:text-yellow-1
                `}
                // target="_blank" // Add this attribute
                rel="noopener noreferrer" // Add this attribute for security
              >
                {/* Chữ này sẽ ẨN trên mobile và HIỆN trên desktop */}
                <span className="uppercase hidden md:inline">
                  {slide[2].value}
                </span>

                {/* Icon này sẽ HIỆN trên mobile và ẨN trên desktop */}
                <div className="md:hidden animate-arrow-pulse">
                  <Image src="/right-arrow.svg" width={15} height={15} alt="Social" />
                </div>
              </Link>

              
            </div>
          ))}
        </div>
      </div>
      <div className={`left-[25px] sm:left-[40px] mt-[1px] ${styles.embla__controls}`}>
        <div className={`${styles.embla__buttons}`}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};
export default EmblaCarousel;


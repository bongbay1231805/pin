import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
// import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import Autoplay from "embla-carousel-autoplay";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import styles from "./emblaCarousel.module.css";
import Link from 'next/link'
import Image from 'next/image';
type PropType = {
  slides: any[]
  options?: EmblaOptionsType
}
const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  // const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)
  return (
    <section className={`bg-blue-1 rounded-[20px] ${styles.embla}`}>
      <div className={`${styles.embla__viewport}`} ref={emblaRef}>
        <div className={`pl-[100px] sm:pl-[189px] h-[160px] ${styles.embla__container}`}>
          {slides.map((slide, index) => (
            <div className='relative min-h-[100%] flex flex-col justify-evenly' key={index}>
              <h3 className="text-size-25 2xl:text-size-35 font-bold text-yellow-1 uppercase reveal-text">{slide.title}</h3>
              <p className="text-[18px] 2xl:text-size-25 text-gray-2 font-medium uppercase reveal-text">{slide.description}</p>
              <Link href={slide.link} className="
              md:absolute  
              text-size-14 2xl:text-size-17
              right-[60px]  top-1/2 md:-translate-y-1/2 
              flex items-center border-text-white border-[1px] 
              justify-center text-white font-semibold md:w-[168px] w-[149px] h-[33px] 
              md:h-[35px] hover:border-yellow-1 
              hover:text-yellow-1 reveal-text">
                <span className='uppercase'>Xem chi tiết</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={`left-[40px] sm:left-[86px] mt-[3px] ${styles.embla__controls}`}>
        <div className={`${styles.embla__buttons}`}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}
export default EmblaCarousel

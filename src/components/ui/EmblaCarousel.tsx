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
  const [emblaRef, emblaApi] = useEmblaCarousel(options,[Autoplay()]);
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
        <div className={`pl-[189px] h-[130px] ${styles.embla__container}`}>
          {slides.map((slide, index) => (
            <div className='relative min-h-[100%] flex flex-col justify-center lg:block' key={index}>
              <h3 className="sm:text-size-25 md:text-size-30 lg:mt-[20px] lg:text-size-35 font-bold text-yellow-1 uppercase">{slide.title}</h3>
              <p className="sm:text-size-17 md:text-size-20 lg:text-size-25 text-gray-2 font-medium uppercase">{slide.description}</p>
              <Link href={slide.link} className="hvr-bounce-to-right absolute [&>span]:hidden sm:[&>span]:block sm:[&>img]:hidden right-[60px]  md:top-1/2 -translate-y-1/2 flex items-center border-text-white border-[1px] justify-center text-white font-semibold w-[168px] h-[35px] hover:border-yellow-1">
                <span className='uppercase'>Xem chi tiết</span>
                <Image width={20} height={20}  className='w-[40px]' src="/readmore.svg" alt="readmore" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={`left-[86px] mt-[3px] ${styles.embla__controls}`}>
        <div className={`${styles.embla__buttons}`}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}
export default EmblaCarousel

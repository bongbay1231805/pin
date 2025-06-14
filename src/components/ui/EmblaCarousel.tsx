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
    <section className={`bg-blue-1 rounded-[16px] ${styles.embla}`}>
      <div className={`${styles.embla__viewport}`} ref={emblaRef}>
        <div className={`pl-[172px] h-[100px] 2xl:h-[150px] ${styles.embla__container}`}>
          {slides.map((slide, index) => (
            <div className='relative min-h-[100%] flex flex-col' key={index}>
              <h3 className="text-size-25 2xl:text-size-35 mt-[17px] mb-[1px] 2xl:mt-[30px] font-bold text-yellow-1 uppercase reveal-text">{slide[0].value}</h3>
              <p className="text-[18px] 2xl:text-size-25 text-gray-2 font-medium uppercase reveal-text">{slide[1].value}</p>
              <Link href={slide[3].value} className="
              md:absolute  
              text-[13px] 2xl:text-[17px]
              right-[60px]  top-1/2 md:-translate-y-1/2 
              flex items-center border-text-white border-[1px] 
              justify-center text-white font-semibold w-[138px] h-[30px] 
              hover:border-yellow-1 
              hover:text-yellow-1 reveal-text">
                <span className='uppercase'>{slide[2].value}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={`left-[75px] mt-[1px] ${styles.embla__controls}`}>
        <div className={`${styles.embla__buttons}`}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}
export default EmblaCarousel

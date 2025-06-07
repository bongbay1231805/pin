import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
// import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import Autoplay from "embla-carousel-autoplay";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtonsCenter'
import useEmblaCarousel from 'embla-carousel-react'
import styles from "./emblaCarouselCenter.module.css";
import Link from 'next/link'
import Image from 'next/image';
type PropType = {
  slides: any[]
  options?: EmblaOptionsType
}
const EmblaCarouselCenter: React.FC<PropType> = (props) => {
  const { slides, options } = props
  // const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)
  return (
    <section className={`relative mx-auto max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px] ${styles.embla}`}>
      <div className={`${styles.embla__viewport}`} ref={emblaRef}>
        <div className={` ${styles.embla__container}`}>
          {slides.map((slide, index) => (
            <div className={`relative w-[60%] flex flex-col justify-center ${styles.embla__slide}`} key={index}>
              <Image src={slide.image}  width={531} height={435} alt="image" />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.embla__controls}`}>
        <div className={`${styles.embla__buttons}`}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}
export default EmblaCarouselCenter

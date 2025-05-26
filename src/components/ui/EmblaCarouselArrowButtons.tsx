import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import styles from "./emblaCarousel.module.css";
import { EmblaCarouselType } from 'embla-carousel'
type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}
export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])
  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])
  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])
  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}
type PropType = ComponentPropsWithRef<'button'>
export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props
  return (
    <button
      className={`w-[20px] h-[20px] sm:w-[35px] sm:h-[35px] ${styles.embla__button}`}
      type="button"
      {...restProps}
    >
      <svg className='hover:bg-yellow-1 rounded-full text-white hover:[&>g>circle]:text-yellow-1' width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2046_1260)">
          <circle cx="17.5" cy="17.5" r="17" transform="rotate(90 17.5 17.5)" stroke="currentColor" />
          <path d="M21.6379 16.5948C21.8284 16.7948 22.1449 16.8025 22.3448 16.6121C22.5448 16.4216 22.5525 16.1051 22.3621 15.9052L21.6379 16.5948ZM17.3621 10.6552C17.1716 10.4552 16.8551 10.4475 16.6552 10.6379C16.4552 10.8284 16.4475 11.1449 16.6379 11.3448L17.3621 10.6552ZM17.3621 11.3448C17.5525 11.1449 17.5448 10.8284 17.3448 10.6379C17.1449 10.4475 16.8284 10.4552 16.6379 10.6552L17.3621 11.3448ZM11.6379 15.9052C11.4475 16.1051 11.4552 16.4216 11.6552 16.6121C11.8551 16.8025 12.1716 16.7948 12.3621 16.5948L11.6379 15.9052ZM17.5 11C17.5 10.7239 17.2761 10.5 17 10.5C16.7239 10.5 16.5 10.7239 16.5 11H17.5ZM16.5 25C16.5 25.2761 16.7239 25.5 17 25.5C17.2761 25.5 17.5 25.2761 17.5 25H16.5ZM22 16.25L22.3621 15.9052L17.3621 10.6552L17 11L16.6379 11.3448L21.6379 16.5948L22 16.25ZM17 11L16.6379 10.6552L11.6379 15.9052L12 16.25L12.3621 16.5948L17.3621 11.3448L17 11ZM17 11H16.5V25H17H17.5V11H17Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_2046_1260">
            <rect width="35" height="35" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {children}
    </button>
  )
}
export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props
  return (
    <button
      className={`w-[20px] h-[20px] sm:w-[35px] sm:h-[35px] ${styles.embla__button}`}
      type="button"
      {...restProps}
    >
      <svg className='hover:bg-yellow-1 rounded-full text-white hover:[&>g>circle]:text-yellow-1' width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2046_1260)">
          <circle cx="17.5" cy="17.5" r="17" transform="rotate(90 17.5 17.5)" stroke="currentColor" />
          <path d="M12.3621 18.4052C12.1716 18.2052 11.8551 18.1975 11.6552 18.3879C11.4552 18.5784 11.4475 18.8949 11.6379 19.0948L12.3621 18.4052ZM16.6379 24.3448C16.8284 24.5448 17.1449 24.5525 17.3448 24.3621C17.5448 24.1716 17.5525 23.8551 17.3621 23.6552L16.6379 24.3448ZM16.6379 23.6552C16.4475 23.8551 16.4552 24.1716 16.6552 24.3621C16.8551 24.5525 17.1716 24.5448 17.3621 24.3448L16.6379 23.6552ZM22.3621 19.0948C22.5525 18.8949 22.5448 18.5784 22.3448 18.3879C22.1449 18.1975 21.8284 18.2052 21.6379 18.4052L22.3621 19.0948ZM16.5 24C16.5 24.2761 16.7239 24.5 17 24.5C17.2761 24.5 17.5 24.2761 17.5 24H16.5ZM17.5 10C17.5 9.72386 17.2761 9.5 17 9.5C16.7239 9.5 16.5 9.72386 16.5 10H17.5ZM12 18.75L11.6379 19.0948L16.6379 24.3448L17 24L17.3621 23.6552L12.3621 18.4052L12 18.75ZM17 24L17.3621 24.3448L22.3621 19.0948L22 18.75L21.6379 18.4052L16.6379 23.6552L17 24ZM17 24H17.5V10H17H16.5V24H17Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_2046_1260">
            <rect width="35" height="35" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {children}
    </button>
  )
}

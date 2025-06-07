'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextCenter,
  CarouselPreviousCenter,
} from "@/components/ui/carousel"
import Image from "next/image";
const EmblaCarouselCenter = () => {
  const slides = [
    {
      image: "/fecosystem/detail/slider-center-1.png"
    },
    {
      image: "/fecosystem/detail/slider-center-2.png"
    },
    {
      image: "/fecosystem/detail/slider-center-3.png"
    },
    {
      image: "/fecosystem/detail/slider-center-1.png"
    },
    {
      image: "/fecosystem/detail/slider-center-2.png"
    },
    {
      image: "/fecosystem/detail/slider-center-3.png"
    }
  ];
  return (
    <section className={`relative mx-auto my-[50px] max-w-full md:max-w-[85%] 2xl:mb-[110px]  2xl:max-w-[1580px]`}>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="w-full items-center 2xl:h-[435px] -ml-0">
          {slides.map((event, index) => (
            <CarouselItem key={index} index={index} className={`basis-3/4 sm:basis-1/3 h-full`}>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="z-10 flex flex-wrap gap-[30px] items-center justify-center sliderstaff">
                  <Image  src={event.image} alt="event" width={630} height={435} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPreviousCenter variant="link" className="hidden md:inline-flex items-center justify-center absolute  left-[-20px] top-1/2 -translate-y-1/2" />
        <CarouselNextCenter variant="link" className="hidden md:inline-flex items-center justify-center absolute   right-[-20px] top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  )
}
export default EmblaCarouselCenter

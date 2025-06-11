'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextCenter,
  CarouselPreviousCenter,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
type EmblaCarouselCenterType = { image: string, title?: string }[];
interface EmblaCarouselCenterProps {
  slides: EmblaCarouselCenterType;
}
const EmblaCarouselCenter: React.FC<EmblaCarouselCenterProps> = ({ slides }) => {
  return (
    <section className={`relative mx-auto my-[50px] max-w-full md:max-w-[85%] 2xl:mb-[110px]  2xl:max-w-[1580px]`}>
      <Carousel
        plugins={
          [Autoplay()]
        }
        opts={{
          align: "center",
          loop: true,
          duration: 50
        }}
      >
        <CarouselContent className="w-full items-center 2xl:h-[435px] ml-0">
          {slides.map((event, index) => (
            <CarouselItem key={index} index={index} className={`basis-3/4 sm:basis-1/3 h-full sliderswrap`}>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="z-10 flex flex-wrap gap-[30px] items-center justify-center sliderstaff">
                  <Image className="rounded-[10px] overflow-hidden" src={event.image} alt="event" width={630} height={435} />
                  {event?.title ? (
                    <h3 className="absolute bottom-[80px] text-[16px] font-bold text-center uppercase text-white" dangerouslySetInnerHTML={{ __html: event.title }}></h3>
                  ) : null}
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

'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import Image from "next/image";
import Autoplay from 'embla-carousel-autoplay';
type EmblaCarouselCenterType = any[];
interface EmblaCarouselCenterProps {
  slides: EmblaCarouselCenterType;
}

const EmblaCarouselCenterPicity: React.FC<EmblaCarouselCenterProps> = ({slides}) => {
  // console.log(slides);
  const sliders = [
    {
      image: slides[1].image,
      title: slides[1].caption
    },
    {
      image: slides[2].image,
      title: slides[2].caption
    },
    {
      image: slides[0].image,
      title: slides[0].caption
    },
    {
      image: slides[1].image,
      title: slides[1].caption
    },
    {
      image: slides[2].image,
      title: slides[2].caption
    },
    {
      image: slides[0].image,
      title: slides[0].caption
    },
    {
      image: slides[1].image,
      title: slides[1].caption
    },
    {
      image: slides[2].image,
      title: slides[2].caption
    },
    {
      image: slides[0].image,
      title: slides[0].caption
    },
    {
      image: slides[1].image,
      title: slides[1].caption
    },
    {
      image: slides[2].image,
      title: slides[2].caption
    },
    {
      image: slides[0].image,
      title: slides[0].caption
    },
    {
      image: slides[1].image,
      title: slides[1].caption
    },
    {
      image: slides[2].image,
      title: slides[2].caption
    },
    {
      image: slides[0].image,
      title: slides[0].caption
    },
    {
      image: slides[1].image,
      title: slides[1].caption
    },
    {
      image: slides[2].image,
      title: slides[2].caption
    },
    {
      image: slides[0].image,
      title: slides[0].caption
    },
    {
      image: slides[1].image,
      title: slides[1].caption
    },
    {
      image: slides[2].image,
      title: slides[2].caption
    },
    {
      image: slides[0].image,
      title: slides[0].caption
    }
  ];
  return (
    <section className={`relative mx-auto md:my-[50px] max-w-full order-1 xl:order-0 2xl:max-w-[1645px]`}>
      <Carousel
        plugins={
          [Autoplay({
            delay: 2000, // Decrease this value to make it faster (e.g., 1500ms for 1.5 seconds)
          })]
        }
        opts={{
          align: "center",
          loop: true,
          watchDrag: false
        }}
      >
        <CarouselContent className="w-full items-center ml-0">
          {sliders.map((event, index) => (
            <CarouselItem key={index} index={index} className={`sm:basis-1/3 h-full [perspective:1200px] picitycenterwrap`}>
              <div className="relative flex flex-wrap items-center justify-center picitycenter transform rotate-y-[30deg] translate-z-[-30px]">
                <Image className="rounded-[10px]" src={event.image} alt="event" width={400} height={400} />
                <h3 className="absolute bottom-[20px] font-bold text-[16px] 2xl:text-[20px] text-center text-white uppercase opacity-0" dangerouslySetInnerHTML={{ __html: event.title }}></h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
export default EmblaCarouselCenterPicity

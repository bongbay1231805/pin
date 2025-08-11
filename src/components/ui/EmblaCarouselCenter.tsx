'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextCenter,
  CarouselPreviousCenter
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
type EmblaCarouselCenterType = any[];
interface EmblaCarouselCenterProps {
  slides: EmblaCarouselCenterType;
}
const EmblaCarouselCenter: React.FC<EmblaCarouselCenterProps> = ({slides}) => {
  return (
    <section
      className={`relative mx-auto  max-w-full md:max-w-[85%] 2xl:max-w-[1645px]`}
    >
      <Carousel
        plugins={[Autoplay()]}
        opts={{
          align: 'center',
          loop: true,
          duration: 111150,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="w-full items-center 2xl:h-[435px] ml-0">
          {slides.map((event: any, index) => (
            <CarouselItem
              key={index}
              index={index}
              className={`h-full sliderswrap`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
  <div className="z-10 flex flex-wrap gap-[30px] items-center justify-center sliderstaff">
    {/* Container cho Image và Gradient Overlay */}
    <div className="relative rounded-[10px] overflow-hidden">
      <Image
        src={`https://admin.pigroup.vn/storage/${event[0].value}`}
        alt="event"
        width={630}
        height={435}
        className="block" // Đảm bảo Image là block để không có khoảng trắng thừa
      />
      {/* Lớp phủ gradient đã điều chỉnh để mờ hơn */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent"
        // from-blue-900/50: Bắt đầu với màu xanh đậm với độ trong suốt 50%
        // (Bạn có thể thử blue-900/40, blue-900/30 để xem mức độ mờ nào phù hợp nhất)
        // via-transparent: trong suốt ở giữa
        // to-transparent: trong suốt ở trên
      ></div>
    </div>

    {!!event[1] && event[1].value ? (
      <h3
        className="absolute bottom-[10px] 2xl:bottom-[50px] text-[10px] px-[20px] font-extrabold text-center uppercase text-white z-20"
        dangerouslySetInnerHTML={{ __html: event[1].value }}
      ></h3>
    ) : null}
  </div>
</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPreviousCenter
          variant="link"
          className="hidden md:inline-flex items-center justify-center absolute  left-[-40px] top-1/2 -translate-y-1/2"
        />
        <CarouselNextCenter
          variant="link"
          className="hidden md:inline-flex items-center justify-center absolute   right-[-40px] top-1/2 -translate-y-1/2"
        />
      </Carousel>
    </section>
  );
};
export default EmblaCarouselCenter;


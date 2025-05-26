'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export function Timeline() {
  const timelineEvents = [
    {
      year: "2016",
      description1: "Hoàn tất M&A: <br/> Công ty TNHH MTV Đầu tư <br/> Phát triển <strong>Gia Cư</strong> và <br/> Công ty CP Địa ốc <strong>Phương Đông</strong>",
      description2: "Thành lập Công ty <br/> <strong>CP ECOE Việt Nam</strong>",
    },
    {
      year: "2017",
      description1: "Thành lập Công ty CP <br/> <strong>Đầu tư - Xây dựng Winbuild</strong>",
      description2: "M&A thành công <br/> <strong>Công ty CP Đông Quang</strong>",
    },
    {
      year: "2015",
      description1: "Thành lập Công ty CP <br/> Tư vấn Thiết kế Xây dựng",
      description2: "<strong>Ngôi Nhà Thông Minh</strong>",
    },
    {
      year: "2016",
      description1: "Hoàn tất M&A: <br/> Công ty TNHH MTV Đầu tư <br/> Phát triển <strong>Gia Cư</strong> và <br/> Công ty CP Địa ốc <strong>Phương Đông</strong>",
      description2: "Thành lập Công ty <br/> <strong>CP ECOE Việt Nam</strong>",
    },
    {
      year: "2017",
      description1: "Thành lập Công ty CP <br/> <strong>Đầu tư - Xây dựng Winbuild</strong>",
      description2: "M&A thành công <br/> <strong>Công ty CP Đông Quang</strong>",
    },
    {
      year: "2015",
      description1: "Thành lập Công ty CP <br/> Tư vấn Thiết kế Xây dựng",
      description2: "<strong>Ngôi Nhà Thông Minh</strong>",
    }
  ];
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-[1582px] px-[10px]">
        <h2 className="text-[40px] text-blue-1 font-bold text-center mb-12">LỊCH SỬ HÌNH THÀNH</h2>
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="mx-auto max-w-[1156px]"
        >
          <CarouselContent className="w-full h-[450px]">
            {timelineEvents.map((event, index) => (
              <CarouselItem key={index} index={index} className={`md:basis-1/3 h-full carouselitemcenter`}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="z-10 flex flex-wrap gap-[30px] items-center justify-center">
                    <div className="z-1 timeline-number absolute px-8 top-[40px] left-1/2 -translate-x-1/2 text-[40px] font-semibold">{event.year}</div>
                    <p className="text-center text-[16px] w-full" dangerouslySetInnerHTML={{ __html: event.description1 }}></p>
                    <p className="text-center text-[16px] w-full" dangerouslySetInnerHTML={{ __html: event.description2 }}></p>
                  </div>
                  <svg className="absolute left-1/2 top-1/2 -translate-1/2 " width="100%" height="100%" viewBox="0 0 361 361" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="fill-yellow-1" cx="180.5" cy="180.5" r="180" stroke="#C48C5E" />
                  </svg>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="link" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2" />
          <CarouselNext variant="link" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  )
}
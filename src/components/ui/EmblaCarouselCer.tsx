// components/EmblaCarousel.tsx
'use client';

import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel'; // Import type cho EmblaCarouselType

interface EmblaCarouselProps {
  imageUrls: string[];
  openPopup: (src: string) => void;
}

const EmblaCarouselCer: React.FC<EmblaCarouselProps> = ({ imageUrls, openPopup }) => {
  // Cấu hình Embla. Các options này sẽ giúp bạn kiểm soát hành vi của carousel.
  // Ví dụ: loop (cuộn vô hạn), align (căn chỉnh slide), contain (ngăn kéo quá giới hạn)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // Cuộn vô hạn
    align: 'start', // Căn chỉnh slide vào đầu viewport
    // Các option khác bạn có thể thêm:
    // dragFree: true, // Kéo tự do, không snap vào slide
    // containScroll: 'trimSnaps', // Ngăn cuộn quá giới hạn (có thể không cần nếu dùng loop)
  });

  // Hàm để điều hướng đến slide trước đó/tiếp theo (nếu bạn muốn thêm nút điều hướng)
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // useEffect để xử lý các event của Embla API nếu cần
  useEffect(() => {
    if (!emblaApi) return;

    // Ví dụ: Log khi slide thay đổi
    emblaApi.on('select', () => {
      console.log('Slide changed to:', emblaApi.selectedScrollSnap());
    });

    // Cleanup khi component unmount
    return () => {
      emblaApi.off('select', () => {}); // Xóa event listener
    };
  }, [emblaApi]);

  return (
    <div
      className="embla relative overflow-hidden"
      // Áp dụng padding an toàn vào đây để đảm bảo nội dung không bị cắt bởi tai thỏ/thanh điều hướng
      // Đây là nơi bạn thêm các class Tailwind cho safe-area-inset
      // Ví dụ: pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] ...
      // Đối với iPhone Pro Max, đây là nơi quan trọng.
      // Dựa trên code trước đó, tôi sẽ thêm vào đây:
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingRight: 'env(safe-area-inset-right)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex gap-[15px] h-[310px] sm:h-[250px] px-[30px] pb-2">
          {imageUrls.map((src: string, index: number) => (
            <div
              className="embla__slide relative flex-none"
              key={index}
              // Định nghĩa kích thước cho slide. Embla sẽ tính toán phần còn lại.
              // w-[calc(100%-45px)] vẫn ổn nếu bạn muốn 1 slide/view trên mobile.
              // Hoặc bạn có thể dùng CSS để kiểm soát chiều rộng của slide.
              style={{
                flex: '0 0 calc(100% - 45px)', // 1 slide trên mobile với padding/gap
                minWidth: '0', // Quan trọng cho flex item khi dùng Embla
              }}
            >
              <div
                // Đây là div bao bọc Image để giữ tỷ lệ khung hình
                className="
                  relative
                  aspect-w-16 aspect-h-9
                  h-full // Quan trọng: Đảm bảo div này có chiều cao đầy đủ
                  bg-[#ECF5FA]/30 border-[25px] border-[#ECF5FA]/30 rounded-[5px]
                  grid items-center justify-center
                "
              >
                <Image
                  onClick={() => openPopup(src)}
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill // Ảnh lấp đầy div cha
                  style={{ objectFit: 'cover' }} // Đảm bảo ảnh không bị méo, cắt phần thừa
                  className="rounded-[5px]" // Áp dụng bo tròn góc cho ảnh
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bạn có thể thêm các nút điều hướng ở đây nếu muốn */}
      {/*
      <button className="embla__prev" onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla__next" onClick={scrollNext}>
        Next
      </button>
      */}
    </div>
  );
};

export default EmblaCarouselCer;
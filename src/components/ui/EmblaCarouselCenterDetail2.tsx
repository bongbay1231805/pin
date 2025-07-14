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
import React, { useState, useEffect, useCallback } from 'react';
import ImagePopup from '@/components/ui/ImagePopup'; // Import ImagePopup

type EmblaCarouselCenterType = any[];
interface EmblaCarouselCenterProps {
  slides: EmblaCarouselCenterType;
}

const EmblaCarouselCenterDetail2: React.FC<EmblaCarouselCenterProps> = ({slides}) => {
  const [emblaMainApi, setEmblaMainApi] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // --- TRẠNG THÁI VÀ HÀM CHO POPUP ---
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopupImageSrc, setCurrentPopupImageSrc] = useState('');

  const openImagePopup = (src: string) => {
    setCurrentPopupImageSrc(src);
    setShowPopup(true);
  };

  const closeImagePopup = () => {
    setShowPopup(false);
    setCurrentPopupImageSrc('');
  };
  // ---------------------------------

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaMainApi) return;

    onSelect(emblaMainApi);
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);

    return () => {
      emblaMainApi.off('select', onSelect);
      emblaMainApi.off('reInit', onSelect);
    };
  }, [emblaMainApi, onSelect]);

  return (
    <section
      className={`relative mx-auto max-w-[85%]`}
    >
      <Carousel
        plugins={[Autoplay({ delay: 20000, stopOnInteraction: false, stopOnMouseEnter: true })]}
        opts={{
          align: 'center',
          loop: true,
          duration: 50,
          slidesToScroll: 1,
        }}
        setApi={setEmblaMainApi}
      >
        <CarouselContent className="w-full items-center 2xl:h-[435px] ml-0">
          {slides.map((event: any, index) => {
            const isSelected = index === selectedIndex;
            const imageUrl = `https://admin.pigroup.vn/storage/${event[0].value}`; // Lấy URL ảnh

            return (
              <CarouselItem
                key={index}
                index={index}
                className={`h-full sliderswrap ${
                  isSelected ? 'is-selected' : 'is-not-selected'
                }`}
              >
                <div className="relative swap-item w-full h-full flex items-center justify-center">
                  <div className="z-10 flex flex-wrap gap-[30px] items-center justify-center sliderstaff">
                    <Image
                      className={`rounded-[10px] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer
                        ${isSelected ? 'scale-120' : 'scale-80'} `}
                      src={imageUrl} // Sử dụng imageUrl
                      alt="event"
                      width={630}
                      height={435}
                      onClick={() => openImagePopup(imageUrl)} // Thêm onClick để mở popup
                    />
                    {!!event[1] && event[1].value ? (
                      <h3
                        className="absolute bottom-[20px] text-[13px] font-bold text-center uppercase text-white"
                        dangerouslySetInnerHTML={{__html: event[1].value}}
                      ></h3>
                    ) : null}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPreviousCenter
          variant="link"
          className="hidden md:inline-flex items-center justify-center absolute left-[0px] top-1/2 -translate-y-1/2"
        />
        <CarouselNextCenter
          variant="link"
          className="hidden md:inline-flex items-center justify-center absolute right-[0px] top-1/2 -translate-y-1/2"
        />
      </Carousel>

      {/* RENDER IMAGEPOPUP CÓ ĐIỀU KIỆN */}
      {showPopup && (
        <ImagePopup src={currentPopupImageSrc} onClose={closeImagePopup} />
      )}
    </section>
  );
};

export default EmblaCarouselCenterDetail2;
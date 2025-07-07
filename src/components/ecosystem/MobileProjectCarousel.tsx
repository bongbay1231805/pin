// components/MasonryGrid/MobileProjectCarousel.tsx
'use client';
import React, {useState, useEffect} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { routeLocales } from '@/routes';

interface Project {
  [index: number]: {value: string};
}

interface MobileProjectCarouselProps {
  headerItem?: Project;
  galleryItems: Project[];
}

export const MobileProjectCarousel: React.FC<MobileProjectCarouselProps> = ({
  headerItem,
  galleryItems
}) => {
  // --- THAY ĐỔI 1: Cấu hình Embla để căn giữa ---
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center', // Yêu cầu Embla căn slide active vào giữa
    loop: true,
    containScroll: 'trimSnaps'
  });
  const currentLocale = useLocale();

  const ecosystemUrl: any = {
      ['https://pigroup.tqdesign.vn/vi/ecosystem/investment-development']: routeLocales[currentLocale]['investmentDevelopment'],
      ['https://pigroup.tqdesign.vn/vi/ecosystem/real-estate-services']: routeLocales[currentLocale]['realEstateServices'],
      ['https://pigroup.tqdesign.vn/vi/ecosystem/management-operation']: routeLocales[currentLocale]['managementOperation'],
    };

  // --- THAY ĐỔI 2: Thêm state để biết slide nào đang active ---
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Lắng nghe sự kiện của Embla để cập nhật state
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    // Chạy lần đầu để có state đúng
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="mb-10">
      {/* Phần Header: Giữ nguyên */}
      {headerItem && (
        <Link href={headerItem[3]?.value ? ecosystemUrl[headerItem[3]?.value] : '#'}>
          <div className="ml-4 mb-4 px-4 text-justify">
            <h3 className="text-[19px] font-semibold text-blue-1 uppercase">
              {headerItem[0]?.value}
            </h3>
            <p className="text-gray-6 mt-[10px] mb-[12px] text-[13px]">
              {headerItem[1]?.value}
            </p>
            <span className="inline-flex items-center justify-center text-yellow-1 uppercase font-semibold w-[116px] h-[28px] text-[12px] border border-yellow-1 hover:bg-yellow-1 hover:text-white transition-colors duration-300">
              {headerItem[2]?.value}
            </span>
          </div>
        </Link>
      )}

      {/* Phần Carousel: Cập nhật lại toàn bộ cấu trúc và class */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {galleryItems.map((item, index) => {
            const isActive = index === selectedIndex;
            return (
              // --- THAY ĐỔI 3: Cấu trúc slide item ---
              <div
                key={index}
                className="flex-none relative"
                style={{flexBasis: '70%'}} // Slide chính chiếm 65%
              >
                <div
                  className={`
                    transition-all duration-300 ease-out
                    ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}
                  `}
                >
                  <Link href="#">
                    <div className="group block relative w-full h-auto aspect-[16/9] overflow-hidden rounded-lg shadow-md">
                      {item[4]?.value && (
                        <Image
                          src={`https://admin.pigroup.tqdesign.vn/storage/${item[4].value}`}
                          alt={item[0]?.value || 'Project Image'}
                          fill
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h4 className="text-white text-[13px] font-bold line-clamp-2">
                          {item[0]?.value}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

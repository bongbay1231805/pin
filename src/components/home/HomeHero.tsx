'use client';
import Image from 'next/image'
import lightImage from "../../../public/fhome/herocity.jpg";
import { useEffect, useState } from 'react';
type HeroProps = {
  onScrollToDigitalCity: () => void;
};
export default function HomeHero({ onScrollToDigitalCity }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }, []);
  const videoId = "0EJIjmIt7Bc";
  return (
    <>
      <div style={{ position: 'relative', width: '100vw', height: '1080px', maxHeight: '100%' }}>
        {/* Ảnh nhẹ hiển thị ban đầu */}
        {!isLoaded && (
          <Image
            src={lightImage.src}
            alt="Placeholder"
            fill // Quan trọng: fill để ảnh lấp đầy phần tử cha
            // Các class Tailwind cho hiệu ứng và hiển thị
            className="transition-opacity duration-300 ease-in-out opacity-100"
          // Nếu bạn muốn blur ban đầu, hãy sử dụng placeholder="blur" và blurDataURL
          // placeholder="blur"
          // blurDataURL={lightImage.src} // Hoặc một base64 string của ảnh mờ
          />
        )}
        <iframe
          width="100%" height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&disablekb=1&rel=0`}
          allow="autoplay; fullscreen"
          allowFullScreen
          className={`pointer-events-none ${isLoaded ? 1 : 0}`}
        ></iframe>
      </div>
      <div onClick={onScrollToDigitalCity} className="font-semibold text-[18px] absolute bottom-20 left-1/2 -translate-x-1/2 flex justify-center flex-col items-center text-white uppercase gap-[15px]">
        <Image
          src="/scroll.svg"
          alt="Modern city skyline"
          width={21}
          height={35}
        />
        <span>cuộn xuống</span>
      </div>
    </>
  )
}
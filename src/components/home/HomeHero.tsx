'use client';
import Image from 'next/image'
import lightImage from "../../../public/fhome/PI-GROUP-CORP.png";
const heavyImage = "https://admin.pigroup.vn/storage/pi-group-corp-video.mp4";
// import lightImage from "../../../public/fhome/herocity.jpg";
// const heavyImage = "https://admin.pigroup.vn/storage/home.gif";
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
      <div
        className="relative w-screen h-[50vh] md:h-screen"
        style={{ width: '100vw' }}
      >
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
        {/* Video hoặc ảnh nặng hiển thị sau khi tải xong */}
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setIsLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <source src={heavyImage} type="video/mp4" />
        </video>

        {/* <img
          src={heavyImage}
          alt="Modern city"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        /> */}
      </div>
      <div onClick={onScrollToDigitalCity} className="font-[600] text-[13px] 2xl:text-[17px] cursor-pointer absolute bottom-[30px] left-1/2 -translate-x-1/2 flex justify-center flex-col items-center text-white uppercase gap-[15px]">
        <Image
          src="/scroll.svg"
          alt="Modern city skyline"
          width={16}
          height={30}
        />
        <span>cuộn xuống</span>
      </div>
    </>
  )
}
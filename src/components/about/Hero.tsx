'use client';
import {useScrollReveal} from '@/hooks/useScrollReveal';
import Image from 'next/image';
export function Hero({image}: {image?: string}) {
  useScrollReveal(); // dùng mặc định `.boxanimation`
  const imageSrc = image
    ? `https://admin.pigroup.tqdesign.vn/storage/${image}`
    : '/fabout/TT.png';

  return (
    <div className="relative h-[500px] lg:h-[100vh] w-full">
      <Image
        src={imageSrc}
        alt="Modern cityscape with high-rise buildings"
        fill
        className="object-cover"
        priority
      />
      {/* <div className="absolute inset-0 bg-black/20" /> */}
    </div>
  );
}

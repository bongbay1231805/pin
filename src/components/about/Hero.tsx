'use client';
import {useScrollReveal} from '@/hooks/useScrollReveal';
import Image from 'next/image';
export function Hero({image, bannermobile}: {image?: string, bannermobile?: string}) {
  useScrollReveal(); // dùng mặc định `.boxanimation`
  const imageSrc = image
    ? `https://admin.pigroup.vn/storage/${image}`
    : '/fabout/TT.png';

  const bannermobileSrc = bannermobile
    ? `https://admin.pigroup.vn/storage/${bannermobile}`
    : '/fabout/TT.png';

  console.log(bannermobile);

  return (
    <div className="relative h-[500px] lg:h-[100vh] w-full">
      <Image
        src={imageSrc}
        alt="Modern cityscape with high-rise buildings"
        fill
        className="object-cover hidden sm:block"
        priority
      />

      <Image
        src={bannermobileSrc}
        alt="Modern cityscape with high-rise buildings"
        fill
        className="object-cover  sm:hidden"
        priority
      />
      {/* <div className="absolute inset-0 bg-black/20" /> */}
    </div>
  );
}

'use client';
import Image from "next/image"
import BreadcrumbExample from "./BreadcrumbExample"
export function Hero() {
  return (
    <div className="relative h-[842px] w-full after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:w-full after:h-[260px]  after:bg-[linear-gradient(0deg,_#132D4C_8.93%,_rgba(32,_68,_111,_0)_100%)] after:opacity-70 after:pointer-events-none">
      <Image
        src="/fnews/post-1.png"
        alt="Modern cityscape with high-rise buildings"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute z-1 container m-auto md:max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px] px-[10px] left-1/2 -translate-x-1/2 bottom-[60px]">
        <BreadcrumbExample />
      </div>
    </div>
  )
}
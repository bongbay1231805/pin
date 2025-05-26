'use client';
import Image from "next/image"
export function Hero() {
  return (
    <div className="relative h-[600px] w-full">
      <Image
        src="/fabout/cityscape.jpg"
        alt="Modern cityscape with high-rise buildings"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
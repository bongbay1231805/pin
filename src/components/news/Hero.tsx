'use client';
import Image from "next/image"
import BreadcrumbExample from "./BreadcrumbExample"
import { useScrollReveal } from "@/hooks/useScrollReveal";
export function Hero({ post }: any) {
  useScrollReveal();
  return (
    <div className="relative h-[500px] lg:h-[100vh] w-full after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:w-full after:h-[260px]  after:bg-[linear-gradient(0deg,_#132D4C_8.93%,_rgba(32,_68,_111,_0)_100%)] after:opacity-70 after:pointer-events-none">
      {
        post.is_featured ? (
          <Image
            src="/fnews/post-1.png"
            alt="Modern cityscape with high-rise buildings"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="/fnews/post-1.png"
            alt="Modern cityscape with high-rise buildings"
            fill
            className="object-cover"
            priority
          />
        )
      }
      <div className="absolute z-1 container m-auto  max-w-[91.4%] 2xl:max-w-[91.4%] px-[10px] left-1/2 -translate-x-1/2 bottom-[56px]">
        <BreadcrumbExample />
      </div>
    </div>
  )
}
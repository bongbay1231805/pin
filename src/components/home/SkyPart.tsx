'use client';
// import { useState } from "react"
import EmblaCarousel from "@/components/ui/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel'
export default function SkyPart() {
  const slides = [
    {
      title: "Picity SKY PARK",
      description: "Đô thị số đại lộ Phạm Văn Đồng",
      link: "#"
    },
    {
      title: "Phát triển",
      description: "Đô thị số đại lộ Phạm Văn Đồng",
      link: "#"
    },
    {
      title: "Picity SKY PARK",
      description: "Đô thị số đại lộ Phạm Văn Đồng",
      link: "#"
    },
    {
      title: "Picity SKY PARK",
      description: "Đô thị số đại lộ Phạm Văn Đồng",
      link: "#"
    },
    {
      title: "Picity SKY PARK",
      description: "Đô thị số đại lộ Phạm Văn Đồng",
      link: "#"
    },
    {
      title: "Picity SKY PARK",
      description: "Đô thị số đại lộ Phạm Văn Đồng",
      link: "#"
    }
  ];
  const OPTIONS: EmblaOptionsType = { axis: 'y',loop: true }
  return (
    <div className="mx-auto max-w-[83%] 2xl:max-w-[1580px]">
      <EmblaCarousel slides={slides} options={OPTIONS} />
    </div>
  )
}
SkyPart.displayName = 'SkyPart';
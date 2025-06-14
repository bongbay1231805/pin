'use client';
// import { useState } from "react"
import EmblaCarousel from "@/components/ui/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel'
export default function SkyPart({ custom_fields }: any) {
  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return null; // Return null or throw the error, depending on your error handling preference
    }
  }
  const { slider } = custom_fields;
  const sliders = convertJsonStringToArrayOrObject(slider); 
  const OPTIONS: EmblaOptionsType = { axis: 'y', loop: true }
  return (
    <div className="mx-auto">
      <EmblaCarousel slides={sliders} options={OPTIONS} />
    </div>
  )
}
SkyPart.displayName = 'SkyPart';
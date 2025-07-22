// components/TimelineMobile.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollRefs } from '@/context/ScrollRefsContext';
import {Timeline} from '@/components/about/Timeline';
import {TimelineMobile} from '@/components/about/TimelineMobile';

export function TimelineSection({ custom_fields }: any) {
  const { threeRef } = useScrollRefs();
  
  return (
    <section
      ref={threeRef}
      className="boxanimation fade-in-up-medium mx-auto w-full px-[30px] md:px-0 md:max-w-[85%] 2xl:max-w-[1380px] bg-white timeline-carousel lg:py-16"
    >
      <div className="hidden sm:block tl-pc">
        <Timeline custom_fields={custom_fields} />
      </div>

      <div className="sm:hidden tl-mobile">
        <TimelineMobile custom_fields={custom_fields} />
      </div>
    </section>
  );
}
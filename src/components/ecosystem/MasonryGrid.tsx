'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
// Định nghĩa kiểu cho một phần tử ref
type ElementRef = React.RefObject<HTMLDivElement | null>;
interface GridConfig {
  containerRef: ElementRef;
  fixedElements: ElementRef[];
  expandableElements: ElementRef[];
}
const MasonryGrid = ({ custom_fields }: any) => {
  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return null; // Return null or throw the error, depending on your error handling preference
    }
  }
  const customfields = convertJsonStringToArrayOrObject(custom_fields);
  useScrollReveal(); // dùng mặc định `.boxanimation`
  const rows = [];
  // Refs cho từng grid container
  const grid1Ref = useRef<HTMLDivElement>(null);
  const grid2Ref = useRef<HTMLDivElement>(null);
  const grid3Ref = useRef<HTMLDivElement>(null);
  // Refs cho các phần tử con trong từng grid (tùy chỉnh cho các cố định m-1, m-8, m-9)
  // Grid 1
  const m1Ref = useRef<HTMLDivElement>(null); // Cố định
  const m2Ref = useRef<HTMLDivElement>(null);
  const m3Ref = useRef<HTMLDivElement>(null);
  const m4Ref = useRef<HTMLDivElement>(null);
  // Grid 2
  const m5Ref = useRef<HTMLDivElement>(null);
  const m6Ref = useRef<HTMLDivElement>(null);
  const m7Ref = useRef<HTMLDivElement>(null);
  const m8Ref = useRef<HTMLDivElement>(null); // Cố định
  // Grid 3
  const m9Ref = useRef<HTMLDivElement>(null); // Cố định
  const m10Ref = useRef<HTMLDivElement>(null);
  const m11Ref = useRef<HTMLDivElement>(null);
  const m12Ref = useRef<HTMLDivElement>(null);
  // Mảng chứa thông tin từng hàng để dễ quản lý logic
  const gridConfigs: GridConfig[] = [
    {
      containerRef: grid1Ref,
      fixedElements: [m1Ref], // m-1 cố định
      expandableElements: [m2Ref, m3Ref, m4Ref],
    },
    {
      containerRef: grid2Ref,
      fixedElements: [m8Ref], // m-8 cố định
      expandableElements: [m5Ref, m6Ref, m7Ref],
    },
    {
      containerRef: grid3Ref,
      fixedElements: [m9Ref], // m-9 cố định
      expandableElements: [m10Ref, m11Ref, m12Ref],
    },
  ];
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Chặn logic nếu là mobile
    const isDesktop = window.innerWidth >= 1280;
    if (!isDesktop) return;
    gridConfigs.forEach(config => {
      const { containerRef, fixedElements, expandableElements } = config;
      const container = containerRef.current;
      if (!container) return;
      const currentFixedElements = fixedElements.map(ref => ref.current).filter((el): el is HTMLDivElement => el !== null);
      const currentExpandableElements = expandableElements.map(ref => ref.current).filter((el): el is HTMLDivElement => el !== null);
      let lastHoveredSection: HTMLDivElement | null = null;
      const handleMouseEnter = (hoveredSection: HTMLDivElement) => {
        if (hoveredSection === lastHoveredSection) return;
        lastHoveredSection = hoveredSection;
        const containerWidth = container.offsetWidth;
        const fixedWidthSum = currentFixedElements.reduce((sum, el) => sum + el.offsetWidth, 0);
        const availableWidth = containerWidth - fixedWidthSum;
        const expandedRatio = 0.6;
        const expandedWidth = availableWidth * expandedRatio;
        const remainingCount = currentExpandableElements.length - 1;
        const collapsedWidth = remainingCount > 0 ? (availableWidth - expandedWidth) / remainingCount : 0;
        currentExpandableElements.forEach((s) => {
          const computedWidth = window.getComputedStyle(s).width;
          s.style.transition = 'none';
          s.style.width = computedWidth;
          s.offsetHeight;
          s.style.transition = 'width 0.5s ease-in-out';
          s.style.width = `${s === hoveredSection ? expandedWidth : collapsedWidth}px`;
        });
      };
      const handleMouseLeave = () => {
        lastHoveredSection = null;
        const containerWidth = container.offsetWidth;
        const fixedWidthSum = currentFixedElements.reduce((sum, el) => sum + el.offsetWidth, 0);
        const availableWidth = containerWidth - fixedWidthSum;
        const equalWidth = currentExpandableElements.length > 0 ? availableWidth / currentExpandableElements.length : 0;
        currentExpandableElements.forEach((s) => {
          const computedWidth = window.getComputedStyle(s).width;
          s.style.transition = 'none';
          s.style.width = computedWidth;
          s.offsetHeight;
          s.style.transition = 'width 0.5s ease-in-out';
          s.style.width = `${equalWidth}px`;
          setTimeout(() => {
            s.style.transition = '';
            s.style.width = '';
          }, 500);
        });
      };
      currentExpandableElements.forEach(section => {
        section.addEventListener('mouseenter', handleMouseEnter.bind(null, section));
        section.addEventListener('mouseleave', handleMouseLeave);
      });
      return () => {
        currentExpandableElements.forEach(section => {
          section.removeEventListener('mouseenter', handleMouseEnter.bind(null, section));
          section.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    });
  }, []);
  let j = 0;
  for (let i = 0; i < customfields.length; i += 4) {
    const rowItems = customfields.slice(i, i + 4);
    // Nếu là dòng 2 (phần tử 5–8): dùng grid-cols-[repeat(3,1fr)_45%]
    const isSpecialRow = i === 4;
    rows.push(
      <div
        key={i}
        ref={(i === 0) ? grid1Ref : (i === 4) ? grid2Ref : (i === 8) ? grid3Ref : null}
        className={`grid transition-all gap-x-[2px] mb-6 sm:mb-0 xl:h-[calc((100vh-106px)/3)] grid-cols-3 ${isSpecialRow ? "xl:grid-cols-[repeat(3,1fr)_42%]" : "xl:grid-cols-[42%_repeat(3,1fr)]"}`}
      >
        {rowItems.map((item: any, index: number) => {
          j++;
          return (
            <div key={item[0].field_item_id + index} ref={(i === 0 && index == 0) ? m1Ref : (i === 0 && index == 1) ? m2Ref : (i === 0 && index == 2) ? m3Ref : (i === 0 && index == 3) ? m4Ref : (i === 4 && index == 0) ? m5Ref : (i === 4 && index == 1) ? m6Ref : (i === 4 && index == 2) ? m7Ref : (i === 4 && index == 3) ? m8Ref : (i === 8 && index == 0) ? m9Ref : (i === 8 && index == 1) ? m10Ref : (i === 8 && index == 2) ? m11Ref : (i === 8 && index == 3) ? m12Ref : null} className={`group eco-item transition-all duration-[500ms] ease-in-out relative pt-[200px] xl:pt-[33.33%] overflow-hidden ecosystem-masonry-${j} ${index === 0 ? 'col-span-3 xl:col-span-1' : 'col-span-1'}`}>
              {item[4].value !== "" ? (
                <Image src={`https://admin.pigroup.tqdesign.vn/storage/${item[4].value}`} alt="masonry" fill className="object-cover justify-end" />
              ) : (
                null
              )}
              {item[0].value && item[4].value !== "" && (
                <h3 className="z-10 left-[25px] bottom-[8px] text-white absolute text-[18px] 2xl:text-[26px] font-semibold uppercase opacity-0 group-hover:opacity-100 duration-500">
                  {item[0].value}
                </h3>
              )}
              {item[0].value && item[3].value !== "" && (
                <Link
                  href={item[3].value}
                >
                  <div className={`absolute inset-0 bg-white flex items-center  ${index === 3 ? 'justify-end xl:pl-[100px]' : 'justify-center xl:pr-[100px]'} duration-300`}>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-[19px] 2xl:text-[25px] font-semibold text-blue-1 uppercase">
                        {item[0].value}
                      </h3>
                      <p className="text-gray-6 text-justify mt-[10px] mb-[12px] text-[13px] 2xl:text-[17px]">{item[1].value}</p>
                      <div className="flex items-center justify-center text-yellow-1 font-semibold w-[116px] h-[28px] text-[12px] 2xl:text-[16px] 2xl:w-[138px] 2xl:h-[35px] border border-yellow-1 hover:text-amber-50 hvr-bounce-to-right duration-300">
                        {item[2].value}
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )
        }
        )}
      </div>
    );
  }
  return <div className="xl:h-[calc(100vh-106px)] grid gap-y-[2px] overflow-hidden max-w-[85%] m-auto">{rows}</div>;
}
export default MasonryGrid;
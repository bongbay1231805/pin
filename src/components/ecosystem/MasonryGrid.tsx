'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
const items = [
  {
    id: 1,
    height: 320,
    title: "Đầu tư và phát triển dự án",
    description: "Sở hữu quỹ đất ngày càng mở rộng và tầm nhìn chiến lược, Pi Group khẳng định vị thế là nhà phát triển bất động sản cao cấp, kiến tạo cộng đồng văn minh, nâng tầm giá trị sống của người Việt theo tiêu chuẩn quốc tế.",
    link: "#",
    image: "/fecosystem/eco_01.jpg"
  },
  {
    id: 2,
    height: 320,
    title: "PICITY HIGH PARK",
    description: "",
    link: "",
    image: "/fecosystem/eco_01.jpg"
  },
  {
    id: 3,
    height: 320,
    title: "PICITY SKY PARK",
    description: "",
    link: "",
    image: "/fecosystem/eco_02.jpg"
  },
  {
    id: 4,
    height: 320,
    title: "PRIME MASTER",
    description: "",
    link: "",
    image: "/fecosystem/eco_03.jpg"
  },
  {
    id: 5,
    height: 320,
    title: "PHÂN PHỐI BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/eco_04.jpg"
  },
  {
    id: 6,
    height: 320,
    title: "QUẢN LÝ BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/eco_05.jpg"
  },
  {
    id: 7,
    height: 320,
    title: "TƯ VẤN HỖ TRỢ PHÁP LÝ",
    description: "",
    link: "",
    image: "/fecosystem/eco_06.jpg"
  },
  {
    id: 8,
    height: 320,
    title: "Dịch vụ Bất động sản",
    description: "Với sứ mệnh mang bất động sản thực đến đúng nhu cầu từng khách hàng, Pi Group cam kết đồng hành và đảm bảo thành công cho mọi giao dịch với dịch vụ uy tín, chuyên nghiệp.",
    link: "#",
    image: "/fecosystem/eco_04.jpg"
  },
  {
    id: 9,
    height: 320,
    title: "Quản lý và vận hành",
    description: "Cung cấp giải pháp toàn diện; quản lý và vận hành bất động sản với tiêu chí tận tâm, chất lượng, hiệu quả bằng việc ứng dụng công nghệ 4.0 hiện đại.",
    link: "#",
    image: "/fecosystem/eco_07.jpg"
  },
  {
    id: 10,
    height: 320,
    title: "TƯ VẤN KHAI THÁC BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/eco_07.jpg"
  },
  {
    id: 11,
    height: 320,
    title: "AN NINH - BẢO TRÌ KỸ THUẬT",
    description: "",
    link: "",
    image: "/fecosystem/eco_08.jpg"
  },
  {
    id: 12,
    height: 320,
    title: "CHĂM SÓC CẢNH QUAN",
    description: "",
    link: "",
    image: "/fecosystem/eco_09.jpg"
  }
];
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
    gridConfigs.forEach(config => {
      const { containerRef, fixedElements, expandableElements } = config;
      const container = containerRef.current;
      if (!container) return;
      // Lấy các phần tử DOM thực tế từ refs và đảm bảo chúng không phải null
      const currentFixedElements: HTMLDivElement[] = fixedElements.map(ref => ref.current).filter((el): el is HTMLDivElement => el !== null);
      const currentExpandableElements: HTMLDivElement[] = expandableElements.map(ref => ref.current).filter((el): el is HTMLDivElement => el !== null);
      let lastHoveredSection: HTMLDivElement | null = null;
      const handleMouseEnter = (hoveredSection: HTMLDivElement) => {
        if (hoveredSection === lastHoveredSection) return;
        lastHoveredSection = hoveredSection;
        const containerWidth = container.offsetWidth;
        const fixedWidthSum = currentFixedElements.reduce((sum, el) => sum + el.offsetWidth, 0);
        const availableWidth = containerWidth - fixedWidthSum;
        const expandedRatio = 0.6;
        const expandedWidth = availableWidth * expandedRatio;
        const collapsedWidth = (availableWidth - expandedWidth) / (currentExpandableElements.length - 1);
        currentExpandableElements.forEach((section) => {
          const isHovered = section === hoveredSection;
          const currentWidth = section.getBoundingClientRect().width;
          section.style.width = `${currentWidth}px`;
          requestAnimationFrame(() => {
            section.style.transition = 'width 0.5s ease-in-out';
            section.style.width = `${isHovered ? expandedWidth : collapsedWidth}px`;
          });
        });
      };
      const handleMouseLeave = () => {
        lastHoveredSection = null;
        const containerWidth = container.offsetWidth;
        const fixedWidthSum = currentFixedElements.reduce((sum, el) => sum + el.offsetWidth, 0);
        const availableWidth = containerWidth - fixedWidthSum;
        const equalWidth = availableWidth / currentExpandableElements.length;
        currentExpandableElements.forEach((section) => {
          const currentWidth = section.getBoundingClientRect().width;
          section.style.width = `${currentWidth}px`;
          requestAnimationFrame(() => {
            section.style.transition = 'width 0.5s ease-in-out';
            section.style.width = `${equalWidth}px`;
          });
        });
      };
      // Gắn sự kiện cho từng phần tử co giãn trong hàng này
      currentExpandableElements.forEach(section => {
        // Lưu tham chiếu đến hàm handler đã được bound để có thể gỡ bỏ chính xác
        // TypeScript yêu cầu một cách rõ ràng hơn để gắn hàm vào thuộc tính
        // Đây là một cách an toàn để xử lý sự kiện trong useEffect của React
        section.addEventListener('mouseenter', handleMouseEnter.bind(null, section));
        section.addEventListener('mouseleave', handleMouseLeave);
      });
      // Cleanup function cho useEffect: gỡ bỏ event listeners khi component unmount
      return () => {
        currentExpandableElements.forEach(section => {
          // Để gỡ bỏ event listener, cần tham chiếu chính xác đến hàm đã gắn.
          // Nếu dùng .bind() mà không lưu tham chiếu, việc gỡ bỏ sẽ khó khăn.
          // Cách tốt nhất là lưu tham chiếu hoặc sử dụng các hàm callback ổn định.
          // Với `handleMouseEnter.bind(null, section)`, bạn sẽ cần lưu tham chiếu bound đó.
          // Hoặc, bạn có thể định nghĩa hàm callback trong scope và truyền nó trực tiếp.
          section.removeEventListener('mouseenter', handleMouseEnter.bind(null, section)); // Sẽ không gỡ bỏ đúng nếu không phải cùng instance
          section.removeEventListener('mouseleave', handleMouseLeave); // Cái này có thể gỡ bỏ được
        });
      };
    });
  }, []); // Chạy một lần khi component mount
  let j = 0;
  for (let i = 0; i < customfields.length; i += 4) {
    const rowItems = customfields.slice(i, i + 4);
    // Nếu là dòng 2 (phần tử 5–8): dùng grid-cols-[repeat(3,1fr)_45%]
    const isSpecialRow = i === 4;
    rows.push(
      <div
        key={i}
        ref={(i === 0) ? grid1Ref : (i === 4) ? grid2Ref : (i === 8) ? grid3Ref : null}
        className={`grid transition-all gap-x-[2px] m-0 xl:h-[calc((100vh-106px)/3)] grid-cols-3 ${isSpecialRow ? "xl:grid-cols-[repeat(3,1fr)_42%]" : "xl:grid-cols-[42%_repeat(3,1fr)]"}`}
      >
        {rowItems.map((item: any, index: number) => {
          j++;
          console.log(item[4].value);
          return (
            <div key={item[0].field_item_id + index} ref={(i === 0 && index == 0) ? m1Ref : (i === 0 && index == 1) ? m2Ref : (i === 0 && index == 2) ? m3Ref : (i === 0 && index == 3) ? m4Ref : (i === 4 && index == 0) ? m5Ref : (i === 4 && index == 1) ? m6Ref : (i === 4 && index == 2) ? m7Ref : (i === 4 && index == 3) ? m8Ref : (i === 8 && index == 0) ? m9Ref : (i === 8 && index == 1) ? m10Ref : (i === 8 && index == 2) ? m11Ref : (i === 8 && index == 3) ? m12Ref : null} className={`group eco-item transition-all duration-[500ms] ease-in-out relative pt-[300px] xl:pt-[33.33%] overflow-hidden ecosystem-masonry-${j} ${index === 0 ? 'col-span-3 xl:col-span-1' : 'col-span-1'}`}>
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
  return <div className="xl:h-[calc(100vh-106px)] grid gap-y-[2px] overflow-hidden max-w-[95%] md:max-w-[85%] 2xl:max-w-[1580px] m-auto">{rows}</div>;
}
export default MasonryGrid;
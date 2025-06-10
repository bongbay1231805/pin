'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const items = [
  {
    id: 1,
    height: 320,
    title: "Đầu tư và phát triển dự án",
    description: "Sở hữu quỹ đất ngày càng mở rộng và sự am hiểu thị trường, Pi Group đầu tư phát triển đa dạng phân khúc, hướng đến xây dựng cộng đồng văn minh, nâng tầm giá trị sống của người Việt theo tiêu chuẩn quốc tế.",
    link: "#",
    image: "/fecosystem/masony-1.png"
  },
  {
    id: 2,
    height: 320,
    title: "PICITY HIGH PARK",
    description: "",
    link: "",
    image: "/fecosystem/masony-2.png"
  },
  {
    id: 3,
    height: 320,
    title: "PICITY SKY PARK",
    description: "",
    link: "",
    image: "/fecosystem/masony-3.png"
  },
  {
    id: 4,
    height: 320,
    title: "PICITY SKY PARK",
    description: "",
    link: "",
    image: "/fecosystem/masony-4.png"
  },
  {
    id: 5,
    height: 320,
    title: "PHÂN PHỐI BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/masony-5.png"
  },
  {
    id: 6,
    height: 320,
    title: "PHÂN PHỐI BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/masony-6.png"
  },
  {
    id: 7,
    height: 320,
    title: "PHÂN PHỐI BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/masony-7.png"
  },
  {
    id: 8,
    height: 320,
    title: "Dịch vụ bất động sản",
    description: "Dịch vụ tư vấn đầu tư chiến lược, giới thiệu sản phẩm chất lượng giúp nhà đầu tư tối ưu hóa lợi nhuận và đạt được mục tiêu tài chính bền vững.",
    link: "#",
    image: "/fecosystem/masony-8.png"
  },
  {
    id: 9,
    height: 320,
    title: "Quản lý và vận hành",
    description: "Cung cấp giải pháp quản lý vận hành tòa nhà chung cư bằng việc ứng dụng công nghệ 4.0 nhằm tối ưu hóa mọi quy trình, hỗ trợ khách hàng quản lý và vận hành bất động sản một cách đơn giản, tiện lợi và hiệu quả.",
    link: "#",
    image: "/fecosystem/masony-9.png"
  },
  {
    id: 10,
    height: 320,
    title: "TƯ VẤN KHAI THÁC BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/masony-10.png"
  },
  {
    id: 11,
    height: 320,
    title: "TƯ VẤN KHAI THÁC BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/masony-11.png"
  },
  {
    id: 12,
    height: 320,
    title: "TƯ VẤN KHAI THÁC BẤT ĐỘNG SẢN",
    description: "",
    link: "",
    image: "/fecosystem/masony-12.png"
  }
];
// Định nghĩa kiểu cho một phần tử ref
type ElementRef = React.RefObject<HTMLDivElement | null>;
interface GridConfig {
  containerRef: ElementRef;
  fixedElements: ElementRef[];
  expandableElements: ElementRef[];
}
const MasonryGrid: React.FC = () => {
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
      const handleMouseEnter = (hoveredSection: HTMLDivElement) => {
        const containerWidth = container.offsetWidth;
        // Tính tổng chiều rộng của các phần tử cố định trong hàng này
        const fixedWidthSum = currentFixedElements.reduce((sum, el) => sum + el.offsetWidth, 0);
        // Chiều rộng khả dụng cho các phần tử co giãn
        const availableWidth = containerWidth - fixedWidthSum;
        // Tỷ lệ mở rộng cho phần tử đang hover (ví dụ: 60% của không gian khả dụng còn lại)
        const expandedRatio = 0.6;
        const expandedWidth = availableWidth * expandedRatio;
        // Chiều rộng cho các phần tử co giãn còn lại (chia đều không gian còn lại)
        const remainingExpandableCount = currentExpandableElements.length - 1;
        const collapsedWidth = remainingExpandableCount > 0
          ? (availableWidth - expandedWidth) / remainingExpandableCount
          : 0; // Tránh chia cho 0 nếu chỉ còn 1 phần tử co giãn
        currentExpandableElements.forEach(s => {
          s.classList.remove('flex-grow'); // Loại bỏ flex-grow để kiểm soát width bằng style
          s.style.width = `${s === hoveredSection ? expandedWidth : collapsedWidth}px`;
        });
      };
      const handleMouseLeave = () => {
        currentExpandableElements.forEach(s => {
          s.style.width = ''; // Xóa style.width để reset
          s.classList.add('flex-grow'); // Thêm lại flex-grow để chia đều
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
  for (let i = 0; i < items.length; i += 4) {
    const rowItems = items.slice(i, i + 4);
    // Nếu là dòng 2 (phần tử 5–8): dùng grid-cols-[repeat(3,1fr)_45%]
    const isSpecialRow = i === 4;
    console.log(i)
    rows.push(
      <div
        key={i}
        ref={(i === 0) ? grid1Ref : (i === 4) ? grid2Ref : (i === 8) ? grid3Ref : null}
        className={`grid transition-all duration-1000 ease-in-out gap-x-[2px] m-0 xl:h-[calc((100vh-150px)/3)] grid-cols-3 ${isSpecialRow ? "xl:grid-cols-[repeat(3,1fr)_45%]" : "xl:grid-cols-[45%_repeat(3,1fr)]"}`}
      >
        {rowItems.map((item, index) => (
          <div key={item.id} ref={(i === 0 && index == 0) ? m1Ref : (i === 0 && index == 1) ? m2Ref : (i === 0 && index == 2) ? m3Ref : (i === 0 && index == 3) ? m4Ref : (i === 4 && index == 0) ? m5Ref : (i === 4 && index == 1) ? m6Ref : (i === 4 && index == 2) ? m7Ref : (i === 4 && index == 3) ? m8Ref : (i === 8 && index == 0) ? m9Ref : (i === 8 && index == 1) ? m10Ref : (i === 8 && index == 2) ? m11Ref : (i === 8 && index == 3) ? m12Ref : null} className={`group transition-all duration-1000 ease-in-out  relative pt-[300px] xl:pt-[33.33%] overflow-hidden ecosystem-masonry-${item.id} ${index === 0 ? 'col-span-3 xl:col-span-1' : 'col-span-1'}`}>
            <Image src={item.image} alt="masonry" fill className="object-cover justify-end" />
            {item.title && !item.link && (
              <h3 className="z-10 left-2 text-white absolute text-[26px] font-semibold uppercase opacity-0 group-hover:opacity-100 duration-1000">
                {item.title}
              </h3>
            )}
            {item.title && item.link && (
              <div className={`absolute inset-0 bg-white flex items-center  ${index === 3 ? 'justify-end xl:pl-[120px]' : 'justify-center xl:pr-[120px]'} duration-300`}>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[26px] font-semibold text-blue-1 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-gray-5 my-[10px] tex-[16px]">{item.description}</p>
                  <Link
                    href={item.link}
                    className="flex items-center justify-center text-yellow-1 font-semibold w-[138px] h-[35px] border border-yellow-1 hover:text-amber-50 hvr-bounce-to-right duration-300"
                  >
                    Xem thêm
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  return <div className="xl:h-[calc(100vh-150px)] overflow-hidden space-y-2 max-w-[91.4%] m-auto">{rows}</div>;
}
export default MasonryGrid;
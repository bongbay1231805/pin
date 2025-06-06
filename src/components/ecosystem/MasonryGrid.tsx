'use client';
import React, { useState, useEffect } from 'react';
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
    title: "",
    description: "",
    link: "#",
    image: "/fecosystem/masony-2.png"
  },
  {
    id: 3,
    height: 320,
    title: "",
    description: "",
    link: "#",
    image: "/fecosystem/masony-3.png"
  },
  {
    id: 4,
    height: 320,
    title: "",
    description: "",
    link: "#",
    image: "/fecosystem/masony-4.png"
  },
  {
    id: 5,
    height: 320,
    title: "",
    description: "",
    link: "#",
    image: "/fecosystem/masony-5.png"
  },
  {
    id: 6,
    height: 320,
    title: "",
    description: "",
    link: "#",
    image: "/fecosystem/masony-6.png"
  },
  {
    id: 7,
    height: 320,
    title: "",
    description: "",
    link: "#",
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
    title: "",
    description: "",
    link: "#",
    image: "/fecosystem/masony-10.png"
  },
  {
    id: 11,
    height: 320,
    title: "",
    description: "",
    link: "#",
    image: "/fecosystem/masony-11.png"
  },
  {
    id: 12,
    height: 320,
    title: "",
    description: "",
    link: "#",
    image: "/fecosystem/masony-12.png"
  }
];
export default function MasonryGrid() {
  const rows = [];
  for (let i = 0; i < items.length; i += 4) {
    const rowItems = items.slice(i, i + 4);
    // Nếu là dòng 2 (phần tử 5–8): dùng grid-cols-[repeat(3,1fr)_45%]
    const isSpecialRow = i === 4;
    rows.push(
      <div
        key={i}
        className={`grid gap-x-[2px] m-0 xl:h-[calc((100vh-143.5px)/3)] grid-cols-3 ${isSpecialRow ? "xl:grid-cols-[repeat(3,1fr)_45%]" : "xl:grid-cols-[45%_repeat(3,1fr)]"}`}
      >
        {rowItems.map((item,index) => (
          <div key={item.id} className={`relative pt-[300px] xl:pt-[33.33%] overflow-hidden ecosystem-masonry-${item.id} ${index === 0 ? 'col-span-3 xl:col-span-1' : 'col-span-1'}`}>
            <Image src={item.image} alt="masonry" fill className="object-cover justify-end" />
            {item.title && (
              <div className={`absolute inset-0 bg-white flex items-center  ${index === 3 ? 'justify-end xl:pl-[120px]' : 'justify-center xl:pr-[120px]'} duration-300`}>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[26px] font-semibold text-blue-1 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-gray-5 my-[10px] tex-[16px]">{item.description}</p>
                  <Link
                    href={item.link}
                    className="flex items-center justify-center text-yellow-1 font-semibold w-[138px] h-[35px] border border-yellow-1 hover:text-amber-50 hover:bg-blue-2 hover:border-blue-2"
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
  return <div className="xl:h-[calc(100vh-143.5px)] overflow-hidden space-y-2 max-w-[91.4%] m-auto">{rows}</div>;
}
'use client';
import React, { useState, useEffect } from 'react';
import styles from './masonrygrid.module.css';
import Masonry from 'react-masonry-css';
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
const breakpointColumnsObj = {
  default: 4,
  1100: 4,
  700: 4,
  500: 4,
};
export default function MasonryGrid() {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={`${styles.mymasonrygrid} pt-[110px] h-100vh  m-auto max-w-[1625px] px-[10px]`}
      columnClassName={styles.mymasonrygrid_column}
    >
      {items.map((item) => (
        <div key={item.id} className={`relative group bg-gray-800 overflow-hidden`} style={{ height: item.height }}>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Image
              src={item.image}
              alt="masony"
              fill
              className="object-cover"
            />
          </div>
          {item.title !== "" ? (
            <div className="absolute inset-0 bg-white flex items-center justify-center duration-300">
              <div className="p-6">
                <h3 className="text-[26px] font-semibold text-blue-1 uppercase">{item.title}</h3>
                <p className="text-gray-5 my-[20px]">{item.description}</p>
                <Link href={item.link} className="flex items-center justify-center text-yellow-1 font-semibold w-[138] h-[35] border border-yellow-1 hover:text-amber-50 hover:bg-blue-2 hover:border-blue-2">
                  Xem thêm
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </Masonry>
  );
}
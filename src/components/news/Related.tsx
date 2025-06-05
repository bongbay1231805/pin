'use client';
import Image from "next/image"
import BreadcrumbExample from "./BreadcrumbExample";
const services = [
  {
    title: 'Tập đoàn Pi Group chuẩn bị triển khai dự án căn hộ Picity Sky Park - Bình Dương',
    img:  '/fnews/post-1.png'
  },
  {
    title: 'Khởi công dòng sản phẩm căn Picity cửa ngõ TP Thủ Đức',
    img:  '/fnews/post-2.png'
  },
  {
    title: 'Khởi công dòng sản phẩm căn Picity cửa ngõ TP Thủ Đức',
    img:  '/fnews/post-1.png'
  },
  {
    title: 'Picity High Park được quy hoạch như một thành phố đa chức năng thu nhỏ với 5 tòa căn hộ cao tầng, ',
    img:  '/fnews/post-1.png'
  },
  {
    title: 'Picity High Park được quy hoạch như một thành phố đa chức năng thu nhỏ với 5 tòa căn hộ cao tầng, ',
    img:  '/fnews/post-2.png'
  },
  {
    title: 'Tập đoàn Pi Group chuẩn bị triển khai dự án căn hộ Picity Sky Park - Bình Dương',
    img:  '/fnews/post-1.png'
  }
];
export default function Related() {
  return (
    <div className="grid md:grid-cols-2 gap-x-[295px] gap-y-[33px]">
      {services.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden pb-[33px] gap-y-[33px] gap-x-[46px] flex items-center border-b-1 border-b-gray-8"
        >
          <Image
            src={item.img}
            alt={item.title}
            width={250}
            height={150}
            className="min-h-[150px] rounded-xl"
          />
          <h3 className="text-lg font-semibold">{item.title}</h3>
        </div>
      ))}
    </div>
  )
}
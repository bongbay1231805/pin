'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function Detail() {
  return (
    <>
      <div className="container mx-auto px-[10px] md:max-w-[1625px] text-center pt-[175px]">
        <h2 className='uppercase font-bold text-yellow-1 text-[40px]'>đầu tư và phát triển dự án</h2>
        <p className='text-[17px] max-w-[808px] text-center mx-auto pb-[115px]'>Sở hữu quỹ đất ngày càng mở rộng và sự am hiểu thị trường, Pi Group đầu tư phát triển đa dạng phân khúc, hướng đến xây dựng cộng đồng văn minh, nâng tầm giá trị sống của người Việt theo tiêu chuẩn quốc tế.</p>
      </div>
      <div className="container mx-auto px-[10px] max-w-[1625px] pb-[115px]">
        <div className='grid md:grid-cols-2 gap-12 pb-[100px]'>
          <div className='border-t-1 border-gray-1 mt-[20px]'>
            <h3 className='text-yellow-1 text-[20px] sm:text-[25px] lg:text-[30px] font-bold px-[70px] py-[25px] border-b-1 border-gray-1'>PICITY HIGH PARK</h3>
            <p className='text-[17px] text-gray-5 px-[70px] py-[25px] border-b-1 border-gray-1'>Đại đô thị lớn nhất Quận 12 sở hữu hệ tiện ích chuẩn resort với hơn 2.500 sản phẩm căn hộ, shophouse, nhà phố thương mại. Picity High Park là tổ ấm an cư của hơn 10.000 cư dân văn minh, hạnh phúc.</p>
            <div className='py-[25px] border-b-1 border-gray-1'>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/map.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Vị Trí:</span>Quận 12, TP. HCM</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/area.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Quy Mô:</span>14.325,90 m²</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Loại hình sản phẩm:</span>Khu đô thị</p>
            </div>
            <div className='leading-[1.7rem] px-[70px] py-[25px] border-b-1 border-gray-1'>
              <p><strong>Mật độ xây dựng:</strong> 23%</p>
              <p><strong>Đơn vị thiết kế kiến trúc:</strong> Humphreys and Partners Architects (Mỹ)</p>
              <p><strong>Đơn vị thiết kế cảnh quan:</strong> Belt Collins International (HongKong)</p>
              <p><strong>Đơn vị thi công xây dựng:</strong> Unicons (Thành viên Coteccons Group) và Tập đoàn Xây dựng Hòa Bình</p>
            </div>
            <div className='flex justify-end px-[70px] py-[25px]'>
              <Link href="/" className="flex uppercase items-center justify-center text-yellow-1 font-semibold w-[261] h-[50] border border-yellow-1 hover:text-amber-50 hover:bg-blue-2 hover:border-blue-2">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
          <div className='relative'>
            <Image
              src="/fecosystem/detail/detail-1.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden h-[80%]!"
            />
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-12 pb-[100px]'>
          <div className='relative'>
            <Image
              src="/fecosystem/detail/detail-2.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden"
            />
          </div>
          <div className='border-t-1 border-gray-1 mt-[20px]'>
            <h3 className='text-yellow-1 text-[20px] sm:text-[25px] lg:text-[30px] font-bold px-[70px] py-[25px] border-b-1 border-gray-1'>PICITY SKY PARK</h3>
            <p className='text-[17px] text-gray-5 px-[70px] py-[25px] border-b-1 border-gray-1'>Tọa lạc trên trục đại lộ Phạm Văn Đồng, Picity Sky Park tiên phong ứng dụng công nghệ 4.0 (tích hợp IoT & AI) và hệ tiện ích 5* mang đến trải nghiệm sống hiện đại, chuẩn quốc tế cho cư dân đô thị.</p>
            <div className='py-[25px] border-b-1 border-gray-1'>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/map.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Vị Trí:</span>Dĩ An, Bình Dương</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/area.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Quy Mô:</span>10.611 m²</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Loại hình sản phẩm:</span>Khu đô thị</p>
            </div>
            <div className='flex justify-end px-[70px] py-[25px]'>
              <Link href="/" className="flex uppercase items-center justify-center text-yellow-1 font-semibold w-[261] h-[50] border border-yellow-1 hover:text-amber-50 hover:bg-blue-2 hover:border-blue-2">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-12'>
          <div className='border-t-1 border-gray-1 mt-[20px]'>
            <h3 className='text-yellow-1 text-[20px] sm:text-[25px] lg:text-[30px] font-bold px-[70px] py-[25px] border-b-1 border-gray-1'>PRIME MASTER</h3>
            <p className='text-[17px] text-gray-5 px-[70px] py-[25px] border-b-1 border-gray-1'>Prime Master là tuyên ngôn về một chuẩn mực sống đỉnh cao, nơi hội tụ đẳng cấp sống thượng lưu, nghệ thuật kiến tạo không gian và giá trị sống trường tồn. Tại Prime Master, mỗi tư dinh là một kiệt tác nghệ thuật được "may đo" tinh xảo, phản ánh lối sống độc bản của những chủ nhân không chỉ thành đạt, mà còn biết cách định hình phong cách sống mang tính biểu tượng.</p>
            <div className='py-[25px] border-b-1 border-gray-1'>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/map.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Vị Trí:</span>Quận 12, TP. HCM</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/area.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Quy Mô:</span>14.325,9 m²</p>
              <p className='flex items-center gap-[12px] px-[70px]'><img src="/fecosystem/detail/roun-down.svg" alt="map" /><span className='text-[17px] text-black font-bold'>Nhà phố liền kề</span>Khu đô thị</p>
            </div>
            <div className='flex justify-end px-[70px] py-[25px]'>
              <Link href="/" className="flex uppercase items-center justify-center text-yellow-1 font-semibold w-[261] h-[50] border border-yellow-1 hover:text-amber-50 hover:bg-blue-2 hover:border-blue-2">
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
          <div className='relative'>
            <Image
              src="/fecosystem/detail/detail-3.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
}
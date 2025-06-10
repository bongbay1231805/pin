'use client';
import PaginationExample from '@/components/news/PaginationExample';
import Link from 'next/link';
import React, { useEffect } from 'react';
// External image URLs (replace with suitable links)
const mainImage = "/fnews/news-1.png";
const meetingImage = "/fnews/news-1.png";
const modelImage = "/fnews/news-1.png";
function News() {
  useEffect(() => {
    const boxes = document.querySelectorAll('.boxanimation');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('show');
          } else {
            el.classList.remove('show');
          }
        });
      },
      {
        // threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0, 0.1, 0.2,...1
        threshold: 0.2, // 0, 0.1, 0.2,...1
      }
    );
    boxes.forEach(box => observer.observe(box));
    return () => boxes.forEach(box => observer.unobserve(box));
  }, []);
  return (
    <div>
      <div className="min-h-screen pt-[180px] pb-[90px] container m-auto max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px] px-[10px]">
        <div className="mx-autoflex flex-col gap-12">
          {/* Top Image w/ Overlayed Card */}
          <div className="relative rounded-2xl">
            <img
              src={mainImage}
              alt="PiGroup building"
              className="w-[1178px] h-[340px] md:h-[400px] lg:h-[460px] object-cover rounded-2xl shadow-lg"
            />
            {/* Overlay Card (bottom right) */}
            <div className="absolute bottom-0 right-0 translate-y-1/2 z-10 8 max-w-[calc(50%_-_15px)] bg-[#17365C] rounded-tr-[40px] text-white p-6 md:p-7 shadow-xl">
              <div className="font-bold text-lg md:text-xl lg:text-2xl mb-2 leading-tight hover:text-yellow-1">
                PI GROUP HỢP TÁC VỚI NHỮNG "ÔNG LỚN" NGÀNH XÂY DỰNG VÀ NGÂN HÀNG UY TÍN
              </div>
              <div className="text-sm md:text-base text-white/85">
                Ngày 13/6/2020, tại nhà hát Hòa Bình, TP.HCM, Tập đoàn Pi Group đã tổ chức lễ ký kết hợp tác với Tập đoàn Hòa Bình, Công...
              </div>
            </div>
          </div>
          {/* Bottom 2 cards section (responsive grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[125px] gap-x-[40px] pt-[88px]">
            <div className='grid grid-cols-1 gap-y-[125px]'>
              {/* Card 1 */}
              <div className="relative rounded-2xl  flex flex-col justify-end">
                <img
                  src={meetingImage}
                  alt="PiGroup meeting"
                  className="w-full h-[483px] object-cover rounded-2xl"
                />
                {/* Label */}
                <Link href="/news/market-news">
                  <div className="absolute bottom-0 left-0  translate-y-1/2 z-10 bg-[#EAF3FF] rounded-tr-[70px] max-w-[540px] px-5 py-[22px] text-blue-1 font-bold text-[17px]  uppercase hover:text-yellow-1">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </Link>
              </div>
              {/* Card 2 */}
              <div className="relative rounded-2xl  flex flex-col justify-end">
                <img
                  src={modelImage}
                  alt="Showroom Model"
                  className="w-full h-[483px] object-cover rounded-2xl"
                />
                {/* Label */}
                <Link href="/news/market-news">
                  <div className="absolute bottom-0 left-0  translate-y-1/2 z-10 bg-[#EAF3FF] rounded-tr-[70px] max-w-[540px] px-5 py-[22px] text-blue-1 font-bold text-[17px]  uppercase hover:text-yellow-1">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </Link>
              </div>
              {/* Card 1 */}
              <div className="relative rounded-2xl  flex flex-col justify-end">
                <img
                  src={meetingImage}
                  alt="PiGroup meeting"
                  className="w-full h-[483px] object-cover rounded-2xl"
                />
                {/* Label */}
                <Link href="/news/market-news">
                  <div className="absolute bottom-0 left-0  translate-y-1/2 z-10 bg-[#EAF3FF] rounded-tr-[70px] max-w-[540px] px-5 py-[22px] text-blue-1 font-bold text-[17px]  uppercase hover:text-yellow-1">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </Link>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-y-[125px] pt-[100px]'>
              {/* Card 2 */}
              <div className="relative rounded-2xl  flex flex-col justify-end">
                <img
                  src={modelImage}
                  alt="Showroom Model"
                  className="w-full h-[483px] object-cover rounded-2xl"
                />
                {/* Label */}
                <Link href="/news/market-news">
                  <div className="absolute bottom-0 left-0  translate-y-1/2 z-10 bg-[#EAF3FF] rounded-tr-[70px] max-w-[540px] px-5 py-[22px] text-blue-1 font-bold text-[17px]  uppercase hover:text-yellow-1">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </Link>
              </div>
              {/* Card 1 */}
              <div className="relative rounded-2xl  flex flex-col justify-end">
                <img
                  src={meetingImage}
                  alt="PiGroup meeting"
                  className="w-full h-[483px] object-cover rounded-2xl"
                />
                {/* Label */}
                <Link href="/news/market-news">
                  <div className="absolute bottom-0 left-0  translate-y-1/2 z-10 bg-[#EAF3FF] rounded-tr-[70px] max-w-[540px] px-5 py-[22px] text-blue-1 font-bold text-[17px]  uppercase hover:text-yellow-1">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </Link>
              </div>
              {/* Card 2 */}
              <div className="relative rounded-2xl  flex flex-col justify-end">
                <img
                  src={modelImage}
                  alt="Showroom Model"
                  className="w-full h-[483px] object-cover rounded-2xl"
                />
                {/* Label */}
                <Link href="/news/market-news">
                  <div className="absolute bottom-0 left-0  translate-y-1/2 z-10 bg-[#EAF3FF] rounded-tr-[70px] max-w-[540px] px-5 py-[22px] text-blue-1 font-bold text-[17px]  uppercase hover:text-yellow-1">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pb-[90px]'>
        <PaginationExample />
      </div>
    </div>
  );
}
export default News;
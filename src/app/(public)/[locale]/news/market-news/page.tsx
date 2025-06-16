'use client';
import PaginationExample from '@/components/news/PaginationExample';
import Link from 'next/link';
import React, { useEffect } from 'react';
import '@/components/news.css'; // Ensure this file contains the necessary styles
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
      <div className="min-h-screen pt-[206px] 2xl:pt-[226px] pb-[90px] container m-auto max-w-[85%] px-[10px]">
        <div className="mx-auto flex flex-col gap-12">
          {/* Top Image w/ Overlayed Card */}
          <Link href="/categories/tin-thi-truong" className="relative news-top-item">
            <div className='img-container flex justify-center items-center ef:w-[1178px] max-w-[75%] rounded-[10px] ef:max-h-[58vh]'>
              <img
                src={mainImage}
                alt="PiGroup building"
                className="object-cover shadow-lg"
              />
            </div>            
            {/* Overlay Card (bottom right) */}
            <div className="absolute bottom-0 right-0 translate-y-1/4 z-10 sm:max-w-[calc(50%_-_15px)] bg-[#142F4F] rounded-tr-[40px] text-white pl-10 pr-10 py-6 shadow-xl">
              <div className="font-bold title text-[17px] 2xl:text-[21px] mb-2">
                PI GROUP HỢP TÁC VỚI NHỮNG "ÔNG LỚN" NGÀNH XÂY DỰNG VÀ NGÂN HÀNG UY TÍN
              </div>
              <div className="text-[13px] 2xl:text-[17px] text-white/85">
                Ngày 13/6/2020, tại nhà hát Hòa Bình, TP.HCM, Tập đoàn Pi Group đã tổ chức lễ ký kết hợp tác với Tập đoàn Hòa Bình, Công...
              </div>
            </div>
          </Link>
          {/* Bottom 2 cards section (responsive grid) */}
          <div className="grid mt-[120px] 2xl:mt-[130px] grid-cols-1 gap-y-[10px] gap-x-[10px] sm:grid-cols-2 sm:gap-y-[50px] sm:gap-x-[40px]">
              {/* Card 1 */}
              <Link href="/categories/tin-thi-truong" className="news-item relative rounded-2xl flex flex-col">
                <div className='img-container rounded-[10px] overflow-hidden w-full'>
                  <img
                    src={"/fnews/news_01.png"}
                    alt="PiGroup meeting"
                    className="object-cover"
                  />
                </div>               
                {/* Label */}
                <div >
                  <div className="title absolute bottom-[56px] left-0 translate-y-2/5 leading-[21px] 2xl:leading-[26px] z-10 bg-[#EAF3FF] rounded-tr-[60px] w-[68%] px-6 py-[18px] text-blue-1 font-bold text-[14px] 2xl:text-[17px] uppercase">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </div>
              </Link>
              {/* Card 2 */}
              <Link href="/categories/tin-thi-truong" className="news-item relative rounded-2xl flex flex-col">
                <div className='img-container rounded-[10px] overflow-hidden w-full'>
                  <img
                    src={"/fnews/news_02.png"}
                    alt="PiGroup meeting"
                    className="object-cover"
                  />
                </div>
                {/* Label */}
                <div >
                  <div className="title absolute bottom-0 left-0 translate-y-2/5 leading-[21px] 2xl:leading-[26px] z-10 bg-[#EAF3FF] rounded-tr-[60px] w-[68%] px-6 py-[18px] text-blue-1 font-bold text-[14px] 2xl:text-[17px] uppercase">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </div>
              </Link> 
              {/* Card 1 */}
              <Link href="/categories/tin-thi-truong" className="news-item relative rounded-2xl flex flex-col">
                <div className='img-container rounded-[10px] overflow-hidden w-full'>
                  <img
                    src={"/fnews/news_03.jpg"}
                    alt="PiGroup meeting"
                    className="object-cover"
                  />
                </div>               
                {/* Label */}
                <div >
                  <div className="title absolute bottom-[56px] left-0 translate-y-2/5 leading-[21px] 2xl:leading-[26px] z-10 bg-[#EAF3FF] rounded-tr-[60px] w-[68%] px-6 py-[18px] text-blue-1 font-bold text-[14px] 2xl:text-[17px] uppercase">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </div>
              </Link>
              {/* Card 2 */}
              <Link href="/categories/tin-thi-truong" className="news-item relative rounded-2xl flex flex-col">
                <div className='img-container rounded-[10px] overflow-hidden w-full'>
                  <img
                    src={"/fnews/news_04.jpg"}
                    alt="PiGroup meeting"
                    className="object-cover"
                  />
                </div>
                {/* Label */}
                <div >
                  <div className="title absolute bottom-0 left-0 translate-y-2/5 leading-[21px] 2xl:leading-[26px] z-10 bg-[#EAF3FF] rounded-tr-[60px] w-[68%] px-6 py-[18px] text-blue-1 font-bold text-[14px] 2xl:text-[17px] uppercase">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </div>
              </Link> 
              {/* Card 1 */}
              <Link href="/categories/tin-thi-truong" className="news-item relative rounded-2xl flex flex-col">
                <div className='img-container rounded-[10px] overflow-hidden w-full'>
                  <img
                    src={"/fnews/news_05.jpg"}
                    alt="PiGroup meeting"
                    className="object-cover"
                  />
                </div>               
                {/* Label */}
                <div >
                  <div className="title absolute bottom-[56px] left-0 translate-y-2/5 leading-[21px] 2xl:leading-[26px] z-10 bg-[#EAF3FF] rounded-tr-[60px] w-[68%] px-6 py-[18px] text-blue-1 font-bold text-[14px] 2xl:text-[17px] uppercase">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </div>
              </Link>
              {/* Card 2 */}
              <Link href="/categories/tin-thi-truong" className="news-item relative rounded-2xl flex flex-col">
                <div className='img-container rounded-[10px] overflow-hidden w-full'>
                  <img
                    src={"/fnews/news_06.png"}
                    alt="PiGroup meeting"
                    className="object-cover"
                  />
                </div>
                {/* Label */}
                <div >
                  <div className="title absolute bottom-0 left-0 translate-y-2/5 leading-[21px] 2xl:leading-[26px] z-10 bg-[#EAF3FF] rounded-tr-[60px] w-[68%] px-6 py-[18px] text-blue-1 font-bold text-[14px] 2xl:text-[17px] uppercase">
                    KHỞI CÔNG DÒNG SẢN PHẨM CĂN PICITY CỦA NGÕ TP THỦ ĐỨC
                  </div>
                </div>
              </Link>         
          </div>
        </div>
      </div>
    </div>
  );
}
export default News;
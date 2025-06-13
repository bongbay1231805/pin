'use client';
import { ContentPiGroup } from '@/components/news/ContentPiGroup';
import { Hero } from '@/components/news/Hero';
import PaginationExample from '@/components/news/PaginationExample';
import React, { useEffect } from 'react';
import Related from '@/components/news/Related';
// External image URLs (replace with suitable links)
function DetailPost() {
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
      <Hero />
      <div className="container m-auto max-w-[95%] md:max-w-[76%] 2xl:max-w-[1312px]">
        <ContentPiGroup />
      </div>
      <div className="container m-auto max-w-[95%] md:max-w-[85%] 2xl:max-w-[1580px] px-[10px]">
        <h2 className='text-yellow-1 uppercase text-center text-[35px] 2xl:text-[45px] font-bold mb-[45px] mt-[90px]'>Tin liên quan</h2>
        <Related />
        <div className='mt-[38px] mb-[72px]'>
          <PaginationExample />
        </div>
      </div>
    </div>
  );
}
export default DetailPost;
// components/ValueItem.tsx

'use client';

import {useState, useEffect, useRef} from 'react';

// Định nghĩa kiểu cho props để code chặt chẽ hơn
interface ValueItemProps {
  icon: React.ReactNode;
  title: string;
}

export default function ValueItem({icon, title}: ValueItemProps) {
  // Dùng ref để tham chiếu đến thẻ div của item này
  const itemRef = useRef<HTMLDivElement | null>(null);
  // State để lưu trạng thái "có đang trong viewport không"
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = itemRef.current; // Gán ref vào một biến để sử dụng trong cleanup
    if (!currentRef) return; // Nếu không có ref, không làm gì cả

    // Khởi tạo Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // entries[0] chính là item của chúng ta
        const entry = entries[0];

        // state với trạng thái isIntersecting.
        // Khi vào màn hình, entry.isIntersecting là true.
        // Khi ra khỏi màn hình, entry.isIntersecting là false.
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5 // Kích hoạt khi 100% của item hiện ra
      }
    );

    // Bắt đầu theo dõi item
    observer.observe(currentRef);

    // Cleanup function: Ngừng theo dõi khi component bị unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy 1 lần khi component mount

  return (
    <div
      ref={itemRef}
      // Thêm class 'is-in-view' một cách có điều kiện
      // Class này sẽ được thêm vào khi scroll tới và xóa đi khi scroll qua
      className={`
        reveal-text flex items-center gap-[20px] sm:gap-[35px] relative 
        after:content-[''] after:absolute after:w-[100%] sm:after:w-[72%] 
        after:left-[50%] sm:after:left-[47%] after:-translate-1/2 after:bottom-0 
        after:h-[1px] after:bg-yellow-1/20 last:after:content-none 
        pb-[20px] md:last:pb-[60px] md:pb-[40px] md:pl-[101px] last:border-0
        group ${isInView ? 'is-in-view' : ''}
      `}
    >
      <div className={`flex items-center justify-center w-[30%]`}>{icon}</div>
      <h3 className="text-[18px] sm:text-[20px] li:text-[22px] 2xl:text-[30px] font-bold text-yellow-1 md:mt-[3%] ml-[8px]">
        {title}
      </h3>
    </div>
  );
}

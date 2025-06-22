'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollRefs } from '@/context/ScrollRefsContext';

export function Stats({ custom_fields }: any) {
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef } = useScrollRefs();
  const { field_1_about, field_2_about, field_2_about_sub, field_3_about, field_9_about_repeat } = custom_fields;

  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return null;
    }
  }

  const field9aboutrepeat = convertJsonStringToArrayOrObject(field_9_about_repeat);

  const originalItems = field9aboutrepeat && field9aboutrepeat.length > 0 ? field9aboutrepeat : [
    {
      value: "12",
      unit: "NĂM",
      description: "HÌNH THÀNH VÀ <br />PHÁT TRIỂN"
    },
    {
      value: "20+",
      unit: "HA",
      description: "QUỸ ĐẤT"
    },
    {
      value: "15,000+",
      description: "KHÁCH HÀNG"
    },
    {
      value: "5.000+",
      description: "SẢN PHẨM"
    },
    {
      value: "1.000+",
      description: "NHÂN SỰ <br />CHẤT LƯỢNG CAO"
    },
    {
      value: "30+",
      description: "ĐỐI TÁC<br />CHIẾN LƯỢC QUỐC TẾ"
    },
  ];

  // Tạo danh sách đủ dài để cuộn mượt và liên tục
  const items = [...originalItems, ...originalItems, ...originalItems];
  const itemHeight = 82; // Chiều cao mỗi item

  const containerRef = useRef<HTMLDivElement>(null); // Tham chiếu đến div chứa các item cuộn
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  // Thêm state và ref cho tính năng cuộn tự động
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    setIsAutoScrolling(true);
    autoScrollIntervalRef.current = setInterval(() => {
      if (containerRef.current && !isDragging) { // Chỉ cuộn tự động khi không kéo
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const maxScroll = scrollHeight - clientHeight;
        const nextScrollTop = scrollTop + itemHeight; // Cuộn từng item một

        if (nextScrollTop >= maxScroll) {
          // Nếu gần hết, reset về giữa mảng để tạo hiệu ứng cuộn vô hạn
          containerRef.current.style.scrollBehavior = 'auto'; // Tắt smooth khi reset
          containerRef.current.scrollTop = originalItems.length * itemHeight;
          containerRef.current.style.scrollBehavior = 'smooth'; // Bật lại smooth
        } else {
          containerRef.current.scrollTop = nextScrollTop;
        }
      }
    }, 5000); // Cuộn mỗi 5 giây
  }, [isDragging, originalItems.length]); // Dependencies: isDragging để biết có đang kéo không, originalItems.length để tính toán reset

  const pauseAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    // Thiết lập timeout để khởi động lại cuộn tự động sau khi không tương tác
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 5000); // 5 giây sau khi không tương tác sẽ tự động cuộn lại
  }, [startAutoScroll]);

  useEffect(() => {
    // Khởi tạo cuộn tự động khi component mount
    startAutoScroll();

    // Cleanup: Clear interval và timeout khi component unmounts
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, [startAutoScroll]); // Chạy effect này khi startAutoScroll thay đổi

  // Xử lý bắt đầu kéo
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      pauseAutoScroll(); // Tạm dừng cuộn tự động
      setIsDragging(true);
      setStartY(e.pageY);
      setStartScrollTop(containerRef.current.scrollTop);
      containerRef.current.style.cursor = 'grabbing';
      containerRef.current.style.scrollBehavior = 'auto'; // Tắt smooth khi kéo
    }
  }, [pauseAutoScroll]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current) {
      pauseAutoScroll(); // Tạm dừng cuộn tự động
      setIsDragging(true);
      setStartY(e.touches[0].pageY);
      setStartScrollTop(containerRef.current.scrollTop);
      containerRef.current.style.scrollBehavior = 'auto'; // Tắt smooth khi kéo
    }
  }, [pauseAutoScroll]);

  // Xử lý di chuyển khi đang kéo
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault(); // Ngăn chặn hành vi cuộn mặc định của trình duyệt
    const walk = (e.pageY - startY);
    containerRef.current.scrollTop = startScrollTop - walk;
  }, [isDragging, startY, startScrollTop]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const walk = (e.touches[0].pageY - startY);
    containerRef.current.scrollTop = startScrollTop - walk;
  }, [isDragging, startY, startScrollTop]);

  // Xử lý kết thúc kéo
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.scrollBehavior = 'smooth'; // Bật lại smooth
    }
    // userInteractionTimeoutRef đã được thiết lập trong pauseAutoScroll
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
        containerRef.current.style.scrollBehavior = 'smooth';
      }
      // userInteractionTimeoutRef đã được thiết lập trong pauseAutoScroll
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }
    // userInteractionTimeoutRef đã được thiết lập trong pauseAutoScroll
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown as any);
      container.addEventListener('mousemove', handleMouseMove as any);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseLeave);

      container.addEventListener('touchstart', handleTouchStart as any, { passive: false });
      container.addEventListener('touchmove', handleTouchMove as any, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('mousedown', handleMouseDown as any);
        container.removeEventListener('mousemove', handleMouseMove as any);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseLeave);

        container.removeEventListener('touchstart', handleTouchStart as any);
        container.removeEventListener('touchmove', handleTouchMove as any);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div ref={oneRef} className="mx-auto py-16 mt-[25px] px-[30px] w-full sm:max-w-[85%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-[22px] 2xl:text-[28px] text-gray-1 font-normal mb-[6px]">{field_1_about}</h2>
          <h3 className="text-[22px] 2xl:text-[45px] font-bold text-yellow-1 mb-[6px]">{field_2_about}</h3>
          <p className="text-[22px] 2xl:text-[28px] text-gray-1 mb-[40px]">{field_2_about_sub}</p>
          <div className="text-[13px] 2xl:text-[17px] text-gray-5 text-justify max-w-[408px] 2xl:max-w-[558px]" dangerouslySetInnerHTML={{ __html: field_3_about }}></div>
        </div>
        <div ref={twoRef} className="grid grid-cols-1">
          <div
            ref={containerRef}
            className="overflow-y-scroll h-[328px] pl-[10px] lg:pl-[90px] relative scrollbar-hide"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className="flex flex-col">
              {items.map((item: any, index: number) => {
                const value = item[0]?.value || '';
                const unit = item[1]?.value || '';
                const description = item[2]?.value || '';

                return (
                  <div
                    key={index}
                    className="flex items-center text-left gap-[30px] border-b-[1px] border-gray-2 h-[82px] flex-shrink-0"
                  >
                    <h3 className="max-w-[258px] lg:pl-[60px] grow font-semibold text-blue-1 text-[30px] 2xl:text-[60px] 2xl:mr-[100px]">
                      {value} {unit !== '' && <span className="text-[26px] 2xl:text-[35px]">{unit}</span>}
                    </h3>
                    <div
                      className="w-[130px] 2xl:w-[200px] text-gray-5 font-[500] text-[14px] 2xl:text-[17px]"
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
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

  const items = [...originalItems, ...originalItems, ...originalItems];
  const itemHeight = 82; // Chiều cao mỗi item
  const visibleItemsInContainer = 4; // Số lượng item có thể hiển thị đầy đủ trong h-[328px] (328 / 82 = 4)

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]); // To store refs for individual items

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State mới để lưu trữ opacity cho từng item, dùng Map để hiệu quả hơn
  const [itemOpacities, setItemOpacities] = useState<Map<number, number>>(new Map());

  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    setIsAutoScrolling(true);
    autoScrollIntervalRef.current = setInterval(() => {
      if (containerRef.current && !isDragging) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const maxScroll = scrollHeight - clientHeight;
        let nextScrollTop = scrollTop + itemHeight; // Cuộn từng item một

        // Đảm bảo cuộn đến vị trí đầu item
        const currentScrollIndex = Math.round(scrollTop / itemHeight);
        nextScrollTop = (currentScrollIndex + 1) * itemHeight;

        if (nextScrollTop >= maxScroll - (itemHeight / 2)) { // Điều chỉnh ngưỡng reset để mượt hơn
          // Nếu gần hết, reset về giữa mảng để tạo hiệu ứng cuộn vô hạn
          containerRef.current.style.scrollBehavior = 'auto'; // Tắt smooth khi reset
          containerRef.current.scrollTop = originalItems.length * itemHeight;
          // Sau khi reset, đảm bảo trình duyệt đã render rồi bật lại smooth scroll
          requestAnimationFrame(() => {
             containerRef.current!.style.scrollBehavior = 'smooth'; // Bật lại smooth
          });
        } else {
          containerRef.current.scrollTop = nextScrollTop;
        }
      }
    }, 5000); // Cuộn mỗi 5 giây
  }, [isDragging, originalItems.length, itemHeight]);

  const pauseAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 5000); // 5 giây sau khi không tương tác sẽ tự động cuộn lại
  }, [startAutoScroll]);

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, [startAutoScroll]);

  // Handle scroll event to determine opacity for all visible items
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, clientHeight } = containerRef.current;
    const newOpacities = new Map<number, number>();

    // Lấy chỉ số của item đầu tiên đang hiển thị (có thể là một phần)
    const firstVisibleItemTopIndex = Math.floor(scrollTop / itemHeight);

    // Lặp qua các item có thể nằm trong khung nhìn
    for (let i = 0; i < items.length; i++) {
      const itemElement = itemRefs.current[i];
      if (itemElement) {
        const itemTop = itemElement.offsetTop;
        const itemBottom = itemTop + itemHeight; // Sử dụng itemHeight cố định

        // Kiểm tra xem item có đang nằm trong khung nhìn không
        const isPartiallyVisible = itemBottom > scrollTop && itemTop < (scrollTop + clientHeight);

        if (isPartiallyVisible) {
          // Tính toán vị trí tương đối của item trong khung nhìn hiện tại
          // Nếu item đang ở vị trí 'currentIndex' cũ, nó sẽ có relativeIndex = 0
          // Item ở ngay dưới nó sẽ có relativeIndex = 1, v.v.
          const relativeIndex = Math.round((itemTop - scrollTop) / itemHeight);

          let opacityValue = 0; // Mặc định là 0%

          if (relativeIndex === 0) {
            opacityValue = 100;
          } else if (relativeIndex === 1) {
            opacityValue = 90;
          } else if (relativeIndex === 2) {
            opacityValue = 50;
          } else if (relativeIndex === 3) {
            opacityValue = 25; // Item cuối cùng trong view
          }
          // Các item khác ngoài 4 item đầu tiên sẽ giữ opacity 0, trừ khi bạn muốn fade out dần

          // Xử lý các trường hợp item bị cắt một phần ở đầu hoặc cuối container
          const overlapTop = Math.max(0, scrollTop - itemTop); // Phần bị cắt ở trên
          const overlapBottom = Math.max(0, itemBottom - (scrollTop + clientHeight)); // Phần bị cắt ở dưới
          const visibleHeight = itemHeight - overlapTop - overlapBottom;
          
          if (visibleHeight > 0) {
              // Adjust opacity based on how much of the item is visible
              // This is a more nuanced fade, combining with relativeIndex for discrete steps.
              // For simplicity matching your original logic, we stick to discrete steps.
              // If you want a smooth fade based on exact pixel position, this becomes more complex.
              newOpacities.set(i, opacityValue / 100);
          } else {
              newOpacities.set(i, 0); // Not visible
          }

        } else {
          // Item hoàn toàn nằm ngoài khung nhìn
          newOpacities.set(i, 0);
        }
      } else {
        newOpacities.set(i, 0); // Item ref not available
      }
    }
    setItemOpacities(newOpacities);
  }, [items.length, itemHeight]); // Dependencies: items.length và itemHeight

  // Xử lý bắt đầu kéo
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      pauseAutoScroll();
      setIsDragging(true);
      setStartY(e.pageY);
      setStartScrollTop(containerRef.current.scrollTop);
      containerRef.current.style.cursor = 'grabbing';
      containerRef.current.style.scrollBehavior = 'auto';
    }
  }, [pauseAutoScroll]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current) {
      pauseAutoScroll();
      setIsDragging(true);
      setStartY(e.touches[0].pageY);
      setStartScrollTop(containerRef.current.scrollTop);
      containerRef.current.style.scrollBehavior = 'auto';
    }
  }, [pauseAutoScroll]);

  // Xử lý di chuyển khi đang kéo
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const walk = (e.pageY - startY);
    containerRef.current.scrollTop = startScrollTop - walk;
    handleScroll(); // Cập nhật opacity ngay lập tức khi kéo
  }, [isDragging, startY, startScrollTop, handleScroll]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const walk = (e.touches[0].pageY - startY);
    containerRef.current.scrollTop = startScrollTop - walk;
    handleScroll(); // Cập nhật opacity ngay lập tức khi kéo
  }, [isDragging, startY, startScrollTop, handleScroll]);

  // Xử lý kết thúc kéo
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.scrollBehavior = 'smooth';
      // Gọi handleScroll một lần nữa để đảm bảo trạng thái cuối cùng chính xác
      handleScroll();
    }
  }, [handleScroll]); // Added handleScroll to dependencies

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
        containerRef.current.style.scrollBehavior = 'smooth';
        handleScroll(); // Cập nhật opacity khi rời chuột
      }
    }
  }, [isDragging, handleScroll]); // Added handleScroll to dependencies

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
      handleScroll(); // Cập nhật opacity khi kết thúc chạm
    }
  }, [handleScroll]); // Added handleScroll to dependencies

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

      // Thêm trình nghe sự kiện cuộn
      container.addEventListener('scroll', handleScroll);

      // Gọi handleScroll ban đầu để đặt opacity cho lần hiển thị đầu tiên
      handleScroll();

      return () => {
        container.removeEventListener('mousedown', handleMouseDown as any);
        container.removeEventListener('mousemove', handleMouseMove as any);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseLeave);

        container.removeEventListener('touchstart', handleTouchStart as any);
        container.removeEventListener('touchmove', handleTouchMove as any);
        container.removeEventListener('touchend', handleTouchEnd);

        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, handleTouchStart, handleTouchMove, handleTouchEnd, handleScroll]);

  return (
    <div ref={oneRef} className="mx-auto py-[50px] sm:py-16 mt-[0px] sm:mt-[25px] px-[30px] w-full sm:max-w-[85%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center md:text-justify">
          <h2 className="text-[16px] sm:text-[20px] 2xl:text-[28px] text-gray-1 font-normal mb-[6px]">{field_1_about}</h2>
          <h3 className="text-[22px] sm:text-[28px] 2xl:text-[45px] font-bold text-yellow-1 mb-[6px]">{field_2_about}</h3>
          <p className="text-[16px] sm:text-[20px] 2xl:text-[28px] text-gray-1 mb-[20px] sm:mb-[40px]">{field_2_about_sub}</p>
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
                // Đảm bảo truy cập dữ liệu đúng cách từ cả hai định dạng (mảng và đối tượng)
                const value = item[0]?.value || item.value || '';
                const unit = item[1]?.value || item.unit || '';
                const description = item[2]?.value || item.description || '';

                // Lấy opacity từ state đã tính toán
                const opacityValue = itemOpacities.get(index) ?? 0; // Mặc định là 0 nếu không tìm thấy

                return (
                  <div
                    key={index}
                    // Corrected line:
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[index] = el;
                    }}
                    className={`flex items-center text-left gap-[30px] border-b-[1px] border-gray-2 h-[82px] flex-shrink-0 transition-opacity duration-300`}
                    style={{ opacity: opacityValue }} // Áp dụng opacity trực tiếp
                  >
                    <h3 className="max-w-[258px] 2xl:max-w-[280px] lg:pl-[60px] grow font-semibold text-blue-1 text-[35px] md:text-[40px] 2xl:text-[60px] 2xl:mr-[90px]">
                      {value} {unit !== '' && <span className="text-[20px] 2xl:text-[35px]">{unit}</span>}
                    </h3>
                    <div
                      className="w-[150px] 2xl:w-[200px] text-gray-5 font-[500] text-[13px] 2xl:text-[17px]"
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
'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface HorizontalImageScrollerProps {
  imageUrls: string[];
  openPopup: (src: string) => void;
}

const HorizontalImageScroller: React.FC<HorizontalImageScrollerProps> = ({
  imageUrls,
  openPopup,
}) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref cho container cuộn
  const innerContentRef = useRef<HTMLDivElement>(null); // Ref cho div chứa các ảnh (sẽ transform)

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslateX = useRef(0); // Vị trí translateX hiện tại của innerContent
  const prevTranslateX = useRef(0); // Vị trí translateX từ frame trước đó
  const animationFrameId = useRef<number | null>(null);

  // --- Hàm Animation & Touch/Mouse Handling ---

  const animate = useCallback(() => {
    if (!innerContentRef.current) return;

    // Áp dụng transform thay vì thay đổi scrollLeft
    innerContentRef.current.style.transform = `translateX(${currentTranslateX.current}px)`;

    // Nếu đang kéo, tiếp tục animation
    if (isDragging.current) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      // Nếu không kéo, có thể thêm logic quán tính hoặc snapping tại đây (nếu muốn)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }
  }, []); // Không có dependencies vì chỉ sử dụng ref

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn hành vi kéo mặc định của trình duyệt
    if (!containerRef.current || !innerContentRef.current) return;

    isDragging.current = true;
    containerRef.current.classList.add('cursor-grabbing');
    startX.current = e.pageX; // Lấy vị trí chuột X
    prevTranslateX.current = currentTranslateX.current; // Lưu vị trí hiện tại

    // Bắt đầu animation loop
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(animate);
  }, [animate]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current || !innerContentRef.current) return;
    e.preventDefault();

    const dx = e.pageX - startX.current; // Độ dịch chuyển chuột
    let newTranslateX = prevTranslateX.current + dx;

    // --- Giới hạn cuộn để không kéo quá giới hạn ---
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = innerContentRef.current.scrollWidth;

    if (contentWidth <= containerWidth) { // Nội dung không đủ lớn để cuộn
      newTranslateX = 0;
    } else {
      const maxTranslateX = 0; // Vị trí ngoài cùng bên trái (không cuộn)
      const minTranslateX = containerWidth - contentWidth; // Vị trí ngoài cùng bên phải khi cuộn hết

      if (newTranslateX > maxTranslateX) {
        // Kéo quá sang phải, giảm tốc độ kéo để tạo hiệu ứng "kéo quá giới hạn" mềm mại
        newTranslateX = maxTranslateX + (newTranslateX - maxTranslateX) * 0.3;
      } else if (newTranslateX < minTranslateX) {
        // Kéo quá sang trái, giảm tốc độ
        newTranslateX = minTranslateX + (newTranslateX - minTranslateX) * 0.3;
      }
    }
    // --- Kết thúc giới hạn cuộn ---

    currentTranslateX.current = newTranslateX; // Cập nhật vị trí dịch chuyển mục tiêu
    
    // Nếu chưa có requestAnimationFrame, yêu cầu một cái
    if (animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    containerRef.current?.classList.remove('cursor-grabbing');

    // Nếu sau khi nhả chuột, vẫn đang ở vị trí kéo quá giới hạn, đẩy về vị trí hợp lệ
    if (containerRef.current && innerContentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = innerContentRef.current.scrollWidth;
      const maxTranslateX = 0;
      const minTranslateX = containerWidth - contentWidth;

      if (currentTranslateX.current > maxTranslateX) {
        // Thêm animation nhẹ nhàng để trở về vị trí đầu
        innerContentRef.current.style.transition = 'transform 0.3s ease-out';
        currentTranslateX.current = maxTranslateX;
        animate(); // Kích hoạt animation để đẩy về
      } else if (currentTranslateX.current < minTranslateX && contentWidth > containerWidth) {
        // Thêm animation nhẹ nhàng để trở về vị trí cuối
        innerContentRef.current.style.transition = 'transform 0.3s ease-out';
        currentTranslateX.current = minTranslateX;
        animate(); // Kích hoạt animation để đẩy về
      }
    }
  }, [animate]);

  const onMouseLeave = useCallback(() => {
    if (isDragging.current) { // Chỉ xử lý nếu đang kéo rồi rời chuột
      onMouseUp(); // Coi như nhả chuột khi rời vùng
    }
  }, [onMouseUp]);
  
  // Xử lý sự kiện chạm cho thiết bị di động
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current || !innerContentRef.current) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    prevTranslateX.current = currentTranslateX.current;
    
    // Bỏ transition đang có để phản hồi ngay lập tức
    if (innerContentRef.current.style.transition) {
      innerContentRef.current.style.transition = 'none';
    }

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(animate);
  }, [animate]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current || !innerContentRef.current) return;
    const dx = e.touches[0].pageX - startX.current;
    let newTranslateX = prevTranslateX.current + dx;

    // Áp dụng giới hạn cuộn tương tự như onMouseMove
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = innerContentRef.current.scrollWidth;

    if (contentWidth <= containerWidth) {
      newTranslateX = 0;
    } else {
      const maxTranslateX = 0;
      const minTranslateX = containerWidth - contentWidth;

      if (newTranslateX > maxTranslateX) {
        newTranslateX = maxTranslateX + (newTranslateX - maxTranslateX) * 0.3;
      } else if (newTranslateX < minTranslateX) {
        newTranslateX = minTranslateX + (newTranslateX - minTranslateX) * 0.3;
      }
    }
    currentTranslateX.current = newTranslateX;

    if (animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    // Tương tự onMouseUp, xử lý đẩy về vị trí hợp lệ
    if (containerRef.current && innerContentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = innerContentRef.current.scrollWidth;
      const maxTranslateX = 0;
      const minTranslateX = containerWidth - contentWidth;

      if (currentTranslateX.current > maxTranslateX) {
        innerContentRef.current.style.transition = 'transform 0.3s ease-out';
        currentTranslateX.current = maxTranslateX;
        animate();
      } else if (currentTranslateX.current < minTranslateX && contentWidth > containerWidth) {
        innerContentRef.current.style.transition = 'transform 0.3s ease-out';
        currentTranslateX.current = minTranslateX;
        animate();
      }
    }
  }, [animate]);


  // Cleanup: Hủy bỏ requestAnimationFrame khi component unmount
  useEffect(() => {
    // Đảm bảo transition được reset khi unmount
    if (innerContentRef.current) {
      innerContentRef.current.style.transition = '';
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // --- Render phần UI ---
  return (
    <div
      ref={containerRef}
      // Loại bỏ overflow-x-auto và scrollbar-hide khỏi đây,
      // vì chúng ta sẽ dùng transform để di chuyển nội dung
      // Thay vào đó, đặt overflow-hidden cho container bao bọc.
      className="overflow-hidden cursor-grab select-none h-[330px] sm:h-[250px]"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      // Thêm sự kiện chạm cho mobile
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      // Loại bỏ onScroll vì chúng ta không dùng scrollLeft nữa
    >
      {/* Container chứa các ảnh, sẽ được transform */}
      <div
        ref={innerContentRef}
        className="flex gap-[15px] h-full px-[30px] pb-2 will-change-transform" // Thêm will-change-transform
        style={{ transform: `translateX(${currentTranslateX.current}px)` }} // Apply transform ban đầu
      >
        {imageUrls.map((src: string, i: number) => (
          <div
            key={i}
            className="
              relative flex-none
              aspect-w-16 aspect-h-9
              w-[calc(100%-45px)]
              min-w-[calc(100%-45px)]
              
              bg-[#ECF5FA]/30 border-[25px] border-[#ECF5FA]/30 rounded-[5px]
              
              grid items-center justify-center
            "
          >
            <Image
              onClick={() => openPopup(src)}
              src={src}
              alt={`Image ${i + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-[5px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalImageScroller;
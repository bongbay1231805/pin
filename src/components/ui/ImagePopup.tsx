// components/ImagePopup.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ImagePopupProps {
  src: string;
  onClose: () => void;
}

export default function ImagePopup({ src, onClose }: ImagePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      // Loại bỏ bg-opacity-75 và bg-color ở đây.
      // Thay vào đó, chúng ta sẽ tạo một lớp phủ nền riêng biệt.
      onClick={handleClickOutside}
    >
      {/* Lớp phủ nền màu đen mờ */}
      <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true"></div>

      {/* Nội dung popup chính - z-index cao hơn lớp phủ nền */}
      <div
        className="relative max-w-3xl max-h-full mx-auto flex flex-col z-10" // Thêm z-10 để đảm bảo nó ở trên lớp phủ nền
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-3xl font-bold leading-none z-20" // Z-index cao hơn nội dung popup
          aria-label="Close"
        >
          &times;
        </button>

        <div className="relative w-full h-full" style={{ maxHeight: 'calc(100vh - 80px)' }}>
          <Image
            src={src}
            alt="Full size image"
            // Điều chỉnh kích thước Image cho phù hợp với popup
            width={700} // Ví dụ kích thước lớn hơn
            height={500} // Ví dụ kích thước lớn hơn
            style={{ objectFit: 'contain' }} // Đảm bảo ảnh vừa vặn
            className="w-full h-full" // Thêm lớp để Image chiếm toàn bộ không gian của div cha
          />
        </div>
      </div>
    </div>
  );
}
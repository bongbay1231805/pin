'use client';
import React, {useState, useRef, useEffect} from 'react';

// Định nghĩa kiểu dữ liệu
interface ServiceData {
  id: number;
  icon: React.ReactNode;
  title: string;
  text: string;
}

interface ServicesMobileProps {
  servicesData: ServiceData[];
}

// Component con cho mỗi mục, đã được sửa để hoạt động với onClick
const ServiceBlockMobile: React.FC<{
  service: ServiceData;
  isOpen: boolean;
  onToggle: () => void;
}> = ({service, isOpen, onToggle}) => {
  return (
    <div
      className="relative w-full h-[210px] overflow-hidden cursor-pointer after:content-['']"
      onClick={onToggle}
    >
      {/* Lớp 1: Trạng thái ban đầu (sẽ ẩn đi khi isOpen) */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center gap-[35px] bg-white p-4 transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {service.icon}
        <h4 className="text-yellow-1 uppercase font-bold text-[18px] text-center">
          {service.title}
        </h4>
      </div>

      {/* Lớp 2: Trạng thái "hover" (sẽ hiện ra khi isOpen) */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Nền màu "lau" từ trái qua phải */}
        <div
          className={`absolute inset-0 bg-[#fff] transform origin-left transition-transform duration-300 ease-in-out ${
            isOpen ? 'scale-x-100' : 'scale-x-0'
          }`}
        ></div>

        {/* Nội dung trượt từ dưới lên */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
          <h3
            className={`text-[18px] font-bold text-yellow-1 uppercase mb-4 transform transition-all duration-300 ease-out ${
              isOpen
                ? 'opacity-100 translate-y-0 delay-150'
                : 'opacity-0 translate-y-5'
            }`}
          >
            {service.title}
          </h3>
          <p
            className={`text-gray-5 text-[11px] text-justify transform transition-all duration-300 ease-out ${
              isOpen
                ? 'opacity-100 translate-y-0 delay-200'
                : 'opacity-0 translate-y-5'
            } line-clamp-8`} // Giới hạn 6 dòng để tránh tràn văn bản
          >
            {service.text}
          </p>
        </div>
      </div>
    </div>
  );
};

// Component cha chính của file
export const ServicesMobile: React.FC<ServicesMobileProps> = ({
  servicesData
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Hàm xử lý khi click chuột
    function handleClickOutside(event: MouseEvent) {
      // Nếu ref tồn tại và điểm click không nằm trong khu vực của ref
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null); // Đóng mục đang mở
      }
    }

    // Thêm event listener khi component được mount
    document.addEventListener('mousedown', handleClickOutside);

    // Dọn dẹp event listener khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Mảng rỗng đảm bảo effect chỉ chạy 1 lần khi mount và cleanup khi unmount

  return (
    <div
      ref={containerRef}
      className="w-[95%] mx-auto flex flex-col bg-white rounded-2xl border border-gray-300 divide-y divide-gray-300 overflow-hidden"
    >
      {servicesData.map((service, index) => (
        <ServiceBlockMobile
          key={service.id}
          service={service}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

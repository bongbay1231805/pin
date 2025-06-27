// src/components/ServicesDesktop.tsx (Ví dụ về đường dẫn)

import React from 'react';

// Định nghĩa kiểu dữ liệu cho props
interface ServiceData {
  id: number;
  icon: React.ReactNode;
  title: string;
  text: string;
  index?: number;
}

interface ServicesDesktopProps {
  servicesData: ServiceData[];
}

// Component con cho từng khối, chứa toàn bộ logic hover
const ServiceBlockDesktop: React.FC<ServiceData> = ({
  icon,
  title,
  text,
  index
}) => {
  const baseClasses =
    'grow-1 relative flex-shrink-0 w-[95%] md:w-auto flex  flex-col justify-center items-center gap-[35px] group';
  const middleBlockClasses = `
    after:content-['']
    after:bg-[url('/fecosystem/detail/operation-5.svg')]
    after:absolute
    after:left-0
    after:w-[22px]
    after:h-[100%]
    after:bg-center
    before:content-['']
    before:bg-[url('/fecosystem/detail/operation-5.svg')]
    before:absolute
    before:right-0
    before:w-[22px]
    before:h-[100%]
    before:bg-center
  `;
  // Nếu là khối thứ 2 (index === 1), thì thêm các class đặc biệt vào
  const containerClassName =
    index === 1 ? `${baseClasses} ${middleBlockClasses}` : baseClasses;
  return (
    <>
      <div className={containerClassName}>
        {icon}
        <h4 className="text-yellow-1 uppercase font-bold text-[18px] 2xl:text-[22px]">
          {title}
        </h4>
        {/* --- LỚP POPUP HIỆN RA KHI HOVER --- */}
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          <div className="absolute inset-0 bg-[#fff] transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
            <h3 className="text-[18px] 2xl:text-[22px] font-bold text-yellow-1 uppercase mb-4 transform transition-all duration-500 ease-out delay-150 opacity-0 translate-y-30 group-hover:opacity-100 group-hover:translate-y-0">
              {title}
            </h3>
            <p className="text-gray-5 text-[13px] 2xl:text-[17px] text-justify transform transition-all duration-500 ease-out delay-200 opacity-0 translate-y-30 group-hover:opacity-100 group-hover:translate-y-0">
              {text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// Component chính của file này
export const ServicesDesktop: React.FC<ServicesDesktopProps> = ({
  servicesData
}) => {
  return (
    <div className="flex overflow-x-scroll md:overflow-x-visible  md:grid md:grid-cols-3">
      {servicesData.map((service, index) => (
        <ServiceBlockDesktop
          key={service.id}
          id={service.id}
          icon={service.icon}
          title={service.title}
          text={service.text}
          index={index}
        />
      ))}
    </div>
  );
};

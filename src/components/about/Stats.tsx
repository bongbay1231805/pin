'use client';
import React, { useState, useEffect } from 'react';
import { useScrollRefs } from '@/context/ScrollRefsContext'
export function Stats({custom_fields}:any) {
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef } = useScrollRefs();
  const {field_1_about,field_2_about,field_2_about_sub,field_3_about,field_9_about_repeat} = custom_fields;
  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return null; // Return null or throw the error, depending on your error handling preference
    }
  }
  const field9aboutrepeat = convertJsonStringToArrayOrObject(field_9_about_repeat);
  const originalItems = [
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
  // Tạo danh sách đủ dài để cuộn mượt
  const items = [...field9aboutrepeat, ...field9aboutrepeat, ...field9aboutrepeat];
  const itemHeight = 82;
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= originalItems.length * 2) {
          return 0; // Reset lại để tránh tràn mảng
        }
        return prevIndex + 1;
      });
    }, 5000); // Cuộn mỗi 3 giây
    return () => clearInterval(interval);
  }, []);
  return (
    <div ref={oneRef} className="mx-auto py-16 mt-[25px] max-w-[85%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-[22px] 2xl:text-[28px] text-gray-1 font-normal mb-[6px]">{field_1_about}</h2>
          <h3 className="text-[22px] 2xl:text-[45px] font-bold text-yellow-1 mb-[6px]">{field_2_about}</h3>
          <p className="text-[22px] 2xl:text-[28px] text-gray-1 mb-[40px]">{field_2_about_sub}</p>
          <div className="text-[13px] 2xl:text-[17px] text-gray-5 text-justify max-w-[408px] 2xl:max-w-[558px]" dangerouslySetInnerHTML={{ __html: field_3_about }}></div>
        </div>
        <div ref={twoRef} className="grid grid-cols-1">
          <div className="overflow-hidden h-[328] pl-[10px] lg:pl-[90px]">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${currentIndex * itemHeight}px)` }}
            >
              {items.map((item:any, index:number) => {
                // Tính chỉ số tương đối so với currentIndex
                const relativeIndex = (index - currentIndex + originalItems.length) % originalItems.length;
                const opacityClass = relativeIndex === 0 ? 'opacity-100' : relativeIndex === 1 ? 'opacity-90' : relativeIndex === 2 ? 'opacity-50' : relativeIndex === 3 ? 'opacity-25' : 'opacity-0';
                return (
                  <div
                    key={index}
                    className={`flex items-center text-left gap-[30px] border-b-[1px] border-gray-2 h-[82px] ${opacityClass}`}
                  >
                    <h3 className="max-w-[258px] pl-[10px] lg:pl-[60px] grow font-semibold text-blue-1 text-[30px] 2xl:text-[60px]">
                      {item[0].value} {item[1].value !=='' && <span className="text-[26px] 2xl:text-[35px]">{item[1].value}</span>}
                    </h3>
                    <div
                      className="text-gray-5 font-[500] text-[14px] 2xl:text-[17px]"
                      dangerouslySetInnerHTML={{ __html: item[2].value }}
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
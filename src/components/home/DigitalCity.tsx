'use client';
import { forwardRef } from 'react';
const DigitalCity = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
      <div className="mx-auto max-w-[95%] md:max-w-[85%] 2xl:max-w-[1058px]" ref={ref}>
        <div className="relative mx-auto flex items-center justify-center">
          <div className="text-center max-w-[836px] 2xl:max-w-[1088px]">
            <p className="text-[22px] 2xl:text-[28px] mt-[7%] 2xl:mt-[71px] text-gray-1 fade-in-left-short">NHÀ PHÁT TRIỂN</p>
            <h2 className="text-size-35 2xl:text-[45px] font-bold text-yellow-1 mt-[0] mb-[2px] fade-in-left-short">ĐÔ THỊ SỐ TIỆN ÍCH 5★</h2>
            <p className="text-[22px] 2xl:text-[28px] mb-[37px] text-gray-1 -mt-[8px] fade-in-left-short">CHUẨN QUỐC TẾ</p>
            <p className="text-[13px] 2xl:text-[17px] mb-[35px] md:mb-[42px] text-gray-5 leading-[22px] 2xl:leading-[28px] fade-in-left-short">
              Pi Group là nhà phát triển bất động sản cao cấp với hơn 10 năm kinh nghiệm kiến tạo những không gian sống đẳng cấp. Với tầm nhìn chiến lược và cam kết không ngừng đổi mới, Pi Group khẳng định vị thế tiên phong phát triển những dự án biểu tượng, tích hợp công nghệ 4.0 hiện đại và hệ tiện ích 5* chuẩn quốc tế. Pi Group tự hào mang đến giá trị vượt trội cho khách hàng và xây dựng những cộng đồng văn minh, bền vững, góp phần định hình tương lai đô thị thông minh tại Việt Nam.
            </p>
          </div>
        </div>
      </div>
    </>
  )
})
export default DigitalCity;
DigitalCity.displayName = 'DigitalCity';
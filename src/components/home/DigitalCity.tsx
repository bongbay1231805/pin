'use client';
import { forwardRef } from 'react';
const DigitalCity = forwardRef<HTMLDivElement>((props, ref) => {
  console.log(props);
  return (
    <>
      <div className="mx-auto max-w-[1580px]" ref={ref}>
        <div className="relative mx-auto px-4 sm:px-6 md:px-[4%] flex items-center justify-center">
          <div className="text-center max-w-[100%] sm:max-w-[80%] 2xl:max-w-[75%]">
            <p className="text-[28px] mt-[71px] text-gray-1 boxanimation reveal-text">NHÀ PHÁT TRIỂN</p>
            <h2 className="text-[45px] font-bold text-yellow-1 -mt-[3px] boxanimation reveal-text">ĐÔ THỊ SỐ TIỆN ÍCH 5★</h2>
            <p className="text-[28px] md:mb-[3.5%] text-gray-1 -mt-[8px] boxanimation reveal-text">CHUẨN QUỐC TẾ</p>
            <p className="text-[17px] mb-[35px] md:mb-[42px] text-gray-5 leading-[28px] boxanimation reveal-text">
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
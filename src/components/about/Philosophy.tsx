'use client';
import Image from "next/image"
export function Philosophy() {
  return (
    <section className="py-16">
      <div className="max-w-[95%] md:max-w-[85%] 2xl:max-w-[1580px] mx-auto bg-blue-3 rounded-[10px] bg-[url('/fabout/target.png')] bg-contain bg-no-repeat bg-right">
        <div className="grid items-center grid-cols-1 md:grid-cols-[70%_30%] mb-8 uppercase text-[25px] 2xl:text-[35px] py-[2px] text-white">
          <div className="py-[18px] pl-[72px] leading-[46px] 2xl:leading-[60px]">
            <h3>NGHĨ <span className="text-yellow-1">ĐỘC ĐÁO</span></h3>
            <h3>LÀM <span className="text-yellow-1">KHÁC BIỆT</span></h3>
            <h3>KHÔNG NGẠI <span className="text-yellow-1">ĐI NGƯỢC XU HƯỚNG</span></h3>
          </div>
          <div className="font-bold text-end leading-[35px] 2xl:leading-[42px] pr-[76px]">
            <p>Triết lý<br />kinh doanh</p>
          </div>
        </div>
      </div>
      <div className="max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px] m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative vision-item vision-item h-[320px] 2xl:h-[380px] bg-gray-800 group rounded-[10px] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Image
                src="/fabout/vision.png"
                alt="vision"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute vision-content inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-[30px] title font-bold mb-4 text-white">TẦM NHÌN</h3>
                <div className="text-[14px] content text-white">Trở thành Nhà phát triển đô thị số tiện ích 5★ chuẩn quốc tế.</div>
                <div className="bg"></div>
              </div>
            </div>
          </div>
          <div className="relative vision-item h-[320px] 2xl:h-[380px] bg-gray-800 group rounded-[10px] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Image
                src="/fabout/mission.png"
                alt="mission"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute vision-content inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-[30px] title font-bold mb-4 text-white">SỨ MỆNH</h3>
                <div className="text-[14px] content text-white">Kiến tạo cộng đồng văn minh, nâng tầm giá trị sống.</div>
                <div className="bg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

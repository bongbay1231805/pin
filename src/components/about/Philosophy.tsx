'use client';
import Image from "next/image"
export function Philosophy() {
  return (
    <section className="py-16">
      <div className="max-w-[83%] 2xl:max-w-[1580px] mx-auto  bg-blue-3 rounded-[10px] bg-[url('/fabout/target.png')] bg-no-repeat bg-right">
        <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-8 mb-8 uppercase text-size-35 py-[2px] text-white">
          <div>
            <h3>NGHĨ <span className="text-yellow-1">ĐỘC ĐÁO</span></h3>
            <h3>LÀM <span className="text-yellow-1">KHÁC BIỆT</span></h3>
            <h3>KHÔNG NGẠI <span className="text-yellow-1">ĐI NGƯỢC XU HƯỚNG</span></h3>
          </div>
          <div className="font-bold text-end">
            <p>Triết lý</p>
            <p>kinh doanh</p>
          </div>
        </div>
      </div>
      <div className="max-w-[83%] 2xl:max-w-[1580px] m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[300px] bg-gray-800 group rounded-[10px] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Image
                src="/fabout/vision.png"
                alt="vision"
                fill
                className="object-cover"
              />
              <h3 className="absolute text-2xl font-bold text-white">TẦM NHÌN</h3>
            </div>
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">TẦM NHÌN</h3>
                <p className="text-gray-300">Trở thành nhà phát triển bất động sản hàng đầu, mang đến không gian sống chất lượng và bền vững.</p>
              </div>
            </div>
          </div>
          <div className="relative h-[300px] bg-gray-800 group rounded-[10px] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Image
                src="/fabout/mission.png"
                alt="mission"
                fill
                className="object-cover"
              />
              <h3 className="absolute text-2xl font-bold text-white">SỨ MỆNH</h3>
            </div>
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">SỨ MỆNH</h3>
                <p className="text-gray-300">Kiến tạo không gian sống chất lượng, góp phần nâng cao chất lượng cuộc sống của cộng đồng.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

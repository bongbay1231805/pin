'use client';
export function Stats() {
  return (
    <div className="container mx-auto py-16 mt-[115px] max-w-[83%] px-[10px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="md:text-size-25 text-[28px] text-gray-1 font-normal mb-[15px]">NHÀ PHÁT TRIỂN</h2>
          <h3 className="text-size-30 md:text-size-35 lg:text-[45px] text-yellow-1 mb-[15px]">ĐÔ THỊ SỐ TIỆN ÍCH 5*</h3>
          <p className="md:text-size-25 text-[28px] text-gray-1 mb-[40px]">CHUẨN QUỐC TẾ</p>
          <p className="max-w-[508px]">Hơn một thập kỷ không ngừng hoàn thiện và tăng trưởng, Tập đoàn Pi Group khẳng định vị thế vững chắc là Nhà phát triển Bất động sản chất lượng cao, kiến tạo những cộng đồng văn minh. Mỗi dự án của Pi Group là một minh chứng cho tư duy đổi mới và cam kết mang đến giá trị vượt trội cho khách hàng, đồng hành cùng kỷ nguyên thịnh vượng của quốc gia.</p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div className="flex items-center gap-[34px]">
            <h3 className="max-w-[230px] grow font-semibold text-blue-1 text-[60px]">12 NĂM</h3>
            <p className="text-gray-5 text-[17px]">HÌNH THÀNH VÀ <br /> PHÁT TRIỂN</p>
          </div>
          <div className="flex items-center gap-[34px]">
            <h3 className="max-w-[230px] grow font-semibold text-blue-1 text-[60px]">20+ HA</h3>
            <p className="text-gray-5 text-[17px]">QUỸ ĐẤT</p>
          </div>
          <div className="flex items-center gap-[34px] text-[#D9D9D9] opacity-[60%]">
            <h3 className="max-w-[230px] grow font-semibold text-blue-1 text-[60px]">15,000+</h3>
            <p className="text-gray-5 text-[17px]">CƯ DÂN TIN CHỌN VÀ <br/> ĐỒNG HÀNH</p>
          </div>
          <div className="flex items-center gap-[34px] text-[#D9D9D9] opacity-[20%]">
            <h3 className="max-w-[230px] grow font-semibold text-blue-1 text-[60px]">5,000+</h3>
            <p className="text-gray-5 text-[17px]">SẢN PHẨM</p>
          </div>
        </div>
      </div>
    </div>
  )
}
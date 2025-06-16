'use client';
import Image from "next/image"
export function ContentPiGroup() {
  return (
    <>
      <div className="flex items-center gap-[40px] border-b-[2px] border-[#D9D9D9] pt-[70px]">
        <div className="grid grid-cols-1 text-center w-[90px] h-[90px] bg-blue-1 items-top justify-center p-x-[15px] rounded-tr-[16px]">
          <span className="text-white font-semibold text-[15px] mt-[20px] leading-none">04.2025</span>
          <span className="text-white font-bold text-size-35 mb-[10px] leading-none">20</span>
        </div>
        <h1 className="uppercase text-[32px] 2xl:text-[39px] text-blue-1 font-bold">THƯ MỜI HỢP TÁC DỰ ÁN PICITY SKY PARK</h1>
      </div>
      <div className="text-gray-5 text-[13px] 2xl:text-[17px] pt-[47px] [&>img]:my-[30px] [&>figure>img]:my-[30px] [&>figure]:text-center [&>figure]:text-[17px] [&>figure]:text-gray-6 [&>figure]:mb-[40px]">
        <p>Thư mời hợp tác dự án PICITY SKY PARK được Tập đoàn PiGroup đơn vị phát triển dự án Picity Sky Park triển khai đến các đơn vị đại lý chiến lược chuyên phân phối dự án căn hộ trên thị trường. Sáng ngày 13/6/2023 đơn vị phát triển dự án đã có Thư mời hợp tác dự án PICITY SKY PARK đến các đơn vị chiến lược cùng phân phối sản phẩm Picity ra thị trường Dĩ An Bình Dương.</p>
        <figure>
          <img src="/fnews/post-2.png" alt="post-2.png" />
          <figcaption className="text-[14px] 2xl:text-[17px] italic">Hệ thống tiện ích như hồ bơi, công viên tại dự án đã được hoàn thiện. Ảnh: Pi Group</figcaption>
        </figure>
        <p>Picity High Park được quy hoạch như một thành phố đa chức năng thu nhỏ với 5 tòa căn hộ cao tầng, nhà phố thương mại, hệ thống công viên, trường học và chuỗi tiện ích. Dự án còn sở hữu hơn 25 dịch vụ và tiện ích như khu mua sắm, bể bơi, sân chơi trẻ em, khu thể thao ngoài trời... mang lại cuộc sống lành mạnh, hiện đại cho cư dân.</p>
        <p>Đường phố nội khu tại Picity High Park có diện tích rộng với hệ thống cây xanh, bóng mát và hoa cỏ bao phủ quanh năm. Ngoài ra, các căn hộ được thiết kế thông minh với tầm nhìn từ phòng ngủ và phòng khách thoáng rộng để đón gió và ánh nắng tự nhiên.</p>
        {/* <strong className="block mt-[40px] mb-[45px] w-full text-right">Ngọc Diễm</strong> */}
        <ul className="flex gap-[10px] mt-[86px] mb-[45px] items-center justify-end">
          <p className="text-[13px] 2xl:text-[17px] font-semibold text-gray-6 mr-0.5 ">Chia sẻ</p>
          <li>
            <a href="https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/categories/tin-thi-truong">
              <Image
                src="/fnews/fb.svg"
                alt="Modern cityscape with high-rise buildings"
                width={32}
                height={32}
                priority
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/p?http://localhost:3000/categories/tin-thi-truong">
              <Image
                src="/fnews/inter.svg"
                alt="Modern cityscape with high-rise buildings"
                width={32}
                height={32}
                priority
              />
            </a>
          </li>
          <li>
            <a href="http://www.linkedin.com/shareArticle?url=http://localhost:3000/categories/tin-thi-truong">
              <Image
                src="/fnews/linkin.svg"
                alt="Modern cityscape with high-rise buildings"
                width={32}
                height={32}
                priority
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
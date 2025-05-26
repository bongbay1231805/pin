'use client';
import Image from "next/image"
import Link from "next/link"
export function Business() {
  return (
    <div className="container mx-auto px-1 sm:px-6 lg:px-[16px] md:max-w-[1253px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b-1 border-gray-2 pb-[135px]">
        <div>
          <h2 className="text-[40px] text-yellow-1 font-bold mb-[30px]">VĂN HÓA DOANH NGHIỆP</h2>
          <p className="text-gray-1 text-[20px] sm:text-[25px] lg:text-[30px] font-normal mb-[112px] uppercase">
            Phát triển bền vững
          </p>
          <Link href="/" className="flex items-center justify-center text-yellow-1 font-semibold w-[180px] h-[30px] md:w-[203px] md:h-[35px] border border-yellow-1 hover:text-amber-50 hover:bg-blue-2 hover:border-blue-2">
            <Image
              src="/fabout/book.svg"
              alt="Smart City Features"
              width={24}
              height={24}
              className="object-contain"
            />
            Xem hồ sơ năng lực
          </Link>
        </div>
        <div className="relative aspect-square items-center flex justify-center">
          <Image
            src="/fabout/vhdn.svg"
            alt="Smart City Features"
            width={553}
            height={554}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

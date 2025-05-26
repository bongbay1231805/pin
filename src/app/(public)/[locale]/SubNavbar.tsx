'use client';
import Link from "next/link"
interface PropSub {
  hasShadow: boolean;
  pageCurent: boolean;
  nameCurent: string;
}
export default function SubNavbar(props: PropSub) {
  const { hasShadow, pageCurent, nameCurent } = props;
  let navItems: { name: string, href: string }[] = [];
  if (nameCurent == "/ecosystem") {
    navItems = [
      {
        name: "Đầu tư và phát triển dự án",
        href: "/ecosystem/investment-development"
      },
      {
        name: "Dịch vụ BẤT ĐỘNG SẢN",
        href: "/ecosystem/real-estate-services"
      },
      {
        name: "Quản lý và vận hành",
        href: "/ecosystem/management-operation"
      }
    ];
  }
  if (nameCurent == "/news" || nameCurent == "/news/market-news" || nameCurent == "/news/pi-group-news" || nameCurent == "/news/bidding-news") {
    navItems = [
      {
        name: "Tin thị trường",
        href: "/news/market-news"
      },
      {
        name: "Tin Pi Group",
        href: "/news/pi-group-news"
      },
      {
        name: "Tin đấu thầu",
        href: "/news/bidding-news"
      }
    ];
  }
  if (nameCurent == "/work-culture") {
    navItems = [
      {
        name: "Văn hóa làm việc",
        href: "/work-culture"
      },
      {
        name: "Phúc lợi và Đào tạo",
        href: "#work-culture"
      },
      {
        name: "Quy trình và hình thức tuyển dụng",
        href: "#work-culture"
      },
      {
        name: "Vị trí tuyển dụng",
        href: "#work-culture"
      }
    ];
  }
  return (
    navItems.length ? (
      <div className={`w-full  ${(hasShadow || pageCurent) ? 'bg-gray-3 shadow-lg' : 'bg-transparent text-white'}`} >
        <div className="container mx-auto max-w-[1755px] px-[10px]">
          <ul className="flex flex-wrap space-x-6 uppercase gap-[38px] py-[8px]">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={`text-[16px] font-medium hover:text-yellow-1 ${nameCurent === item.href ? 'text-yellow-1' : ''}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : (
      null
    )
  )
}
'use client';
import Link from "next/link"
interface PropSub {
  hasShadow: boolean;
  pageCurent: boolean;
  nameCurent: string;
}
export default function SubNavbar(props: PropSub) {
  const { hasShadow, pageCurent, nameCurent } = props;
  console.log(props);
  let navItems: { name: string, href: string }[] = [];
  const ecosystem = ['ecosystem'];
  const news = ['news','market-news','pi-group-news','bidding-news']; 
  const workculture = ['work-culture'];
  if (ecosystem.includes(nameCurent.split("/").pop() || "")) {
    navItems = [
      {
        name: "Đầu tư và phát triển dự án",
        href: "/ecosystem/investment-development"
      },
      {
        name: "Dịch vụ bất động sản",
        href: "/ecosystem/real-estate-services"
      },
      {
        name: "Quản lý và vận hành",
        href: "/ecosystem/management-operation"
      }
    ];
  }
  if (news.includes(nameCurent.split("/").pop() || "")) {
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
  if (workculture.includes(nameCurent.split("/").pop() || "")) {
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
    (Array.isArray(navItems) && navItems.length) ? (
      <div className={`w-full hidden xl:block ${(hasShadow || pageCurent) ? 'bg-gray-3 border-white-1 border-b-[1px]' : 'xl:hidden'}`} >
        <div className="container mx-auto max-w-[91.4%]">
          <ul className="flex flex-wrap space-x-6 justify-center gap-[38px] py-[8px]">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={`text-[16px] font-regular hover:text-yellow-1 ${nameCurent === item.href ? 'text-yellow-1' : ''}`}>
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
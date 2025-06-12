'use client';
import Link from "next/link"
import { useScrollRefs } from '@/context/ScrollRefsContext'
interface PropSub {
  hasShadow: boolean;
  pageCurent: boolean;
  nameCurent: string;
}
export default function SubNavbar(props: PropSub) {
  const { nameCurent } = props;
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef } = useScrollRefs();
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const targetPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500; // 500ms
    let startTime: number | null = null;
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    requestAnimationFrame(animation);
  };
  let navItems: { name: string, href: string, hrefb?: React.RefObject<HTMLDivElement | null> | undefined }[] = [];
  const ecosystem = ['ecosystem', 'investment-development', 'real-estate-services', 'management-operation'];
  const news = ['news', 'market-news', 'pi-group-news', 'bidding-news'];
  const humanresource = ['human-resource'];
  const digitalcity = ['digitalcity'];
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
  if (humanresource.includes(nameCurent.split("/").pop() || "")) {
    navItems = [
      {
        name: "Văn hóa làm việc",
        href: "#human-resource",
        hrefb: oneRef
      },
      {
        name: "Phúc lợi và Đào tạo",
        href: "#human-resource",
        hrefb: twoRef
      },
      {
        name: "Quy trình và hình thức tuyển dụng",
        href: "#human-resource",
        hrefb: threeRef
      },
      {
        name: "Vị trí tuyển dụng",
        href: "#human-resource",
        hrefb: fourRef
      }
    ];
  }
  if (digitalcity.includes(nameCurent.split("/").pop() || "")) {
    navItems = [
      {
        name: "Picity - Đô thị số",
        href: "#digitalcity",
        hrefb: oneRef
      },
      {
        name: "Công nghệ 4.0",
        href: "#digitalcity",
        hrefb: twoRef
      },
      {
        name: "Độc quyền Picity App",
        href: "#digitalcity",
        hrefb: threeRef
      },
      {
        name: "Tiện ích 5★",
        href: "#digitalcity",
        hrefb: fourRef
      },
      {
        name: "Dịch vụ quản lý",
        href: "#digitalcity",
        hrefb: fiveRef
      },
      {
        name: "Giá trị vượt trội",
        href: "#digitalcity",
        hrefb: sixRef
      },
      {
        name: "Dự án thành công",
        href: "#digitalcity",
        hrefb: seventRef
      }
    ];
  }
  return (
    (Array.isArray(navItems) && navItems.length) ? (
      <div className={`w-full hidden xl:block bg-gray-3 border-white-1 border-b-[1px]`} >
        <div className="container mx-auto max-w-[91.4%]">
          <ul className="flex flex-wrap space-x-6 justify-center gap-[38px] py-[8px] text-gray-5">
            {navItems.map((item) => (
              item.hrefb ? (
                <button onClick={() => scrollTo(item.hrefb!)} key={item.name} className={`text-[16px] font-regular hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1`}>
                  {item.name}
                </button>
              ) : (
                <li key={item.name}>
                  <Link href={item.href} className={`text-[16px] font-regular hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1`}>
                    {item.name}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    ) : (
      null
    )
  )
}
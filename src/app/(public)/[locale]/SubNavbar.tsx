'use client';
import Link from 'next/link';
import { useScrollRefs } from '@/context/ScrollRefsContext';
import CategoryAndPostSearch from '@/components/search/CategoryAndPostSearch';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react'; // Import useRef

interface PropSub {
  hasShadow: boolean;
  pageCurent: boolean;
  nameCurent: string;
}

export default function SubNavbar(props: PropSub) {
  const { nameCurent } = props;
  const pathname = usePathname();
  let myArray = pathname.split('/');
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef } =
    useScrollRefs();

  const [isFixed, setIsFixed] = useState(false);
  const scrollThreshold = 100; // Ngưỡng cuộn để bắt đầu xem xét fixed menu.
                               // Đặt giá trị này thấp hơn một chút so với header chính để menu phụ xuất hiện mượt mà.
  const prevScrollY = useRef(0); // Dùng useRef để lưu trữ vị trí cuộn trước đó
                                 // mà không gây re-render khi nó thay đổi

  useEffect(() => {
    const handleScroll = () => {
      // Chỉ áp dụng logic này cho màn hình PC
      if (typeof window === 'undefined' || window.innerWidth < 1024) {
        // Đảm bảo không fixed trên mobile hoặc nếu cửa sổ chưa định nghĩa
        if (isFixed) setIsFixed(false);
        prevScrollY.current = window.scrollY; // Cập nhật luôn prevScrollY ngay cả trên mobile
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > prevScrollY.current;
      const scrollingUp = currentScrollY < prevScrollY.current;

      // Logic fixed menu
      if (currentScrollY > scrollThreshold) {
        if (scrollingDown && !isFixed) {
          // Chỉ fixed khi cuộn xuống và đã vượt qua ngưỡng
          setIsFixed(true);
        } else if (scrollingUp && isFixed) {
          // Chỉ unfix khi cuộn lên và đang ở trạng thái fixed
          setIsFixed(false);
        }
      } else {
        // Nếu cuộn lên trên ngưỡng, luôn unfix
        if (isFixed) {
          setIsFixed(false);
        }
      }
      
      prevScrollY.current = currentScrollY; // Luôn cập nhật vị trí cuộn trước đó
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]); // isFixed vẫn là dependency vì nó ảnh hưởng đến điều kiện của handleScroll

  const isActive = (path: string) => {
    // Để active chính xác hơn cho các đường dẫn có slug ở cuối,
    // bạn có thể so sánh toàn bộ pathname hoặc thêm logic cụ thể hơn.
    // Hiện tại, nó so sánh nameCurent với phần cuối cùng của path.
    // Đảm bảo nameCurent được truyền vào là phần cuối của URL.
    return nameCurent === path.split('/').pop();
  };

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    // Điều chỉnh offset nếu menu đã fixed
    // Offset này sẽ trừ đi chiều cao của sub-navbar khi nó fixed
    // để nội dung không bị che khuất
    const subNavbarHeight = 50; // Ước tính chiều cao của sub-navbar khi fixed (ví dụ: h-[50px] nếu bạn có)
    const offset = isFixed ? subNavbarHeight : 0; 

    const targetPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
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
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    requestAnimationFrame(animation);
  };

  let navItems: {
    name: string;
    href: string;
    hrefb?: React.RefObject<HTMLDivElement | null> | undefined;
  }[] = [];

  const ecosystem = [
    'ecosystem',
    'investment-development',
    'real-estate-services',
    'management-operation'
  ];
  const news = ['news', 'tin-thi-truong', 'tin-pi-group', 'tin-dau-thau'];
  const humanresource = ['human-resource'];
  const about = ['about'];
  const digitalcity = ['digitalcity'];

  // Logic để xác định navItems dựa trên nameCurent
  // (Đảm bảo nameCurent được truyền vào là slug cuối cùng của URL)
  const currentSlug = nameCurent.split('/').pop() || '';

  if (about.includes(currentSlug)) {
    navItems = [
      {
        name: 'Định vị thương hiệu',
        href: '#about',
        hrefb: oneRef
      },
      {
        name: 'Con số ấn tượng',
        href: '#about',
        hrefb: twoRef
      },
      {
        name: 'Lịch sử hình thành',
        href: '#about',
        hrefb: threeRef
      },
      {
        name: 'Triết lý kinh doanh',
        href: '#about',
        hrefb: fourRef
      },
      {
        name: 'Tầm nhìn - Sứ mệnh',
        href: '#about',
        hrefb: fiveRef
      },
      {
        name: 'Văn hóa doanh nghiệp',
        href: '#about',
        hrefb: sixRef
      },
      {
        name: 'Hồ sơ năng lực',
        href: '#about',
        hrefb: seventRef
      }
    ];
  } else if (news.includes(currentSlug) || myArray[2] === 'posts') {
    navItems = [
      {
        name: 'Tin thị trường',
        href: '/categories/tin-thi-truong'
      },
      {
        name: 'Tin Pi Group',
        href: '/categories/tin-pi-group'
      },
      {
        name: 'Tin đấu thầu',
        href: '/categories/tin-dau-thau'
      }
    ];
  } else if (ecosystem.includes(currentSlug)) {
    navItems = [
      {
        name: 'Đầu tư & Phát triển dự án',
        href: '/ecosystem/investment-development'
      },
      {
        name: 'Dịch vụ Bất động sản',
        href: '/ecosystem/real-estate-services'
      },
      {
        name: 'Quản lý & Vận hành',
        href: '/ecosystem/management-operation'
      }
    ];
  } else if (humanresource.includes(currentSlug)) {
    navItems = [
      {
        name: 'Văn hóa làm việc',
        href: '',
        hrefb: oneRef
      },
      {
        name: 'Phúc lợi & Đào tạo',
        href: '',
        hrefb: twoRef
      },
      {
        name: 'Hình thức tuyển dụng',
        href: '',
        hrefb: threeRef
      },
      {
        name: 'Vị trí tuyển dụng',
        href: '',
        hrefb: fourRef
      }
    ];
  } else if (digitalcity.includes(currentSlug)) {
    navItems = [
      {
        name: 'Picity - Đô thị số',
        href: '',
        hrefb: oneRef
      },
      {
        name: 'Công nghệ 4.0',
        href: '',
        hrefb: twoRef
      },
      {
        name: 'Độc quyền Picity App',
        href: '',
        hrefb: threeRef
      },
      {
        name: 'Tiện ích 5★',
        href: '',
        hrefb: fourRef
      },
      {
        name: 'Dịch vụ quản lý',
        href: '',
        hrefb: fiveRef
      },
      {
        name: 'Giá trị vượt trội',
        href: '',
        hrefb: sixRef
      },
      {
        name: 'Dự án thành công',
        href: '',
        hrefb: seventRef
      }
    ];
  }

  return Array.isArray(navItems) && navItems.length ? (
    <div
      className={`
        w-full hidden xl:block bg-gray-3 border-white-1 border-b-[1px] transition-all duration-300
        ${isFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'}
      `}
    >
      <div className="relative mx-auto w-full px-[30px] sm:px-0 sm:max-w-[85%]">
        {['tin-thi-truong', 'tin-pi-group', 'tin-dau-thau', 'news'].includes(
          nameCurent
        ) || myArray[2] === 'posts' ? (
          <CategoryAndPostSearch />
        ) : null}
        <ul className="flex flex-wrap space-x-2 ef:space-x-6 justify-center gap-[38px] ef:gap-[38px] py-[3px] text-gray-5">
          {navItems.map((item) =>
            item.hrefb ? (
              <li key={item.name}>
                <button
                  onClick={() => scrollTo(item.hrefb!)}
                  key={item.name}
                  className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${isActive(item.href) ? 'text-yellow-1' : ''}`}
                >
                  {item.name}
                </button>
              </li>
            ) : (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${isActive(item.href) ? 'text-yellow-1' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  ) : null;
}
'use client';
import Link from 'next/link';
import {useScrollRefs} from '@/context/ScrollRefsContext';
import CategoryAndPostSearch from '@/components/search/CategoryAndPostSearch';
import {usePathname} from 'next/navigation';
import { useState, useEffect } from 'react'; // Import useState và useEffect
interface PropSub {
  hasShadow: boolean;
  pageCurent: boolean;
  nameCurent: string;
}
export default function SubNavbar(props: PropSub) {
  const {nameCurent} = props;
  const pathname = usePathname();
  let myArray = pathname.split('/');
  const {oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef} =
    useScrollRefs();

  // Thêm state để kiểm soát việc fixed menu
  const [isFixed, setIsFixed] = useState(false);
  const scrollThreshold = 70; // Ngưỡng cuộn để fixed menu

  useEffect(() => {
    // Chỉ áp dụng logic này cho màn hình PC (hoặc thiết bị có hover, nếu bạn có media query)
    // Để đơn giản, tôi sẽ chỉ kiểm tra chiều rộng màn hình hoặc nếu là trình duyệt (không phải mobile view)
    const handleScroll = () => {
      // Chỉ chạy trên client side
      if (window.innerWidth >= 1024) { // Giả định xl:block tương ứng với width >= 1024px
        if (window.scrollY > scrollThreshold && !isFixed) {
          setIsFixed(true);
        } else if (window.scrollY <= scrollThreshold && isFixed) {
          setIsFixed(false);
        }
      } else {
        // Đảm bảo không fixed trên mobile nếu bạn không muốn
        if (isFixed) setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function để gỡ bỏ event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]); // Dependency array: chỉ chạy lại effect khi isFixed thay đổi
  
  
  const isActive = (path: string) => {
    return nameCurent === path.split('/').pop();
  };
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const offset = isFixed ? 50 : 0; // Điều chỉnh offset nếu menu đã fixed (để nội dung không bị che)
    const targetPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset;
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
  if (about.includes(nameCurent.split('/').pop() || '')) {
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
        name: 'Lịch sử hình thành',
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
  }
  if (
    news.includes(nameCurent.split('/').pop() || '') ||
    myArray[2] === 'posts'
  ) {
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
  }
  if (ecosystem.includes(nameCurent.split('/').pop() || '')) {
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
  }
  if (humanresource.includes(nameCurent.split('/').pop() || '')) {
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
  }
  if (digitalcity.includes(nameCurent.split('/').pop() || '')) {
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
        name: 'Dịch vụ quản lý',
        href: '',
        hrefb: fiveRef
      },
      {
        name: 'Giá trị vượt trội',
        href: '',
        hrefb: sixRef
      },
      {
        name: 'Dự án thành công',
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

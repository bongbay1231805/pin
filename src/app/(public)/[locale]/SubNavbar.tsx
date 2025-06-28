// components/news/SubNavbar.tsx
'use client';

import Link from 'next/link';
import { useScrollRefs } from '@/context/ScrollRefsContext';
import CategoryAndPostSearch from '@/components/search/CategoryAndPostSearch';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useNewsCategory } from '@/context/NewsCategoryContext'; // Import hook từ Context

interface PropSub {
  hasShadow: boolean;
  pageCurent: boolean;
  nameCurent: string; // nameCurent ở đây vẫn có thể là slug của trang chính (news, about...)
}

export default function SubNavbar(props: PropSub) {
  const { nameCurent } = props;
  const pathname = usePathname();
  let myArray = pathname.split('/');
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef } =
    useScrollRefs();

  // Lấy currentCategorySlug từ Context
  const { currentCategorySlug } = useNewsCategory(); 

  const [isFixed, setIsFixed] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scrollThreshold = 100;
  const prevScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Định nghĩa hàm scrollTo tại đây
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined' || window.innerWidth < 1024) {
        if (isFixed) setIsFixed(false);
        prevScrollY.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > prevScrollY.current;
      const scrollingUp = currentScrollY < prevScrollY.current;

      if (currentScrollY > scrollThreshold) {
        if (scrollingDown && !isFixed) {
          setIsFixed(true);
        } else if (scrollingUp && isFixed) {
          setIsFixed(false);
        }
      } else {
        if (isFixed) {
          setIsFixed(false);
        }
      }

      prevScrollY.current = currentScrollY;

      const subNavbarHeight = menuRef.current?.offsetHeight || 60;
      const buffer = 80;
      const scrollOffset = subNavbarHeight + buffer;

      let newActiveSection = '';

      // Vòng lặp này cần truy cập `navItems` sau khi nó được định nghĩa
      // Để tránh lỗi runtime, chúng ta nên đảm bảo `navItems` đã có giá trị
      // khi `handleScroll` được gọi lần đầu hoặc khi `useEffect` này chạy.
      // Tuy nhiên, với logic hiện tại, `navItems` được định nghĩa trong render cycle.
      // Cách tốt nhất là tái cấu trúc `handleScroll` hoặc `navItems` để đảm bảo tính khả dụng.
      // Tạm thời, tôi sẽ giữ nguyên để tập trung vào lỗi scrollTo.

      // Chú ý: `navItems` được định nghĩa sau `useEffect`. Điều này có thể gây ra lỗi runtime
      // nếu `handleScroll` được gọi trước khi `navItems` có giá trị.
      // Giải pháp tốt hơn là đưa `navItems` vào state hoặc memoize nó.
      // Tuy nhiên, để sửa lỗi type hiện tại, chúng ta tập trung vào `scrollTo`.

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        if (item.hrefb?.current) {
          const section = item.hrefb.current;
          const sectionTop = section.getBoundingClientRect().top;

          if (sectionTop <= scrollOffset) {
            newActiveSection = item.name;
            break;
          }
        }
      }

      const firstScrollItem = navItems.find((item) => item.hrefb);
      if (newActiveSection === '' && firstScrollItem) {
        newActiveSection = firstScrollItem.name;
      }

      if (activeSection !== newActiveSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]); // Thêm activeSection và navItems vào dependencies nếu bạn đưa chúng vào state hoặc memoized

  const isActive = (itemHref: string) => {
    const itemSlug = itemHref.split('/').pop(); 
    
    const isPostDetailPage = myArray[1] === 'posts' || myArray[2] === 'posts';

    if (isPostDetailPage) {
      return currentCategorySlug === itemSlug;
    }
    return nameCurent === itemSlug;
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

  const currentSlugFromPathname = pathname.split('/').pop() || '';

  if (about.includes(currentSlugFromPathname)) {
    navItems = [
      { name: 'Định vị thương hiệu', href: '#about', hrefb: oneRef },
      { name: 'Con số ấn tượng', href: '#about', hrefb: twoRef },
      { name: 'Lịch sử hình thành', href: '#about', hrefb: threeRef },
      { name: 'Triết lý kinh doanh', href: '#about', hrefb: fourRef },
      { name: 'Tầm nhìn - Sứ mệnh', href: '#about', hrefb: fiveRef },
      { name: 'Văn hóa doanh nghiệp', href: '#about', hrefb: sixRef },
      { name: 'Hồ sơ năng lực', href: '#about', hrefb: seventRef }
    ];
  } else if (
    news.includes(currentSlugFromPathname) || 
    myArray.includes('posts') 
  ) {
    navItems = [
      { name: 'Tin thị trường', href: '/categories/tin-thi-truong' },
      { name: 'Tin Pi Group', href: '/categories/tin-pi-group' },
      { name: 'Tin đấu thầu', href: '/categories/tin-dau-thau' }
    ];
  } else if (ecosystem.includes(currentSlugFromPathname)) {
    navItems = [
      {
        name: 'Đầu tư & Phát triển dự án',
        href: '/ecosystem/investment-development'
      },
      { name: 'Dịch vụ Bất động sản', href: '/ecosystem/real-estate-services' },
      { name: 'Quản lý & Vận hành', href: '/ecosystem/management-operation' }
    ];
  } else if (humanresource.includes(currentSlugFromPathname)) {
    navItems = [
      { name: 'Văn hóa làm việc', href: '', hrefb: oneRef },
      { name: 'Phúc lợi & Đào tạo', href: '', hrefb: twoRef },
      { name: 'Hình thức tuyển dụng', href: '', hrefb: threeRef },
      { name: 'Vị trí tuyển dụng', href: '', hrefb: fourRef }
    ];
  } else if (digitalcity.includes(currentSlugFromPathname)) {
    navItems = [
      { name: 'Picity - Đô thị số', href: '', hrefb: oneRef },
      { name: 'Công nghệ 4.0', href: '', hrefb: twoRef },
      { name: 'Độc quyền Picity App', href: '', hrefb: threeRef },
      { name: 'Tiện ích 5★', href: '', hrefb: fourRef },
      { name: 'Dịch vụ quản lý', href: '', hrefb: fiveRef },
      { name: 'Giá trị vượt trội', href: '', hrefb: sixRef },
      { name: 'Dự án thành công', href: '', hrefb: seventRef }
    ];
  }

  const shouldShowEcosystemMobileSubmenu = ecosystem.includes(currentSlugFromPathname);
  const hasNavItemsToDisplay = Array.isArray(navItems) && navItems.length;

  return hasNavItemsToDisplay ? (
    <div
      className={`
        w-full bg-gray-3 border-white-1 border-b-[1px] transition-all duration-300
        ${isFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'}
      `}
      ref={menuRef}
    >
      <div className="relative mx-auto w-full px-[30px] sm:px-0 sm:max-w-[85%]">
        {/* Điều kiện hiển thị CategoryAndPostSearch */}
        {(news.includes(currentSlugFromPathname) || myArray.includes('posts')) && (
          <CategoryAndPostSearch />
        )}

        <ul className="hidden xl:flex flex-wrap space-x-2 ef:space-x-6 justify-center gap-[38px] ef:gap-[38px] py-[3px] text-gray-5">
          {navItems.map((item) =>
            item.hrefb ? (
              <li key={item.name}>
                {/* Gọi hàm scrollTo đã định nghĩa */}
                <button
                  onClick={() => scrollTo(item.hrefb!)}
                  className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${
                    activeSection === item.name ? 'text-yellow-1' : ''
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ) : (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${
                    isActive(item.href) ? 'text-yellow-1' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>

        {shouldShowEcosystemMobileSubmenu && (
          <ul className="xl:hidden flex overflow-x-auto whitespace-nowrap py-[3px] px-[10px] text-gray-5 scrollbar-hide">
            {navItems.map((item) =>
              item.hrefb ? (
                <li key={item.name} className="flex-shrink-0 mx-2">
                  {/* Gọi hàm scrollTo đã định nghĩa */}
                  <button
                    onClick={() => scrollTo(item.hrefb!)}
                    className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${
                      activeSection === item.name ? 'text-yellow-1' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : (
                <li key={item.name} className="flex-shrink-0 mx-2">
                  <Link
                    href={item.href}
                    className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${
                      isActive(item.href) ? 'text-yellow-1' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  ) : null;
}
'use client';
import Link from 'next/link';
import { useScrollRefs } from '@/context/ScrollRefsContext';
import CategoryAndPostSearch from '@/components/search/CategoryAndPostSearch';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State mới để kiểm soát menu dropdown
  const scrollThreshold = 100;
  const prevScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement | null>(null); // Ref cho container của dropdown để xử lý click ngoài

  // Logic đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleScroll = () => {
      // Chỉ áp dụng logic này cho màn hình PC
      if (typeof window === 'undefined' || window.innerWidth < 1024) {
        if (isFixed) setIsFixed(false);
        // Đóng menu mobile khi cuộn trên mobile để tránh lỗi hiển thị
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
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
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed, isMobileMenuOpen]); // Thêm isMobileMenuOpen vào dependency

  const isActive = (path: string) => {
    return nameCurent === path.split('/').pop();
  };

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    const subNavbarHeight = 50;
    const offset = isFixed ? subNavbarHeight : 0;

    const targetPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500;
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
    setIsMobileMenuOpen(false); // Đóng menu sau khi click vào một mục
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

  const currentSlug = nameCurent.split('/').pop() || '';

  if (about.includes(currentSlug)) {
    navItems = [
      { name: 'Định vị thương hiệu', href: '#about', hrefb: oneRef },
      { name: 'Con số ấn tượng', href: '#about', hrefb: twoRef },
      { name: 'Lịch sử hình thành', href: '#about', hrefb: threeRef },
      { name: 'Triết lý kinh doanh', href: '#about', hrefb: fourRef },
      { name: 'Tầm nhìn - Sứ mệnh', href: '#about', hrefb: fiveRef },
      { name: 'Văn hóa doanh nghiệp', href: '#about', hrefb: sixRef },
      { name: 'Hồ sơ năng lực', href: '#about', hrefb: seventRef }
    ];
  } else if (news.includes(currentSlug) || myArray[2] === 'posts') {
    navItems = [
      { name: 'Tin thị trường', href: '/categories/tin-thi-truong' },
      { name: 'Tin Pi Group', href: '/categories/tin-pi-group' },
      { name: 'Tin đấu thầu', href: '/categories/tin-dau-thau' }
    ];
  } else if (ecosystem.includes(currentSlug)) {
    navItems = [
      { name: 'Đầu tư & Phát triển dự án', href: '/ecosystem/investment-development' },
      { name: 'Dịch vụ Bất động sản', href: '/ecosystem/real-estate-services' },
      { name: 'Quản lý & Vận hành', href: '/ecosystem/management-operation' }
    ];
  } else if (humanresource.includes(currentSlug)) {
    navItems = [
      { name: 'Văn hóa làm việc', href: '', hrefb: oneRef },
      { name: 'Phúc lợi & Đào tạo', href: '', hrefb: twoRef },
      { name: 'Hình thức tuyển dụng', href: '', hrefb: threeRef },
      { name: 'Vị trí tuyển dụng', href: '', hrefb: fourRef }
    ];
  } else if (digitalcity.includes(currentSlug)) {
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

  return Array.isArray(navItems) && navItems.length ? (
    <div
      className={`
        w-full bg-gray-3 border-white-1 border-b-[1px] transition-all duration-300
        ${isFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'}
      `}
      ref={menuRef} // Gán ref cho div cha để bắt sự kiện click ngoài
    >
      <div className="relative mx-auto w-full px-[30px] sm:px-0 sm:max-w-[85%]">
        {['tin-thi-truong', 'tin-pi-group', 'tin-dau-thau', 'news'].includes(
          nameCurent
        ) || myArray[2] === 'posts' ? (
          <CategoryAndPostSearch />
        ) : null}

        {/* --- Phần hiển thị cho Desktop --- */}
        <ul className="hidden xl:flex flex-wrap space-x-2 ef:space-x-6 justify-center gap-[38px] ef:gap-[38px] py-[3px] text-gray-5">
          {navItems.map((item) =>
            item.hrefb ? (
              <li key={item.name}>
                <button
                  onClick={() => scrollTo(item.hrefb!)}
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

        {/* --- Phần hiển thị cho Mobile (Dropdown) --- */}
        <div className="xl:hidden py-2 flex items-center justify-between">
          <span className="text-[14px] font-bold text-gray-5">
            {navItems[0]?.name || 'Menu'} {/* Hiển thị tên mục đầu tiên hoặc 'Menu' */}
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-5 hover:text-yellow-1 focus:outline-none"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            aria-label="Toggle mobile menu"
          >
            {/* Biểu tượng Mũi tên */}
            {isMobileMenuOpen ? (
              // Mũi tên hướng lên khi menu mở (hoặc mũi tên chỉ sang trái/phải nếu bạn muốn biểu thị quay lại/tiếp tục)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7" // Biểu tượng mũi tên lên
                />
              </svg>
            ) : (
              // Mũi tên hướng xuống khi menu đóng
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7" // Biểu tượng mũi tên xuống
                />
              </svg>
            )}
          </button>
        </div>

        {/* Nội dung Dropdown Menu */}
        {isMobileMenuOpen && (
          <ul className="xl:hidden absolute top-full left-0 w-full bg-gray-3 border-t-[1px] border-white-1 py-2 shadow-lg z-40">
            {navItems.map((item) =>
              item.hrefb ? (
                <li key={item.name}>
                  <button
                    onClick={() => scrollTo(item.hrefb!)}
                    className={`block w-full text-left px-4 py-2 text-[14px] font-regular hover:bg-gray-2 hover:text-yellow-1 ${isActive(item.href) ? 'text-yellow-1' : 'text-gray-5'}`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)} // Đóng menu sau khi click vào Link
                    className={`block px-4 py-2 text-[14px] font-regular hover:bg-gray-2 hover:text-yellow-1 ${isActive(item.href) ? 'text-yellow-1' : 'text-gray-5'}`}
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
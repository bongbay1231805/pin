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
  // Không cần isMobileMenuOpen nữa
  const [activeSection, setActiveSection] = useState(''); // State để theo dõi section active
  const scrollThreshold = 100;
  const prevScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement | null>(null); // Ref cho container của submenu

  // Logic đóng menu khi click ra ngoài (Không cần thiết nếu không có dropdown)
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setIsMobileMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [menuRef]);

  useEffect(() => {
    const handleScroll = () => {
      // Chỉ áp dụng logic này cho màn hình PC
      if (typeof window === 'undefined' || window.innerWidth < 1024) {
        if (isFixed) setIsFixed(false);
        // isMobileMenuOpen không còn được sử dụng ở đây nữa
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

      // --- LOGIC SCROLL-SPY ĐÃ CẢI TIẾN ---
      const subNavbarHeight = menuRef.current?.offsetHeight || 60; // Lấy chiều cao thực tế, fallback là 60
      const buffer = 80; // Khoảng đệm bạn muốn bên dưới submenu
      const scrollOffset = subNavbarHeight + buffer;

      let newActiveSection = '';

      // Lặp qua các mục theo thứ tự ngược. Đây là cách làm ổn định nhất.
      // Nó sẽ tìm section cuối cùng đã vượt qua "vạch kích hoạt".
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        if (item.hrefb?.current) {
          const section = item.hrefb.current;
          const sectionTop = section.getBoundingClientRect().top;

          if (sectionTop <= scrollOffset) {
            newActiveSection = item.name;
            break; // Đã tìm thấy section active, thoát vòng lặp
          }
        }
      }

      // Nếu cuộn lên trên cùng và không có section nào active, hãy active section đầu tiên
      const firstScrollItem = navItems.find((item) => item.hrefb);
      if (newActiveSection === '' && firstScrollItem) {
        newActiveSection = firstScrollItem.name;
      }

      // Chỉ cập nhật state nếu thực sự có thay đổi
      if (activeSection !== newActiveSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]); // isMobileMenuOpen đã bị xóa khỏi dependency

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
    // setIsMobileMenuOpen(false); // Không cần đóng menu nữa
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
      {
        name: 'Đầu tư & Phát triển dự án',
        href: '/ecosystem/investment-development'
      },
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

  // Logic kiểm tra điều kiện hiển thị cho mobile submenu (ecosystem)
  const shouldShowEcosystemMobileSubmenu = ecosystem.includes(currentSlug);
  // Logic kiểm tra xem có bất kỳ navItems nào được định nghĩa để hiển thị navbar không
  const hasNavItemsToDisplay = Array.isArray(navItems) && navItems.length;

  return hasNavItemsToDisplay ? (
    <div
      className={`
        w-full bg-gray-3 border-white-1 border-b-[1px] transition-all duration-300
        ${isFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'}
      `}
      ref={menuRef} // Gán ref cho div cha
    >
      <div className="relative mx-auto w-full px-[30px] sm:px-0 sm:max-w-[85%]">
        {/* CategoryAndPostSearch chỉ hiển thị khi cần */}
        {['tin-thi-truong', 'tin-pi-group', 'tin-dau-thau', 'news'].includes(
          nameCurent
        ) || myArray[2] === 'posts' ? (
          <CategoryAndPostSearch />
        ) : null}

        {/* --- Phần hiển thị cho Desktop (xl:flex) --- */}
        <ul className="hidden xl:flex flex-wrap space-x-2 ef:space-x-6 justify-center gap-[38px] ef:gap-[38px] py-[3px] text-gray-5">
          {navItems.map((item) =>
            item.hrefb ? (
              <li key={item.name}>
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

        {/* --- Phần hiển thị cho Mobile (có thể cuộn ngang) --- */}
        {/* Chỉ hiển thị ul này nếu shouldShowEcosystemMobileSubmenu là true và trên mobile */}
        {shouldShowEcosystemMobileSubmenu && (
          <ul className="xl:hidden flex overflow-x-auto whitespace-nowrap py-[3px] px-[10px] text-gray-5 scrollbar-hide">
            {navItems.map((item) =>
              item.hrefb ? (
                <li key={item.name} className="flex-shrink-0 mx-2">
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
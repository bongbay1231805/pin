// components/news/SubNavbar.tsx
'use client';

import Link from 'next/link';
import { useScrollRefs } from '@/context/ScrollRefsContext';
import CategoryAndPostSearch from '@/components/search/CategoryAndPostSearch';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, RefObject } from 'react';
import { useNewsCategory } from '@/context/NewsCategoryContext';

interface PropSub {
  hasShadow: boolean;
  pageCurent: boolean;
  nameCurent: string;
}

interface NavItemWithRef {
  name: string;
  href: string;
  hrefb: RefObject<HTMLDivElement | null>;
}

interface NavItemWithoutRef {
  name: string;
  href: string;
}

type NavItem = NavItemWithRef | NavItemWithoutRef;

const ECOSYSTEM_SLUGS = [
  'ecosystem',
  'investment-development',
  'real-estate-services',
  'management-operation',
];
const NEWS_SLUGS = ['news', 'tin-thi-truong', 'tin-pi-group', 'tin-dau-thau', 'search'];
const HUMAN_RESOURCE_SLUGS = ['human-resource'];
const ABOUT_SLUGS = ['about'];
const DIGITAL_CITY_SLUGS = ['digitalcity'];

export default function SubNavbar(props: PropSub) {
  const { nameCurent } = props;
  const pathname = usePathname();
  let myArray = pathname.split('/');
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef } =
    useScrollRefs();

  const { currentCategorySlug } = useNewsCategory();

  const [isFixed, setIsFixed] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scrollThreshold = 100;
  const prevScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (ref: RefObject<HTMLDivElement | null>) => {
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

      const currentNavItems: NavItem[] = getNavItems(pathname, myArray, currentCategorySlug || '', { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef });

      for (let i = currentNavItems.length - 1; i >= 0; i--) {
        const item = currentNavItems[i];
        if ('hrefb' in item && item.hrefb?.current) {
          const section = item.hrefb.current;
          const sectionTop = section.getBoundingClientRect().top;

          if (sectionTop <= scrollOffset) {
            newActiveSection = item.name;
            break;
          }
        }
      }

      const firstScrollItem = currentNavItems.find((item): item is NavItemWithRef => 'hrefb' in item && item.hrefb !== undefined);
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
  }, [isFixed, pathname, currentCategorySlug]);

  const isActive = (itemHref: string) => {
    const itemSlug = itemHref.split('/').pop();

    const isPostDetailPage = myArray[1] === 'posts' || myArray[2] === 'posts';
    const isSearchPage = myArray[myArray.length - 1] === 'search';

    if (isPostDetailPage || NEWS_SLUGS.includes(myArray[myArray.length - 1] || '')) {
        if (itemHref.includes('/categories/')) {
            return (currentCategorySlug || '') === itemSlug;
        }
        return false;
    }

    if (isSearchPage) {
      return false;
    }

    return nameCurent === itemSlug;
  };

  const getNavItems = (
    pathname: string,
    myArray: string[],
    currentCategorySlug: string,
    refs: ReturnType<typeof useScrollRefs>
  ): NavItem[] => {
    const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef } = refs;
    const currentSlugFromPathname = pathname.split('/').pop() || '';

    if (ABOUT_SLUGS.includes(currentSlugFromPathname)) {
      return [
        { name: 'Định vị thương hiệu', href: '#about', hrefb: oneRef },
        { name: 'Con số ấn tượng', href: '#about', hrefb: twoRef },
        { name: 'Lịch sử hình thành', href: '#about', hrefb: threeRef },
        { name: 'Triết lý kinh doanh', href: '#about', hrefb: fourRef },
        { name: 'Tầm nhìn - Sứ mệnh', href: '#about', hrefb: fiveRef },
        { name: 'Văn hóa doanh nghiệp', href: '#about', hrefb: sixRef },
        { name: 'Hồ sơ năng lực', href: '#about', hrefb: seventRef },
      ];
    } else if (NEWS_SLUGS.includes(currentSlugFromPathname) || myArray.includes('posts')) {
      return [
        { name: 'Tin thị trường', href: '/categories/tin-thi-truong' },
        { name: 'Tin Pi Group', href: '/categories/tin-pi-group' },
        { name: 'Tin đấu thầu', href: '/categories/tin-dau-thau' },
      ];
    } else if (ECOSYSTEM_SLUGS.includes(currentSlugFromPathname)) {
      return [
        {
          name: 'Đầu tư & Phát triển dự án',
          href: '/ecosystem/investment-development',
        },
        { name: 'Dịch vụ Bất động sản', href: '/ecosystem/real-estate-services' },
        { name: 'Quản lý & Vận hành', href: '/ecosystem/management-operation' },
      ];
    } else if (HUMAN_RESOURCE_SLUGS.includes(currentSlugFromPathname)) {
      return [
        { name: 'Văn hóa làm việc', href: '', hrefb: oneRef },
        { name: 'Phúc lợi & Đào tạo', href: '', hrefb: twoRef },
        { name: 'Hình thức tuyển dụng', href: '', hrefb: threeRef },
        { name: 'Vị trí tuyển dụng', href: '', hrefb: threeRef },
      ];
    } else if (DIGITAL_CITY_SLUGS.includes(currentSlugFromPathname)) {
      return [
        { name: 'Picity - Đô thị số', href: '', hrefb: oneRef },
        { name: 'Công nghệ 4.0', href: '', hrefb: twoRef },
        { name: 'Độc quyền Picity App', href: '', hrefb: threeRef },
        { name: 'Tiện ích 5★', href: '', hrefb: fourRef },
        { name: 'Dịch vụ quản lý', href: '', hrefb: fiveRef },
        { name: 'Giá trị vượt trội', href: '', hrefb: sixRef },
        { name: 'Dự án thành công', href: '', hrefb: seventRef },
      ];
    }
    return [];
  };

  const navItems = getNavItems(pathname, myArray, currentCategorySlug || '', { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef });

  const hasNavItemsToDisplay = Array.isArray(navItems) && navItems.length > 0;

  // NEW: Điều kiện để hiển thị submenu mobile (chỉ Tin tức và Hệ sinh thái)
  const currentSlugFromPathname = pathname.split('/').pop() || '';
  const shouldShowMobileSubmenu = 
    NEWS_SLUGS.includes(currentSlugFromPathname) || 
    ECOSYSTEM_SLUGS.includes(currentSlugFromPathname) || 
    myArray.includes('posts') || // Bao gồm các trang chi tiết bài viết (thuộc News)
    myArray.includes('search'); // Bao gồm trang tìm kiếm (thuộc News)

    const shouldShowSearchMobileSubmenu = 
    NEWS_SLUGS.includes(currentSlugFromPathname) || 
    // ECOSYSTEM_SLUGS.includes(currentSlugFromPathname) || 
    myArray.includes('posts') || // Bao gồm các trang chi tiết bài viết (thuộc News)
    myArray.includes('search'); // Bao gồm trang tìm kiếm (thuộc News)


  return hasNavItemsToDisplay ? (
    <div
      className={`
        w-full bg-gray-3 border-white-1 border-b-[1px] transition-all duration-300
        ${isFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'}
      `}
      ref={menuRef}
    >
      <div className="relative mx-auto w-full px-[30px] sm:px-0 sm:max-w-[85%]">
        {/* CategoryAndPostSearch on mobile (visible only for news/ecosystem pages on mobile/tablet) */}
        

        {/* Desktop menu */}
        <ul className="hidden xl:flex flex-wrap space-x-2 ef:space-x-6 justify-center gap-[38px] ef:gap-[38px] py-[3px] text-gray-5">
          {navItems.map((item) =>
            'hrefb' in item && item.hrefb ? (
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
          
          {shouldShowSearchMobileSubmenu && ( // Sử dụng điều kiện mới
            <li>
              <div className="hidden sm:flex items-center justify-between px-4 sm:absolute sm:px-0 sm:right-[0px]"> {/* Chỉnh lại breakpoint để khớp với mobile submenu */}
                <CategoryAndPostSearch />
              </div>
            </li>
          )}
          
           
        </ul>

        {/* Mobile submenu (only visible for News/Ecosystem pages on screens smaller than xl) */}
        {shouldShowMobileSubmenu && ( // Sử dụng điều kiện mới để chỉ hiển thị trên mobile cho News/Ecosystem
          <ul className="xl:hidden flex overflow-x-auto whitespace-nowrap py-[3px] px-[10px] text-gray-5 scrollbar-hide bg-gray-3 border-t border-white-1">
            {navItems.map((item) =>
              'hrefb' in item && item.hrefb ? (
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
            
            {shouldShowSearchMobileSubmenu && ( // Sử dụng điều kiện mới
              <li>
              <div className="flex items-center justify-between px-4"> {/* Chỉnh lại breakpoint để khớp với mobile submenu */}
                <CategoryAndPostSearch />
              </div>
              </li>
            )}
            
          </ul>
        )}
      </div>
    </div>
  ) : null;
}
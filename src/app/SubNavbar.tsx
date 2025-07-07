// components/news/SubNavbar.tsx
'use client';

import Link from 'next/link';
import { useScrollRefs } from '@/context/ScrollRefsContext';
import CategoryAndPostSearch from '@/components/search/CategoryAndPostSearch';
import { usePathname, useSearchParams  } from 'next/navigation';
import { useState, useEffect, useRef, RefObject } from 'react';
import { useNewsCategory } from '@/context/NewsCategoryContext';
import { useLocale, useTranslations } from 'next-intl';
import { routeLocales } from '@/routes';

interface PropSub {
  hasShadow: boolean;
  pageCurent: boolean;
  nameCurent: string;
}

interface NavItemWithRef {
  name: string;
  href: string;
  hrefb: RefObject<HTMLDivElement | null>;
  hrefm: RefObject<HTMLDivElement | null>;
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
  'he-sinh-thai',
  'dau-tu-phat-trien-du-an',
  'dich-vu-bat-dong-san',
  'quan-ly-van-hanh'
];
const NEWS_SLUGS = ['news', 'tin-tuc', 'tin-thi-truong', 'tin-pi-group', 'tin-dau-thau', 'search', 'tim-kiem'];
const HUMAN_RESOURCE_SLUGS = ['human-resource', 'phat-trien-nhan-luc'];
const ABOUT_SLUGS = ['about', 'gioi-thieu'];
const DIGITAL_CITY_SLUGS = ['digitalcity', 'do-thi-so'];
const CONTACT_SLUGS = ['digitalcity', 'lien-he'];

export default function SubNavbar(props: PropSub) {
  const { nameCurent } = props;
  const currentLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  const myArray = pathname.split('/');
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef } =
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
      // if (typeof window === 'undefined' || window.innerWidth < 1024) {
      //   if (isFixed) setIsFixed(false);
      //   prevScrollY.current = window.scrollY;
      //   return;
      // }

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

      const currentNavItems: NavItem[] = getNavItems(pathname, myArray, currentCategorySlug || '', { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef });

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

    const isPostDetailPage = myArray[1] === 'posts' || myArray[2] === 'posts' || currentCategorySlug != null;
    const isSearchPage = myArray[myArray.length - 1] === 'search';
    
    if (isPostDetailPage || NEWS_SLUGS.includes(myArray[myArray.length - 1] || '')) {
        return (currentCategorySlug || '') === itemSlug;
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
    const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef } = refs;
    const currentSlugFromPathname = pathname.split('/').pop() || '';
    
    if (ABOUT_SLUGS.includes(currentSlugFromPathname)) {
      return [
        { name: t('Submenu.brandPositioning'), href: '#gioi-thieu', hrefb: oneRef },
        { name: t('Submenu.impressiveFigures'), href: '#gioi-thieu', hrefb: twoRef },
        { name: t('Submenu.historyOfEstablishment'), href: '#gioi-thieu', hrefb: threeRef, hrefm: eightRef },
        { name: t('Submenu.businessPhilosophy'), href: '#gioi-thieu', hrefb: fourRef },
        { name: t('Submenu.visionMission'), href: '#gioi-thieu', hrefb: fiveRef },
        { name: t('Submenu.corporateCulture'), href: '#gioi-thieu', hrefb: sixRef },
        { name: t('Submenu.capabilityProfile'), href: '#gioi-thieu', hrefb: seventRef },
      ];
    } else if (NEWS_SLUGS.includes(currentSlugFromPathname) || myArray.includes('posts')) {
      return [
        { name: t('Submenu.marketNews'), href: routeLocales[currentLocale]['categories']+'/tin-thi-truong' },
        { name: t('Submenu.piGroupNews'), href: routeLocales[currentLocale]['categories']+'/tin-pi-group' },
        { name: t('Submenu.biddingNews'), href: routeLocales[currentLocale]['categories']+'/tin-dau-thau' },
      ];
    } else if (ECOSYSTEM_SLUGS.includes(currentSlugFromPathname)) {
      return [
        {
          name: t('Submenu.investmentProjectDevelopment'),
          href: routeLocales[currentLocale]['investmentDevelopment'],
        },
        { name: t('Submenu.realEstateServices'), href: routeLocales[currentLocale]['realEstateServices'] },
        { name: t('Submenu.managementOperations'), href: routeLocales[currentLocale]['managementOperation'] },
      ];
    } else if (HUMAN_RESOURCE_SLUGS.includes(currentSlugFromPathname)) {
      return [
        { name: t('Submenu.workCulture'), href: '', hrefb: oneRef },
        { name: t('Submenu.benefitsTraining'), href: '', hrefb: twoRef },
        { name: t('Submenu.recruitmentForm'), href: '', hrefb: threeRef },
        { name: t('Submenu.jobOpenings'), href: '', hrefb: fourRef },
      ];
    } else if (DIGITAL_CITY_SLUGS.includes(currentSlugFromPathname)) {
      return [
        { name: t('Submenu.picityDigitalCity'), href: '', hrefb: oneRef },
        { name: t('Submenu.technology4_0'), href: '', hrefb: twoRef },
        { name: t('Submenu.exclusivePicityApp'), href: '', hrefb: threeRef },
        { name: t('Submenu.fiveStarAmenities'), href: '', hrefb: fourRef },
        { name: t('Submenu.managementServices'), href: '', hrefb: fiveRef },
        { name: t('Submenu.superiorValue'), href: '', hrefb: sixRef },
        { name: t('Submenu.successfulProjects'), href: '', hrefb: seventRef },
      ];
    } else if ( CONTACT_SLUGS.includes(currentSlugFromPathname) ){
      return [];
    }
    return [];
  };

  const navItems = getNavItems(pathname, myArray, currentCategorySlug || '', { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef });

  const hasNavItemsToDisplay = Array.isArray(navItems) && navItems.length > 0;

  // NEW: Điều kiện để hiển thị submenu mobile (chỉ Tin tức và Hệ sinh thái)
  const currentSlugFromPathname = pathname.split('/').pop() || '';
  
  const shouldShowMobileSubmenu = 
    currentSlugFromPathname == "gioi-thieu" ||
    NEWS_SLUGS.includes(currentSlugFromPathname) || 
    ECOSYSTEM_SLUGS.includes(currentSlugFromPathname) || 
    currentCategorySlug != null ||
    myArray.includes('posts') || // Bao gồm các trang chi tiết bài viết (thuộc News)
    myArray.includes('search'); // Bao gồm trang tìm kiếm (thuộc News)

    const shouldShowSearchMobileSubmenu = 
    NEWS_SLUGS.includes(currentSlugFromPathname) || 
    // ECOSYSTEM_SLUGS.includes(currentSlugFromPathname) || 
    currentCategorySlug != null ||
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
        <ul className="hidden xl:flex flex-wrap space-x-2 ef:space-x-6 justify-center gap-[30px] ef:gap-[30px] py-[3px] text-gray-5">
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
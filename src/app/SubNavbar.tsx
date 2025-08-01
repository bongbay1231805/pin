// // components/news/SubNavbar.tsx
// 'use client';

// import Link from 'next/link';
// import { useScrollRefs } from '@/context/ScrollRefsContext';
// import CategoryAndPostSearch from '@/components/search/CategoryAndPostSearch';
// import { usePathname  } from 'next/navigation';
// import { useState, useEffect, useRef, RefObject } from 'react';
// import { useNewsCategory } from '@/context/NewsCategoryContext';
// import { useLocale, useTranslations } from 'next-intl';
// import { routeLocales } from '@/routes';

// interface PropSub {
//   hasShadow: boolean;
//   pageCurent: boolean;
//   nameCurent: string;
// }

// interface NavItemWithRef {
//   name: string;
//   href: string;
//   hrefb: RefObject<HTMLDivElement | null>;
//   hrefm: RefObject<HTMLDivElement | null>;
// }

// interface NavItemWithoutRef {
//   name: string;
//   href: string;
// }

// type NavItem = NavItemWithRef | NavItemWithoutRef;

// const ECOSYSTEM_SLUGS = [
//   'ecosystem',
//   'investment-development',
//   'real-estate-services',
//   'management-operation',
//   'he-sinh-thai',
//   'dau-tu-phat-trien-du-an',
//   'dich-vu-bat-dong-san',
//   'quan-ly-van-hanh'
// ];
// const NEWS_SLUGS = ['news', 'tin-tuc', 'tin-thi-truong', 'tin-pi-group', 'tin-dau-thau', 'search', 'tim-kiem'];
// const HUMAN_RESOURCE_SLUGS = ['human-resource', 'phat-trien-nhan-luc'];
// const ABOUT_SLUGS = ['about', 'gioi-thieu'];
// const DIGITAL_CITY_SLUGS = ['digitalcity', 'do-thi-so-picity'];
// const CONTACT_SLUGS = ['contact', 'lien-he'];

// export default function SubNavbar(props: PropSub) {
//   const { nameCurent } = props;
//   const currentLocale = useLocale();
//   const pathname = usePathname();
//   const t = useTranslations();
//   const [submenus, setSubmenus] = useState([])
//   const myArray = pathname.split('/');
//   const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef } =
//     useScrollRefs();

//   const { currentCategorySlug } = useNewsCategory();
//   const [isFixed, setIsFixed] = useState(false);
//   const [activeSection, setActiveSection] = useState('');
//   const scrollThreshold = 100;
//   const prevScrollY = useRef(0);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   const scrollTo = (ref: RefObject<HTMLDivElement | null>) => {
//     if (ref.current) {
//       ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       // if (typeof window === 'undefined' || window.innerWidth < 1024) {
//       //   if (isFixed) setIsFixed(false);
//       //   prevScrollY.current = window.scrollY;
//       //   return;
//       // }

//       const currentScrollY = window.scrollY;
//       const scrollingDown = currentScrollY > prevScrollY.current;
//       const scrollingUp = currentScrollY < prevScrollY.current;
//       if (currentScrollY > scrollThreshold) {
//         // if (scrollingDown && !isFixed) {
//         //   setIsFixed(true);
//         // } else if (scrollingUp && isFixed) {
//         //   setIsFixed(false);
//         // }
//         setIsFixed(true);
//       } else {
//         if (isFixed) {
//           setIsFixed(false);
//         }
//       }

//       prevScrollY.current = currentScrollY;

//       const subNavbarHeight = menuRef.current?.offsetHeight || 60;
//       const buffer = 80;
//       const scrollOffset = subNavbarHeight + buffer;

//       let newActiveSection = '';

//       const currentNavItems: NavItem[] = getNavItems(pathname, myArray, currentCategorySlug || '', { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef });

//       for (let i = currentNavItems.length - 1; i >= 0; i--) {
//         const item = currentNavItems[i];
//         if ('hrefb' in item && item.hrefb?.current) {
//           const section = item.hrefb.current;
//           const sectionTop = section.getBoundingClientRect().top;

//           if (sectionTop <= scrollOffset) {
//             newActiveSection = item.name;
//             break;
//           }
//         }
//       }

//       const firstScrollItem = currentNavItems.find((item): item is NavItemWithRef => 'hrefb' in item && item.hrefb !== undefined);
//       if (newActiveSection === '' && firstScrollItem) {
//         newActiveSection = firstScrollItem.name;
//       }

//       if (activeSection !== newActiveSection) {
//         setActiveSection(newActiveSection);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isFixed, pathname, currentCategorySlug]);

//   useEffect( () => {
//     const currentSlugFromPathname = pathname.split('/').pop() || '';
//     const fetchData = async () => {
//       try {
//         const res = await fetch("https://admin.pigroup.vn/api/categories", {
//           cache: 'no-store',
//         });
       
//         const data = await res.json();
//         setSubmenus(data[currentLocale])
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (error) {}
//     };

//     if (NEWS_SLUGS.includes(currentSlugFromPathname) || currentCategorySlug!= null ) {
//       fetchData();
//     }
   
//   }, [pathname, currentLocale, currentCategorySlug]);

//   const isActive = (itemHref: string) => {
//     const itemSlug = itemHref.split('/').pop();
//     const isSearchPage = myArray[myArray.length - 1] === 'search';
    
//     if(currentCategorySlug) {
//       return currentCategorySlug === itemSlug;
//     }

//     if (isSearchPage) {
//       return false;
//     }
//     return nameCurent === itemSlug;
//   };

//   const getNavItems = (
//     pathname: string,
//     myArray: string[],
//     currentCategorySlug: string,
//     refs: ReturnType<typeof useScrollRefs>
//   ): NavItem[] => {
//     const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef } = refs;
//     const currentSlugFromPathname = pathname.split('/').pop() || '';
    
//     if (ABOUT_SLUGS.includes(currentSlugFromPathname)) {
//       return [
//         { name: t('Submenu.brandPositioning'), href: '#gioi-thieu', hrefb: oneRef },
//         { name: t('Submenu.impressiveFigures'), href: '#gioi-thieu', hrefb: twoRef },
//         { name: t('Submenu.historyOfEstablishment'), href: '#gioi-thieu', hrefb: threeRef, hrefm: eightRef },
//         { name: t('Submenu.businessPhilosophy'), href: '#gioi-thieu', hrefb: fourRef },
//         { name: t('Submenu.visionMission'), href: '#gioi-thieu', hrefb: fiveRef },
//         { name: t('Submenu.corporateCulture'), href: '#gioi-thieu', hrefb: sixRef },
//         { name: t('Submenu.capabilityProfile'), href: '#gioi-thieu', hrefb: seventRef },
//       ];
//     }  else if (ECOSYSTEM_SLUGS.includes(currentSlugFromPathname)) {
//       return [
//         {
//           name: t('Submenu.investmentProjectDevelopment'),
//           href: routeLocales[currentLocale]['investmentDevelopment'],
//         },
//         { name: t('Submenu.realEstateServices'), href: routeLocales[currentLocale]['realEstateServices'] },
//         { name: t('Submenu.managementOperations'), href: routeLocales[currentLocale]['managementOperation'] },
//       ];
//     } else if (HUMAN_RESOURCE_SLUGS.includes(currentSlugFromPathname)) {
//       return [
//         { name: t('Submenu.workCulture'), href: '', hrefb: oneRef },
//         { name: t('Submenu.benefitsTraining'), href: '', hrefb: twoRef },
//         { name: t('Submenu.recruitmentForm'), href: '', hrefb: threeRef },
//         { name: t('Submenu.jobOpenings'), href: '', hrefb: fourRef },
//       ];
//     } else if (DIGITAL_CITY_SLUGS.includes(currentSlugFromPathname)) {
//       return [
//         { name: t('Submenu.picityDigitalCity'), href: '', hrefb: oneRef },
//         { name: t('Submenu.technology4_0'), href: '', hrefb: twoRef },
//         { name: t('Submenu.exclusivePicityApp'), href: '', hrefb: threeRef },
//         { name: t('Submenu.fiveStarAmenities'), href: '', hrefb: fourRef },
//         { name: t('Submenu.managementServices'), href: '', hrefb: fiveRef },
//         { name: t('Submenu.superiorValue'), href: '', hrefb: sixRef },
//         { name: t('Submenu.successfulProjects'), href: '', hrefb: seventRef },
//       ];
//     } else if ( CONTACT_SLUGS.includes(currentSlugFromPathname) ){
//       return [];
//     }else if (NEWS_SLUGS.includes(currentSlugFromPathname) || currentCategorySlug!= null ) {
//       return submenus.map(item => ({
//         name: item['name'], 
//         href: routeLocales[currentLocale]['categories']+'/' + item['slug'] 
//       }))
//     }
//     return [];
//   };

//   const navItems = getNavItems(pathname, myArray, currentCategorySlug || '', { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef });

//   const hasNavItemsToDisplay = Array.isArray(navItems) && navItems.length > 0;

//   // NEW: Điều kiện để hiển thị submenu mobile (chỉ Tin tức và Hệ sinh thái)
//   const currentSlugFromPathname = pathname.split('/').pop() || '';
  
//   const shouldShowMobileSubmenu = 
//     currentSlugFromPathname == "gioi-thieu" ||
//     NEWS_SLUGS.includes(currentSlugFromPathname) || 
//     ECOSYSTEM_SLUGS.includes(currentSlugFromPathname) || 
//     currentCategorySlug != null ||
//     myArray.includes('posts') || // Bao gồm các trang chi tiết bài viết (thuộc News)
//     myArray.includes('search'); // Bao gồm trang tìm kiếm (thuộc News)

//     const shouldShowSearchMobileSubmenu = 
//     NEWS_SLUGS.includes(currentSlugFromPathname) || 
//     // ECOSYSTEM_SLUGS.includes(currentSlugFromPathname) || 
//     currentCategorySlug != null ||
//     myArray.includes('posts') || // Bao gồm các trang chi tiết bài viết (thuộc News)
//     myArray.includes('search'); // Bao gồm trang tìm kiếm (thuộc News)


//   return hasNavItemsToDisplay ? (
//     <div
//       className={`
//         w-full bg-gray-3 border-white-1 border-b-[1px] transition-all duration-300
//         ${isFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'}
//       `}
//       ref={menuRef}
//     >
//       <div className="relative mx-auto w-full px-[30px] sm:px-0 sm:max-w-[85%]">
//         {/* CategoryAndPostSearch on mobile (visible only for news/ecosystem pages on mobile/tablet) */}
        

//         {/* Desktop menu */}
//         <ul className="hidden xl:flex flex-wrap space-x-2 ef:space-x-6 justify-center gap-[30px] ef:gap-[30px] py-[3px] text-gray-5">
//           {navItems.map((item) =>
//             'hrefb' in item && item.hrefb ? (
//               <li key={item.name}>
//                 <button
//                   onClick={() => scrollTo(item.hrefb!)}
//                   className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${
//                     activeSection === item.name ? 'text-yellow-1' : ''
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               </li>
//             ) : (
//               <li key={item.name}>
//                 <Link
//                   href={item.href}
//                   className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${
//                     isActive(item.href) ? 'text-yellow-1' : ''
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             )
//           )}
          
//           {shouldShowSearchMobileSubmenu && ( // Sử dụng điều kiện mới
//             <li>
//               <div className="hidden sm:flex items-center justify-between px-4 sm:absolute sm:px-0 sm:right-[0px]"> {/* Chỉnh lại breakpoint để khớp với mobile submenu */}
//                 <CategoryAndPostSearch />
//               </div>
//             </li>
//           )}
          
           
//         </ul>

//         {/* Mobile submenu (only visible for News/Ecosystem pages on screens smaller than xl) */}
//         {shouldShowMobileSubmenu && ( // Sử dụng điều kiện mới để chỉ hiển thị trên mobile cho News/Ecosystem
//           <ul className="xl:hidden flex overflow-x-auto whitespace-nowrap py-[3px] px-[10px] text-gray-5 scrollbar-hide bg-gray-3 border-t border-white-1">
//             {navItems.map((item) =>
//               'hrefb' in item && item.hrefb ? (
//                 <li key={item.name} className="flex-shrink-0 mx-2">
//                   <button
//                     onClick={() => scrollTo(item.hrefb!)}
//                     className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${
//                       activeSection === item.name ? 'text-yellow-1' : ''
//                     }`}
//                   >
//                     {item.name}
//                   </button>
//                 </li>
//               ) : (
//                 <li key={item.name} className="flex-shrink-0 mx-2">
//                   <Link
//                     href={item.href}
//                     className={`text-[12px] 2xl:text-[16px] cursor-pointer font-regular hover:text-yellow-1 focus:text-yellow-1 focus-visible:text-yellow-1 active:text-yellow-1 ${
//                       isActive(item.href) ? 'text-yellow-1' : ''
//                     }`}
//                   >
//                     {item.name}
//                   </Link>
//                 </li>
//               )
//             )}
            
//             {shouldShowSearchMobileSubmenu && ( // Sử dụng điều kiện mới
//               <li>
//               <div className="flex items-center justify-between px-4"> {/* Chỉnh lại breakpoint để khớp với mobile submenu */}
//                 <CategoryAndPostSearch />
//               </div>
//               </li>
//             )}
            
//           </ul>
//         )}
//       </div>
//     </div>
//   ) : null;
// }

'use client';

import Link from 'next/link';
import { useScrollRefs } from '@/context/ScrollRefsContext';
import CategoryAndPostSearch from '@/components/search/CategoryAndPostSearch';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, RefObject } from 'react';
import { useNewsCategory } from '@/context/NewsCategoryContext';
import { useLocale, useTranslations } from 'next-intl';
import { routeLocales } from '@/routes';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
  'quan-ly-van-hanh',
];

const NEWS_SLUGS = ['news', 'tin-tuc', 'tin-thi-truong', 'tin-pi-group', 'tin-dau-thau', 'search', 'tim-kiem'];
const HUMAN_RESOURCE_SLUGS = ['human-resource', 'phat-trien-nhan-luc'];
const ABOUT_SLUGS = ['about', 'gioi-thieu'];
const DIGITAL_CITY_SLUGS = ['digitalcity', 'do-thi-so-picity'];
const CONTACT_SLUGS = ['contact', 'lien-he'];

export default function SubNavbar(props: PropSub) {
  const { nameCurent } = props;
  const currentLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();
  const [submenus, setSubmenus] = useState([]);
  const myArray = pathname.split('/');
  const { oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef, eightRef } = useScrollRefs();
  const { currentCategorySlug } = useNewsCategory();
  const MAIN_PAGE_SLUGS: any = {
    'ecosystem': t('Ecosystem.title'),
    'he-sinh-thai': t('Ecosystem.title'),
  };

  const [isFixed, setIsFixed] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const prevScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // const scrollTo = (ref: RefObject<HTMLDivElement | null>) => {
  //   if (ref.current) {
  //     ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };

  
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, offset = 110) => {
    if (ref.current) {
      const elementTop = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth',
      });
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 60;
      const scrollingDown = currentScrollY > prevScrollY.current;
      const scrollingUp = currentScrollY < prevScrollY.current;

      if (currentScrollY >= scrollThreshold) {
        if (scrollingDown && !isFixed) {
          setIsFixed(true);
        } else if (scrollingUp && isFixed) {
          setIsFixed(false);
        }
      } else {
        setIsFixed(false);
      }

      prevScrollY.current = currentScrollY;

      const subNavbarHeight = menuRef.current?.offsetHeight || 60;
      const buffer = 80;
      const scrollOffset = subNavbarHeight + buffer;

      let newActiveSection = '';
      const currentNavItems = getNavItems(pathname, myArray, currentCategorySlug || '', {
        oneRef,
        twoRef,
        threeRef,
        fourRef,
        fiveRef,
        sixRef,
        seventRef,
        eightRef,
      });

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

      // const firstScrollItem = currentNavItems.find((item): item is NavItemWithRef => 'hrefb' in item);
      // if (newActiveSection === '' && firstScrollItem) {
      //   newActiveSection = firstScrollItem.name;
      // }

      if (activeSection !== newActiveSection) {
        setActiveSection(newActiveSection);
      }
    };
    setIsDropdownOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFixed, pathname, currentCategorySlug]);

  useEffect(() => {
    const currentSlugFromPathname = pathname.split('/').pop() || '';
    const fetchData = async () => {
      try {
        const res = await fetch('https://admin.pigroup.vn/api/categories', {
          cache: 'no-store',
        });
        const data = await res.json();
        setSubmenus(data[currentLocale]);
      } catch (error) {}
    };

    if (NEWS_SLUGS.includes(currentSlugFromPathname) || currentCategorySlug != null) {
      fetchData();
    }
  }, [pathname, currentLocale, currentCategorySlug]);

  const isActive = (itemHref: string) => {
    const itemSlug = itemHref.split('/').pop();
    const isSearchPage = myArray[myArray.length - 1] === 'search';

    if (currentCategorySlug) return currentCategorySlug === itemSlug;
    if (isSearchPage) return false;
    return nameCurent === itemSlug;
  };

  const hasOneActive = (navs: NavItem[]) => {
    const activeItem = navs.find((item) => {
      const itemSlug = item.href.split('/').pop();
      const isSearchPage = myArray[myArray.length - 1] === 'search';

      if (currentCategorySlug) return currentCategorySlug === itemSlug;
      if (isSearchPage) return false;
      return nameCurent === itemSlug;
    });
    
    return !!activeItem;
  }

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
    } else if (ECOSYSTEM_SLUGS.includes(currentSlugFromPathname)) {
      return [
        { name: t('Submenu.investmentProjectDevelopment'), href: routeLocales[currentLocale]['investmentDevelopment'] },
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
    } else if (CONTACT_SLUGS.includes(currentSlugFromPathname)) {
      return [];
    } else if (NEWS_SLUGS.includes(currentSlugFromPathname) || currentCategorySlug != null) {
      return submenus.map((item) => ({
        name: item['name'],
        href: routeLocales[currentLocale]['categories'] + '/' + item['slug'],
      }));
    }
    return [];
  };

  const navItems = getNavItems(pathname, myArray, currentCategorySlug || '', {
    oneRef,
    twoRef,
    threeRef,
    fourRef,
    fiveRef,
    sixRef,
    seventRef,
    eightRef,
  });

  const hasNavItemsToDisplay = Array.isArray(navItems) && navItems.length > 0;

  const currentSlugFromPathname = pathname.split('/').pop() || '';
  const shouldShowMobileSubmenu =
    ABOUT_SLUGS.includes(currentSlugFromPathname) ||
    DIGITAL_CITY_SLUGS.includes(currentSlugFromPathname) ||
    NEWS_SLUGS.includes(currentSlugFromPathname) ||
    ECOSYSTEM_SLUGS.includes(currentSlugFromPathname) ||
    HUMAN_RESOURCE_SLUGS.includes(currentSlugFromPathname) ||
    currentCategorySlug != null ||
    myArray.includes('posts') ||
    myArray.includes('search');

  const shouldShowSearchMobileSubmenu =
    NEWS_SLUGS.includes(currentSlugFromPathname) ||
    currentCategorySlug != null ||
    myArray.includes('posts') ||
    myArray.includes('search');

  return hasNavItemsToDisplay ? (
    <div
      className={`w-full bg-gray-3 border-white-1 border-b-[1px] transition-all duration-300 ${
        isFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'
      }`}
      ref={menuRef}
    >
      <div className="relative mx-auto w-full sm:px-[30px] sm:px-0 sm:max-w-[85%]">
        {/* Desktop */}
        <ul className="hidden xl:flex flex-wrap justify-center gap-[30px] py-[3px] text-gray-5">
          {navItems.map((item) =>
            'hrefb' in item && item.hrefb ? (
              <li key={item.name}>
                <button
                  onClick={() => scrollTo(item.hrefb!)}
                  className={`text-[12px] 2xl:text-[16px] cursor-pointer hover:text-yellow-1 ${
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
                  className={`text-[12px] 2xl:text-[16px] cursor-pointer hover:text-yellow-1 ${
                    isActive(item.href) ? 'text-yellow-1' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
          {shouldShowSearchMobileSubmenu && (
            <li>
              <div className="hidden sm:flex items-center px-4 sm:absolute sm:right-0">
                <CategoryAndPostSearch />
              </div>
            </li>
          )}
        </ul>

        {/* Mobile Dropdown Menu */}
        {shouldShowMobileSubmenu && (
          <div className="xl:hidden text-center w-full bg-gray-3 border-white-1 border-b-[1px] transition-all duration-300 relative">
            {!MAIN_PAGE_SLUGS[currentSlugFromPathname] && (
              <button
                className="absolute top-2 right-2"
                onClick={toggleDropdown}
              >
                {isDropdownOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
            )}

            <ul>
              {MAIN_PAGE_SLUGS[currentSlugFromPathname] && (
                <li>
                  <button
                    className={`block w-full text-center py-2 text-sm hover:bg-neutral-700 text-yellow-1 font-bold uppercase`}
                  >
                    {MAIN_PAGE_SLUGS[currentSlugFromPathname]}
                  </button>
                </li>
              )}
              {navItems.map((item, index) =>
                'hrefb' in item && item.hrefb ? (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollTo(item.hrefb!)}
                      className={`block w-full text-center py-2 text-sm hover:bg-neutral-700 
                        ${!MAIN_PAGE_SLUGS[currentSlugFromPathname] && ((index === 0 && !activeSection) || isDropdownOpen || activeSection === item.name) ? 'block' : 'hidden'}
                        ${
                          activeSection === item.name ? 'text-yellow-1 bg-white' : 'text-gray-5'
                        }
                        `}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block w-full text-center px-4 py-2 text-sm hover:bg-neutral-700  
                         ${!MAIN_PAGE_SLUGS[currentSlugFromPathname] && ((index === 0 && !hasOneActive(navItems)) || isDropdownOpen || isActive(item.href) ) ? 'block' : 'hidden'}
                        ${
                          isActive(item.href) ? 'text-yellow-1' : 'text-gray-5'
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
              
              
            </ul>
             {shouldShowSearchMobileSubmenu && (
                  <CategoryAndPostSearch />
              )}
          </div>
        )}
      </div>
    </div>
  ) : null;
}

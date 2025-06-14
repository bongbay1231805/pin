'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import SubNavbar from "./SubNavbar";
import { MainDrawer } from "@/components/MainDrawer";
const Navbar = () => {
  const pathname = usePathname().split("/").pop();
  const isHomePage = (pathname === "en" || pathname === "vi");
  const aPage = ["ecosystem", "investment-development", "real-estate-services", "management-operation", "news", "market-news", "pi-group-news", "bidding-news", "human-resource", "contact", "digitalcity"];
  const pageCurent = aPage.includes(pathname!);
  const nameCurent = pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) => {
    return pathname === path;
  };
  useEffect(() => {
    const body = document.getElementById('body');
    if (!body) return;
    body.className = ''; // Clear existing class
    if (isHomePage) {
      body.classList.add('home');
    } else {
      body.classList.add(pathname as string);
    }
  }, [pathname]);
  const [hasShadow, setHasShadow] = useState(false);
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      if (isScrollingUp && currentScrollY >= 106) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Hàm xử lý sự kiện cuộn
    const handleScroll = () => {
      if (mobileMenuOpen) { // Chỉ đóng menu nếu nó đang mở
        setMobileMenuOpen(false);
      }
    };
    // Thêm event listener cho sự kiện cuộn
    window.addEventListener('scroll', handleScroll);
    // Dọn dẹp event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]); // Dependency array: Chỉ chạy lại effect khi mobileMenuOpen thay đổi
  // --- End: Phần mới cần thêm ---
  return (
    <nav id="topMenu" className={`absolute top-0 left-0 w-full z-50 transition-all duration-300 border-white-1 ${(hasShadow) ? `${isHomePage ? "border-b-[0]" : ""} fixed text-yellow-1` : ""}`}>
      <div className={`${isHomePage ? "bg-transparent text-white" : "bg-white text-yellow-1"}`}>
        <div className={`mx-auto max-w-[91.4%] 2xl:max-w-[91.4%] duration-300 ${hasShadow && isHomePage ? 'bg-white  px-[45px] border-b-[1px] border-white-1' : ''}`}>
          <div className={`flex justify-between h-[96px] 2xl:h-[106px]`}>
            <div className="flex items-center">
              <Link href="/" className={`flex-shrink-0 flex items-center text-yellow-1 ${(hasShadow) ? 'text-yellow-1' : isHomePage ? 'text-white!' : ''}`}>
                <svg className={`${(pathname === 'investment-development' || pathname === 'real-estate-services' || pathname === 'management-operation') ? "text-yellow-1 " : ""} md:w-[72px] md:h-[72px]`} width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.7468 11.6881L29.9983 0C17.6246 7.14545 10.001 20.3492 10.001 34.6401C10.001 56.7306 27.9097 74.6393 50.0002 74.6393C66.9617 74.6393 81.4601 64.079 87.2748 49.1746C89.0341 44.6681 89.9995 39.7646 89.9995 34.6401C89.9995 20.3492 82.3758 7.14545 69.9976 0L63.2491 11.6881C71.1705 16.2712 76.498 24.8332 76.498 34.6401C76.498 49.2784 64.634 61.1424 50.0002 61.1424C35.3665 61.1424 23.5025 49.2784 23.5025 34.6401C23.5025 24.8332 28.83 16.2712 36.7513 11.6881" fill="currentColor" />
                  <path d="M63.1311 55.914C70.0556 51.6286 74.7335 44.0591 74.9861 35.3799L53.1934 36.4851L63.1357 55.914H63.1311Z" fill="currentColor" />
                  <path d="M74.9867 33.9001C74.7341 25.2209 70.0607 17.6514 63.1317 13.366L53.1895 32.7949L74.9822 33.9001H74.9867Z" fill="currentColor" />
                  <path d="M36.8638 13.366C29.9393 17.6514 25.2614 25.2209 25.0088 33.9001L46.8015 32.7949L36.8592 13.366H36.8638Z" fill="currentColor" />
                  <path d="M25.0088 35.3799C25.2614 44.0591 29.9348 51.6286 36.8638 55.914L46.8061 36.4851L25.0133 35.3799H25.0088Z" fill="currentColor" />
                  <path d="M50.0011 59.6401C54.2911 59.6401 58.3284 58.5575 61.856 56.6538L50.0011 38.3301L38.1416 56.6538C41.6692 58.5575 45.7066 59.6401 50.0011 59.6401Z" fill="currentColor" />
                  <path d="M61.8554 12.6264C58.3278 10.7228 54.2905 9.64014 50.0005 9.64014C45.7105 9.64014 41.6731 10.7228 38.1455 12.6264L50.0005 30.9502L61.8554 12.6264Z" fill="currentColor" />
                  <path d="M0 79.6331V94.6412H4.44787V82.1682H6.40565C8.07022 82.1682 8.86416 82.1773 8.86416 83.7246V85.3034C8.86416 86.8462 8.06571 87.0627 6.40565 87.0627H5.66585V89.6114H6.956C10.7949 89.6114 13.1 89.4671 13.1 85.6372V83.3907C13.1 79.7368 10.4926 79.6331 6.956 79.6376H0V79.6331Z" fill="currentColor" />
                  <path d="M20.0055 78.6499C19.4597 78.6499 19.0176 78.2078 19.0176 77.662C19.0176 77.1162 19.4597 76.6741 20.0055 76.6741C20.5513 76.6741 20.9934 77.1162 20.9934 77.662C20.9934 78.2078 20.5513 78.6499 20.0055 78.6499Z" fill="currentColor" />
                  <path d="M20.006 72.0591C16.9114 72.0591 14.4033 74.5717 14.4033 77.6618C14.4033 80.7518 16.9114 83.2645 20.006 83.2645C23.1006 83.2645 25.6042 80.7563 25.6042 77.6618C25.6042 74.5672 23.0961 72.0591 20.006 72.0591ZM20.006 81.5142C17.8768 81.5142 16.1536 79.7865 16.1536 77.6618C16.1536 75.5371 17.8768 73.8048 20.006 73.8048C22.1352 73.8048 23.8584 75.5326 23.8584 77.6618C23.8584 79.791 22.1352 81.5142 20.006 81.5142Z" fill="currentColor" />
                  <path d="M20.006 80.0887C18.6663 80.0887 17.5791 79.0016 17.5791 77.6618C17.5791 76.322 18.6663 75.2349 20.006 75.2349C21.3458 75.2349 22.433 76.322 22.433 77.6618C22.433 79.0016 21.3458 80.0887 20.006 80.0887Z" fill="currentColor" />
                  <path d="M16.0322 94.6415H18.008V86.1247H19.5192V92.7243C19.5192 94.0505 20.1057 94.646 21.6349 94.646H23.9851V86.1292H25.2933V84.6721H14.7285V86.1292H16.0367V94.646L16.0322 94.6415Z" fill="currentColor" />
                  <path d="M44.8665 94.6412V88.0731C44.8665 86.571 44.6274 86.2101 42.9358 86.2101H38.0413V88.8265H40.3826V92.0924H37.5587C35.3302 92.0924 34.622 92.1195 34.622 90.0129V84.2794C34.622 82.1637 35.8941 82.1727 37.8068 82.1727H39.4172C40.6036 82.1727 40.96 82.2449 41.8757 81.4058L43.8154 79.633H37.7211C33.3544 79.633 30.1064 79.3759 30.1064 84.4914V89.8008C30.1064 94.3615 32.4747 94.6457 36.9812 94.6457H44.8665V94.6412Z" fill="currentColor" />
                  <path d="M51.9172 94.6413V87.9425C51.9172 84.0224 53.4284 82.1684 57.3755 82.1684H58.7739C59.5092 82.1684 59.7167 82.0736 60.452 81.4015L62.3918 79.6287H57.6507C54.1637 79.6287 51.6375 80.7564 51.1458 84.4915V83.9818C51.1458 82.5879 49.9819 82.1684 48.4211 82.1684H45.9355V83.3548C47.0588 83.5262 47.3836 83.8059 47.3836 84.9787V94.6413H51.9127H51.9172Z" fill="currentColor" />
                  <path d="M86.9004 84.6628V99.671H91.3483V87.198H93.306C94.9706 87.198 95.7645 87.2071 95.7645 88.7543V90.3332C95.7645 91.876 94.9661 92.0925 93.306 92.0925H92.5662V94.6412H93.8564C97.6953 94.6412 100 94.4969 100 90.667V88.4205C100 84.7621 97.393 84.6628 93.8564 84.6674H86.9004V84.6628Z" fill="currentColor" />
                  <path d="M84.7269 94.6413V84.663H80.279V92.0881H77.7754C76.1154 92.0881 75.3169 91.8761 75.3169 90.3288V84.6584H71.0811V90.6626C71.0811 94.488 73.3862 94.6368 77.2251 94.6368H84.7224L84.7269 94.6413Z" fill="currentColor" />
                  <path d="M63.1218 84.6628H60.1265C56.5899 84.6628 54.3389 84.7621 54.3389 88.416V90.6625C54.3389 94.4924 56.2876 94.6367 60.1265 94.6367H63.1218C66.9607 94.6367 68.9095 94.4924 68.9095 90.6625V88.416C68.9095 84.7621 66.663 84.6628 63.1218 84.6628ZM64.6736 90.3287C64.6736 91.8715 64.2315 92.088 62.5715 92.088H60.6723C59.0168 92.088 58.5747 91.876 58.5747 90.3287V88.7498C58.5747 87.2026 59.0123 86.9454 60.6723 86.9454H62.5715C64.2361 86.9454 64.6736 87.2026 64.6736 88.7498V90.3287Z" fill="currentColor" />
                </svg>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className={`hidden xl:flex text-[13px] 2xl:text-[17px] font-[600] items-center ml-[11.5%] 2xl:ml-[204px] uppercase grow-1 h-[96px] 2xl:h-[106px] ${(hasShadow || pageCurent) ? '' : ''}`}>
              <Link href="/about" className={`group relative grow-1 py-2 text-center text-white-1 hover:text-yellow-2 ${isActive("about") ? "text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent || !isHomePage) ? "text-gray-6!" : ""}`}>
                <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Giới thiệu</span>
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Giới thiệu</span>
              </Link>
              <Link href="/ecosystem" className={`group relative grow-1 py-2 text-center hover:text-yellow-2 ${(isActive("ecosystem") || isActive("investment-development") || isActive("real-estate-services") || isActive("management-operation")) ? " text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent || !isHomePage) ? "text-gray-6!" : ""}`}>
                <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Hệ Sinh Thái</span>
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Hệ Sinh Thái</span>
              </Link>
              <Link href="/digitalcity" className={`group relative grow-1 py-2 text-center hover:text-yellow-2 ${isActive("digitalcity") ? " text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent || !isHomePage) ? "text-gray-6!" : ""}`}>
                <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Đô thị số Picity</span>
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Đô thị số Picity</span>
              </Link>
              <Link href="/news" className={`group relative grow-1 py-2 text-center hover:text-yellow-2 ${(isActive("news") || isActive("market-news") || isActive("pi-group-news") || isActive("bidding-news")) ? " text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent || !isHomePage) ? "text-gray-6!" : ""}`}>
                <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Tin Tức</span>
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Tin Tức</span>
              </Link>
              <Link href="/human-resource" className={`group relative grow-1 py-2 text-center hover:text-yellow-2 ${isActive("human-resource") ? " text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent || !isHomePage) ? "text-gray-6!" : ""}`}>
                <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Phát Triển Nhân Lực</span>
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Phát Triển Nhân Lực</span>
              </Link>
              <Link href="/contact" className={`group relative grow-1 py-2 text-center hover:text-yellow-2 ${isActive("contact") ? " text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent || !isHomePage) ? "text-gray-6!" : ""}`}>
                <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Liên Hệ</span>
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Liên Hệ</span>
              </Link>
              <div className="flex justify-end font-semibold items-center grow-1">
                <Link href="/vi" className={`text-yellow-2! ${isActive("vi") ? " text-yellow-2" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-yellow-2" : ""}`}>VN</Link>
                <span className="text-gray-300 px-[7px] inline-block">|</span>
                <Link href="/en" className={`hover:text-yellow-2 ${isActive("en") ? " text-yellow-2" : "text-gray-6"} ${(hasShadow || pageCurent || !isHomePage) ? "" : "text-white-1!"}`}>EN</Link>
              </div>
            </div>
            <div className="flex items-center xl:hidden">
              <MainDrawer />
            </div>
          </div>
        </div>
      </div>
      {isHomePage ? null : <SubNavbar hasShadow={hasShadow} pageCurent={pageCurent} nameCurent={nameCurent!} />}
    </nav>
  );
};
export default Navbar;
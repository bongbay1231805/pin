'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import SubNavbar from "./SubNavbar";
const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const aPage = ["/ecosystem", "/ecosystem/[slug]", "/news", "/news/market-news", "/news/pi-group-news", "/news/bidding-news", "/work-culture", "/contact"];
  const pageCurent = aPage.includes(pathname);
  const nameCurent = pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) => {
    return pathname === path;
  };
  const [hasShadow, setHasShadow] = useState(false);
  useEffect(() => {
    if (!pageCurent) {
      const handleScroll = () => {
        setHasShadow(window.scrollY > 150);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pageCurent]); // Re-run effect when pageCurent changes
  return (
    <nav id="topMenu" className={`fixed  top-0 left-0 w-full z-50 transition-all duration-300 ${(hasShadow || pageCurent) ? 'bg-white' : 'bg-transparent'
      }`}>
      <div className="container mx-auto max-w-[1755px]">
        <div className={`flex justify-between ${(hasShadow || pageCurent) ? 'h-[100px]' : 'h-[150px]'}`}>
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src={(hasShadow || pageCurent) ? "/logo-c.svg" : "/logo.svg"} width={(hasShadow || pageCurent) ? 60 : 100} height={(hasShadow || pageCurent) ? 60 : 100} alt="Logo" />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className={`hidden md:flex md:items-center ml-[204px] uppercase grow-1 ${(hasShadow || pageCurent) ? 'h-[100px]' : 'h-[115px]'}`}>
            <Link href="/#" className={`group relative grow-1 py-2 font-semibold text-center text-white-1 hover:text-yellow-2 ${isActive("/about") ? "text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-gray-5!" : ""}`}>
              <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Giới thiệu</span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Giới thiệu</span>
            </Link>
            <Link href="/#" className={`group relative grow-1 py-2 font-semibold text-center hover:text-yellow-2 ${isActive("/ecosystem") ? " text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-gray-5!" : ""}`}>
              <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Hệ Sinh Thái</span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Hệ Sinh Thái</span>
            </Link>
            <Link href="/#" className={`group relative grow-1 py-2 font-semibold text-center hover:text-yellow-2 ${isActive("/do-thi-so-picity") ? " text-yellow-2" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-gray-5!" : ""}`}>
              <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Đô thị số Picity</span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Đô thị số Picity</span>
            </Link>
            <Link href="/#" className={`group relative grow-1 py-2 font-semibold text-center hover:text-yellow-2 ${isActive("/news") ? " text-yellow-2" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-gray-5!" : ""}`}>
              <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Tin Tức</span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Tin Tức</span>
            </Link>
            <Link href="/#" className={`group relative grow-1 py-2 font-semibold text-center hover:text-yellow-2 ${isActive("/work-culture") ? " text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-gray-5!" : ""}`}>
              <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Phát Triển Nhân Lực</span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Phát Triển Nhân Lực</span>
            </Link>
            <Link href="/#" className={`group relative grow-1 py-2 font-semibold text-center hover:text-yellow-2 ${isActive("/contact") ? " text-yellow-2!" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-gray-5!" : ""}`}>
              <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Liên Hệ</span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-yellow-2">Liên Hệ</span>
            </Link>
            <div className="flex justify-end font-semibold items-center grow-1">
              <Link href="/vn" className={` text-yellow-2! ${isActive("/vn") ? " text-yellow-2" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-yellow-2" : ""}`}>VN</Link>
              <span className="text-gray-300 px-[7px] inline-block">|</span>
              <Link href="/en" className={`hover:text-yellow-2 ${isActive("/en") ? " text-yellow-2" : "text-white-1"} ${(hasShadow || pageCurent) ? "text-gray-5!" : ""}`}>EN</Link>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isHomePage ? null : <SubNavbar hasShadow={hasShadow} pageCurent={pageCurent} nameCurent={nameCurent} />}
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              Giới thiệu
            </Link>
            <Link href="/ecosystem" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              Hệ sinh thái
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
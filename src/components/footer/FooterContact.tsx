'use client';
import Link from 'next/link'
import Image from 'next/image';
import styles from './footer.module.css';
export function FooterContact() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className={`bg-gray-3 text-white text-left`}>
      <div>
        <div className="bg-gray-4 text-center boxanimation">
          <div className="relative pb-[30px] grid grid-cols-1 md:grid-cols-3 m-auto text-left max-w-[85%]">
            <div className='text-center md:text-left order-1 sm:order-0 '>
              <p className="text-yellow-2/70 pt-[24px] pt-[45px] text-[14px] 2xl:text-[16px] reveal-text fade-in-up-medium">© 2025 Pi Group. All Rights Reserved.</p>
            </div>
            <div>
              <Image
                onClick={handleClick}
                src="/to-top.svg"
                alt="Modern city skyline"
                width={38}
                height={38}
                className='absolute sm:right-0 right-[-27px] top-[-30px] -translate-y-1/2 z-20 hover:cursor-pointer fade-in-up-medium'
              />
            </div>
            <div className='flex justify-center items-center gap-[15px] sm:pr-[58px] mt-[30px] fade-in-up-medium'>
              <Link target="_blank" href="https://www.facebook.com/Official.PiGroup/" className="flex-shrink-0 flex items-center">
                <div className="relative group">
                    <Image src="/fb.svg" width={36} height={36} alt="Social"
                           className="inset-0 absolute bottom-0" />
                  <div
                    className="w-[36px] h-[36px] bg-gradient-to-t from-[#20446F] to-transparent rounded-full opacity-0 group-hover:opacity-100"></div>
                </div>
              </Link>

              <Link target="_blank" href="https://www.youtube.com/@pigroup.official" className="flex-shrink-0 flex items-center">
                <div className="relative group">
                  <Image src="/yt.svg" width={36} height={36} alt="Social"
                         className="inset-0 absolute bottom-0" />
                  <div
                    className="w-[36px] h-[36px] bg-gradient-to-t from-[#20446F] to-transparent rounded-full opacity-0 group-hover:opacity-100"></div>
                </div>
              </Link>
              <Link href="javascript:void(0);" className="flex-shrink-0 flex items-center">
                <div className="relative group">
                  <Image src="/tk.svg" width={36} height={36} alt="Social"
                         className="inset-0 absolute bottom-0" />
                  <div
                    className="w-[36px] h-[36px] bg-gradient-to-t from-[#20446F] to-transparent rounded-full opacity-0 group-hover:opacity-100"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
'use client';
import Link from 'next/link'
import Image from 'next/image';
export function FooterContact() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className={`bg-gray-3 text-white`}>
      <div className=" bg-gray-4 py-8 text-center text-sm">
        <div className="relative pb-[30px] grid grid-cols-1 md:grid-cols-3 m-auto text-left max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px]">
          <div>
            <p className="text-yellow-2/70 pt-[24px] text-[15px] 2xl:text-[17px] reveal-text fade-in-up-medium">©2025 Pi Group. All Rights Reserved.</p>
            <p className='text-gray-7/70 text-[15px] 2xl:text-[17px] reveal-text fade-in-up-medium'>Design with heart by TQ DESIGN</p>
          </div>
          <div>
            <Image
              onClick={handleClick}
              src="/to-top.svg"
              alt="Modern city skyline"
              width={38}
              height={38}
              className='absolute right-0 top-1/2 -translate-y-1/2 z-20 hover:cursor-pointer fade-in-up-medium'
            />
          </div>
          <div className='flex items-center gap-[15px]'>
            <Link href="/" className="flex-shrink-0 flex items-center fade-in-up-medium">
              <Image src="/fb.svg" width={41} height={41} alt="Social" />
            </Link>
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/yt.svg" width={41} height={41} alt="Social" />
            </Link>
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/tk.svg" width={41} height={41} alt="Social" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
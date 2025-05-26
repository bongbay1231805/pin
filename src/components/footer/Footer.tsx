'use client';
import Link from 'next/link'
import Image from 'next/image';
import styles from './footer.module.css';
export function Footer() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className={`bg-gray-3 text-white  text-center sm:text-left`}>
      <div className={`pt-16 ${styles.bgfooter}`}>
        <div className={`mx-auto max-w-[1582px]`}>
          <div className="grid grid-cols-[340px_1fr_370px] gap-8">
            <div className="flex items-center justify-center sm:justify-normal">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image src="/logo-c.svg" width={180} height={180} alt="Logo" />
              </Link>
            </div>
            <div className='mt-[40px]'>
              <h3 className="text-xl font-bold mb-[20px] text-gray-4 boxanimation reveal-text">TẬP ĐOÀN PI GROUP</h3>
              <ul className=" text-gray-6">
                <li className="flex items-center boxanimation reveal-text">
                  <svg className='mr-[5px]' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.3033 8.37357C21.7055 9.70958 22.4991 11.5618 22.4991 13.4986C22.4991 15.4354 21.7055 17.2876 20.3033 18.6236L14.9996 23.7486L9.69581 18.6236C8.29358 17.2876 7.5 15.4354 7.5 13.4986C7.5 11.5618 8.29358 9.70958 9.69581 8.37357C12.6648 5.54214 17.3343 5.54214 20.3033 8.37357Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 13.0538C17.9891 13.8385 17.6669 14.5868 17.1043 15.1339C16.5417 15.6811 15.7847 15.9823 15 15.9713C14.2153 15.9823 13.4583 15.6811 12.8957 15.1339C12.3331 14.5868 12.0109 13.8385 12 13.0538C12.0233 11.4201 13.3663 10.1146 15 10.1375C16.6337 10.1146 17.9767 11.4201 18 13.0538V13.0538Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  663 – 665 Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh
                </li>
                <li className="flex items-center boxanimation reveal-text">
                  <svg className='mr-[5px]' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.32929 7.95244C8.42929 6.79369 8.81804 6.46869 9.28679 6.31744C9.61119 6.23244 9.95141 6.22772 10.278 6.30369C10.708 6.42869 10.8218 6.52369 12.2318 7.92869C13.4705 9.16244 13.5943 9.29619 13.713 9.53744C13.9401 9.96091 13.9756 10.4612 13.8105 10.9124C13.6855 11.2562 13.508 11.4837 12.7568 12.2374L12.2668 12.7287C12.1381 12.8595 12.1079 13.058 12.1918 13.2212C13.2805 15.0785 14.825 16.6274 16.6793 17.7212C16.8927 17.8355 17.1556 17.7986 17.3293 17.6299L17.8005 17.1662C18.0918 16.8676 18.4002 16.5863 18.7243 16.3237C19.2332 16.0112 19.8674 15.9833 20.4018 16.2499C20.663 16.3749 20.7493 16.4524 22.0268 17.7274C23.3443 19.0412 23.3818 19.0824 23.5268 19.3837C23.7996 19.8824 23.7968 20.4863 23.5193 20.9824C23.378 21.2624 23.2918 21.3637 22.5505 22.1212C22.103 22.5787 21.6818 22.9962 21.6143 23.0574C21.0028 23.5637 20.2182 23.8121 19.4268 23.7499C17.9787 23.618 16.5771 23.1704 15.3205 22.4387C12.537 20.9639 10.1673 18.8151 8.42804 16.1887C8.04922 15.639 7.71243 15.0616 7.42054 14.4612C6.63752 13.1192 6.23316 11.5899 6.25054 10.0362C6.31032 9.22339 6.70011 8.47046 7.32929 7.95244Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  1900 9999 08
                </li>
                <li className="flex items-center boxanimation reveal-text">
                  <svg className='mr-[11px]' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9175 9.77908C20.9322 10.193 21.2797 10.5167 21.6937 10.5019C22.1076 10.4872 22.4313 10.1397 22.4165 9.72571L20.9175 9.77908ZM17.0238 5.41906V6.16906C17.0322 6.16906 17.0405 6.16892 17.0489 6.16864L17.0238 5.41906ZM10.0602 5.41906L10.0351 6.16864C10.0435 6.16892 10.0518 6.16906 10.0602 6.16906V5.41906ZM4.66747 9.72571C4.65273 10.1397 4.97635 10.4872 5.3903 10.5019C5.80425 10.5167 6.15178 10.193 6.16652 9.77908L4.66747 9.72571ZM22.417 9.7524C22.417 9.33818 22.0812 9.0024 21.667 9.0024C21.2528 9.0024 20.917 9.33818 20.917 9.7524H22.417ZM21.667 16.2524L22.4165 16.2791C22.4168 16.2702 22.417 16.2613 22.417 16.2524H21.667ZM17.0238 20.5857L17.0489 19.8361C17.0405 19.8359 17.0322 19.8357 17.0238 19.8357V20.5857ZM10.0602 20.5857V19.8357C10.0518 19.8357 10.0435 19.8359 10.0351 19.8361L10.0602 20.5857ZM5.41699 16.2524H4.66699C4.66699 16.2613 4.66715 16.2702 4.66747 16.2791L5.41699 16.2524ZM6.16699 9.7524C6.16699 9.33818 5.83121 9.0024 5.41699 9.0024C5.00278 9.0024 4.66699 9.33818 4.66699 9.7524H6.16699ZM22.0453 10.4C22.403 10.1911 22.5235 9.73175 22.3146 9.37409C22.1057 9.01643 21.6464 8.89586 21.2887 9.10479L22.0453 10.4ZM15.9643 13.0836L15.586 12.436L15.5798 12.4397L15.9643 13.0836ZM11.1197 13.0836L11.5042 12.4397L11.498 12.436L11.1197 13.0836ZM5.79529 9.10479C5.43763 8.89586 4.97832 9.01643 4.76939 9.37409C4.56046 9.73175 4.68103 10.1911 5.03869 10.4L5.79529 9.10479ZM21.667 9.7524L22.4165 9.72571C22.3136 6.83482 19.8899 4.57285 16.9988 4.66948L17.0238 5.41906L17.0489 6.16864C19.1133 6.09964 20.844 7.71482 20.9175 9.77908L21.667 9.7524ZM17.0238 5.41906V4.66906H10.0602V5.41906V6.16906H17.0238V5.41906ZM10.0602 5.41906L10.0852 4.66948C7.1941 4.57285 4.77041 6.83482 4.66747 9.72571L5.41699 9.7524L6.16652 9.77908C6.24002 7.71482 7.97069 6.09964 10.0351 6.16864L10.0602 5.41906ZM21.667 9.7524H20.917V16.2524H21.667H22.417V9.7524H21.667ZM21.667 16.2524L20.9175 16.2257C20.844 18.29 19.1133 19.9051 17.0489 19.8361L17.0238 20.5857L16.9988 21.3353C19.8899 21.4319 22.3136 19.17 22.4165 16.2791L21.667 16.2524ZM17.0238 20.5857V19.8357H10.0602V20.5857V21.3357H17.0238V20.5857ZM10.0602 20.5857L10.0351 19.8361C7.97068 19.9051 6.24002 18.29 6.16652 16.2257L5.41699 16.2524L4.66747 16.2791C4.77041 19.17 7.19411 21.4319 10.0852 21.3353L10.0602 20.5857ZM5.41699 16.2524H6.16699V9.7524H5.41699H4.66699V16.2524H5.41699ZM21.667 9.7524L21.2887 9.10479L15.586 12.436L15.9643 13.0836L16.3426 13.7312L22.0453 10.4L21.667 9.7524ZM15.9643 13.0836L15.5798 12.4397C14.3246 13.1893 12.7593 13.1893 11.5042 12.4397L11.1197 13.0836L10.7351 13.7276C12.464 14.76 14.62 14.76 16.3489 13.7276L15.9643 13.0836ZM11.1197 13.0836L11.498 12.436L5.79529 9.10479L5.41699 9.7524L5.03869 10.4L10.7414 13.7312L11.1197 13.0836Z" fill="#20446F" />
                  </svg>
                  info@pigroup.vn</li>
              </ul>
            </div>
            <div className='mt-[30px] leading-[30px]'>
              <ul className="space-y-2 text-gray-6 uppercase">
                <li><Link href="/#" className="hover:text-yellow-1 text-gray-6 font-semibold boxanimation reveal-text">Giới thiệu</Link></li>
                <li><Link href="/#" className="hover:text-yellow-1  text-gray-6 font-semibold boxanimation reveal-text">Hệ Sinh Thái</Link></li>
                <li><Link href="/#" className="hover:text-yellow-1  text-gray-6 font-semibold boxanimation reveal-text">Đô thị số Picity</Link></li>
                <li><Link href="/#" className="hover:text-yellow-1  text-gray-6 font-semibold boxanimation reveal-text">Tin Tức</Link></li>
                <li><Link href="/#" className="hover:text-yellow-1  text-gray-6 font-semibold boxanimation reveal-text">Phát Triển Nhân Lực</Link></li>
                <li><Link href="/#" className="hover:text-yellow-1  text-gray-6 font-semibold boxanimation reveal-text">Liên Hệ</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" bg-gray-4 text-center py-[24px_40px mt-[65px]">
          <div className="relative container pb-[30px] grid grid-cols-1 md:grid-cols-3 m-auto text-left max-w-[1582px]">
            <div>
              <p className="text-yellow-2/70 pt-[24px] boxanimation reveal-text">©2025 Pi Group. All Rights Reserved.</p>
              <p className='text-gray-7/70 boxanimation reveal-text'>Design with heart by TQ DESIGN</p>
            </div>
            <div>
              <Image
                onClick={handleClick}
                src="/to-top.svg"
                alt="Modern city skyline"
                width={45}
                height={45}
                className='absolute right-0 top-1/2 -translate-y-1/2'
              />
            </div>
            <div className='flex md:justify-center items-center gap-[15px] pr-[58px] mt-[26px]'>
              <Link href="/" className="flex-shrink-0 flex items-center">
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
      </div>
    </footer>
  )
}
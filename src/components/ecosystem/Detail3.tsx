'use client';
import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useScrollReveal} from '@/hooks/useScrollReveal';
import ImagePopup from '@/components/ui/ImagePopup';
import EmblaCarouselCer from '@/components/ui/EmblaCarouselCer';

// Định nghĩa kiểu dữ liệu cho props của component
interface ToggleSectionProps {
  headerContent: React.ReactNode; // Nội dung của phần header (có thể là JSX, chuỗi,...)
  children: React.ReactNode; // Nội dung sẽ được ẩn/hiện khi toggle
  initialOpen?: boolean; // Mặc định ban đầu là ẩn hay hiện (optional)
}
export default function Detail3({custom_fields, image}: any) {
  useScrollReveal(); // dùng mặc định `.boxanimation`
  const imageSrc = image
  ? `https://admin.pigroup.vn/storage/${image}`
    : '/banner_quanlyvanhanh.jpg';

  const {
    management_operation_title_banner,
    management_operation_title,
    management_operation_des,
    management_operation_1,
    management_operation_2,
    management_operation_3,
    management_operation_4,
    management_operation_5,
    management_operation_6,
    management_operation_7,
    management_operation_8,
    management_operation_9,
    management_operation_10,
    management_operation_11,
    management_operation_12,
    management_operation_13,
    management_operation_14,
    management_operation_15,
    management_operation_16,
    management_operation_17,
    management_operation_18,
    management_operation_19,
    management_operation_20,
    management_operation_21,
    management_operation_22,
    management_operation_14_add
  } = custom_fields;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState('');

  const openPopup = (src: string) => {
    setCurrentImageSrc(src);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentImageSrc(''); // Clear the image source when closing
  };

  const imageUrls = [
    `https://admin.pigroup.vn/storage/${management_operation_16}`,
    `https://admin.pigroup.vn/storage/${management_operation_17}`,
    `https://admin.pigroup.vn/storage/${management_operation_18}`
  ];

  return (
    <>
      <div
        className="relative mx-auto h-[390px] sm:h-[500px] md:h-[100vh] w-[100vw]  text-center pt-[70px] md:pt-[150px]">
        <div className="relative mx-auto top-[30%] max-w-[85%]">
          <h2
            className="absolute  z-10 left-0 top-[-20px] text-left  uppercase font-bold text-white sm:leading-[50px] xl:leading-[60px] text-[22px] xl:text-[40px] 2xl:text-[70px] 2xl:leading-[100px]"
            dangerouslySetInnerHTML={{
              __html: management_operation_title_banner
            }}
          ></h2>
        </div>
        <Image
          fill
          src={imageSrc}
          alt="Smart City Features"
          className="object-cover"
        />
      </div>
      <div className="boxanimation fade-in-up-medium mx-auto mt-[60px] sm:mt-[50px] sm:max-w-[85%] mb-[50px] sm:mb-[115px]">
        <div className="grid grid-cols-1 px-[30px] sm:px-0 lg:grid-cols-[1fr_1fr]">
          <div className="">
            <Image
              src="/toi-uu-quy-trinh.webp"
              alt="Smart City Features"
              width={750}
              height={618}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div className="grid content-center sm:pl-[140px] pr-[160px mt-[35px] sm:mt-0 sm:w-[430px] 2xl:w-[590px]">
            <h3
              className="text-center md:text-left text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px] font-bold  xl:[&>br]:inline-block  mb-[30px] sm:mb-[40px]"
              dangerouslySetInnerHTML={{__html: management_operation_title}}
            ></h3>
            <p className="text-[13px] 2xl:text-[17px] text-gray-5 sm:mb-[18px] text-justify">
              {management_operation_des}
            </p>
          </div>
        </div>
      </div>
      <div className="boxanimation fade-in-up-medium relative mx-auto max-w-[95%]  mb-[47px]">
        <h3
          className="text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px]  font-bold uppercase my-[20px] lg:my-0 text-center"
          dangerouslySetInnerHTML={{__html: management_operation_1}}
        ></h3>
      </div>
      <div className="boxanimation fade-in-up-medium grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[2px] mb-[50px] sm:mb-[110px]">
        <div
          className='group relative overflow-hidden before:content-[""] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:duration-1000 before:z-1 before:bg-blue-1/40 hover:before:bg-blue-1/0'>
          <Image
            width="500"
            height="100"
            src={`https://admin.pigroup.vn/storage/${management_operation_3}`}
            alt="Smart City Features"
            className="object-cover group-hover:scale-[120%] duration-1000 w-full h-auto"
          />
          <h4
            className="absolute z-1 bottom-[20px] w-full text-[16px] font-semibold text-center text-white uppercase"
            dangerouslySetInnerHTML={{__html: management_operation_2}}
          ></h4>
        </div>
        <div
          className='group relative overflow-hidden before:content-[""] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:duration-1000 before:z-1 before:bg-blue-1/40 hover:before:bg-blue-1/0'>
          <Image
            width="500"
            height="100"
            src={`https://admin.pigroup.vn/storage/${management_operation_5}`}
            alt="Smart City Features"
            className="object-cover group-hover:scale-[120%] duration-1000 w-full h-auto"
          />
          <h4
            className="absolute z-1 bottom-[20px] w-full text-[16px] font-semibold text-center text-white uppercase"
            dangerouslySetInnerHTML={{__html: management_operation_6}}
          ></h4>
        </div>
        <div
          className='group relative overflow-hidden before:content-[""] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:duration-1000 before:z-1 before:bg-blue-1/40 hover:before:bg-blue-1/0'>
          <Image
            width="500"
            height="100"
            src={`https://admin.pigroup.vn/storage/${management_operation_7}`}
            alt="Smart City Features"
            className="object-cover group-hover:scale-[120%] duration-1000 w-full h-auto"
          />
          <h4
            className="absolute z-1 bottom-[20px] w-full text-[16px] font-semibold text-center text-white uppercase"
            dangerouslySetInnerHTML={{__html: management_operation_8}}
          ></h4>
        </div>
        <div
          className='group relative overflow-hidden before:content-[""] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:duration-1000 before:z-1 before:bg-blue-1/40 hover:before:bg-blue-1/0'>
          <Image
            width="500"
            height="100"
            src={`https://admin.pigroup.vn/storage/${management_operation_9}`}
            alt="Smart City Features"
            className="object-cover group-hover:scale-[120%] duration-1000 w-full h-auto"
          />
          <h4
            className="absolute z-1 bottom-[20px] w-full text-[16px] font-semibold text-center text-white uppercase"
            dangerouslySetInnerHTML={{__html: management_operation_10}}
          ></h4>
        </div>
      </div>
      <div className="boxanimation fade-in-up-medium relative mx-auto top-[25%] max-w-[1250px] mb-[30px]  md:mb-[40px]">
        <h3
          className="text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px] font-bold uppercase text-center"
          dangerouslySetInnerHTML={{__html: management_operation_11}}
        ></h3>
      </div>
      <div className="boxanimation fade-in-up-medium relative mx-auto px-[30px] sm:px-0 top-[25%] sm:max-w-[90%]  mb-[117px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] sm:gap-[15px]">
          <div
            className="2xl:h-[260px] px-[10px] grid text-center content-center justify-center gap-[20px] border-1 rounded-[10px] border-gray-8 h-[220px] group hover:bg-yellow-1 transition-all duration-300">
            {/* <div
              className="m-auto"
              dangerouslySetInnerHTML={{__html: management_operation_19}}
            ></div> */}

            <svg
              className="m-auto h-[81px] sm:h-[100px] transition-transform duration-300 group-hover:scale-110"
              height="100"
              viewBox="0 0 88 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M43.0357 19.4678C41.2474 19.573 39.415 19.7946 37.6156 19.6617C36.1696 19.5564 34.7842 18.9971 33.3105 19.0248C29.9878 19.0801 27.3937 20.2487 23.7785 19.3515C22.8843 19.13 21.5431 18.0943 20.9084 18.7202C20.0474 19.5675 18.7503 23.4775 18.5185 24.7568C18.364 25.6208 18.3308 27.897 18.0273 28.3788C16.9234 30.1289 15.676 26.3961 14.3845 28.8385C13.6007 30.3172 14.0533 32.3885 15.0744 33.6512C16.1286 34.9527 16.4874 34.3822 17.652 34.7644C18.3805 35.0025 18.9932 37.683 19.3906 38.5747C19.6334 39.1285 19.9094 39.6989 20.2019 40.2306C20.6545 41.0779 22.8292 43.908 22.774 44.4341C22.7077 45.071 21.8357 45.5362 21.223 45.1762C20.4503 44.7221 18.9049 42.2631 18.4302 41.3936C18.0107 40.6238 16.6971 37.1015 16.5205 36.9354C16.2445 36.6695 14.8702 36.376 14.1747 35.7889C11.6137 33.629 10.7306 27.9413 14.1582 26.2355C12.5023 23.7101 12.0553 21.1736 12.6127 18.2106C12.7342 17.5516 13.2585 16.527 13.2806 16.0286C13.3027 15.5634 12.8335 14.5997 12.7452 13.985C12.2926 10.7008 13.3358 7.89848 16.2721 6.25363C16.9731 5.86042 18.6289 5.48936 19.0208 5.20137C19.1919 5.07399 19.4402 4.41495 19.6997 4.1325C22.8236 0.720956 26.0249 -0.862974 30.7164 0.471736C31.5222 0.698803 33.1946 1.71783 33.741 1.7566C34.2874 1.79537 35.1485 1.40769 35.7832 1.35785C40.2926 1.00894 43.7753 3.263 46.673 6.46409C47.7437 5.99334 50.0564 4.58663 50.0343 6.79084C50.0122 8.99505 48.5441 12.545 48.6213 14.633C48.6434 15.1646 49.3113 16.0009 49.51 16.5824C50.5035 19.5177 50.1557 22.8572 48.6158 25.5266C53.2245 28.1573 50.8346 36.9077 45.5084 36.4092C44.9178 37.4504 44.0347 41.6761 42.4396 41.1776C40.8445 40.6792 42.4175 38.6411 42.7487 37.7606C43.0799 36.88 43.687 33.9724 44.6087 33.845C45.2103 33.762 45.5525 34.2881 46.2314 34.2936C48.8476 34.2992 50.0343 28.1684 47.7769 27.5592C47.1256 27.3819 45.6133 30.0347 44.7964 28.3068C44.4928 27.6644 44.388 24.9894 44.1893 23.9815C43.8912 22.4529 43.4496 20.9798 43.0412 19.4789L43.0357 19.4678ZM47.5616 8.55199C45.3428 9.43257 44.8461 7.48312 43.5766 6.28133C41.849 4.63647 39.0121 3.34607 36.5946 3.39592C35.6728 3.41807 33.9618 4.08819 33.3215 4.02173C33.0014 3.9885 31.6878 3.11347 31.1579 2.89747C27.7966 1.54061 24.7389 1.96152 22.1337 4.53125C21.5321 5.12384 20.6987 6.68562 20.2792 6.99022C19.7548 7.37235 18.2425 7.62157 17.4367 8.04248C15.1958 9.22212 14.5169 10.867 14.7598 13.3758C14.8481 14.2674 15.4111 15.2422 15.3835 16.0452C15.3559 16.8482 14.688 18.0057 14.5776 18.9528C14.3238 21.1237 14.5832 23.987 16.399 25.4103C16.388 23.4387 18.3198 17.7177 19.8928 16.6766C21.4659 15.6354 22.1889 16.6876 23.5743 17.0808C27.206 18.1054 29.0716 17.1861 32.4826 16.9701C35.2313 16.7929 37.7702 17.7344 40.6955 17.6014C41.5841 17.5627 42.3292 17.1085 43.2068 17.3135C45.5691 17.8784 45.9665 22.4695 46.3363 24.4799C46.397 24.8177 46.1983 24.8399 46.7337 24.79C47.7989 22.4529 48.3674 20.3207 47.6996 17.7565C47.4788 16.9036 46.8055 16.1394 46.6233 15.5468C46.1983 14.1567 47.8045 8.79568 47.5561 8.54646L47.5616 8.55199Z"
                fill="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M14.3697 91.7857C13.7239 91.7857 13.2051 91.2429 13.2051 90.5728V75.2153C13.2051 74.5452 13.7294 74.0024 14.3697 74.0024C15.0099 74.0024 15.5343 74.5452 15.5343 75.2153V90.5728C15.5343 91.2429 15.0099 91.7857 14.3697 91.7857Z"
                fill="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M26.3725 52.1653L26.2345 52.1486C26.2345 52.1486 23.5576 51.7277 23.265 51.6834C23.0332 51.2792 25.5611 47.6682 23.7949 47.131C23.6459 47.0867 23.5079 47.0646 23.3754 47.0646C21.5706 46.976 21.5927 50.6478 20.4777 51.7887C20.119 52.1542 19.2635 52.5862 18.6177 53.1068C12.2925 57.2217 4.39972 60.2455 1.44684 67.6003C-1.03137 73.8141 0.629965 83.2236 0.000753127 89.9636C-0.0434021 91.7746 1.86631 92.489 2.49552 90.5949C2.97571 84.7798 2.05397 78.361 2.55624 72.629C3.4559 62.5273 14.2132 58.9994 21.4823 54.1646L21.5209 54.1369C21.681 54.0316 21.8355 53.9264 21.9901 53.8212H22.0177L22.0397 53.8101L25.4728 54.3307C25.4728 54.3307 25.4949 54.3307 25.5059 54.3307C25.7874 54.3695 26.0303 54.3639 26.229 54.3362C26.251 54.3362 26.2676 54.3362 26.2842 54.3307C26.4387 54.3252 26.5932 54.2809 26.7257 54.2144C27.0348 54.0538 27.2611 53.7547 27.3053 53.3837C27.3825 52.7855 26.963 52.2373 26.367 52.1597L26.3725 52.1653Z"
                fill="#4C73A8"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M74.2692 56.8535C77.6069 59.8083 79.7156 64.1304 79.7156 68.94C79.7156 77.8517 72.4926 85.0769 63.5836 85.0769C58.7712 85.0769 54.4504 82.9676 51.4922 79.6203"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M48.6648 76.046C47.5836 73.8564 46.9746 71.3942 46.9746 68.7869C46.9746 59.703 54.3664 52.3384 63.4838 52.3384C66.5199 52.3384 69.3664 53.1562 71.8112 54.5808"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M63.9082 42.1777C73.5575 42.1777 81.9766 47.625 86.4869 55.725"
                stroke="#4C73A8"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M63.3462 89.5929C74.8809 89.5929 84.2315 80.2422 84.2315 68.7076C84.2315 57.1729 74.8809 47.8223 63.3462 47.8223C51.8116 47.8223 42.4609 57.1729 42.4609 68.7076C42.4609 80.2422 51.8116 89.5929 63.3462 89.5929Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M37.9453 87.692L38.8417 80.5615C43.2363 89.1948 52.1127 94.5111 61.6529 95.2377"
                stroke="#4C73A8"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M63.1309 98.5592C64.6897 98.5592 65.9533 97.2956 65.9533 95.7369C65.9533 94.1782 64.6897 92.9146 63.1309 92.9146C61.5722 92.9146 60.3086 94.1782 60.3086 95.7369C60.3086 97.2956 61.5722 98.5592 63.1309 98.5592Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M60.8712 44.3703C62.4299 44.3703 63.6935 43.1067 63.6935 41.5479C63.6935 39.9892 62.4299 38.7256 60.8712 38.7256C59.3124 38.7256 58.0488 39.9892 58.0488 41.5479C58.0488 43.1067 59.3124 44.3703 60.8712 44.3703Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M64.4774 72.196C65.7485 72.196 66.779 71.1621 66.779 69.8866C66.779 68.6111 65.7485 67.5771 64.4774 67.5771C63.2062 67.5771 62.1758 68.6111 62.1758 69.8866C62.1758 71.1621 63.2062 72.196 64.4774 72.196Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M64.5098 57.9624V67.5767"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M62.8317 72.1904L57.4668 78.6148"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
            </svg>
            <h4
              className="text-[11px] sm:text-[18px] 2xl:text-[22px] font-bold uppercase text-yellow-1 group-hover:text-white transition-colors duration-300">
              {management_operation_12}
            </h4>
          </div>
          <div
            className="2xl:h-[260px] px-[10px] grid text-center content-center justify-center gap-[20px] border-1 rounded-[10px] border-gray-8 h-[220px] group hover:bg-yellow-1 transition-all duration-300">
            {/* <div
              className="m-auto"
              dangerouslySetInnerHTML={{__html: management_operation_20}}
            ></div> */}
            <svg
              className="m-auto h-[81px] sm:h-[100px] transition-transform duration-300 group-hover:scale-110"
              height="100"
              viewBox="0 0 94 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M92.5 42.501C93.05 42.501 93.5 42.9458 93.5 43.501C93.5 44.0562 93.05 44.501 92.5 44.501C91.95 44.501 91.5 44.0562 91.5 43.501C91.5 42.9458 91.95 42.501 92.5 42.501Z"
                fill="#4C73A8"
                stroke="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M82.5 23.501C83.05 23.501 83.5 23.9458 83.5 24.501C83.5 25.0562 83.05 25.501 82.5 25.501C81.95 25.501 81.5 25.0562 81.5 24.501C81.5 23.9458 81.95 23.501 82.5 23.501Z"
                fill="#4C73A8"
                stroke="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M56.5 4.50098C57.05 4.50098 57.5 4.94577 57.5 5.50098C57.5 6.05618 57.05 6.50098 56.5 6.50098C55.95 6.50098 55.5 6.05618 55.5 5.50098C55.5 4.94577 55.95 4.50098 56.5 4.50098Z"
                fill="#4C73A8"
                stroke="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M14.5 32.501C15.05 32.501 15.5 32.9458 15.5 33.501C15.5 34.0562 15.05 34.501 14.5 34.501C13.95 34.501 13.5 34.0562 13.5 33.501C13.5 32.9458 13.95 32.501 14.5 32.501Z"
                fill="#4C73A8"
                stroke="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M6 6.50098C6.45216 6.50098 6.84513 6.6386 7.11328 6.83887C7.38089 7.03878 7.5 7.2776 7.5 7.50098C7.5 7.72435 7.38089 7.96317 7.11328 8.16309C6.84513 8.36335 6.45216 8.50098 6 8.50098C5.54784 8.50098 5.15487 8.36335 4.88672 8.16309C4.61911 7.96317 4.5 7.72435 4.5 7.50098C4.5 7.2776 4.61911 7.03878 4.88672 6.83887C5.15487 6.6386 5.54784 6.50098 6 6.50098Z"
                fill="#4C73A8"
                stroke="#4C73A8"
              />
              <mask
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                id="path-6-inside-1_1_2566"
                fill="white"
              >
                <path
                  className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                  d="M24.0533 44.6416C23.5353 44.6416 23 45.1572 23 45.6729C23 46.1885 23.518 46.7041 24.0533 46.7041H27.3686V49.9697C27.3686 50.4854 27.8866 51.001 28.4219 51.001H79.9467C80.4647 51.001 81 50.4854 81 49.9697C81 49.4541 80.482 48.9385 79.9467 48.9385H75.5781V16.626C75.5781 16.1104 75.0601 15.5947 74.5249 15.5947H67.8943C67.3763 15.5947 66.841 16.1104 66.841 16.626V18.8604H61.4192C60.9012 18.8604 60.3659 19.376 60.3659 19.8916V24.1885H55.9973V18.8604C55.9973 18.3447 55.4793 17.8291 54.944 17.8291H49.5222V14.5635C49.5222 14.0479 49.0042 13.5322 48.4689 13.5322H41.8383C41.3203 13.5322 40.7851 14.0479 40.7851 14.5635V21.0947H35.3632C34.8452 21.0947 34.3099 21.6104 34.3099 22.126V48.9385H29.9414V8.03223C29.9414 7.5166 29.4233 7.00098 28.8881 7.00098C28.3528 7.00098 27.8348 7.5166 27.8348 8.03223V10.2666H24.5195C24.0015 10.2666 23.4662 10.7822 23.4662 11.2979C23.4662 11.8135 23.9842 12.3291 24.5195 12.3291H27.8348V14.5635H24.5195C24.0015 14.5635 23.4662 15.0791 23.4662 15.5947C23.4662 16.1104 23.9842 16.626 24.5195 16.626H27.8348V18.8604H24.5195C24.0015 18.8604 23.4662 19.376 23.4662 19.8916C23.4662 20.4072 23.9842 20.9229 24.5195 20.9229H27.8348V23.1572H24.5195C24.0015 23.1572 23.4662 23.6729 23.4662 24.1885C23.4662 24.7041 23.9842 25.2197 24.5195 25.2197H27.8348V27.4541H24.5195C24.0015 27.4541 23.4662 27.9697 23.4662 28.4854C23.4662 29.001 23.9842 29.5166 24.5195 29.5166H27.8348V31.751H24.5195C24.0015 31.751 23.4662 32.2666 23.4662 32.7822C23.4662 33.2979 23.9842 33.8135 24.5195 33.8135H27.8348V36.0479H24.5195C24.0015 36.0479 23.4662 36.5635 23.4662 37.0791C23.4662 37.5947 23.9842 38.1104 24.5195 38.1104H27.8348V40.3447H24.5195C24.0015 40.3447 23.4662 40.8604 23.4662 41.376C23.4662 41.8916 23.9842 42.4072 24.5195 42.4072H27.8348V44.6416H23.9842H24.0533ZM68.7577 17.8291H73.1262V48.9385H68.7577V17.8291ZM62.1271 20.9229H66.4957V48.9385H62.1271V20.9229ZM60.0378 48.9385H55.6692V26.4229H60.0378V48.9385ZM53.39 48.715H48.1754V19.8916H53.39V48.715ZM42.5636 15.5947H46.9321V48.9385H42.5636V15.5947ZM35.933 23.1572H40.3016V48.9385H35.933V23.1572Z"
                />
              </mask>
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M24.0533 44.6416C23.5353 44.6416 23 45.1572 23 45.6729C23 46.1885 23.518 46.7041 24.0533 46.7041H27.3686V49.9697C27.3686 50.4854 27.8866 51.001 28.4219 51.001H79.9467C80.4647 51.001 81 50.4854 81 49.9697C81 49.4541 80.482 48.9385 79.9467 48.9385H75.5781V16.626C75.5781 16.1104 75.0601 15.5947 74.5249 15.5947H67.8943C67.3763 15.5947 66.841 16.1104 66.841 16.626V18.8604H61.4192C60.9012 18.8604 60.3659 19.376 60.3659 19.8916V24.1885H55.9973V18.8604C55.9973 18.3447 55.4793 17.8291 54.944 17.8291H49.5222V14.5635C49.5222 14.0479 49.0042 13.5322 48.4689 13.5322H41.8383C41.3203 13.5322 40.7851 14.0479 40.7851 14.5635V21.0947H35.3632C34.8452 21.0947 34.3099 21.6104 34.3099 22.126V48.9385H29.9414V8.03223C29.9414 7.5166 29.4233 7.00098 28.8881 7.00098C28.3528 7.00098 27.8348 7.5166 27.8348 8.03223V10.2666H24.5195C24.0015 10.2666 23.4662 10.7822 23.4662 11.2979C23.4662 11.8135 23.9842 12.3291 24.5195 12.3291H27.8348V14.5635H24.5195C24.0015 14.5635 23.4662 15.0791 23.4662 15.5947C23.4662 16.1104 23.9842 16.626 24.5195 16.626H27.8348V18.8604H24.5195C24.0015 18.8604 23.4662 19.376 23.4662 19.8916C23.4662 20.4072 23.9842 20.9229 24.5195 20.9229H27.8348V23.1572H24.5195C24.0015 23.1572 23.4662 23.6729 23.4662 24.1885C23.4662 24.7041 23.9842 25.2197 24.5195 25.2197H27.8348V27.4541H24.5195C24.0015 27.4541 23.4662 27.9697 23.4662 28.4854C23.4662 29.001 23.9842 29.5166 24.5195 29.5166H27.8348V31.751H24.5195C24.0015 31.751 23.4662 32.2666 23.4662 32.7822C23.4662 33.2979 23.9842 33.8135 24.5195 33.8135H27.8348V36.0479H24.5195C24.0015 36.0479 23.4662 36.5635 23.4662 37.0791C23.4662 37.5947 23.9842 38.1104 24.5195 38.1104H27.8348V40.3447H24.5195C24.0015 40.3447 23.4662 40.8604 23.4662 41.376C23.4662 41.8916 23.9842 42.4072 24.5195 42.4072H27.8348V44.6416H23.9842H24.0533ZM68.7577 17.8291H73.1262V48.9385H68.7577V17.8291ZM62.1271 20.9229H66.4957V48.9385H62.1271V20.9229ZM60.0378 48.9385H55.6692V26.4229H60.0378V48.9385ZM53.39 48.715H48.1754V19.8916H53.39V48.715ZM42.5636 15.5947H46.9321V48.9385H42.5636V15.5947ZM35.933 23.1572H40.3016V48.9385H35.933V23.1572Z"
                fill="#4C73A8"
                stroke="#4C73A8"
                strokeWidth="2"
                mask="url(#path-6-inside-1_1_2566)"
              />
              <mask
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                id="path-7-inside-2_1_2566"
                fill="white"
              >
                <path
                  className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                  d="M33 4.00098C33 1.79045 31.2083 0.000976562 29 0.000976562C26.7917 0.000976562 25 1.79045 25 4.00098C25 6.2115 26.7917 8.00098 29 8.00098C31.2083 8.00098 33 6.10624 33 4.00098ZM28.9896 6.63256C27.5104 6.63256 26.3542 5.47466 26.3542 4.00098C26.3542 2.52729 27.5104 1.3694 28.9896 1.3694C30.4688 1.3694 31.625 2.52729 31.625 4.00098C31.625 5.47466 30.4688 6.63256 28.9896 6.63256Z"
                />
              </mask>
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M33 4.00098C33 1.79045 31.2083 0.000976562 29 0.000976562C26.7917 0.000976562 25 1.79045 25 4.00098C25 6.2115 26.7917 8.00098 29 8.00098C31.2083 8.00098 33 6.10624 33 4.00098ZM28.9896 6.63256C27.5104 6.63256 26.3542 5.47466 26.3542 4.00098C26.3542 2.52729 27.5104 1.3694 28.9896 1.3694C30.4688 1.3694 31.625 2.52729 31.625 4.00098C31.625 5.47466 30.4688 6.63256 28.9896 6.63256Z"
                fill="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M33 4.00098H35C35 0.685167 32.3122 -1.99902 29 -1.99902V0.000976562V2.00098C30.1045 2.00098 31 2.89573 31 4.00098H33ZM29 0.000976562V-1.99902C25.6878 -1.99902 23 0.685167 23 4.00098H25H27C27 2.89573 27.8955 2.00098 29 2.00098V0.000976562ZM25 4.00098H23C23 7.31679 25.6878 10.001 29 10.001V8.00098V6.00098C27.8955 6.00098 27 5.10622 27 4.00098H25ZM29 8.00098V10.001C32.346 10.001 35 7.1774 35 4.00098H33H31C31 5.03508 30.0707 6.00098 29 6.00098V8.00098ZM28.9896 6.63256V4.63256C28.7847 4.63256 28.6331 4.55679 28.531 4.45477C28.4287 4.35259 28.3542 4.20211 28.3542 4.00098H26.3542H24.3542C24.3542 6.58032 26.4069 8.63256 28.9896 8.63256V6.63256ZM26.3542 4.00098H28.3542C28.3542 3.79985 28.4287 3.64936 28.531 3.54718C28.6331 3.44516 28.7847 3.3694 28.9896 3.3694V1.3694V-0.630602C26.4069 -0.630602 24.3542 1.42163 24.3542 4.00098H26.3542ZM28.9896 1.3694V3.3694C29.1945 3.3694 29.3461 3.44516 29.4482 3.54718C29.5504 3.64936 29.625 3.79984 29.625 4.00098H31.625H33.625C33.625 1.42163 31.5722 -0.630602 28.9896 -0.630602V1.3694ZM31.625 4.00098H29.625C29.625 4.20211 29.5504 4.35259 29.4482 4.45478C29.3461 4.55679 29.1945 4.63256 28.9896 4.63256V6.63256V8.63256C31.5722 8.63256 33.625 6.58032 33.625 4.00098H31.625Z"
                fill="#4C73A8"
                mask="url(#path-7-inside-2_1_2566)"
              />
              <mask
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                id="path-9-inside-3_1_2566"
                fill="white"
              >
                <path
                  className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                  d="M84 54.001C86.1911 54.001 88 52.1945 88 50.001C88 47.8074 86.1911 46.001 84 46.001C81.8089 46.001 80 47.8074 80 50.001C80 52.1945 81.6815 54.001 84 54.001ZM84 47.5494C85.2866 47.5494 86.4459 48.5816 86.4459 50.001C86.4459 51.4203 85.414 52.4526 84 52.4526C82.7134 52.4526 81.5541 51.4203 81.5541 50.001C81.5541 48.5816 82.586 47.5494 84 47.5494Z"
                />
              </mask>
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M84 54.001C86.1911 54.001 88 52.1945 88 50.001C88 47.8074 86.1911 46.001 84 46.001C81.8089 46.001 80 47.8074 80 50.001C80 52.1945 81.6815 54.001 84 54.001ZM84 47.5494C85.2866 47.5494 86.4459 48.5816 86.4459 50.001C86.4459 51.4203 85.414 52.4526 84 52.4526C82.7134 52.4526 81.5541 51.4203 81.5541 50.001C81.5541 48.5816 82.586 47.5494 84 47.5494Z"
                fill="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M84 54.001V56.001C87.2949 56.001 90 53.2999 90 50.001H88H86C86 51.0892 85.0873 52.001 84 52.001V54.001ZM88 50.001H90C90 46.7021 87.2948 44.001 84 44.001V46.001V48.001C85.0873 48.001 86 48.9128 86 50.001H88ZM84 46.001V44.001C80.7051 44.001 78 46.7021 78 50.001H80H82C82 48.9128 82.9127 48.001 84 48.001V46.001ZM80 50.001H78C78 53.2579 80.5362 56.001 84 56.001V54.001V52.001C82.8269 52.001 82 51.1312 82 50.001H80ZM84 47.5494V49.5494C84.1088 49.5494 84.2263 49.5948 84.3156 49.6811C84.3945 49.7574 84.4459 49.8584 84.4459 50.001H86.4459H88.4459C88.4459 47.4131 86.3262 45.5494 84 45.5494V47.5494ZM86.4459 50.001H84.4459C84.4459 50.2128 84.3761 50.3076 84.3377 50.3461C84.2994 50.3845 84.2068 50.4526 84 50.4526V52.4526V54.4526C86.5219 54.4526 88.4459 52.5216 88.4459 50.001H86.4459ZM84 52.4526V50.4526C83.8912 50.4526 83.7737 50.4072 83.6844 50.3209C83.6055 50.2446 83.5541 50.1435 83.5541 50.001H81.5541H79.5541C79.5541 52.5888 81.6738 54.4526 84 54.4526V52.4526ZM81.5541 50.001H83.5541C83.5541 49.7892 83.6239 49.6944 83.6623 49.6559C83.7006 49.6175 83.7932 49.5494 84 49.5494V47.5494V45.5494C81.4781 45.5494 79.5541 47.4804 79.5541 50.001H81.5541Z"
                fill="#4C73A8"
                mask="url(#path-9-inside-3_1_2566)"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M82.8711 65.3164C85.0821 64.4163 87.3131 64.0878 89.7324 65.166L89.9678 65.2744C90.5061 65.5361 91.6918 66.3168 92.5557 67.2031C92.9906 67.6493 93.3025 68.081 93.4336 68.4502C93.497 68.6289 93.5109 68.773 93.4932 68.8877C93.4763 68.9961 93.4267 69.1076 93.3135 69.2236L93.3105 69.2256L58.3604 90.1338C56.681 90.6346 55.3913 90.5589 53.7686 90.1885L53.043 90.0098H53.042C48.4714 88.8331 43.8895 87.2851 39.2852 85.7188C34.687 84.1545 30.0648 82.572 25.4434 81.3389L25.3828 81.3223H25.3193L17.7812 81.2607L17.4062 81.2578L17.2988 81.6172C17.1354 82.1629 16.793 82.7291 16.3369 83.1836C15.9373 83.5818 15.4716 83.8732 14.9932 84.0039L14.7871 84.0498C13.301 84.3045 12.2472 83.9244 11.5635 83.291C10.8673 82.646 10.5011 81.6885 10.5 80.7051C10.499 79.7221 10.8628 78.7597 11.5645 78.1045C12.2114 77.5004 13.1903 77.1152 14.5576 77.2646L14.8369 77.3018C15.3927 77.3888 15.8749 77.7302 16.3369 78.2285C16.8092 78.738 17.1864 79.3233 17.6025 79.8799L17.75 80.0771L17.9971 80.0801L25.877 80.1602L54.2197 89.0859L54.2559 89.0977L54.2949 89.1035C55.7472 89.3237 57.3356 89.3371 58.7744 88.665L58.7988 88.6533L58.8223 88.6387L91.3848 68.8691L91.8633 68.5781L91.5205 68.1357C90.4224 66.7184 89.1658 65.9859 87.8145 65.7568C86.4804 65.5308 85.1081 65.8046 83.7803 66.291C82.4521 66.7776 81.1254 67.4931 79.877 68.1943C78.7712 68.8154 77.7353 69.419 76.7764 69.876L76.3711 70.0625L75.9766 70.2363L76.0898 70.6523C76.5909 72.4929 75.5414 73.942 74.0479 74.54C72.5957 75.1214 70.8503 74.8455 69.8643 73.3574L69.7705 73.209C69.2015 72.2571 69.0913 71.3599 69.2617 70.5947C69.4336 69.8233 69.8993 69.1483 70.5469 68.665C71.8418 67.6987 73.8185 67.528 75.4424 68.8955L75.6924 69.1064L75.9854 68.9609C77.148 68.3868 78.3072 67.7009 79.4443 67.0537C80.5903 66.4016 81.7227 65.7839 82.8711 65.3164ZM13.624 78.4727L13.3457 78.5205H13.3447C11.995 78.8156 11.5339 80.1327 11.752 81.1738C11.864 81.7082 12.1571 82.2273 12.6465 82.5684C13.0822 82.8719 13.6354 83.0083 14.2715 82.9287L14.5488 82.8818L14.5508 82.8809C15.9003 82.5856 16.3618 81.2686 16.1436 80.2275C16.0315 79.6933 15.7382 79.175 15.249 78.834C14.8134 78.5304 14.26 78.3932 13.624 78.4727ZM73.0635 69.1064C72.4704 69.0545 71.8738 69.2606 71.4062 69.6006C70.9382 69.941 70.5533 70.4498 70.4365 71.0576C70.3309 71.6074 70.455 72.1866 70.8516 72.7207L71.0381 72.9473H71.0391C71.8961 73.882 73.1634 73.7886 73.9922 73.1973C74.4126 72.8972 74.7496 72.4542 74.8877 71.9131C75.0099 71.4336 74.9687 70.906 74.7305 70.374L74.6162 70.1455C74.253 69.4908 73.6784 69.1604 73.0635 69.1064Z"
                fill="#4C73A8"
                stroke="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M26.0908 62.7373C33.8013 60.0967 42.2895 58.6807 48.2129 64.8799L48.4932 65.1807L48.4951 65.1826C48.6111 65.309 48.8061 65.5773 49.0576 65.9434C49.3034 66.3011 49.5798 66.7177 49.8564 67.1289C50.1297 67.5351 50.4033 67.9359 50.6338 68.2432C50.7483 68.3958 50.8599 68.5357 50.96 68.6445C51.0096 68.6985 51.0644 68.7528 51.1211 68.7998C51.1681 68.8388 51.2594 68.9097 51.3809 68.9463L51.4307 68.9609L51.4824 68.9658C53.3877 69.1256 55.3792 69.053 57.3281 68.9824C59.0441 68.9202 60.7276 68.8594 62.3369 68.9482L63.0215 68.9961C64.5691 69.1278 65.6799 69.7393 66.4053 70.5664C67.135 71.3987 67.5006 72.4797 67.5 73.5879C67.4986 75.7943 66.0512 78.048 63.2314 78.542L49.8789 78.5723H49.4961L49.3906 78.9307C48.556 81.7597 44.8283 82.4029 43.1689 80.0371L43.0146 79.7988V79.7979L42.9131 79.6182C42.4318 78.7229 42.3678 77.8873 42.5557 77.1709C42.7585 76.3977 43.2653 75.7231 43.9414 75.2471C45.2626 74.3171 47.1074 74.2093 48.3955 75.4629L48.5186 75.5879C48.5889 75.6634 48.6603 75.7754 48.7441 75.9326C48.7851 76.0094 48.8255 76.0899 48.8691 76.1777C48.9117 76.2633 48.9584 76.3563 49.0068 76.4473C49.1807 76.7737 49.4807 77.2803 50.0674 77.3887L50.1123 77.3965H63.1045L63.1738 77.377C65.2229 76.7772 66.3379 75.1173 66.291 73.4912C66.2676 72.6794 65.9518 71.8873 65.3311 71.2744C64.7488 70.6996 63.9226 70.3065 62.877 70.1777L62.665 70.1553C60.6457 69.9801 58.5152 70.0598 56.417 70.1367C54.3638 70.212 52.34 70.282 50.416 70.126C49.9624 69.7097 49.6405 69.1989 49.3086 68.6064C49.0025 68.06 48.679 67.4297 48.2344 66.834L48.0361 66.5811C45.0471 62.9544 41.2902 61.6892 37.3525 61.6748C33.9302 61.6624 30.3611 62.5937 27.0156 63.7197L25.5967 64.2119H25.5957C25.1077 64.3867 24.4567 64.7226 23.8857 65.0068C23.5913 65.1534 23.3122 65.2897 23.0654 65.3975C22.8753 65.4805 22.7217 65.539 22.6055 65.5732L22.501 65.5996H22.499C21.8769 65.7267 21.1211 65.7074 20.291 65.6641C19.4897 65.6222 18.6105 65.5573 17.8438 65.6328L17.5605 65.6602L17.4404 65.9189C16.4157 68.1135 14.3446 68.5994 12.7236 67.9883C11.9083 67.6809 11.2207 67.099 10.8359 66.3242C10.4552 65.5573 10.352 64.5631 10.7705 63.3838C11.1541 62.3102 12.1291 61.6309 13.2734 61.4307C14.3497 61.2424 15.5069 61.4929 16.3389 62.1807L16.501 62.3242C16.7455 62.5577 16.8877 62.8298 17.0508 63.1748C17.2061 63.5033 17.3918 63.9285 17.7324 64.2949L17.8896 64.4639L18.1211 64.4541C18.6606 64.4302 19.2681 64.4734 19.9229 64.5059C20.4786 64.5334 21.0672 64.5532 21.6104 64.498L21.8398 64.4697L21.8447 64.4688C22.1269 64.424 22.4742 64.3043 22.8242 64.165C23.1831 64.0222 23.5829 63.8431 23.9795 63.6611C24.5884 63.3817 25.1794 63.1014 25.6553 62.9043L26.0898 62.7383L26.0908 62.7373ZM47.5762 76.3545C47.1249 75.8918 46.4727 75.6477 45.6865 75.7617L45.5273 75.7891H45.5264C44.4581 76.0074 43.837 76.9169 43.7217 77.8047C43.6125 78.6456 43.9485 79.5945 44.8896 79.9932L45.0859 80.0654H45.0869C46.0291 80.3595 46.8241 80.2587 47.3984 79.833C47.9605 79.4163 48.2165 78.7572 48.2354 78.127C48.2542 77.4979 48.04 76.8304 47.5762 76.3545ZM15.126 62.8369C14.6555 62.5719 14.079 62.4831 13.4307 62.6152L13.1484 62.6855C11.866 63.0619 11.5516 64.4531 11.8467 65.46C12.0016 65.9883 12.3347 66.4926 12.8594 66.7979C13.327 67.0698 13.9011 67.1571 14.5459 67.0156L14.8262 66.9414C16.1242 66.5358 16.4725 65.177 16.1611 64.1562C16.0004 63.6293 15.6562 63.1357 15.126 62.8369Z"
                fill="#4C73A8"
                stroke="#4C73A8"
              />
              <path
                className="group-hover:stroke-white group-hover:fill-white transition-colors duration-300"
                d="M3.11719 60.4883C3.68279 60.4896 4.24968 60.4996 4.70898 60.5176C5.19077 60.5365 5.49926 60.5632 5.59082 60.584V60.583C6.04003 60.6894 6.43477 61.1512 6.73828 61.9102C6.99411 62.55 7.1381 63.2897 7.20117 63.8799L7.22363 64.123C7.56945 68.7557 7.59066 76.6326 7.28809 81.6709L7.22363 82.6396V82.6406C7.17194 83.3536 7.03364 84.1937 6.73926 84.9033C6.44378 85.6155 6.0245 86.1203 5.45117 86.3135C5.30709 86.3599 4.97535 86.4107 4.50195 86.4453C4.04487 86.4787 3.49972 86.4945 2.95996 86.4863C2.41865 86.4782 1.8938 86.4458 1.47363 86.3877C1.26315 86.3586 1.08901 86.3247 0.957031 86.2871C0.816129 86.247 0.768034 86.2149 0.767578 86.2148H0.766602C0.544213 86.0326 0.470377 85.7308 0.544922 85.4463C0.621858 85.153 0.804725 85.0273 0.970703 85.0273H5.6416L5.7168 84.6162C5.86834 83.7822 6.04222 82.895 6.12402 82L6.15234 81.6162V81.6152C6.40928 77.1374 6.46927 70.5668 6.20898 65.8447L6.15234 64.9258C6.12063 64.433 6.02951 63.9492 5.94238 63.499C5.87542 63.153 5.81077 62.8274 5.76758 62.5088L5.73242 62.1924L5.69824 61.7998L5.30859 61.7402L5.03223 61.708C4.37292 61.6508 3.61371 61.7146 2.93262 61.7637C2.10955 61.823 1.39879 61.8615 0.884766 61.7471L0.856445 61.7402C0.685142 61.6909 0.521382 61.496 0.501953 61.1533C0.483556 60.8272 0.60549 60.6519 0.704102 60.5928L0.745117 60.5752L0.748047 60.5742C0.752992 60.5731 0.770253 60.5695 0.804688 60.5645C0.848933 60.558 0.907866 60.5514 0.981445 60.5449C1.12871 60.532 1.32011 60.5204 1.54395 60.5117C1.99092 60.4944 2.55134 60.487 3.11719 60.4883Z"
                fill="#4C73A8"
                stroke="#4C73A8"
              />
            </svg>
            <h4
              className="text-[11px] sm:text-[18px] 2xl:text-[22px] font-bold uppercase text-yellow-1 group-hover:text-white transition-colors duration-300">
              {management_operation_13}
            </h4>
          </div>
          <div
            className="2xl:h-[260px] px-[10px] grid text-center content-center justify-center gap-[20px] border-1 rounded-[10px] border-gray-8 h-[220px] group hover:bg-yellow-1 transition-all duration-300">
            {/* <div
              className="m-auto"
              dangerouslySetInnerHTML={{__html: management_operation_21}}
            ></div> */}
            <svg
              className="m-auto h-[81px] sm:h-[100px] transition-transform duration-300 group-hover:scale-110"
              height="100"
              viewBox="0 0 84 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M43.3577 92.5574H4.05425C2.36813 92.5574 1 91.1877 1 89.4997V9.48687C1 7.79886 2.36813 6.4292 4.05425 6.4292H51.1326C52.1235 6.4292 53.0701 6.83146 53.7604 7.5422L66.0316 20.1974C66.6947 20.881 67.0669 21.7965 67.0669 22.7516V48.632"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M9.13477 6.55267V4.05767C9.13477 2.36966 10.5029 1 12.189 1H72.1425C73.8286 1 75.1967 2.36966 75.1967 4.05767V41.6939"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M53.3828 7.29248V21.1051H66.6943"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M14.1892 28.8864C16.0271 28.8864 17.5171 27.3947 17.5171 25.5547C17.5171 23.7148 16.0271 22.2231 14.1892 22.2231C12.3513 22.2231 10.8613 23.7148 10.8613 25.5547C10.8613 27.3947 12.3513 28.8864 14.1892 28.8864Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M75.3214 47.4932C76.9551 47.4932 78.2795 46.1673 78.2795 44.5317C78.2795 42.8962 76.9551 41.5703 75.3214 41.5703C73.6877 41.5703 72.3633 42.8962 72.3633 44.5317C72.3633 46.1673 73.6877 47.4932 75.3214 47.4932Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M47.1925 95.6421C48.8262 95.6421 50.1506 94.3162 50.1506 92.6807C50.1506 91.0451 48.8262 89.7192 47.1925 89.7192C45.5588 89.7192 44.2344 91.0451 44.2344 92.6807C44.2344 94.3162 45.5588 95.6421 47.1925 95.6421Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M52.5212 42.8297C54.3592 42.8297 55.8491 41.3381 55.8491 39.4981C55.8491 37.6581 54.3592 36.1665 52.5212 36.1665C50.6833 36.1665 49.1934 37.6581 49.1934 39.4981C49.1934 41.3381 50.6833 42.8297 52.5212 42.8297Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M17.6406 25.5552H55.8495"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M10.8613 32.4648H55.9725"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M10.8613 39.375H49.0703"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M13.5741 61.9313C15.0853 61.9313 16.3104 60.7048 16.3104 59.192C16.3104 57.6791 15.0853 56.4526 13.5741 56.4526C12.063 56.4526 10.8379 57.6791 10.8379 59.192C10.8379 60.7048 12.063 61.9313 13.5741 61.9313Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M45.0995 79.3995C46.6107 79.3995 47.8358 78.1731 47.8358 76.6602C47.8358 75.1473 46.6107 73.9209 45.0995 73.9209C43.5883 73.9209 42.3633 75.1473 42.3633 76.6602C42.3633 78.1731 43.5883 79.3995 45.0995 79.3995Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M16.4121 59.1924H47.8346"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M10.8379 68.8755H47.9351"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M10.8379 76.5571H42.2604"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M62.0117 68.866V59.4882C62.0117 56.6254 64.3289 54.3057 67.1884 54.3057C70.0479 54.3057 72.3651 56.6254 72.3651 59.4882V68.866"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M55.9727 68.8653V59.7343C55.9727 53.6016 60.9398 48.6289 67.0656 48.6289C73.1913 48.6289 78.1585 53.6016 78.1585 59.7343V68.6185"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M53.4971 68.8657H80.3813C81.1924 68.8657 81.853 69.5246 81.853 70.339V86.7355C81.853 89.9486 79.2474 92.5571 76.0378 92.5571H57.8405C54.631 92.5571 52.0254 89.9486 52.0254 86.7355V70.339C52.0254 69.5271 52.6836 68.8657 53.4971 68.8657Z"
                stroke="#4C73A8"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M67.3109 80.9583C69.3531 80.9583 71.0086 79.3009 71.0086 77.2565C71.0086 75.212 69.3531 73.5547 67.3109 73.5547C65.2688 73.5547 63.6133 75.212 63.6133 77.2565C63.6133 79.3009 65.2688 80.9583 67.3109 80.9583Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M67.3105 87.3876V82.2051"
                stroke="#4C73A8"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <h4
              className="text-[11px] sm:text-[18px] 2xl:text-[22px] font-bold uppercase text-yellow-1 group-hover:text-white transition-colors duration-300">
              {management_operation_14}
            </h4>
          </div>
          <div
            className="2xl:h-[260px] px-[10px] grid text-center content-center justify-center gap-[20px] border-1 rounded-[10px] border-gray-8 h-[220px] group hover:bg-yellow-1 transition-all duration-300">
            {/* <div
              className="m-auto"
              dangerouslySetInnerHTML={{__html: management_operation_22}}
            ></div> */}
            <svg
              className="m-auto h-[81px] sm:h-[100px] transition-transform duration-300 group-hover:scale-110"
              width="100"
              height="100"
              viewBox="0 0 113 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M7 95H53"
                stroke="#4C73A8"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M63 95H109"
                stroke="#4C73A8"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M58 99C60.2091 99 62 97.2091 62 95C62 92.7909 60.2091 91 58 91C55.7909 91 54 92.7909 54 95C54 97.2091 55.7909 99 58 99Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M58.8716 29.8797L63.8425 45.1284C63.9993 45.6104 64.4498 45.9384 64.96 45.9384H81.0455C82.1827 45.9384 82.6575 47.391 81.7367 48.0558L68.723 57.4806C68.3122 57.7777 68.1399 58.3081 68.2967 58.7902L73.2677 74.0389C73.6188 75.1174 72.38 76.0154 71.4591 75.3485L58.4454 65.9237C58.0346 65.6266 57.4759 65.6266 57.0652 65.9237L44.0514 75.3485C43.1306 76.0154 41.8917 75.1174 42.2428 74.0389L47.2138 58.7902C47.3706 58.3081 47.1983 57.7799 46.7876 57.4806L33.7739 48.0558C32.853 47.3888 33.3256 45.9384 34.4651 45.9384H50.5506C51.0585 45.9384 51.5112 45.6126 51.668 45.1284L56.6389 29.8797C56.9901 28.8012 58.5227 28.8012 58.8738 29.8797H58.8716Z"
                stroke="#4C73A8"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M18.0823 52.1213L21.3727 62.213C21.4765 62.5321 21.7746 62.7478 22.1125 62.7478H32.7589C33.5119 62.7478 33.8255 63.7097 33.216 64.1499L24.6013 70.3876C24.3296 70.5857 24.2148 70.9357 24.3186 71.2548L27.609 81.3465C27.8409 82.0596 27.0216 82.6539 26.4121 82.2137L17.7974 75.976C17.5258 75.7779 17.1548 75.7779 16.8831 75.976L8.26844 82.2137C7.65894 82.6561 6.83965 82.0618 7.07152 81.3465L10.3619 71.2548C10.4657 70.9357 10.3509 70.5857 10.0793 70.3876L1.46456 64.1499C0.855065 63.7075 1.16865 62.7478 1.92169 62.7478H12.5681C12.9059 62.7478 13.2041 62.5321 13.3079 62.213L16.5983 52.1213C16.8301 51.4081 17.8438 51.4081 18.0779 52.1213H18.0823Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M96.3987 52.1476L99.6891 62.2394C99.7929 62.5585 100.091 62.7742 100.429 62.7742H111.075C111.828 62.7742 112.142 63.736 111.532 64.1763L102.918 70.414C102.646 70.6121 102.531 70.962 102.635 71.2812L105.925 81.3729C106.157 82.086 105.338 82.6803 104.729 82.2401L96.1138 76.0024C95.8422 75.8043 95.4712 75.8043 95.1996 76.0024L86.5848 82.2401C85.9753 82.6825 85.1561 82.0882 85.3879 81.3729L88.6783 71.2812C88.7821 70.962 88.6673 70.6121 88.3957 70.414L79.781 64.1763C79.1715 63.7338 79.4851 62.7742 80.2381 62.7742H90.8845C91.2223 62.7742 91.5205 62.5585 91.6243 62.2394L94.9147 52.1476C95.1466 51.4345 96.1602 51.4345 96.3943 52.1476H96.3987Z"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M57.6445 22.7156V1.14551"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M40.8595 30.8593L25.7324 15.7822"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-white transition-colors duration-300"
                d="M74.4277 30.8593L89.5548 15.7822"
                stroke="#4C73A8"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <h4
              className="text-[11px] sm:text-[18px] 2xl:text-[22px] font-bold uppercase text-yellow-1 group-hover:text-white transition-colors duration-300">
              {management_operation_14_add}
            </h4>
          </div>
        </div>
      </div>

      {/*<div className='bg-cover bg-[position:center_top] relative bg-[url("/bg-1.png")] mt-[350px] lg:mt-0 lg:bg-[url("/fecosystem/detail/management-13.png")] bg-no-repeat h-[330px] sm:h-[620px] md:h-[820px] content-center'>*/}
      <div
        className="boxanimation fade-in-up-medium relative  mt-[350px] lg:mt-0 content-center">
        {/*<div className="mt-[-470px] sm:mt-[-100px] sm:ml-[48%] max-w-[1250px] grid">*/}
        <div className="relative md:absolute mt-[-280px] sm:mt-0 sm:top-[50px] sm:left-[48%] max-w-[1250px] grid">
          <div className="px-[30px] xl:px-0 xl:w-[650px]">
            <div className="grid grid-cols-1 2xl:w-[905px] sm:mb-[45px]">
              <h4
                className="text-[16px] mb-[30px] sm:text-[24px] text-blue-1 uppercase font-bold text-center sm:text-justify">
                {management_operation_15}
              </h4>
            </div>

            <div className="mb-[30px] sm:hidden">
              <EmblaCarouselCer imageUrls={imageUrls} openPopup={openPopup} />
            </div>

            <div className="hidden sm:block">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-[15px] 2xl:gap-[50px]  mb-[30px]">
                <div className="relative  bg-[#ECF5FA]/30 border-[25px] border-[#ECF5FA]/30 rounded-[5px]">
                  <Image
                    onClick={() =>
                      openPopup(
                        `https://admin.pigroup.vn/storage/${management_operation_16}`
                      )
                    }
                    src={`https://admin.pigroup.vn/storage/${management_operation_16}`}
                    alt="Image"
                    width="500"
                    height="100"
                  />
                </div>
                <div className="relative   bg-[#ECF5FA]/30  border-[25px] border-[#ECF5FA]/30 rounded-[5px]">
                  <Image
                    onClick={() =>
                      openPopup(
                        `https://admin.pigroup.vn/storage/${management_operation_17}`
                      )
                    }
                    src={`https://admin.pigroup.vn/storage/${management_operation_17}`}
                    alt="Image"
                    width="500"
                    height="100"
                  />
                </div>
                <div className="relative   bg-[#ECF5FA]/30  border-[25px] border-[#ECF5FA]/30 rounded-[5px]">
                  <Image
                    onClick={() =>
                      openPopup(
                        `https://admin.pigroup.vn/storage/${management_operation_18}`
                      )
                    }
                    src={`https://admin.pigroup.vn/storage/${management_operation_18}`}
                    alt="Image"
                    width="500"
                    height="100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/fecosystem/detail/management-13.png"
          alt="ecosystem"
          className="w-screen h-auto "
        />
      </div>

      {/* Pop-up component */}
      {isPopupOpen && <ImagePopup src={currentImageSrc} onClose={closePopup} />}
    </>
  );
}

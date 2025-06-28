import React from "react";
import { MessageForm } from "@/components/contact/MessageForm";
import Image from "next/image";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ',
};

export default async function Contact() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/contact', {
    cache: 'no-store',
  });
  const { data } = await res.json();
  const { custom_fields } = data;
  const { field_contact_1, field_contact_3, field_contact_5, field_contact_7 } = custom_fields;

  return (
    // Điều chỉnh lớp after: để nó chỉ áp dụng cho phần nội dung hoặc chỉ trên desktop
    // Loại bỏ after:opacity-60 khỏi div cha nếu bạn muốn hình ảnh không bị mờ
    // hoặc điều chỉnh để nó chỉ là lớp phủ cho phần nội dung bên dưới banner.
    // Ví dụ: chỉ áp dụng opacity trên md, hoặc di chuyển after: vào div nội dung chính
    <div className="relative"> 
      
      {/* Background gradient overlay:
        - On mobile: we might not want this overlay on the banner image, 
          so we can make it hidden or apply it only to content below.
        - On desktop: it acts as a background gradient.
        Let's try to apply it only to the content area or conditionally.
        For simplicity, let's remove it from the main wrapper and assume it's part of the content background.
        Or, make it apply *only* on md and up.
      */}
      <div className="absolute inset-x-0 bottom-0 w-full h-full 
                      hidden md:block 
                      md:bg-[linear-gradient(180deg,_#CDEBFE_0%,_#FFFFFF_100%)] md:opacity-60 md:pointer-events-none">
      </div>


      {/* Mobile Banner Image - ensure it's on top of other elements on mobile */}
      <div className="relative h-[200px] w-full overflow-hidden mt-[70px] md:hidden z-20"> {/* Tăng z-index lên 20 */}
        <Image
          src="/fcontact/contact-1.png"
          alt="Modern city skyline"
          fill
          className="object-cover object-center" 
        />
        {/* Optional overlay for text readability on banner, if needed */}
        {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
      </div>

      {/* Main Content Container - Relative Z-index for its content to be above image */}
      {/* On desktop, this div will contain the gradient background */}
      <div className="mx-auto max-w-[85%] px-[10px] relative z-10 h-full"> {/* Giữ z-index 10 cho nội dung */}
        {/* The gradient overlay if you want it only for the content on mobile
            You can add it here if you want it to cover the content area, not the banner.
            For now, I've moved the main gradient overlay outside and made it desktop-only.
        */}

        <div className="grid h-full items-end md:items-start">
          <div className="max-w-[300px] sm:max-w-[100%] pt-[50px] md:pt-[126px] 2xl:pt-[156px]">
            <h2 className="text-[22px] sm:text-[28px] 2xl:text-[45px]  font-bold mb-4 text-blue-1 uppercase">{field_contact_1}</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-y-1">
                <div className="flex text-blue-1 text-[15px] 2xl:text-[19px]">
                  <svg width="23" height="23" className="mr-[5px] mt-[-1px] 2xl:w-[28px] 2xl:h-[28px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.3033 8.37357C21.7055 9.70958 22.4991 11.5618 22.4991 13.4986C22.4991 15.4354 21.7055 17.2876 20.3033 18.6236L14.9996 23.7486L9.69581 18.6236C8.29358 17.2876 7.5 15.4354 7.5 13.4986C7.5 11.5618 8.29358 9.70958 9.69581 8.37357C12.6648 5.54214 17.3343 5.54214 20.3033 8.37357Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 13.0535C17.9891 13.8382 17.6669 14.5865 17.1043 15.1337C16.5417 15.6808 15.7847 15.982 15 15.971C14.2153 15.982 13.4583 15.6808 12.8957 15.1337C12.3331 14.5865 12.0109 13.8382 12 13.0535C12.0233 11.4199 13.3663 10.1143 15 10.1373C16.6337 10.1143 17.9767 11.4199 18 13.0535V13.0535Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="font-normal max-w-[350px] md:max-w-none">{field_contact_3}</p>
                  </div>
                </div>
                <div className="flex text-blue-1 text-[15px] 2xl:text-[19px]">
                  <svg width="23" height="23" className="mr-[5px] mt-[-1px] 2xl:w-[28px] 2xl:h-[28px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.32929 7.95244C8.42929 6.79369 8.81804 6.46869 9.28679 6.31744C9.61119 6.23244 9.95141 6.22772 10.278 6.30369C10.708 6.42869 10.8218 6.52369 12.2318 7.92869C13.4705 9.16244 13.5943 9.29619 13.713 9.53744C13.9401 9.96091 13.9756 10.4612 13.8105 10.9124C13.6855 11.2562 13.508 11.4837 12.7568 12.2374L12.2668 12.7287C12.1381 12.8595 12.1079 13.058 12.1918 13.2212C13.2805 15.0785 14.825 16.6274 16.6793 17.7212C16.8927 17.8355 17.1556 17.7986 17.3293 17.6299L17.8005 17.1662C18.0918 16.8676 18.4002 16.5863 18.7243 16.3237C19.2332 16.0112 19.8674 15.9833 20.4018 16.2499C20.663 16.3749 20.7493 16.4524 22.0268 17.7274C23.3443 19.0412 23.3818 19.0824 23.5268 19.3837C23.7996 19.8824 23.7968 20.4863 23.5193 20.9824C23.378 21.2624 23.2918 21.3637 22.5505 22.1212C22.103 22.5787 21.6818 22.9962 21.6143 23.0574C21.0028 23.5637 20.2182 23.8121 19.4268 23.7499C17.9787 23.618 16.5771 23.1704 15.3205 22.4387C12.537 20.9639 10.1673 18.8151 8.42804 16.1887C8.04922 15.639 7.71243 15.0616 7.42054 14.4612C6.63752 13.1192 6.23316 11.5899 6.25054 10.0362C6.31032 9.22339 6.70011 8.47046 7.32929 7.95244Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-normal">{field_contact_5}</p>
                </div>
                <div className="flex text-blue-1 text-[15px] 2xl:text-[19px]">
                  <svg width="21" height="21" className="mr-[8px] mt-[-1px] 2xl:mt-[3px] 2xl:w-[24px] 2xl:h-[24px]" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9184 9.77933C20.9332 10.1933 21.2807 10.5169 21.6947 10.5022C22.1086 10.4874 22.4322 10.1399 22.4175 9.72595L20.9184 9.77933ZM17.0248 5.41931V6.16931C17.0332 6.16931 17.0415 6.16917 17.0499 6.16889L17.0248 5.41931ZM10.0611 5.41931L10.0361 6.16889C10.0444 6.16917 10.0528 6.16931 10.0611 6.16931V5.41931ZM4.66844 9.72595C4.6537 10.1399 4.97733 10.4874 5.39128 10.5022C5.80523 10.5169 6.15275 10.1933 6.16749 9.77933L4.66844 9.72595ZM22.418 9.75264C22.418 9.33843 22.0822 9.00264 21.668 9.00264C21.2538 9.00264 20.918 9.33843 20.918 9.75264H22.418ZM21.668 16.2526L22.4175 16.2793C22.4178 16.2704 22.418 16.2615 22.418 16.2526H21.668ZM17.0248 20.586L17.0499 19.8364C17.0415 19.8361 17.0332 19.836 17.0248 19.836V20.586ZM10.0611 20.586V19.836C10.0528 19.836 10.0444 19.8361 10.0361 19.8364L10.0611 20.586ZM5.41797 16.2526H4.66797C4.66797 16.2615 4.66813 16.2704 4.66844 16.2793L5.41797 16.2526ZM6.16797 9.75264C6.16797 9.33843 5.83218 9.00264 5.41797 9.00264C5.00376 9.00264 4.66797 9.33843 4.66797 9.75264H6.16797ZM22.0463 10.4002C22.4039 10.1913 22.5245 9.732 22.3156 9.37434C22.1066 9.01668 21.6473 8.89611 21.2897 9.10504L22.0463 10.4002ZM15.9653 13.0839L15.587 12.4363L15.5808 12.44L15.9653 13.0839ZM11.1206 13.0839L11.5052 12.4399L11.4989 12.4363L11.1206 13.0839ZM5.79627 9.10504C5.43861 8.89611 4.9793 9.01668 4.77037 9.37434C4.56144 9.732 4.68201 10.1913 5.03967 10.4002L5.79627 9.10504ZM21.668 9.75264L22.4175 9.72595C22.3146 6.83506 19.8909 4.57309 16.9997 4.66972L17.0248 5.41931L17.0499 6.16889C19.1143 6.09989 20.8449 7.71506 20.9184 9.77933L21.668 9.75264ZM17.0248 5.41931V4.66931H10.0611V5.41931V6.16931H17.0248V5.41931ZM10.0611 5.41931L10.0862 4.66972C7.19508 4.57309 4.77139 6.83506 4.66844 9.72595L5.41797 9.75264L6.16749 9.77933C6.241 7.71506 7.97166 6.09989 10.0361 6.16889L10.0611 5.41931ZM21.668 9.75264H20.918V16.2526H21.668H22.418V9.75264H21.668ZM21.668 16.2526L20.9184 16.2259C20.8449 18.2902 19.1143 19.9054 17.0499 19.8364L17.0248 20.586L16.9997 21.3356C19.8909 21.4322 22.3146 19.1702 22.4175 16.2793L21.668 16.2526ZM17.0248 20.586V19.836H10.0611V20.586V21.336H17.0248V20.586ZM10.0611 20.586L10.0361 19.8364C7.97166 19.9054 6.241 18.2902 6.16749 16.2259L5.41797 16.2526L4.66844 16.2793C4.77139 19.1702 7.19508 21.4322 10.0862 21.3356L10.0611 20.586ZM5.41797 16.2526H6.16797V9.75264H5.41797H4.66797V16.2526H5.41797ZM21.668 9.75264L21.2897 9.10504L15.587 12.4363L15.9653 13.0839L16.3436 13.7315L22.0463 10.4002L21.668 9.75264ZM15.9653 13.0839L15.5808 12.44C14.3256 13.1895 12.7603 13.1895 11.5052 12.44L11.1206 13.0839L10.7361 13.7278C12.4649 14.7603 14.621 14.7603 16.3498 13.7278L15.9653 13.0839Z" fill="#20446F" />
                  </svg>
                  <p className="font-normal">{field_contact_7}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[50px] grid grid-cols-[320px_1fr] sm:grid-cols-[506px_1fr] 2xl:grid-cols-[606px_1fr] gap-8 max-w-[70%] sm:max-w-[100%]">
            <div className="sm:max-w-[100%]">
              <div className="bg-[#F0F7FF]/70 rounded-tl-[10px] rounded-tr-[60px] p-[25px] sm:p-[50px]">
                <MessageForm custom_fields={custom_fields} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Original Image component for desktop, now conditionally hidden on mobile */}
      <Image
        src="/fcontact/contact-1.png"
        alt="Modern city skyline"
        fill
        className="z-1 hidden md:block" // Hidden on mobile, block on md and up
      />
    </div>
  );
}
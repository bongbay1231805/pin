import React from "react";
import { MessageForm } from "@/components/contact/MessageForm";
import Image from "next/image";
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
import { getTranslations } from "next-intl/server";

// export const metadata: Metadata = {
//   title: 'Liên hệ',
//   description: 'Liên hệ',
// };
type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/lien-he/lang', {
    cache: 'no-store'
  });
  const currentLocale = await getUserLocale();
  const { data: post } = await res.json();
  if (!post) {
    return {
      title: 'Bài viết không tồn tại',
      description: 'Không tìm thấy bài viết này.'
    };
  }

  return {
    title: post[currentLocale].seo_meta[0].seo_title || post[currentLocale].name,
    description: post[currentLocale].seo_meta[0].seo_description || post[currentLocale].seo_description,
    openGraph: {
      title: post[currentLocale].seo_meta[0].seo_title || post[currentLocale].name,
      description: post[currentLocale].seo_meta[0].seo_description || post[currentLocale].seo_description,
      images: [
        {
          //seo_image Sửa lỗi logic URL: '/storage/' không phải là URL hợp lệ.
          // Giả sử domain admin là nơi chứa ảnh
          url:
            `https://admin.pigroup.vn/storage/${post[currentLocale].seo_meta[0].seo_image || post[currentLocale].image}` ||
            '/logo.png'
        }
      ]
    }
  };
}

export default async function Contact() {
  const res = await fetch('https://admin.pigroup.vn/api/pages/lien-he/lang', {
    cache: 'no-store',
  });
  const { data } = await res.json();
  const currentLocale = await getUserLocale();
  const { custom_fields } = data[currentLocale];
  const { field_contact_1, field_contact_3, field_contact_5, field_contact_7, field_contact_13 } = custom_fields;
  const t = await getTranslations();
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
      <div className="contact-wrapper mx-auto max-w-[85%] px-[10px] relative z-10 md:h-[calc(100vh-96px)]"> {/* Giữ z-index 10 cho nội dung */}
        {/* The gradient overlay if you want it only for the content on mobile
            You can add it here if you want it to cover the content area, not the banner.
            For now, I've moved the main gradient overlay outside and made it desktop-only.
        */}

        <div className="grid h-full items-end md:items-start">
          <div className="max-w-[100%] pt-[50px] md:pt-[126px] 2xl:pt-[156px]">
            <h2 className="text-[22px] sm:text-[28px] 2xl:text-[45px]  font-bold mb-4 text-blue-1 uppercase">{field_contact_1}</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-y-1">
                <div className="flex text-blue-1 text-[15px] 2xl:text-[17px] items-start md:items-center">
                  {/* <svg width="23" height="23" className="mr-[5px] mt-[-1px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.3033 8.37357C21.7055 9.70958 22.4991 11.5618 22.4991 13.4986C22.4991 15.4354 21.7055 17.2876 20.3033 18.6236L14.9996 23.7486L9.69581 18.6236C8.29358 17.2876 7.5 15.4354 7.5 13.4986C7.5 11.5618 8.29358 9.70958 9.69581 8.37357C12.6648 5.54214 17.3343 5.54214 20.3033 8.37357Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 13.0535C17.9891 13.8382 17.6669 14.5865 17.1043 15.1337C16.5417 15.6808 15.7847 15.982 15 15.971C14.2153 15.982 13.4583 15.6808 12.8957 15.1337C12.3331 14.5865 12.0109 13.8382 12 13.0535C12.0233 11.4199 13.3663 10.1143 15 10.1373C16.6337 10.1143 17.9767 11.4199 18 13.0535V13.0535Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}

                  <Image
                    src="/contact/map.svg"
                    alt="Modern city skyline"
                    width="13" height="13" className="mr-[5px] mt-[5px] md:mt-[-1px]" 
                  />

                  <div>
                    <p className="font-normal max-w-[350px] md:max-w-none"><span className="font-semibold">{t('Contact.headOffice')}:</span>&nbsp;{field_contact_13}</p>
                  </div>
                </div>
                <div className="flex text-blue-1 text-[15px] 2xl:text-[17px] items-start md:items-center">
                  {/* <svg width="23" height="23" className="mr-[5px] mt-[-1px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.3033 8.37357C21.7055 9.70958 22.4991 11.5618 22.4991 13.4986C22.4991 15.4354 21.7055 17.2876 20.3033 18.6236L14.9996 23.7486L9.69581 18.6236C8.29358 17.2876 7.5 15.4354 7.5 13.4986C7.5 11.5618 8.29358 9.70958 9.69581 8.37357C12.6648 5.54214 17.3343 5.54214 20.3033 8.37357Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 13.0535C17.9891 13.8382 17.6669 14.5865 17.1043 15.1337C16.5417 15.6808 15.7847 15.982 15 15.971C14.2153 15.982 13.4583 15.6808 12.8957 15.1337C12.3331 14.5865 12.0109 13.8382 12 13.0535C12.0233 11.4199 13.3663 10.1143 15 10.1373C16.6337 10.1143 17.9767 11.4199 18 13.0535V13.0535Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}

                  <Image
                    src="/contact/map.svg"
                    alt="Modern city skyline"
                    width="13" height="13" className="mr-[5px] mt-[5px] md:mt-[-1px]" 
                  />

                  <div>
                    <p className="font-normal max-w-[350px] md:max-w-none"><span className="font-semibold">{t('Contact.office')}:</span>&nbsp;{field_contact_3}</p>
                  </div>
                </div>
                <div className="flex text-blue-1 text-[15px] 2xl:text-[17px]">
                  {/* <svg width="23" height="23" className="mr-[5px] mt-[-1px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.32929 7.95244C8.42929 6.79369 8.81804 6.46869 9.28679 6.31744C9.61119 6.23244 9.95141 6.22772 10.278 6.30369C10.708 6.42869 10.8218 6.52369 12.2318 7.92869C13.4705 9.16244 13.5943 9.29619 13.713 9.53744C13.9401 9.96091 13.9756 10.4612 13.8105 10.9124C13.6855 11.2562 13.508 11.4837 12.7568 12.2374L12.2668 12.7287C12.1381 12.8595 12.1079 13.058 12.1918 13.2212C13.2805 15.0785 14.825 16.6274 16.6793 17.7212C16.8927 17.8355 17.1556 17.7986 17.3293 17.6299L17.8005 17.1662C18.0918 16.8676 18.4002 16.5863 18.7243 16.3237C19.2332 16.0112 19.8674 15.9833 20.4018 16.2499C20.663 16.3749 20.7493 16.4524 22.0268 17.7274C23.3443 19.0412 23.3818 19.0824 23.5268 19.3837C23.7996 19.8824 23.7968 20.4863 23.5193 20.9824C23.378 21.2624 23.2918 21.3637 22.5505 22.1212C22.103 22.5787 21.6818 22.9962 21.6143 23.0574C21.0028 23.5637 20.2182 23.8121 19.4268 23.7499C17.9787 23.618 16.5771 23.1704 15.3205 22.4387C12.537 20.9639 10.1673 18.8151 8.42804 16.1887C8.04922 15.639 7.71243 15.0616 7.42054 14.4612C6.63752 13.1192 6.23316 11.5899 6.25054 10.0362C6.31032 9.22339 6.70011 8.47046 7.32929 7.95244Z" stroke="#20446F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}

                  <Image
                    src="/contact/phone.svg"
                    alt="Modern city skyline"
                    width="13" height="13" className="mr-[5px] mt-[-1px]" 
                  />
                  <p className="font-normal">{field_contact_5}</p>
                </div>
                <div className="flex text-blue-1 text-[15px] 2xl:text-[17px]">
                  
                  {/* <svg width="19" height="18" className="mr-[8px] 2xl:mt-[3px] 2xl:w-[24px] 2xl:h-[24px]" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.9184 5.77933C16.9332 6.19328 17.2807 6.5169 17.6947 6.50216C18.1086 6.48742 18.4322 6.1399 18.4175 5.72595L16.9184 5.77933ZM13.0248 1.41931V2.16931C13.0332 2.16931 13.0415 2.16917 13.0499 2.16889L13.0248 1.41931ZM6.06114 1.41931L6.03608 2.16889C6.04443 2.16917 6.05278 2.16931 6.06114 2.16931V1.41931ZM0.668444 5.72595C0.653703 6.1399 0.977328 6.48742 1.39128 6.50216C1.80523 6.5169 2.15275 6.19328 2.16749 5.77933L0.668444 5.72595ZM18.418 5.75264C18.418 5.33843 18.0822 5.00264 17.668 5.00264C17.2538 5.00264 16.918 5.33843 16.918 5.75264H18.418ZM17.668 12.2526L18.4175 12.2793C18.4178 12.2704 18.418 12.2615 18.418 12.2526H17.668ZM13.0248 16.586L13.0499 15.8364C13.0415 15.8361 13.0332 15.836 13.0248 15.836V16.586ZM6.06114 16.586V15.836C6.05278 15.836 6.04443 15.8361 6.03608 15.8364L6.06114 16.586ZM1.41797 12.2526H0.667969C0.667969 12.2615 0.668127 12.2704 0.668444 12.2793L1.41797 12.2526ZM2.16797 5.75264C2.16797 5.33843 1.83218 5.00264 1.41797 5.00264C1.00376 5.00264 0.667969 5.33843 0.667969 5.75264H2.16797ZM18.0463 6.40024C18.4039 6.19131 18.5245 5.732 18.3156 5.37434C18.1066 5.01668 17.6473 4.89611 17.2897 5.10504L18.0463 6.40024ZM11.9653 9.08389L11.587 8.43626L11.5808 8.43997L11.9653 9.08389ZM7.12064 9.08389L7.5052 8.43995L7.49894 8.43629L7.12064 9.08389ZM1.79627 5.10504C1.43861 4.89611 0.979297 5.01668 0.770367 5.37434C0.561437 5.732 0.682007 6.19131 1.03967 6.40024L1.79627 5.10504ZM17.668 5.75264L18.4175 5.72595C18.3146 2.83506 15.8909 0.573094 12.9997 0.669724L13.0248 1.41931L13.0499 2.16889C15.1143 2.09989 16.8449 3.71506 16.9184 5.77933L17.668 5.75264ZM13.0248 1.41931V0.669306H6.06114V1.41931V2.16931H13.0248V1.41931ZM6.06114 1.41931L6.08619 0.669724C3.19508 0.573094 0.771386 2.83506 0.668444 5.72595L1.41797 5.75264L2.16749 5.77933C2.241 3.71506 3.97166 2.09989 6.03608 2.16889L6.06114 1.41931ZM17.668 5.75264H16.918V12.2526H17.668H18.418V5.75264H17.668ZM17.668 12.2526L16.9184 12.2259C16.8449 14.2902 15.1143 15.9054 13.0499 15.8364L13.0248 16.586L12.9997 17.3356C15.8909 17.4322 18.3146 15.1702 18.4175 12.2793L17.668 12.2526ZM13.0248 16.586V15.836H6.06114V16.586V17.336H13.0248V16.586ZM6.06114 16.586L6.03608 15.8364C3.97166 15.9054 2.241 14.2902 2.16749 12.2259L1.41797 12.2526L0.668444 12.2793C0.771386 15.1702 3.19508 17.4322 6.08619 17.3356L6.06114 16.586ZM1.41797 12.2526H2.16797V5.75264H1.41797H0.667969V12.2526H1.41797ZM17.668 5.75264L17.2897 5.10504L11.587 8.43629L11.9653 9.08389L12.3436 9.73149L18.0463 6.40024L17.668 5.75264ZM11.9653 9.08389L11.5808 8.43997C10.3256 9.18954 8.76031 9.18954 7.50518 8.43998L7.12064 9.08389L6.73609 9.7278C8.46493 10.7603 10.621 10.7603 12.3498 9.7278L11.9653 9.08389ZM7.12064 9.08389L7.49894 8.43629L1.79627 5.10504L1.41797 5.75264L1.03967 6.40024L6.74233 9.73149L7.12064 9.08389Z" fill="#20446F"/>
                  </svg> */}

                  <Image
                    src="/contact/event.svg"
                    alt="Modern city skyline"
                    width="13" height="13" className="mr-[5px] mt-[-1px]" 
                  />
                  <p className="font-normal">{field_contact_7}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:absolute contact-form relative bottom-0 mt-[50px] grid sm:grid-cols-[506px_1fr] 2xl:grid-cols-[606px_1fr] max-w-[100%]">
            <div className="max-w-[100%]">
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
        className="z-1 hidden md:block object-cover" // Hidden on mobile, block on md and up
      />
    </div>
  );
}
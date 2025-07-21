import React from 'react';
import Image from 'next/image';
import Success from '@/components/digitalcity/Success';
import Part from '@/components/digitalcity/Part';
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
// export const metadata: Metadata = {
//   title: 'Đô thị số Picity',
//   description: 'Đô thị số Picity',
// };
// Định nghĩa kiểu dữ liệu cho props của component
interface ToggleSectionProps {
  headerContent: React.ReactNode; // Nội dung của phần header (có thể là JSX, chuỗi,...)
  children: React.ReactNode;     // Nội dung sẽ được ẩn/hiện khi toggle
  initialOpen?: boolean;         // Mặc định ban đầu là ẩn hay hiện (optional)
}

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/do-thi-so-picity/lang', {
    cache: 'no-store',
  });
  const { data: post } = await res.json();
  const currentLocale = await getUserLocale();
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



export default async function Digitalcity() {
  const res = await fetch('https://admin.pigroup.vn/api/pages/do-thi-so-picity/lang', {
    cache: 'no-store',
  });
  const currentLocale = await getUserLocale();
  const {data} = await res.json();
  const { custom_fields } = data[currentLocale];
  const {digitalcity_1,digitalcity_2} = custom_fields;
  const { image } = data[currentLocale];
  const imageSrc = image
? `https://admin.pigroup.vn/storage/${image}`
  : '/fdigitalcity/digitalcity-1.png';
  return (
    <>
      <div className="relative mx-auto h-[320px] md:h-[100vh] w-[100vw]  text-center pt-[20%] md:pt-[106px]">
        <div className="relative mx-auto md:top-[30%] max-w-[85%]">
          <svg className='relative z-1 w-[200px] md:w-[384px]' width="537" height="74" viewBox="0 0 537 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M121.342 0H136.08V73.3565C127.939 73.3565 121.342 66.7889 121.342 58.6852V0Z" fill="white" />
            <path d="M14.7496 14.6824H84.4833V36.6894H0V73.3565H14.7273V51.3495H99.2218V0H0C0 8.10372 6.59764 14.6824 14.7496 14.6824Z" fill="white" />
            <path d="M522.242 0V29.3537H452.486V0H437.736V44.0139H522.231V58.6963H452.464C444.334 58.6963 437.736 65.2639 437.736 73.3565H536.958V0H522.231H522.242Z" fill="white" />
            <path d="M172.947 58.6741V14.6602H242.703C250.833 14.6602 257.431 8.09259 257.431 0H158.209V73.3565H257.431C257.431 65.2528 250.833 58.6741 242.681 58.6741H172.947Z" fill="white" />
            <path d="M279.541 58.6852C279.541 66.7889 286.139 73.3565 294.279 73.3565V0H279.541V58.6852Z" fill="white" />
            <path d="M331.147 14.6824H358.656V73.3565H373.406V14.6824H400.892C409.033 14.6824 415.642 8.11485 415.642 0H316.42C316.42 8.10372 323.018 14.6824 331.17 14.6824H331.147Z" fill="white" />
          </svg>
          <h2 className='absolute z-10 left-0 text-left  uppercase font-bold text-white text-[12px] sm:text-[14px] md:text-[30px] flex items-center gap-[5px] sm:gap-[12px]'>
            <div className='leading-[25px] sm:leading-[48px] mt-[-30px] sm:mt-[0px]'>{digitalcity_1} <br /> {digitalcity_2}</div>
            <svg width="166" height="85" viewBox="0 0 166 85" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-[25%] md:w-[auto] mt-[-30px] sm:mt-[0px]'>
              <path d="M165.104 32.9294C139.871 32.6853 113.694 42.6735 86.6809 61.7188L90.7179 49.1952L76.6878 39.094H93.8473L99.2977 22.7288L104.649 39.094H115.044C120.323 36.649 126.342 34.2265 133.413 32.1249H109.593L99.1983 0L88.9026 32.1249H55.3965L82.3459 51.8211L72.2534 83.6432C104.852 53.4752 135.838 36.3055 165.109 32.9339L165.104 32.9294Z" fill="white" />
              <path d="M98.8457 66.4113L123.271 84.0873L114.054 55.3972C109.11 58.3937 104.03 62.1449 98.8457 66.4068V66.4113Z" fill="white" />
              <path d="M51.0329 42.9651C56.3443 47.1168 59 52.7888 59 59.9854C59 64.542 57.8864 68.6334 55.6638 72.2683C53.4411 75.9033 50.0872 78.7673 45.6066 80.8604C41.1215 82.9535 35.6024 84 29.0493 84C23.4727 84 18.0862 83.1731 12.8852 81.5193C7.6843 79.8655 3.38923 77.5743 0 74.6328L5.20092 65.9288C7.91408 68.4267 11.3784 70.4294 15.5984 71.9324C19.8184 73.4398 24.2637 74.1892 28.9344 74.1892C34.8865 74.1892 39.5042 72.9617 42.7785 70.4983C46.0573 68.0391 47.6966 64.6798 47.6966 60.4204C47.6966 55.7949 45.8894 52.2892 42.2704 49.899C38.6514 47.513 32.4738 46.32 23.7334 46.32H5.76212L9.94233 6H54.59V15.5826H19.4384L17.2908 36.7331H26.1063C37.4097 36.7331 45.717 38.809 51.0284 42.9564L51.0329 42.9651Z" fill="white" />
            </svg>
          </h2>
        </div>
        <Image fill src={imageSrc} alt="Smart City Features" />
      </div>
      <Part custom_fields={custom_fields} />
      <Success custom_fields={custom_fields} />
    </>
  );
}
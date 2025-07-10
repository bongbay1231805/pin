'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from 'lucide-react'; // Đảm bảo bạn import đúng icon từ 'lucide-react'
import Image from "next/image";
import ApplicationFormPopup from './ApplicationFormPopup';
import { useScrollRefs } from '@/context/ScrollRefsContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { transformJobPosts } from '@/hooks/useparseJobPosts';
import convertJsonStringToArrayOrObject from '@/hooks/useConvertJsonToArray';

export default function Hero({ data, dataPage }: any) {
  const { name, description, image, custom_fields: { human_resource_1, human_resource_2, human_resource_3, human_resource_4, human_resource_5, human_resource_6, human_resource_7, human_resource_8, human_resource_9
    , human_resource_10, human_resource_11, human_resource_12, human_resource_13, human_resource_14, human_resource_15, human_resource_16, human_resource_17, human_resource_18, human_resource_19,
    human_resource_20, human_resource_21, human_resource_22, human_resource_23, human_resource_24, human_resource_25, human_resource_26, human_resource_slider, human_resource_step } } = dataPage;

  const imageSrc = image
  ? `https://admin.pigroup.tqdesign.vn/storage/${image}`
    : '/fhuman/human.png';

  const { oneRef, twoRef, threeRef, fourRef } = useScrollRefs();
  const humanresourceslider = convertJsonStringToArrayOrObject(human_resource_slider);
  const humanresourcestep = convertJsonStringToArrayOrObject(human_resource_step);
  const firstConnect = humanresourceslider.slice(0, 4);
  const secondConnect = humanresourceslider.slice(4);

  useScrollReveal(); // dùng mặc định `.boxanimation`
    console.log(data.data)
  const datas = transformJobPosts(data.data);

  console.log(datas)
  const [allJobData, setAllJobData] = useState(datas);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(allJobData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = allJobData.slice(indexOfFirstItem, indexOfLastItem);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJobPosition, setSelectedJobPosition] = useState('');

  const handleOpenPopup = (position: string) => {
    setSelectedJobPosition(position);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedJobPosition('');
  };

  const handleToggleDetails = (id: string) => {
    setAllJobData(prevData =>
      prevData.map(job => {
        // Chỉ mở job có id trùng, các job khác (trên trang hiện tại) sẽ đóng lại
        if (currentJobs.some(j => j.id === job.id)) {
          return job.id === id ? { ...job, isOpen: !job.isOpen } : { ...job, isOpen: false };
        }
        return job;
      })
    );
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Đóng tất cả các dropdown khi chuyển trang
    setAllJobData(prevData => prevData.map(job => ({ ...job, isOpen: false })));
  };

  return (
    <>
      <div className="relative mx-auto h-[390px] sm:h-[500px] md:h-[100vh] w-[100vw] text-center pt-[70px] md:pt-[150px]">
        <div className="relative mx-auto top-[30%] max-w-[85%]">
          <h1 className='absolute z-10 left-0 text-left  uppercase font-bold text-white sm:leading-[50px] xl:leading-[56px] text-[22px] xl:text-[46px] 2xl:text-[70px] 2xl:leading-[90px]' dangerouslySetInnerHTML={{ __html: human_resource_1 }}></h1>
        </div>
        <Image fill src={imageSrc} alt="Smart City Features" className="object-cover" />
      </div>
      <div ref={oneRef} className="mx-auto max-w-[85%] text-center pt-[50px] md:pt-[110px]">
        <h2 className='uppercase font-bold text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px] mb-[30px] sm:mb-[50px]'>{human_resource_2}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] sm:gap-[20px] mx-auto w-full px-[30px] xl:max-w-[85%] pb-[45px]">
        <div className='border-1 border-gray-8 text-blue-1 hover:[&>svg>path]:fill-white hover:bg-yellow-1 hover:text-white gap-[10px] rounded-2xl flex flex-col h-[160px] sm:h-[218px] 2xl:h-[300px] items-center justify-center'>
          <div className='[&>svg]:w-[50px] [&>svg]:h-[50px] sm:[&>svg]:w-[88px] sm:[&>svg]:h-[88px]' dangerouslySetInnerHTML={{ __html: human_resource_3 }}></div>
          <div className='text-[10px] px-[10px] sm:text-[15px] 2xl:text-[22px] font-semibold uppercase text-center [&>br]:hidden sm:[&>br]:block' dangerouslySetInnerHTML={{ __html: human_resource_4 }}></div>
        </div>
        <div className='border-1 border-gray-8 text-blue-1 hover:[&>svg>path]:fill-white hover:bg-yellow-1 hover:text-white gap-[10px] rounded-2xl flex flex-col h-[160px] sm:h-[218px] 2xl:h-[300px] items-center justify-center'>
          <div className='[&>svg]:w-[50px] [&>svg]:h-[50px] sm:[&>svg]:w-[88px] sm:[&>svg]:h-[88px]' dangerouslySetInnerHTML={{ __html: human_resource_5 }}></div>
          <div className='text-[10px] px-[10px] sm:text-[15px] 2xl:text-[22px] font-semibold uppercase text-center [&>br]:hidden sm:[&>br]:block' dangerouslySetInnerHTML={{ __html: human_resource_6 }}></div>
        </div>
        <div className='border-1 border-gray-8 text-blue-1 hover:[&>svg>path]:fill-white hover:bg-yellow-1 hover:text-white gap-[10px] rounded-2xl flex flex-col h-[160px] sm:h-[218px] 2xl:h-[300px] items-center justify-center'>
          <div className='[&>svg]:w-[50px] [&>svg]:h-[50px] sm:[&>svg]:w-[88px] sm:[&>svg]:h-[88px]' dangerouslySetInnerHTML={{ __html: human_resource_7 }}></div>
          <div className='text-[10px] px-[10px] sm:text-[15px] 2xl:text-[22px] font-semibold uppercase text-center [&>br]:hidden sm:[&>br]:block' dangerouslySetInnerHTML={{ __html: human_resource_8 }}></div>
        </div>
        <div className='border-1 border-gray-8 text-blue-1 hover:[&>svg>path]:fill-white hover:bg-yellow-1 hover:text-white gap-[10px] rounded-2xl flex flex-col h-[160px] sm:h-[218px] 2xl:h-[300px] items-center justify-center'>
          <div className='[&>svg]:w-[50px] [&>svg]:h-[50px] sm:[&>svg]:w-[88px] sm:[&>svg]:h-[88px]' dangerouslySetInnerHTML={{ __html: human_resource_9 }}></div>
          <div className='text-[10px] px-[10px] sm:text-[15px] 2xl:text-[22px] font-semibold uppercase text-center [&>br]:hidden sm:[&>br]:block' dangerouslySetInnerHTML={{ __html: human_resource_10 }}></div>
        </div>
      </div>
      <div className='mx-auto w-full px-[30px] xl:max-w-[85%]'>
        <div className="h-[180px] relative bg-blue-3 rounded-[10px] flex pl-[30px] sm:pl-[50px] lg:pl-[100px] md:pr-[10px] items-center justify-between">
          <Image width={50} height={100} src="/quotation_marks.svg" alt="Smart City Features" className="absolute sm:left-6 sm:top-6 left-[10px] top-[30px] w-[20px] sm:w-[50px]" />
          <p className='text-[20px] [&>br]:hidden sm:[&>br]:inline-block z-1 md:text-[25px] text-yellow-1 px-[10px]' dangerouslySetInnerHTML={{ __html: human_resource_11 }}></p>
          <svg className='absolute right-0 bottom-0 h-[170px] w-[170px] sm:ml-0' width="217" height="200" viewBox="0 0 217 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M77.7226 31.744C85.9162 31.744 92.5584 25.0855 92.5584 16.872C92.5584 8.65841 85.9162 2 77.7226 2C69.529 2 62.8867 8.65841 62.8867 16.872C62.8867 25.0855 69.529 31.744 77.7226 31.744Z" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45.1741 60.1561L31.3036 65.0217C28.828 65.8918 26.7555 67.6409 25.48 69.9405L19.8778 80.0535C17.9558 83.5162 13.5848 84.7415 10.1526 82.7748C6.74699 80.8259 5.56455 76.4798 7.51314 73.0659L16.5298 57.2483C17.5882 55.3926 19.2357 53.941 21.2108 53.1285L45.7188 43.0467C50.1164 41.2354 55.1119 41.6083 59.195 44.0411C65.0408 47.526 67.8485 54.4914 66.0594 61.0706L59.7885 84.12L83.6233 102.868C86.6923 105.283 88.2644 109.14 87.7552 113.016L84.1458 140.5" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32.7719 75.25L31.0624 91.5426C30.5089 96.8077 33.6842 101.749 38.6929 103.422L62.4259 111.351C66.9342 112.856 69.9766 117.087 69.9766 121.85V140.509" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30.1133 112.541L28.0496 122.88C27.6599 124.833 26.783 126.658 25.4987 128.181L17.1597 138.063C14.6885 140.988 14.7638 145.299 17.3368 148.136C19.8522 150.906 24.0019 151.443 27.1329 149.397L37.8368 142.409C39.7323 141.17 41.2292 139.412 42.1547 137.344L50.0421 119.648" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M216.559 104.55L169.173 156.491L133.744 150.276L80.6007 192.894L53.5862 181.352L0 204.436" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M197.516 103.662H217.002V123.195" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M75.7279 62.3757L81.0423 68.1469H94.771C98.1943 68.1469 100.971 70.9304 100.971 74.3621C100.971 77.7938 98.1943 80.5773 94.771 80.5773H79.2708L71.7422 77.9136" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M65.9844 176.024V145.721C65.9844 142.84 68.3138 140.509 71.1836 140.509H89.1239C91.998 140.509 94.3231 142.844 94.3231 145.721V167.145" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115.145 148.056V117.753C115.145 114.871 117.474 112.541 120.344 112.541H138.284C141.158 112.541 143.483 114.876 143.483 117.753V139.177" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M166.074 141.841V88.8967C166.074 86.0155 168.404 83.6848 171.273 83.6848H189.214C192.088 83.6848 194.413 86.0199 194.413 88.8967V110.321" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M175.73 83.6848V10.4348H215.008C215.708 10.4348 216.04 11.3005 215.517 11.7711L204.273 21.9151C203.963 22.1948 203.932 22.6742 204.211 22.9894L215.455 35.8148C215.885 36.3076 215.544 37.0801 214.888 37.0889L175.81 37.5151" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.5 184.903V175.403C15.5 172.806 17.5992 170.697 20.1943 170.697H47.386" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.5 207.988V211.69C15.5 213.568 17.019 215.091 18.8923 215.091H43.9937C45.867 215.091 47.386 213.568 47.386 211.69V196.001" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M65.9844 196.001V209.582C65.9844 212.623 68.4467 215.091 71.4803 215.091H88.8316C91.8652 215.091 94.3275 212.623 94.3275 209.582V196.001" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115.145 177.8V209.644C115.145 212.654 117.576 215.091 120.578 215.091H138.054C141.056 215.091 143.488 212.654 143.488 209.644V162.706" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M166.074 166.258V210.474C166.074 213.027 168.138 215.091 170.68 215.091H189.807C192.354 215.091 194.413 213.022 194.413 210.474V148.056" stroke="#1E3753" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div>
        <div ref={twoRef}>
          <div className="mx-auto w-full px-[30px] xl:max-w-[85%] text-center pt-[50px] sm:pt-[100px]">
            <h2 className="uppercase font-bold text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px]">{human_resource_12}</h2>
          </div>
          <div className="mx-auto w-full px-[30px] xl:max-w-[85%]">
            <div className="grid grid-cols-1 md:grid-cols-[400px_1fr_1fr] md:gap-[20px] mt-[30px] md:mt-[42px]">
              <div className="order-1 md:order-0 relative md:mr-[20px] min-h-[320px] rounded-[10px] overflow-hidden">
                <Image alt="benefit 7" loading="lazy" decoding="async" className='object-cover h-auto' width="600" height="600" src={`https://admin.pigroup.tqdesign.vn/storage/${human_resource_13}`} />
              </div>
              <div className="grid grid-cols-1 md:gap-y-[0px] md:gap-x-[20px] [&>div]:last:border-b-[0] md:[&>div]:last:border-b-[1px]">
                {
                  firstConnect.map((firstC: any, index: number) => (
                    <div key={index} className={`${index === 0 ? "border-y-[1px]" : "border-b-[1px]"} border-gray-8 flex items-center py-[24px] sm:py-[0px] gap-[24px]`}>
                      <div className="relative min-w-[60px] w-[60px] min-h-h-[60px] h-[60px] flex items-center justify-center bg-white border-[1px] border-yellow-4 rounded-[7px]" dangerouslySetInnerHTML={{ __html: firstC[0].value }}></div>
                      <h3 className="text-blue-1 font-semibold text-[13px] 2xl:text-[17px]" dangerouslySetInnerHTML={{ __html: firstC[1].value }}></h3>
                    </div>
                  ))
                }
              </div>
              <div className="grid grid-cols-1 md:gap-y-[0px] md:gap-x-[20px]">
                {
                  secondConnect.map((secondC: any, index: number) => (
                    <div key={index} className={`${index === 0 ? "border-y-[1px]" : "border-b-[1px]"} border-gray-8 flex items-center py-[24px] sm:py-[0px] gap-[24px]`}>
                      <div className="relative min-w-[60px] w-[60px] min-h-h-[60px] h-[60px] flex items-center justify-center bg-white border-[1px] border-yellow-4 rounded-[7px]" dangerouslySetInnerHTML={{ __html: secondC[0].value }}></div>
                      <h3 className="text-blue-1 font-semibold text-[13px] 2xl:text-[17px]" dangerouslySetInnerHTML={{ __html: secondC[1].value }}></h3>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="mx-auto w-full px-[30px] xl:max-w-[85%]">
            <h3 className="uppercase font-bold text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px] text-center py-[50px_30px] sm:py-[100px_25px]">{human_resource_14}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-[63%_1fr] 2xl:grid-cols-[63%_1fr] grid-rows-3 sm:grid-rows-2 gap-[10px] sm:gap-[20px] sm:h-[500px] 2xl:h-[650px] h-auto">
              <div className="relative row-span-2 group overflow-hidden rounded-[10px] after:content-[''] after:absolute after:left-0 after:bottom-0
              after:w-full after:h-[30%] after:duration-1000 after:z-1 after:bg-[linear-gradient(0deg,_#20446F_0%,_rgba(32,68,111,0)_83.82%)]
              after:opacity-80 hover:after:opacity-100" >
                <Image className="transition-transform duration-1000 group-hover:scale-[120%]" alt="benefit 8" loading="lazy" decoding="async" width="1900" height="1000" style={{ height: '100%', objectFit: 'cover' }} src={`https://admin.pigroup.tqdesign.vn/storage/${human_resource_15}`} />
                <div className="absolute uppercase bottom-[20px] w-full text-center text-[14px] sm:text-[17px] 2sm:text-[17px] text-white font-bold object-top z-10" style={{ objectFit: 'cover' }} >{human_resource_16}</div>
              </div>
              <div className="grid grid-cols-2 row-span-2 gap-[10px] sm:gap-[20px]">
                <div className="relative row-start-1 col-span-1 sm:col-span-2 group overflow-hidden rounded-[10px] after:content-[''] after:absolute after:left-0 after:bottom-0
              after:w-full after:h-[30%] after:duration-1000 after:z-1 after:bg-[linear-gradient(0deg,_#20446F_0%,_rgba(32,68,111,0)_83.82%)]
              after:opacity-80 hover:after:opacity-100" >
                  <Image alt="benefit w-1/2 sm:w-auto" loading="lazy" decoding="async" fill src={`https://admin.pigroup.tqdesign.vn/storage/${human_resource_17}`} className='object-cover rounded-[10px] transition-transform duration-1000 group-hover:scale-[120%]' style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  <div className="absolute uppercase bottom-[20px] w-full text-center text-[14px] sm:text-[17px] text-white font-bold z-10">{human_resource_18}</div>
                </div>
                <div className="relative row-start-1 sm:row-start-2 col-span-1 sm:col-span-2 group overflow-hidden rounded-[10px] after:content-[''] after:absolute after:left-0 after:bottom-0
              after:w-full after:h-[30%] after:duration-1000 after:z-1 after:bg-[linear-gradient(0deg,_#20446F_0%,_rgba(32,68,111,0)_83.82%)]
              after:opacity-80 hover:after:opacity-100">
                  <Image alt="benefit 10" loading="lazy" decoding="async" fill src={`https://admin.pigroup.tqdesign.vn/storage/${human_resource_19}`} className='object-top rounded-[10px] transition-transform duration-1000 group-hover:scale-[120%]' style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  <div className="absolute uppercase bottom-[20px] w-full text-center text-[14px] sm:text-[17px] text-white font-bold z-10">{human_resource_20}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 ref={threeRef} className="uppercase font-bold text-yellow-1 text-center text-[22px] sm:text-[28px] 2xl:text-[45px] py-[50px_30px] sm:py-[100px_25px]">{human_resource_21}</h3>
        <div className="mx-auto w-full px-[30px] sm:max-w-[85%] grid sm:gap-[50px] grid-cols-1 sm:grid-cols-2 text-gray-5">
          {humanresourcestep.map((humanre: any, index: number) => (
            <div key={index} className='grid gap-[25px]'>
              <div className='relative h-auto'>
                <Image className="h-auto" alt="benefit 14" loading="lazy" decoding="async" width="900" height="900" src={`https://admin.pigroup.tqdesign.vn/storage/${humanre[5].value}`} />
              </div>
              <div className="grid text-[13px]">
                <h4 className="uppercase font-bold text-blue-1 text-[20px] sm:text-[25px] mb-[12px] sm:mb-[22px]">{humanre[0].value}</h4>
                <div className='2xl:text-[17px] mb-[30px] sm:mb-0 grid gap-[15px]'>
                  <div dangerouslySetInnerHTML={{ __html: humanre[1].value }}></div>
                  <div dangerouslySetInnerHTML={{ __html: humanre[2].value }}></div>
                  <div dangerouslySetInnerHTML={{ __html: humanre[3].value }}></div>
                  <div dangerouslySetInnerHTML={{ __html: humanre[4].value }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h3 ref={fourRef} className="uppercase font-bold text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px] text-center py-[25px_10px] sm:py-[120px_25px]">{human_resource_22}</h3>
        <div className="overflow-x-auto w-full px-[30px] sm:max-w-[85%] m-auto">
          {/* --- PHẦN BẢNG (CHỈ HIỂN THỊ TRÊN MÀN HÌNH LỚN HƠN HOẶC BẰNG MD) --- */}
          <table id="job-table" className="min-w-full hidden md:table">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr className='bg-blue-1 text-[15px] font-semibold text-white'>
                <th className='rounded-tl-[10px] rounded-bl-[10px]'></th>
                <th className="min-w-[300px] py-[10px] sm:py-[18px] text-left uppercase pl-[12px] sm:pl-[18px]">{human_resource_23}</th>
                <th className="min-w-[100px] py-[10px] sm:py-[18px] text-center uppercase">{human_resource_24}</th>
                <th className="min-w-[100px] py-[10px] sm:py-[18px] text-center uppercase">{human_resource_25}</th>
                <th className="min-w-[150px] py-[10px] sm:py-[18px] text-center uppercase rounded-tr-[10px] rounded-br-[10px]">{human_resource_26}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentJobs.map((job: any) => ( // Thêm kiểu any cho job
                <React.Fragment key={job.id}>
                  <tr className="hover:bg-gray-50 text-[14px] 2xl:text-[20px] font-semibold uppercase">
                    <td className="px-[12px] py-[10px] sm:px-[18px] sm:py-[15px] whitespace-nowrap text-center">
                      <button
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        onClick={() => handleToggleDetails(job.id)}
                        aria-expanded={job.isOpen ? "true" : "false"}
                      >
                        {job.isOpen ? (
                          <ChevronUpIcon className="h-6 w-6 transform transition-transform duration-200" />
                        ) : (
                          <ChevronDownIcon className="h-6 w-6 transform transition-transform duration-200" />
                        )}
                      </button>
                    </td>
                    <td
                      className="px-[12px] py-[10px] sm:px-[18px] sm:py-[15px] text-blue-1"
                      onClick={() => handleToggleDetails(job.id)}
                      aria-expanded={job.isOpen ? "true" : "false"}
                    >
                      {job.position}
                    </td>
                    <td
                      className="px-[12px] py-[10px] sm:px-[18px] sm:py-[15px] text-center text-blue-1"
                      onClick={() => handleToggleDetails(job.id)}
                      aria-expanded={job.isOpen ? "true" : "false"}
                    >
                      {job.quantity}
                    </td>
                    <td
                      className="px-[12px] py-[10px] sm:px-[18px] sm:py-[15px] text-center text-yellow-1"
                      onClick={() => handleToggleDetails(job.id)}
                      aria-expanded={job.isOpen ? "true" : "false"}
                    >
                      {job.deadline}
                    </td>
                    <td className="px-[12px] py-[10px] sm:px-[18px] sm:py-[15px] flex justify-center">
                      <button
                        onClick={() => handleOpenPopup(job.position)}
                        className="uppercase hvr-bounce-to-right sm:flex items-center justify-center text-yellow-1 text-[16px] font-semibold w-[150px] h-[35px] border border-yellow-1 hover:text-white  focus:text-white"
                      >
                        Ứng tuyển
                      </button>
                    </td>
                  </tr>
                  {/* Hàng chứa nội dung dropdown */}
                  <tr className={job.isOpen ? '' : 'hidden'}>
                    <td></td>
                    <td colSpan={4} className="px-6 text-sm text-gray-700 py-[50px]">
                      <div className="2xl:text-[17px] content-container" dangerouslySetInnerHTML={{ __html: job.details.rawHtml || "" }}></div>
                      <div className='flex justify-center pt-[50px]'>
                        <button
                          onClick={() => handleOpenPopup(job.position)}
                          className="uppercase hvr-bounce-to-right sm:flex items-center justify-center text-yellow-1 text-[16px] font-semibold w-[150px] h-[35px] border border-yellow-1 hover:text-white  focus:text-white"
                        >
                          Ứng tuyển
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          

{/* --- PHẦN ACCORDION (CHỈ HIỂN THỊ TRÊN MÀN HÌNH NHỎ HƠN MD) --- */}
<div className="md:hidden space-y-4 pt-[25px]">
  {currentJobs.map((job: any) => (
    <div key={job.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
      <div
        className="flex flex-col justify-between items-start p-4 text-blue-1 cursor-pointer"
        onClick={() => handleToggleDetails(job.id)}
        aria-expanded={job.isOpen ? "true" : "false"}
      >
        <div className="flex justify-between items-center w-full mb-2"> {/* Thêm div bọc để căn chỉnh tiêu đề và icon */}
          <div className="flex"> {/* Thêm div này để nhóm icon mũi tên và tiêu đề */}
            {job.isOpen ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-400 mr-2 transform rotate-90 transition-transform duration-200" /> // Mũi tên xuống khi mở (hoặc mũi tên xoay 90 độ)
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-400 mr-2 transition-transform duration-200" /> // Mũi tên phải khi đóng
            )}
            <h3 className="text-[14px] uppercase font-semibold">{job.position}</h3> {/* Tên vị trí tuyển dụng */}
          </div>
          
        </div>
        {/* Di chuyển Số lượng và Thời hạn lên đây */}
        <div className="flex justify-between items-center w-full text-sm">
          <span className="text-black">{human_resource_24}: <span className="font-semibold">{job.quantity}</span></span>
          <span>{human_resource_25}: <span className="text-yellow-1">{job.deadline}</span></span>
        </div>

        <div className="pt-[15px]">
          <button
            onClick={() => handleOpenPopup(job.position)}
            className="hvr-bounce-to-right flex items-center justify-center text-yellow-1 text-[16px] font-semibold w-[150px] h-[35px] border border-yellow-1 hover:text-white focus:text-white"
          >
            Ứng tuyển
          </button>
        </div>
      </div>

      {job.isOpen && (
        <div className="p-4 text-sm text-gray-700 transition-all duration-300 ease-in-out">
          {/* Phần chi tiết job.details.rawHtml */}
          <div dangerouslySetInnerHTML={{ __html: job.details.rawHtml || "" }}></div>
          <div className='flex justify-center py-[20px]'>
            <button
              onClick={() => handleOpenPopup(job.position)}
              className="uppercase hvr-bounce-to-right sm:flex items-center justify-center text-yellow-1 text-[16px] font-semibold w-[150px] h-[35px] border border-yellow-1 hover:text-white  focus:text-white"
            >
              Ứng tuyển
            </button>
          </div>
        </div>
      )}
    </div>
  ))}
</div>

          {/* Pagination Controls */}
          <div className="text-[13px] 2xl:text-[17px] flex justify-center items-center space-x-2 mt-[25px] mb-[75px]">
            {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`w-[25px] h-[25px] text-center rounded-full ${currentPage === pageNumber
                  ? 'bg-yellow-1 text-white'
                  : 'text-yellow-1 bg-white border border-yellow-1 hover:bg-yellow-1 hover:text-white'
                  }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
        {/* The Application Form Popup */}
        <ApplicationFormPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          selectedPosition={selectedJobPosition}
          allJobData={allJobData}
        />
      </div>
    </>
  );
}
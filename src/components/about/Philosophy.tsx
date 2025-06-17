'use client';
import Image from "next/image"
import { useScrollRefs } from '@/context/ScrollRefsContext'
export function Philosophy({ custom_fields }: any) {
  const { fourRef, fiveRef } = useScrollRefs();
  const {field_13_about,field_14_about,field_15_about,field_16_about,field_17_about,field_18_about,field_19_about,field_20_about,field_21_about,field_22_about,field_22_about_174915960724,field_23_about} = custom_fields;
  return (
    <section ref={fourRef} className="py-16">
      <div className="max-w-[85%] mx-auto bg-blue-3 rounded-[10px] bg-[url('/fabout/target.png')] bg-contain bg-no-repeat bg-right">
        <div className="grid items-center grid-cols-1 md:grid-cols-[70%_30%] mb-8 uppercase text-[20px] 2xl:text-[35px] py-[2px] text-white">
          <div className="pb-[22px] font-bold text-start leading-[30px] text-[23px] 2xl:text-[35px] 2xl:leading-[42px] pt-[10px] pl-[30px] sm:pl-[106px]">
            <p>{field_19_about}<br />{field_20_about}</p>
          </div>
          <div className="text-end py-[22px] pr-[30px] sm:pr-[76px] leading-[30px]  sm:leading-[52px] 2xl:leading-[62px] font-[500]">
            <h3>{field_13_about} <span className="text-yellow-1">{field_14_about}</span></h3>
            <h3>{field_15_about} <span className="text-yellow-1">{field_16_about}</span></h3>
            <h3>{field_17_about} <span className="text-yellow-1">{field_18_about}</span></h3>
          </div>
        </div>
      </div>
      <div ref={fiveRef} className="max-w-[85%] m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative vision-item vision-item h-[320px] 2xl:h-[380px] bg-gray-800 group rounded-[10px] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Image
                src="/fabout/vision.png"
                alt="vision"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute vision-content inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-[30px] title font-bold mb-4 text-white">{field_21_about}</h3>
                <div className="text-[14px] content text-white" dangerouslySetInnerHTML={{ __html: field_22_about }}></div>
                <div className="bg"></div>
              </div>
            </div>
          </div>
          <div className="relative vision-item h-[320px] 2xl:h-[380px] bg-gray-800 group rounded-[10px] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Image
                src="/fabout/mission.png"
                alt="mission"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute vision-content inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-[30px] title font-bold mb-4 text-white">{field_22_about_174915960724}</h3>
                <div className="text-[14px] content text-white" dangerouslySetInnerHTML={{ __html: field_23_about }}></div>
                <div className="bg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

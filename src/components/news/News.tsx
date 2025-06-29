'use client';
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import '@/components/news.css'; // Ensure this file contains the necessary styles
import Image from "next/image";
const mainImage = "/fnews/news-1.png";
export default function News({ posts }: any) {
  useScrollReveal();

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 mt-[70px]">
        <p>Không tìm thấy bài viết nào.</p>
      </div>
    ); // Hoặc trả về null, hoặc một thông báo khác
  }


  return (
    <div className="min-h-screen pt-[70px] sm:pt-[190px] 2xl:pt-[226px] pb-[30px] sm:pb-[90px] m-auto w-full px-[30px] sm:px-0 sm:max-w-[75%]">
      <div className="mx-auto flex flex-col gap-12">
        
        {/* Top Image w/ Overlayed Card */}
        <Link href={`https://pigroup.tqdesign.vn/posts/${posts[0].slug}`} className="relative news-top-item mb-[100px] sm:mb-[0px]">
          <div className='img-container flex justify-center items-center ef:w-[1178px] w-full max-w-[100%] sm:max-w-[75%] rounded-[10px] h-[262px] sm:h-auto ef:max-h-[58vh] mt-[50px] sm:mt-[0px]'>
            {
              posts[0].is_featured ? (
                <Image
                  src={`https://admin.pigroup.tqdesign.vn/storage/${posts[0].image}`}
                  alt="PiGroup building"
                  width={1234}
                  height={885}
                  className="object-cover shadow-lg max-w-full max-h-full"
                />
              ) : (
                <Image
                  src={`https://admin.pigroup.tqdesign.vn/storage/${posts[0].image}`}
                  alt="PiGroup building"
                  width={1234}
                  height={885}
                  className="object-cover shadow-lg max-w-full max-h-full"
                />
              )
            }
          </div>
          <div className="absolute h-[165px] sm:h-auto bottom-[-105px] sm:bottom-0 right-0 translate-y-1/4 z-10 sm:max-w-[calc(50%_-_15px)] bg-[#142F4F] rounded-tr-[40px] text-white p-[20px] sm:pl-10 sm:pr-10 sm:py-6 shadow-xl">
            <div className="font-bold uppercase title text-[17px] 2xl:text-[21px] mb-2">
              {posts[0].name}
            </div>
            <div className="text-[13px] 2xl:text-[17px] text-white/85 line-clamp-2">
              {posts[0].description}
            </div>
          </div>
        </Link>

        {/* Bottom 2 cards section (responsive grid) */}
        <div className="grid mt-[30px] sm:mt-[25px] 2xl:mt-[25px] grid-cols-1 sm:gap-y-[50px] gap-y-[40px] gap-x-[10px] sm:grid-cols-2 sm:gap-y-[35px] sm:gap-x-[40px]">
          {/* Card 1 */}
          {
            posts.map((post: any, index: number) =>
              index ? (
                <Link key={index + "post"} href={`https://pigroup.tqdesign.vn/posts/${post.slug}`} className="news-item relative rounded-2xl flex flex-col sm:h-[350px]">
                  <div className='img-container rounded-[10px] overflow-hidden w-full'>
                    {
                      post.is_featured ? (
                        <img
                          src={`https://admin.pigroup.tqdesign.vn/storage/${post.image}`}
                          alt="PiGroup building"
                          className="object-cover shadow-lg"
                        />
                      ) : (
                        <img
                          src={`https://admin.pigroup.tqdesign.vn/storage/${post.image}`}
                          alt="PiGroup building"
                          className="object-cover shadow-lg"
                        />
                      )
                    }
                  </div>
                  {/* Label */}
                  <div >
                    <div className={`title absolute ${index % 2 === 0 ? 'bottom-[-30px] sm:bottom-[50px]' : 'bottom-[-30px] sm:bottom-[50px]' }  left-0 translate-y-2/5 leading-[21px] 2xl:leading-[26px] z-10 bg-[#EAF3FF] rounded-tr-[40px] w-[100%] sm:w-[80%] px-6 py-[18px] text-blue-1 font-bold text-[13px] 2xl:text-[17px] uppercase sm:h-[78px]`}>
                      <span  className="line-clamp-2">
                        {post.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ) : null
            )
          }
        </div>
      </div>
    </div>
  )
}
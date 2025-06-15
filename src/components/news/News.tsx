'use client';
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import '@/components/news.css'; // Ensure this file contains the necessary styles
const mainImage = "/fnews/news-1.png";
export default function News({ posts }: any) {
  useScrollReveal();
  return (
    <div className="min-h-screen pt-[206px] 2xl:pt-[226px] pb-[90px] container m-auto max-w-[85%] px-[10px]">
      <div className="mx-autoflex flex-col gap-12">
        {/* Top Image w/ Overlayed Card */}
        <Link href={`https://pigroup.tqdesign.vn/posts/${posts[0].slug}`} className="relative news-top-item">
          <div className='img-container flex justify-center items-center ef:w-[1178px] max-w-[75%] rounded-[10px] ef:max-h-[58vh]'>
            <img
              src={mainImage}
              alt="PiGroup building"
              className="object-cover shadow-lg"
            />
          </div>
          {/* Overlay Card (bottom right) */}
          <div className="absolute bottom-0 right-0 translate-y-1/4 z-10 sm:max-w-[calc(50%_-_15px)] bg-[#142F4F] rounded-tr-[40px] text-white pl-10 pr-10 py-6 shadow-xl">
            <div className="font-bold title text-[17px] 2xl:text-[21px] mb-2">
              {posts[0].name}
            </div>
            <div className="text-[13px] 2xl:text-[17px] text-white/85">
              {posts[0].description}
            </div>
          </div>
        </Link>
        {/* Bottom 2 cards section (responsive grid) */}
        <div className="grid mt-[120px] 2xl:mt-[130px] grid-cols-1 gap-y-[10px] gap-x-[10px] sm:grid-cols-2 sm:gap-y-[50px] sm:gap-x-[40px]">
          {/* Card 1 */}
          {
            posts.map((post: any, index: number) => 
              index ? (
                <Link key={index+"post"} href={`https://pigroup.tqdesign.vn/posts/${post.slug}`} className="news-item relative rounded-2xl flex flex-col">
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
                          src={mainImage}
                          alt="PiGroup building"
                          className="object-cover shadow-lg"
                        />
                      )
                    }
                  </div>
                  {/* Label */}
                  <div >
                    <div className="title absolute bottom-[56px] left-0 translate-y-2/5 leading-[21px] 2xl:leading-[26px] z-10 bg-[#EAF3FF] rounded-tr-[60px] w-[68%] px-6 py-[18px] text-blue-1 font-bold text-[14px] 2xl:text-[17px] uppercase">
                      {post.name}
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
'use client';
import Image from "next/image"
export function ContentBidding({post}:any) {
  const specificDateString = new Date(post.created_at);
  return (
    <>
      <div className="flex items-center gap-[20px] gap-y-[0px] sm:gap-[40px] border-b-[2px] border-[#D9D9D9] pt-[30px] sm:pt-[70px]">
        <div className="ml-[-30px] sm:ml-[0px] grid grid-cols-1 text-center min-w-[90px] w-[90px] h-[90px] bg-blue-1 items-top justify-center p-x-[15px] rounded-tr-[16px]">
          <span className="text-white font-semibold text-[15px] mt-[20px] leading-none">{specificDateString.getDay()}.{specificDateString.getFullYear()}</span>
          <span className="text-white font-bold text-size-35 mb-[10px] leading-none">{specificDateString.getDate()}</span>
        </div>
        <h1 className="uppercase text-[15px] sm:text-[28px] 2xl:text-[39px] text-blue-1 font-bold">{post.name}</h1>
      </div>
      <div className="text-gray-5 text-[13px] 2xl:text-[17px] pt-[47px] [&>img]:my-[30px] [&>figure>img]:my-[30px] [&>figure]:text-center [&>figure]:text-[17px] [&>figure]:text-gray-6 [&>figure]:mb-[20px] sm:[&>figure]:mb-[40px] post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <div>
        {/* <strong className="block mt-[40px] mb-[45px] w-full text-right">Ngọc Diễm</strong> */}
        <ul className="flex gap-[10px] mt-[86px] mb-[45px] items-center justify-end">
          <p className="text-[13px] 2xl:text-[17px] font-semibold text-gray-6 mr-0.5 ">Chia sẻ</p>
          <li>
            <a href={`https://www.facebook.com/sharer/sharer.php/?u=https://pigroup.tqdesign.vn/posts/${post.slug}`}>
              <Image
                src="/fnews/fb.svg"
                alt="Modern cityscape with high-rise buildings"
                width={32}
                height={32}
                priority
              />
            </a>
          </li>
          <li>
            <a href={`https://www.instagram.com/p?https://pigroup.tqdesign.vn/posts/${post.slug}`}>
              <Image
                src="/fnews/inter.svg"
                alt="Modern cityscape with high-rise buildings"
                width={32}
                height={32}
                priority
              />
            </a>
          </li>
          <li>
            <a href={`http://www.linkedin.com/shareArticle?url=https://pigroup.tqdesign.vn/posts/${post.slug}`}>
              <Image
                src="/fnews/linkin.svg"
                alt="Modern cityscape with high-rise buildings"
                width={32}
                height={32}
                priority
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
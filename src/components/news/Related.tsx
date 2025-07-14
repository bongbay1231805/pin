// components/news/Related.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from 'react';

const mainImage = "/fnews/news-1.png";

interface PostItem {
  id?: number;
  name: string;
  slug: string;
  image?: string;
  is_featured?: boolean;
}

export default function Related({ post }: { post: PostItem[] }) {
  const ITEMS_PER_PAGE = 4;
  
  const [currentPage, setCurrentPage] = useState(1);

  if (!Array.isArray(post) || post.length === 0) {
    return <div className="text-center mt-20">Không tìm thấy bài viết liên quan</div>;
  }

  const totalPages = Math.ceil(post.length / ITEMS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return post.slice(startIndex, endIndex);
  }, [post, currentPage, ITEMS_PER_PAGE]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Xóa hoặc comment dòng này để không cuộn lên đầu trang
      // window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-x-[168px] 2xl:gap-x-[268px] gap-y-[33px]">
        {currentPosts.map((item: PostItem, index: number) => (
          <Link key={item.slug || index} href={`/${item.slug}`}>
            <div
              className="grid grid-cols-[34%_1fr] sm:grid-cols-[45%_1fr] overflow-hidden pb-[33px] gap-y-[33px] gap-x-[20px] sm:gap-x-[40px] 2xl:gap-x-[46px] sm:flex items-center border-b-1 border-b-gray-8"
            >
              {
                item.is_featured ? (
                  <Image
                    src={`https://admin.pigroup.vn/storage/${item.image}`}
                    alt={item.name}
                    width={250}
                    height={150}
                    className="sm:min-h-[150px] sm:max-x-[250px] h-auto rounded-xl object-cover"
                  />
                ) : (
                  <Image
                    src={`https://admin.pigroup.vn/storage/${item.image}`}
                    alt={item.name}
                    width={250}
                    height={150}
                    className="sm:min-h-[150px] h-auto rounded-xl object-cover"
                  />
                )
              }
              <h3 className="text-[13px] 2xl:text-[17px] font-semibold text-gray-5 uppercase">{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-[13px] 2xl:text-[17px] flex justify-center items-center space-x-2 mt-[25px] mb-[75px]">
        {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`w-[25px] h-[25px] text-center rounded-full ${currentPage === pageNumber
              ? 'bg-yellow-1 text-white'
              : 'text-yellow-1 bg-white border border-yellow-1 hover:bg-yellow-1 hover:text-white'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
}
'use client';
import Image from "next/image"
import Link from "next/link";
const mainImage = "/fnews/news-1.png";
const services = [
  {
    title: 'Tập đoàn Pi Group chuẩn bị triển khai dự án căn hộ Picity Sky Park - Bình Dương',
    img: '/fnews/post-1.png'
  },
  {
    title: 'Khởi công dòng sản phẩm căn Picity cửa ngõ TP Thủ Đức',
    img: '/fnews/post-2.png'
  },
  {
    title: 'Khởi công dòng sản phẩm căn Picity cửa ngõ TP Thủ Đức',
    img: '/fnews/post-1.png'
  },
  {
    title: 'Picity High Park được quy hoạch như một thành phố đa chức năng thu nhỏ với 5 tòa căn hộ cao tầng, ',
    img: '/fnews/post-1.png'
  },
  {
    title: 'Picity High Park được quy hoạch như một thành phố đa chức năng thu nhỏ với 5 tòa căn hộ cao tầng, ',
    img: '/fnews/post-2.png'
  },
  {
    title: 'Tập đoàn Pi Group chuẩn bị triển khai dự án căn hộ Picity Sky Park - Bình Dương',
    img: '/fnews/post-1.png'
  }
];
export default function Related({ post }: any) {
  if (!Object.keys(post).length) {
    return <div className="text-center mt-20">Không tìm thấy bài viết liên quan</div>;
  }
  return (
    <div className="grid md:grid-cols-2 gap-x-[168px] 2xl:gap-x-[268px] gap-y-[33px]">
      {post.map((item: any, index: number) => (
        <Link key={index} href={`https://pigroup.tqdesign.vn/posts/${item.slug}`}>
          <div
            className="overflow-hidden pb-[33px] gap-y-[33px] gap-x-[40px] 2xl:gap-x-[46px] flex items-center border-b-1 border-b-gray-8"
          >{
              item.is_featured ? (
                <Image
                  src={`https://admin.pigroup.tqdesign.vn/storage/${item.image}`}
                  alt={item.name}
                  width={250}
                  height={150}
                  className="min-h-[150px] rounded-xl"
                />
              ) : (
                <Image
                  src={mainImage}
                  alt={item.name}
                  width={250}
                  height={150}
                  className="min-h-[150px] rounded-xl"
                />
              )
            }
            <h3 className="text-[14px] 2xl:text-[17px] font-semibold text-gray-5">{item.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
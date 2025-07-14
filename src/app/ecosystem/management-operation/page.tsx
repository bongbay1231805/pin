import Detail3 from "@/components/ecosystem/Detail3";
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
// export const metadata: Metadata = {
//   title: 'Quản lý và vận hành',
//   description: 'Quản lý và vận hành',
// };

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/quan-ly-van-hanh/lang', {
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

export default async function EcosystemDetail() {
  const res = await fetch('https://admin.pigroup.vn/api/pages/quan-ly-van-hanh/lang', {
    cache: 'no-store',
  });
  const currentLocale = await getUserLocale();
  const {data} = await res.json();
  const { custom_fields } = data[currentLocale];
  const { image } = data[currentLocale];
  return (
    <>
      <div>
        <Detail3 custom_fields={custom_fields} image={image} />
      </div>
    </>
  )
}
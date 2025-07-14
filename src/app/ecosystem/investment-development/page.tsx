import Detail1 from "@/components/ecosystem/Detail1";
import { Metadata } from 'next';
import {getUserLocale} from '@/db';
// export const metadata: Metadata = {
//   title: 'Đầu tư & Phát triển dự án',
//   description: 'Đầu tư & Phát triển dự án',
// };

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/dau-tu-phat-trien-du-an/lang', {
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
  const res = await fetch('https://admin.pigroup.vn/api/pages/dau-tu-phat-trien-du-an/lang', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const currentLocale = await getUserLocale();
  const { custom_fields } = data[currentLocale];
  const { image } = data[currentLocale];
  return (
    <>
      <div>
        <Detail1 custom_fields={custom_fields} image={image} />
      </div>
    </>
  )
}
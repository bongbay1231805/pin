import Detail1 from "@/components/ecosystem/Detail1";
import { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: 'Đầu tư & Phát triển dự án',
//   description: 'Đầu tư & Phát triển dự án',
// };

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/investment-development', {
    cache: 'no-store'
  });
  const { data: post } = await res.json();
  if (!post) {
    return {
      title: 'Bài viết không tồn tại',
      description: 'Không tìm thấy bài viết này.'
    };
  }

  return {
    title: post.seo_meta[0].seo_title || post.name,
    description: post.seo_meta[0].seo_description || post.seo_description,
    openGraph: {
      title: post.seo_meta[0].seo_title || post.name,
      description: post.seo_meta[0].seo_description || post.seo_description,
      images: [
        {
          //seo_image Sửa lỗi logic URL: '/storage/' không phải là URL hợp lệ.
          // Giả sử domain admin là nơi chứa ảnh
          url:
            `https://admin.pigroup.tqdesign.vn/storage/${post.seo_meta[0].seo_image || post.image}` ||
            '/logo.png'
        }
      ]
    }
  };
}

export default async function EcosystemDetail() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/investment-development', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const { custom_fields } = data;
  return (
    <>
      <div>
        <Detail1 custom_fields={custom_fields} />
      </div>
    </>
  )
}
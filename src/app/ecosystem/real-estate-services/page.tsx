import Detail2 from '@/components/ecosystem/Detail2';
import {Metadata} from 'next';
import {getUserLocale} from '@/db';
import { getTranslations } from 'next-intl/server';
// export const metadata: Metadata = {
//   title: 'Dịch vụ Bất động sản',
//   description: 'Dịch vụ Bất động sản'
// };

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/dich-vu-bat-dong-san/lang', {
    cache: 'no-store'
  });
  const currentLocale = await getUserLocale();
  const { data: post } = await res.json();
  const t = await getTranslations();
  if (!post) {
    return {
      title: t('NEWS.articleNotExist'),
      description: t('NEWS.noContent')
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
  const res = await fetch(
    'https://admin.pigroup.vn/api/pages/dich-vu-bat-dong-san/lang',
    {
      cache: 'no-store'
    }
  );
  const currentLocale = await getUserLocale();
  const {data} = await res.json();
  const {custom_fields} = data[currentLocale];
  const { image } = data[currentLocale];
  return (
    <>
      <div>
        <Detail2 custom_fields={custom_fields} image={image} />
      </div>
    </>
  );
}

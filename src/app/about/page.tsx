// import { Locale } from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';
import {Hero} from '@/components/about/Hero';
import {Stats} from '@/components/about/Stats';

import {Philosophy} from '@/components/about/Philosophy';
import {Partners} from '@/components/home/Partners';
import {Business} from '@/components/about/Business';
import {Metadata} from 'next';
import { TimelineSection } from '@/components/about/TimelineSection';

// import PageTitle from '@/components/PageTitle';
// type Props = {
//   params: Promise<{ locale: Locale }>;
// };

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/about', {
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

export default async function About() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/about', {
    cache: 'no-store'
  });
  const {data} = await res.json();
  const {custom_fields} = data;
  const {image} = data;
  return (
    <>
      <Hero image={image} />
      <Stats custom_fields={custom_fields} />

      <TimelineSection custom_fields={custom_fields} />

      <Philosophy custom_fields={custom_fields} />
      <Business custom_fields={custom_fields} />
      <div className="boxanimation fade-in-up-medium mb-[5%] 2xl:mb-[96px]">
        <Partners
          title={custom_fields.field_19 || custom_fields.field_19_add}
          logoDataRaw={custom_fields.about_logo_partner}
        />
      </div>
    </>
  );
}

// import { Locale } from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';
import {Hero} from '@/components/about/Hero';
import {Stats} from '@/components/about/Stats';

import {Philosophy} from '@/components/about/Philosophy';
import {Partners} from '@/components/home/Partners';
import {Business} from '@/components/about/Business';
import {Metadata} from 'next';
import { TimelineSection } from '@/components/about/TimelineSection';
import {getUserLocale} from '@/db';
import { getTranslations } from 'next-intl/server';

// import PageTitle from '@/components/PageTitle';
// type Props = {
//   params: Promise<{ locale: Locale }>;
// };

type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch('https://admin.pigroup.vn/api/pages/gioi-thieu/lang', {
    cache: 'no-store'
  });
  const currentLocale = await getUserLocale();
  const t = await getTranslations();
  const { data: post } = await res.json();
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

export default async function About() {
  const res = await fetch('https://admin.pigroup.vn/api/pages/gioi-thieu/lang', {
    cache: 'no-store'
  });
  const currentLocale = await getUserLocale();
  const {data} = await res.json();
  const {custom_fields} = data[currentLocale];
  const {image} = data[currentLocale];
  const {bannermobile} = custom_fields;

  const reshome = await fetch('https://admin.pigroup.vn/api/pages/home/lang', {
    cache: 'no-store'
  });
  const {data: dataHome} = await reshome.json();
  const {custom_fields: customFieldsHome} = dataHome[currentLocale];
  return (
    <>
      <Hero image={image} bannermobile={bannermobile} />
      <Stats custom_fields={custom_fields} />

      <TimelineSection custom_fields={custom_fields} />

      <Philosophy custom_fields={custom_fields} />
      <Business custom_fields={custom_fields} />
      <div className="boxanimation fade-in-up-medium mb-[5%] 2xl:mb-[96px]">
        <Partners
          title={custom_fields.field_19 || custom_fields.field_19_add}
          logoDataRaw={customFieldsHome.home_logo_partner}
        />
      </div>
    </>
  );
}

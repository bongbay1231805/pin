import {ContentBidding} from '@/components/news/ContentBidding';
import {Hero} from '@/components/news/Hero';
import Related from '@/components/news/Related';
import {RegistrationForm} from '@/components/news/RegistrationForm';
import {Metadata} from 'next';
import CategorySetter from './CategorySetter';

// ✅ BƯỚC 1: ĐỊNH NGHĨA TYPE CHO PROPS MỘT CÁCH RÕ RÀNG
// Type này bao gồm cả `params` và `searchParams` (một best practice)
type Props = {
  params: Promise<{ slug: string }>;
};

// Hàm generateMetadata vẫn là Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(`https://admin.pigroup.vn/api/posts/${slug}`, {
    cache: 'no-store',
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
            `https://admin.pigroup.vn/storage/${post.seo_meta[0].seo_image || post.image}` ||
            '/logo.png'
        }
      ]
    }
  };
}

async function getPostBySlug(slug: string) {
  const res = await fetch(
    `https://admin.pigroup.vn/api/posts/${slug}`,
    {
      cache: 'no-store'
    }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json.data;
}

// Component Page của bạn (Server Component)
export default async function DetailPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div className="text-center mt-20">Không tìm thấy bài viết</div>;
  }

  const related = await fetch(
    `https://admin.pigroup.vn/api/posts/${slug}/related`,
    {cache: 'no-store'}
  );
  // Thêm kiểm tra fetch cho related posts
  const {data} = await related.json();

  const isBiddingPost = post.categories.some(
    (category: {name: string}) => category.name === 'Tin Đấu Thầu'
  );

  const firstCategorySlug =
    post.categories.length > 0 ? post.categories[0].slug : null;

  return (
    <div>
      <CategorySetter categorySlug={firstCategorySlug} />
      <Hero post={post} />

      <div className="m-auto w-full sm:max-w-[70%] px-[30px] sm:px-0">
        <ContentBidding post={post} />
      </div>

      {isBiddingPost && (
        <div className="m-auto w-full sm:max-w-[85%] px-[30px] rounded-[10px] bg-[#EAF3FF]/50 mt-[80px] sm:px-[90px] pt-[70px] pb-[70px]">
          <h2 className="text-yellow-1 uppercase text-center text-size-30 md:text-size-35 lg:text-[38px] 2xl:text-[45px] font-bold mb-[35px]">
            Đăng ký dự thầu
          </h2>
          <RegistrationForm />
        </div>
      )}

      <div className="m-auto w-full sm:max-w-[85%] px-[30px] mb-[80px]">
        <h2 className="text-yellow-1 uppercase text-left sm:text-center text-[22px] 2xl:text-[45px] font-bold my-[30px] sm:mb-[45px] sm:mt-[90px]">
          Tin liên quan
        </h2>
        <Related post={data} />
      </div>
    </div>
  );
}

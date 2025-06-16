import { ContentBidding } from '@/components/news/ContentBidding';
import { Hero } from '@/components/news/Hero';
import Related from '@/components/news/Related';
import { RegistrationForm } from '@/components/news/RegistrationForm';
type PageProps = {
  params: Promise<{ slug: string }>;
};
async function getPostBySlug(slug: string) {
  const res = await fetch(`https://admin.pigroup.tqdesign.vn/api/posts/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    // Handle 404
    return null;
  }
  const json = await res.json();
  return json.data;
}
async function DetailPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const res = await fetch(`https://admin.pigroup.tqdesign.vn/api/posts/${slug}`, {
    cache: 'no-store',
  });
  if (!post) {
    return <div className="text-center mt-20">Không tìm thấy bài viết</div>;
  }
  const related = await fetch(`https://admin.pigroup.tqdesign.vn/api/posts/${slug}/related`, {
    cache: 'no-store',
  });
  const {data} = await related.json();
  return (
    <div>
      <Hero post={post}/>
      <div className="container m-auto max-w-[95%] md:max-w-[76%] 2xl:max-w-[1312px]">
        <ContentBidding post={post}/>
      </div>
      <div className="container m-auto max-w-[85%] rounded-[10px] bg-[#EAF3FF]/50 mt-[80px] px-[90px] pt-[70px] pb-[70px]">
        <h2 className='text-yellow-1 uppercase text-center text-size-30 md:text-size-35 lg:text-[38px] 2xl:text-[45px] font-bold mb-[35px]'>Đăng ký dự thầu</h2>
        <RegistrationForm />
      </div>
      <div className="container m-auto max-w-[85%] px-[10px]">
        <h2 className='text-yellow-1 uppercase text-center text-[35px] 2xl:text-[45px] font-bold mb-[45px] mt-[90px]'>Tin liên quan</h2>
        <Related post={data} />
      </div>
    </div>
  );
}
export default DetailPost;
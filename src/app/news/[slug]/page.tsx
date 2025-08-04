import CategoryClient from "@/components/categories/CategoryClient";
type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props) {
  const currentPage = 1;
  const { slug } = await params;
  const res = await fetch(`https://admin.pigroup.vn/api/categories/${slug}/posts?page=${currentPage}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return {
      title: 'Chuyên mục không tồn tại',
      description: 'Không tìm thấy chuyên mục bạn đang tìm.',
    };
  }
  const {category} = await res.json();
  console.log('category >>> ', category)
  return {
    title: category.name,
    description: category.description || `Các bài viết thuộc chuyên mục ${category.name}`,
    openGraph: {
      title: category.name,
      description: category.description || '',
      images: [
        {
          url: category.image || '/logo.png',
          alt: category.name,
        },
      ],
    },
  };
}
async function NewsCategoryPage({ params }: Props) {
  const currentPage = 1;
  const { slug } = await params;
  const res = await fetch(`https://admin.pigroup.vn/api/categories/${slug}/posts?page=${currentPage}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return <div className="text-center py-10">Không tìm thấy bài viết chuyên mục.</div>;
  }
  const json = await res.json();
  const { data } = json;
  
  return (
    <CategoryClient
      initialPage={currentPage}
      initialData={data}
      apiPath={`https://admin.pigroup.vn/api/categories/${slug}/posts`}
    />
  );
}
export default NewsCategoryPage;

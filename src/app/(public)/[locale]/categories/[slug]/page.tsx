import CategoryClient from "@/components/categories/CategoryClient";
type Props = {
  params: Promise<{ slug: string }>;
};
async function NewsCategoryPage({ params }: Props) {
  const currentPage = 1;
  const { slug } = await params;
  const res = await fetch(`https://admin.pigroup.tqdesign.vn/api/categories/${slug}/posts?page=${currentPage}`, {
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
      apiPath={`https://admin.pigroup.tqdesign.vn/api/categories/${slug}/posts`}
    />
  );
}
export default NewsCategoryPage;

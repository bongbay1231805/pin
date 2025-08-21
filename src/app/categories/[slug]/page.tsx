import CategoryClient from "@/components/categories/CategoryClient";
import { getTranslations } from "next-intl/server";
type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props) {
  const currentPage = 1;
  const { slug } = await params;
  const res = await fetch(`https://admin.pigroup.vn/api/categories/${slug}/posts?page=${currentPage}`, {
    cache: 'no-store',
  });
  const t = await getTranslations();
  if (!res.ok) {
     return {
      title: t('NEWS.articleNotExist'),
      description: t('NEWS.noContent')
    };
  }
  const {category} = await res.json();
  
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
  const t = await getTranslations();
  if (!res.ok) {
    return <div className="text-center py-10">{t('NEWS.noContent')}</div>;
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

import CategoryClient from "@/components/categories/CategoryClient";
import {getUserLocale} from '@/db';

type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props) {
  const currentLocale = await getUserLocale();
  const currentPage = 1;
  const { slug } = await params;
  const subMenus = await fetch('https://admin.pigroup.vn/api/categories', {
    cache: 'no-store',
  });
  const subMenusData = await subMenus.json();
  const submenu = subMenusData[currentLocale].find((item:any) => item.slug === slug);
  const slugForQuery = submenu?.slugQuery ?? slug;
  const res = await fetch(`https://admin.pigroup.vn/api/categories/${slugForQuery}/posts?page=${currentPage}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return {
      title: 'Chuyên mục không tồn tại',
      description: 'Không tìm thấy chuyên mục bạn đang tìm.',
    };
  }
  const {category, categories} = await res.json();
  
  return {
    title: categories[currentLocale + "_name"] || category.name,
    description: category.description || `${category.name}`,
    openGraph: {
      title: categories[currentLocale + "_name"],
      description: category.description || '',
      images: [
        {
          url: categories[currentLocale + "_name"] || '/logo.png',
          alt: categories[currentLocale + "_name"],
        },
      ],
    },
  };
}
async function NewsCategoryPage({ params }: Props) {
  const currentPage = 1;
  const { slug } = await params;
  const currentLocale = await getUserLocale();
  const subMenus = await fetch('https://admin.pigroup.vn/api/categories', {
    cache: 'no-store',
  });
  const subMenusData = await subMenus.json();
  const submenu = subMenusData[currentLocale].find((item:any) => item.slug === slug);
  const slugForQuery = submenu?.slugQuery ?? slug;
  const res = await fetch(`https://admin.pigroup.vn/api/categories/${slugForQuery}/posts?page=${currentPage}`, {
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
      apiPath={`https://admin.pigroup.vn/api/categories/${slugForQuery}/posts`}
    />
  );
}
export default NewsCategoryPage;

import NewsClient from '@/components/news/NewsClient';
async function NewsPage() {
  const currentPage = 1;
  const res = await fetch(`https://admin.pigroup.tqdesign.vn/api/posts?page=${currentPage}`, {
    cache: 'no-store',
  });
  const json = await res.json();
  const { data } = json;
  return (
    <NewsClient initialPage={currentPage} initialData={data} />
  );
}
export default NewsPage;
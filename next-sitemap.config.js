export default {
  siteUrl: 'https://pigroup.vn',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const routes = [
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/about', changefreq: 'monthly', priority: 0.7 },
      { loc: '/contact', changefreq: 'monthly', priority: 0.6 },
      { loc: '/digitalcity', changefreq: 'monthly', priority: 0.6 },
      { loc: '/do-thi-so-picity', changefreq: 'monthly', priority: 0.6 },
      { loc: '/ecosystem/investment-development', changefreq: 'monthly', priority: 0.6 },
      { loc: '/ecosystem/management-operation', changefreq: 'monthly', priority: 0.6 },
      { loc: '/ecosystem/management-operation/real-estate-services', changefreq: 'monthly', priority: 0.6 },
      { loc: '/gioi-thieu', changefreq: 'monthly', priority: 0.6 },
      { loc: '/he-sinh-thai/dau-tu-phat-trien-du-an', changefreq: 'monthly', priority: 0.6 },
      { loc: '/he-sinh-thai/dich-vu-bat-dong-san', changefreq: 'monthly', priority: 0.6 },
      { loc: '/he-sinh-thai/quan-ly-van-hanh', changefreq: 'monthly', priority: 0.6 },
      { loc: '/human-resource', changefreq: 'monthly', priority: 0.6 },
      { loc: '/lien-he', changefreq: 'monthly', priority: 0.6 },
      { loc: '/phat-trien-nhan-luc', changefreq: 'monthly', priority: 0.6 },
      { loc: '/search', changefreq: 'monthly', priority: 0.6 },
      { loc: '/the-loai', changefreq: 'monthly', priority: 0.6 },
      { loc: '/tim-kiem', changefreq: 'monthly', priority: 0.6 },
      { loc: '/tin-tuc', changefreq: 'monthly', priority: 0.6 },
      { loc: '/news', changefreq: 'monthly', priority: 0.6 },
    ];

    const res = await fetch('https://admin.pigroup.vn/api/categories', {
      cache: 'no-store',
    });
    const submenus = await res.json();
    for (const itemSubmenu of submenus['vi']) {
      routes.push({ loc: '/tin-tuc/'+itemSubmenu['slug'], changefreq: 'monthly', priority: 0.6 });
      let currentPage = 1;

      while (true) {
        const news = await fetch(`https://admin.pigroup.vn/api/categories/${itemSubmenu['slug']}/posts?page=${currentPage}`, {
          cache: 'no-store',
        });

        if (!news.ok) break;

        const data = await news.json();
        const posts = data?.data?.data || [];
console.log('posts ', posts)
        if (posts.length === 0) break;
        posts.forEach((itemPost) => {
          routes.push({ loc: '/'+itemPost['slug'], changefreq: 'monthly', priority: 0.6 });
        });
        currentPage++;
      }
    }

    submenus['en'].forEach((item) => {
      routes.push({ loc: '/news/'+item['slug'], changefreq: 'monthly', priority: 0.6 });
    });
    return routes;
  }
};

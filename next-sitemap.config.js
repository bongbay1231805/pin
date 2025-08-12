export default {
  siteUrl: 'https://pigroup.vn',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    return [
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
    ];
  }
};

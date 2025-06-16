import * as cheerio from 'cheerio';
type RawPost = {
  id: number;
  name: string;
  description?: string;
  content?: string | null;
  is_featured: number;
  image?: string | null;
  created_at: string;
  slug: string;
  custom_fields?: {
    vi_tri_tuyen_dung?: string;
    so_luong?: string;
    thoi_han?: string;
  };
};
type JobDetailSection = {
  rawHtml: string;
  description?: string[];
  requirements?: string[];
  interest?: string[];
  arequirements?: string[];
  contact?: string[];
};
type JobPost = {
  id: string;
  position: string;
  quantity: number;
  deadline: string;
  details: JobDetailSection;
  isOpen: boolean;
};
export function transformJobPosts(posts: RawPost[]): JobPost[] {
  return posts.map((post): JobPost => {
    const details = extractDetailsFromHtml(post.content ?? '');
    return {
      id: `job-${post.id}`,
      position: post.custom_fields?.vi_tri_tuyen_dung ?? post.name,
      quantity: parseInt(post.custom_fields?.so_luong ?? '0', 10),
      deadline: post.custom_fields?.thoi_han ?? '',
      details,
      isOpen: false
    };
  });
}
function extractDetailsFromHtml(html: string): JobDetailSection {
  const sectionMap: Record<string, keyof JobDetailSection> = {
    'Mô tả công việc': 'description',
    'Yêu cầu': 'requirements',
    'Quyền lợi': 'interest',
    'Yêu cầu bổ sung': 'arequirements',
    'Liên hệ': 'contact',
  };
  const result: JobDetailSection = {
    rawHtml: html,
  };
  const $ = cheerio.load(html);
  $('h5').each((_, el) => {
    const title = $(el).text().trim().replace(':', '');
    const key = sectionMap[title];
    if (!key) return;
    const $next = $(el).next('ul');
    if ($next.length) {
      const items = $next.find('li').map((_, li) => $(li).text().trim()).get();
      (result as any)[key] = items;
    }
  });
  return result;
}
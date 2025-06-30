import * as cheerio from 'cheerio';
type RawPost = {
  id: number;
  name: string;
  // description?: string;
  content?: string | null;
  // is_featured: number;
  // image?: string | null;
  created_at: string;
  // slug: string;
  custom_fields?: {
    career_content?: string;
    // career_position?: string;
    career_quantity?: string;
    career_date?: string;
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
      position: post.name ?? post.name,
      quantity: parseInt(post.custom_fields?.career_quantity ?? '0', 10),
      deadline: post.custom_fields?.career_date ?? '',
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
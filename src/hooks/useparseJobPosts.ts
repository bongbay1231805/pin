import * as cheerio from 'cheerio';
import {LANGUAGE, TLANGUAGE} from '@/config';

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
  custom_fields_translations?: {
    career_content?: string;
    // career_position?: string;
    career_quantity?: string;
    career_date?: string;
  };
  translation: {
    "lang_code": string;
    "positions_id": number;
    "name": string;
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
export function transformJobPosts(posts: RawPost[], currentLocale: TLANGUAGE): JobPost[] {
  return posts.map((post): JobPost => {
    const details = extractDetailsFromHtml((currentLocale !== LANGUAGE.en ? post?.custom_fields?.career_content : post?.custom_fields_translations?.career_content) || '');
    
    return {
      id: `job-${post.id}`,
      position: currentLocale !== LANGUAGE.en ? post.name : post?.translation?.name,
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
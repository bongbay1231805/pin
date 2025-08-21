'use client';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { routeLocales } from "@/routes";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
export default function BreadcrumbExample({ post }: any) {
  const t = useTranslations();
  const currentLocale = useLocale();
  
  return (
    <Breadcrumb className="text-white">
      <BreadcrumbList className="text-[13px] 2xl:text-[22px] font-bold">
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${routeLocales[currentLocale]['news']}`}>{t('News.title')}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {post.hasOwnProperty('categories') && Array.isArray(post.categories) && post.categories.length ? (
          <BreadcrumbItem>
            <BreadcrumbLink ><Link href={`/${routeLocales[currentLocale]['news']}/${post.categories[0].slug}`}>{post.categories[0].name}</Link></BreadcrumbLink>
          </BreadcrumbItem>
        ) : null}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">{post.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

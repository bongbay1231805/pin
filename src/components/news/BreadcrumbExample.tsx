'use client';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default function BreadcrumbExample({ post }: any) {
  return (
    <Breadcrumb className="text-white">
      <BreadcrumbList className="text-[13px] 2xl:text-[22px] font-bold">
        <BreadcrumbItem>
          <BreadcrumbLink href="/news">Tin tức</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {post.hasOwnProperty('categories') && Array.isArray(post.categories) && post.categories.length ? (
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categories/${post.categories[0].slug}`}>{post.categories[0].name}</BreadcrumbLink>
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

'use client';
import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"
const PaginationExample = () => {
  return (
    <Pagination>
      <PaginationContent className="gap-2 mt-[12px]">
        <PaginationItem>
          <PaginationLink className="rounded-full bg-yellow-1 text-white" href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full border-1 text-yellow-1 hover:bg-yellow-1 hover:text-white">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full border-1 text-yellow-1 hover:bg-yellow-1 hover:text-white">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis className="text-yellow-1"/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full border-1 text-yellow-1 hover:bg-yellow-1 hover:text-white">10</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default PaginationExample;

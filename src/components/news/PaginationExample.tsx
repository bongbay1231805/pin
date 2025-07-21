'use client';
import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
type Props = {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  onPageChange: (page: number) => void;
};
const PaginationExample = ({ links, onPageChange }: Props) => {
  return (
    <Pagination>
      <PaginationContent className="gap-2 mt-[12px]">
        {links
          .filter(link => !link.label.includes('Previous') && !link.label.includes('Next'))
          .map((link, index) => {
            const page = Number(link.label);
            const isNumber = !isNaN(page);
            return (
              <PaginationItem key={index}>
                {isNumber ? (
                  <PaginationLink
                    href="#"
                    className={`rounded-full border-1 ${link.active
                        ? 'bg-yellow-1 text-white'
                        : 'text-yellow-1 hover:bg-yellow-1 hover:text-white'
                      }`}
                    isActive={link.active}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page);
                    }}
                  >
                    {link.label}
                  </PaginationLink>
                ) : (
                  <span className="text-yellow-1"></span> // Ellipsis (nếu có)
                )}
              </PaginationItem>
            );
          })}
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationExample;

import React from "react";
import Hero from "@/components/work/Hero";
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Phát triển nhân lực',
  description: 'Phát triển nhân lực',
};
export default async function Human() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/careers', {
  // const res = await fetch('https://admin.pigroup.tqdesign.vn/api/categories/human/posts', {
    cache: 'no-store',
  });
   const resPage = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/human-resource-development', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const {data:dataPage} = await resPage.json();
  return (
    <>
      <Hero data={data} dataPage={dataPage} />
    </>
  );
}
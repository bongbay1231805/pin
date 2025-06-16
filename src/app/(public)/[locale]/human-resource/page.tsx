import React from "react";
import Hero from "@/components/work/Hero";
export default async function Contact() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/categories/human/posts', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  return (
    <>
      <Hero data={data}/>
    </>
  );
}
'use client';
import Detail1 from "@/components/ecosystem/Detail1"
import Head from "next/head"
import { useEffect } from "react";
export default function EcosystemDetail() {
  useEffect(() => {
    const boxes = document.querySelectorAll('.boxanimation');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('show');
          } else {
            el.classList.remove('show');
          }
        });
      },
      {
        // threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0, 0.1, 0.2,...1
        threshold: 0.2, // 0, 0.1, 0.2,...1
      }
    );
    boxes.forEach(box => observer.observe(box));
    return () => boxes.forEach(box => observer.unobserve(box));
  }, []);
  return (
    <>
      <Head>
        <title>PI Group - Real Estate Development</title>
        <meta name="description" content="Leading real estate developer with 12 years of experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Detail1 />
      </div>
    </>
  )
}
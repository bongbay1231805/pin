'use client';
import React, { useEffect } from "react";
import Hero from "@/components/work/Hero";
import { useScrollReveal } from "@/hooks/useScrollReveal";
export default function Contact() {
  useScrollReveal(); // dùng mặc định `.boxanimation`
  return (
    <>
      <Hero />
    </>
  );
}
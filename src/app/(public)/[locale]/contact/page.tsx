'use client';
import React, { useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageForm } from "@/components/contact/MessageForm";
import Image from "next/image";
export default function Contact() {
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
    <div className="relative pt-[100px] h-screen after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:w-full after:h-[100%]  after:bg-[linear-gradient(180deg,_#CDEBFE_0%,_#FFFFFF_100%)] after:opacity-60 after:pointer-events-none">
      <div className="container mx-auto  max-w-[1625px] px-[10px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="md:text-size-25 text-[28px] font-semibold mb-6 text-blue-1 uppercase">TẬP ĐOÀN pi group</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-blue-1 text-[19px]">
                  <p className="font-semibold">Địa chỉ:</p>
                  <p className="font-normal">663 – 665 Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Tp. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-blue-1 text-[19px]">
                  <p className="font-semibold">Hotline:</p>
                  <p className="font-normal">1900 9999 08</p>
                </div>
                <div className="text-blue-1 text-[19px]">
                  <p className="font-semibold">Email:</p>
                  <p className="font-normal">info@pigroup.vn</p>
                </div>
              </div>
            </div>
            <MessageForm />
          </div>
        </div>
      </div>
      <Image
        src="/fcontact/contact-1.png"
        alt="Modern city skyline"
        fill
        className="w-[60%]! h-[auto]! right-0! left-auto! bottom-0! top-auto! z-1"
      />
    </div>
  );
}
"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Textarea,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// Định nghĩa schema validation với Zod
const registerFormSchema = z.object({
  yourName: z.string().min(2, {
    message: "Tên công ty phải có ít nhất 2 ký tự.",
  }),
  phone: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 số." })
    .regex(/^(\+?84|0)(3|5|7|8|9)\d{8}$/, {
      message: "Số điện thoại không hợp lệ.",
    }),
  email: z.string().email({
    message: "Địa chỉ email không hợp lệ.",
  }),
  taxCode: z.string().optional(),
  companyProfile: z
    .any()
    .refine((files) => files?.length > 0, "Vui lòng tải lên profile công ty.")
    .refine(
      (files) => {
        if (!files?.length) return true;
        const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/zip", "application/x-zip-compressed"];
        return Array.from(files).every((file) => allowedTypes.includes((file as File).type));
      },
      "Chỉ chấp nhận file PDF, PPTX, DOC, ZIP."
    )
    .refine(
      (files) => {
        if (!files?.length) return true;
        return Array.from(files).every((file) => (file as File).size <= 5 * 1024 * 1024); // Giới hạn 5MB
      },
      "Kích thước file tối đa là 5MB."
    )
});
type RegisterFormValues = z.infer<typeof registerFormSchema>;
export function MessageForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      yourName: "",
      phone: "",
      email: "",
      taxCode: "",
      companyProfile: undefined,
    },
  });
  function onSubmit(values: RegisterFormValues) {
    console.log(values);
    // Xử lý dữ liệu đăng ký ở đây (gửi API, v.v.)
  }
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  function handleButtonClick() {
    fileInputRef.current?.click();
  }
  return (
    <Form {...form}>
      <h2 className="md:text-size-25 text-yellow-1 font-semibold text-[30px] uppercase mb-[30px]">GỬI TIN NHẮN CHO CHÚNG TÔI</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-[30px]">
          <FormField
            control={form.control}
            name="yourName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="px-0 py-0 border-0 border-b-1 border-b-gray-9 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-gray-9 placeholder:text-gray-5" placeholder="Họ tên (*)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="px-0 py-0 border-0 border-b-1 border-b-gray-9 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-gray-9  placeholder:text-gray-5" placeholder="Điện thoại (*)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-[30px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" className="px-0 py-0 border-0 border-b-1 border-b-gray-9 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-gray-9  placeholder:text-gray-5" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className="px-0 py-0 border-0 border-b-1 border-b-gray-9 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-gray-9  placeholder:text-gray-5" placeholder="Nội dung cần tư vấn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="hvr-bounce-to-right shadow-none uppercase rounded-none sm:flex items-center justify-center text-yellow-1 text-[16px] font-semibold w-[131px] h-[35px] border border-yellow-1 hover:text-white  focus:text-white">Gửi ngay</Button>
        </div>
      </form>
    </Form>
  );
}
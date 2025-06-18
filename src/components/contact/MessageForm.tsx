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
import { useScrollReveal } from "@/hooks/useScrollReveal";
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
  content: z.string().optional()
});
type RegisterFormValues = z.infer<typeof registerFormSchema>;
export function MessageForm({custom_fields}:any) {
  useScrollReveal(); // dùng mặc định `.boxanimation`
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      yourName: "",
      phone: "",
      email: "",
      content: ""
    },
  });
  const {field_contact_8,field_contact_9,field_contact_10,field_contact_11,field_contact_12,field_contact_send} = custom_fields;
  async function onSubmit(values: RegisterFormValues) {
    const val = {
      yourName: values.yourName,
      phone: values.phone,
      email: values.email,
      content: values.content
    }
    try {
      const response = await fetch('https://admin.pigroup.tqdesign.vn/api/contactforconsultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("API response:", data);
        alert("Gửi thông tin thành công!"); // Hiển thị thông báo thành công
        form.reset(); // Reset form sau khi gửi thành công
      } else {
        console.error("API error:", response.status, response.statusText);
        alert("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    }
  }
  return (
    <Form {...form}>
      <h2 className="text-yellow-1 font-bold text-[23px] 2xl:text-[26px] uppercase mb-[30px]">{field_contact_8}</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-[30px]">
          <FormField
            control={form.control}
            name="yourName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="px-0 py-0 h-7 2xl:h-9 text-[13px] 2xl:text-[17px] border-0 border-b-1 border-b-gray-9 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-gray-9 placeholder:text-gray-5" placeholder={field_contact_9} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-[30px]">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="px-0 py-0 h-7 2xl:h-9 text-[13px] 2xl:text-[17px] border-0 border-b-1 border-b-gray-9 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-gray-9  placeholder:text-gray-5" placeholder={field_contact_10} {...field} />
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
                  <Input type="email" className="px-0 py-0 h-7 2xl:h-9 text-[13px] 2xl:text-[17px] border-0 border-b-1 border-b-gray-9 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-gray-9 placeholder:text-gray-5" placeholder={field_contact_11} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 mt-[20px] gap-[30px]">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className="px-0 py-0 text-[13px] 2xl:text-[17px] min-h-[56px] border-0 border-b-1 border-b-gray-9 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-gray-9  placeholder:text-gray-5" placeholder={field_contact_12} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => console.log("Submit button clicked")} type="submit" className="hvr-bounce-to-right shadow-none uppercase rounded-none sm:flex items-center cursor-pointer justify-center text-yellow-1 text-[13px] font-semibold w-[112px] h-[30px] border border-yellow-1 hover:text-white  focus:text-white">{field_contact_send}</Button>
        </div>
      </form>
    </Form>
  );
}
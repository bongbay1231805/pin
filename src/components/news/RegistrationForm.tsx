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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Định nghĩa schema validation với Zod
const registerFormSchema = z.object({
  companyName: z.string().min(2, {
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
  content: z.string().optional(),
  taxcode: z.string().optional(),
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
export function RegistrationForm() {
  const [cvFile, setCvFile] = React.useState<File | null>(null); // Kiểu File hoặc null
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      companyName: "",
      phone: "",
      email: "",
      content: "",
      taxcode: "",
      companyProfile: undefined,
    },
  });
  async function onSubmit(values: RegisterFormValues) {
    const val = {
      yourName: values.companyName,
      phone: values.phone,
      email: values.email,
      content: values.content,
      taxcode: values.taxcode,
      cvfilename: values.companyProfile[0].name,
      cvfiletype: values.companyProfile[0].type
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
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  function handleButtonClick() {
    fileInputRef.current?.click();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px]">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="border-gray-9 rounded-none shadow-none" placeholder="Tên Công ty (*)" {...field} />
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
                  <Input className="border-gray-9 rounded-none shadow-none" placeholder="Điện thoại (*)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" className="border-gray-9 rounded-none shadow-none" placeholder="Email (*)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxcode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="border-gray-9 rounded-none shadow-none" placeholder="Mã số thuế" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="companyProfile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Button type="button" className="border rounded-none text-[#8a8a8a] border-gray-9 shadow-none w-full justify-start gap-0 mr-0" onClick={handleButtonClick}>
                    Profile công ty (file pdf, .pptx, .doc, .zip)
                  </Button>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => field.onChange(e.target.files)}
                    accept=".pdf, .pptx, .ppt, .doc, .docx, .zip"
                    multiple={false}
                    className="hidden" // Ẩn input file mặc định
                  />
                  {form.watch("companyProfile")?.[0]?.name && (
                    <span className="text-sm text-muted-foreground">
                      Đã chọn: {form.watch("companyProfile")[0].name}
                    </span>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="mt-[5px] cursor-pointer border hvr-bounce-to-right rounded-none w-[132] h-[38] justify-center items-center text-[15px] font-semibold uppercase text-yellow-1 hover:text-white hover:border-yellow-1 hover:bg-yellow-1">Đăng ký</Button>
        </div>
      </form>
    </Form>
  );
}
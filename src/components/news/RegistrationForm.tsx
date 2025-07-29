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
import { cn } from "@/components/lib/utils"; 
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
    .refine((files) => {
      if (!files?.length) return true;
      return Array.from(files).every((file) => (file as File).size <= 5 * 1024 * 1024); // Giới hạn 5MB
    }, "Kích thước file tối đa là 5MB."),
});
type RegisterFormValues = z.infer<typeof registerFormSchema>;
export function RegistrationForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      companyName: "",
      phone: "",
      email: "",
      taxCode: "",
      companyProfile: undefined,
    },
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  function handleButtonClick() {
    fileInputRef.current?.click();
  }
  async function onSubmit(values: RegisterFormValues) {
    const formData = new FormData();
    formData.append("yourName", values.companyName); // Sử dụng companyName cho yourName
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("taxcode", values.taxCode || ''); // Gửi taxcode
    // Thêm các trường khác nếu cần cho 'content' hoặc 'subject' theo logic Botble của bạn
    formData.append("content", `Tên công ty: ${values.companyName}\nEmail: ${values.email}\nĐiện thoại: ${values.phone}\nMã số thuế: ${values.taxCode || 'Không có'}`);
    formData.append("subject", "Đăng ký tư vấn công ty");
    // Xử lý file
    if (values.companyProfile && values.companyProfile.length > 0) {
      formData.append("companyProfile", values.companyProfile[0]); // Chỉ lấy file đầu tiên
      // Truyền tên file để lưu vào trường address hoặc một trường khác
      formData.append("cvfilename", values.companyProfile[0].name);
    }
    try {
      const response = await fetch('https://admin.pigroup.vn/api/contactforconsultation', { // Thay đổi '/api/contactforconsultation' bằng URL API chính xác của bạn
        method: 'POST',
        body: formData, // Gửi FormData
      });
      const result = await response.json();
      if (response.ok) {
        alert("Hồ sơ đăng ký dự thầu được gởi thành công. Cám ơn Quý công ty!");
        form.reset(); // Reset form sau khi gửi thành công
      } else {
        alert(`Lỗi: ${result.message || 'Không thể gửi dữ liệu.'}`);
      }
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      alert("Đã xảy ra lỗi khi gửi form. Vui lòng thử lại.");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] sm:gap-[30px]">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="text-[13px] placeholder:text-[13px] border-gray-9 rounded-none shadow-none" placeholder="Tên Công ty (*)" {...field} />
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
                <Input className="text-[13px] placeholder:text-[13px] border-gray-9 rounded-none shadow-none" placeholder="Điện thoại (*)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] sm:gap-[30px]">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" className="text-[13px] placeholder:text-[13px] border-gray-9 rounded-none shadow-none" placeholder="Email (*)" {...field} />
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
                <Input className="text-[13px] placeholder:text-[13px] border-gray-9 rounded-none shadow-none" placeholder="Nhập mã số thuế" {...field} />
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
                <div className="relative flex items-center space-x-2">
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => field.onChange(e.target.files)}
                    accept=".pdf, .pptx, .ppt, .doc, .docx, .zip"
                    multiple={false}
                    className="text-[13px] placeholder:text-[13px] absolute inset-0 opacity-0 cursor-pointer z-10" // Ẩn input file mặc định
                  />
                  <Button type="button" className="text-[13px] placeholder:text-[13px] border rounded-none text-[#8a8a8a] border-gray-9 shadow-none w-full justify-start gap-0 mr-0" onClick={handleButtonClick}>
                    {form.watch("companyProfile")?.[0]?.name ? (
                      <>{form.watch("companyProfile")?.[0]?.name}</>
                    ) : (
                      <>Profile công ty (file pdf, .pptx, .doc, .docx .zip)</>
                    )}
                  </Button>
                  {form.watch("companyProfile")?.[0]?.size && (
                    <div className="text-sm text-muted-foreground absolute right-[0px] bottom-[-25px]">
                      Kích thước: {(form.watch("companyProfile")[0].size/ 1024 / 1024).toFixed(2)} MB
                    </div>
                  )}
                </div>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="mt-[5px] cursor-pointer border hvr-bounce-to-right rounded-none w-[132] h-[38] justify-center items-center text-[15px] font-semibold uppercase text-yellow-1 hover:text-white hover:border-yellow-1 hover:bg-yellow-1  focus:text-white">Đăng ký</Button>
        </div>
      </form>
    </Form>
  );
}
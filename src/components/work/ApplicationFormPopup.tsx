'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Đảm bảo bạn có các component này
import { Input } from "@/components/ui/input"; // Đảm bảo bạn có component Input
import { Button } from "@/components/ui/button"; // Đảm bảo bạn có component Button
import Image from 'next/image';
// import { cn } from "@/lib/utils"; // Nếu bạn cần utility class cho styling
interface ApplicationFormPopupProps {
  isOpen: boolean; // Trạng thái đóng/mở popup
  onClose: () => void; // Hàm để đóng popup, không trả về giá trị nào
  selectedPosition: string; // Vị trí ứng tuyển đã chọn
  allJobData: any; // Dữ liệu tất cả công việc
}
const MAX_FILE_SIZE_MB = 5; // 5MB
const ALLOWED_FILE_TYPES_MIME = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/zip',
];
const registerFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Họ và tên phải có ít nhất 2 ký tự.",
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
  position: z.string().min(1, { message: "Vui lòng chọn vị trí ứng tuyển." }), // Bắt buộc chọn vị trí
  cvFile: z
    .any()
    .refine((files) => files?.length > 0, "Vui lòng đính kèm CV.")
    .refine(
      (files) => {
        if (!files?.length) return true; // Cho phép bỏ qua nếu không có file
        return Array.from(files).every((file) => (file as File).size <= MAX_FILE_SIZE_MB * 1024 * 1024);
      },
      `Kích thước file không được vượt quá ${MAX_FILE_SIZE_MB}MB.`
    )
    .refine(
      (files) => {
        if (!files?.length) return true; // Cho phép bỏ qua nếu không có file
        return Array.from(files).every((file) => ALLOWED_FILE_TYPES_MIME.includes((file as File).type));
      },
      'Chỉ cho phép file PDF, DOCX, hoặc ZIP.'
    ),
});
type RegisterFormValues = z.infer<typeof registerFormSchema>;
const ApplicationFormPopup: React.FC<ApplicationFormPopupProps> = ({ isOpen, onClose, selectedPosition, allJobData }) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      position: selectedPosition || "", // Gán selectedPosition vào defaultValues
      cvFile: undefined, // Đặt là undefined ban đầu
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submissionStatus, setSubmissionStatus] = useState('');
  // Watch giá trị của cvFile để hiển thị tên file
  const watchedCvFile = form.watch("cvFile");
  const cvFileName = watchedCvFile?.[0]?.name;
  const availablePositions = Array.from(new Set(allJobData.map((job: any) => job.position)));
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const onSubmit = async (values: RegisterFormValues) => {
    setSubmissionStatus('Hồ sơ đang được gửi...');
    try {
      const formData = new FormData();
      formData.append("yourName", values.fullName);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("position", values.position); // Dùng cho content hoặc name ở backend
      formData.append("subject", `Ứng tuyển vị trí: ${values.position}`);
      formData.append("taxcode", "Ứng tuyển"); // Bạn có thể dùng taxcode để phân biệt loại contact
      if (values.cvFile && values.cvFile.length > 0) {
        formData.append("companyProfile", values.cvFile[0]); // Đổi tên trường file thành 'companyProfile' để khớp với API
        formData.append("cvfilename", values.cvFile[0].name); // Gửi tên file gốc
      }
      const response = await fetch('https://admin.pigroup.vn/api/humanresource', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("API response:", data);
        setSubmissionStatus("Gửi thông tin thành công!");
        form.reset(); // Reset form sau khi gửi thành công
        onClose(); // Đóng popup
        alert("Ứng tuyển thành công. Cám ơn bạn!")
      } else {
        console.error("API error:", response.status, response.statusText, data);
        setSubmissionStatus(`Lỗi: ${data.message || 'Không thể gửi dữ liệu.'}`);
      }
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      setSubmissionStatus("Đã xảy ra lỗi khi gửi form. Vui lòng thử lại.");
    }
  };
  if (!isOpen) return null; // Không render gì nếu popup đóng
  return (
    <div className="fixed inset-0 bg-blue-1/50 flex justify-center items-center z-50">
      <div
        style={{
          '--tw-translate-y': isOpen ? '0px' : '100%',
          transform: `translateY(var(--tw-translate-y))`,
          transition: 'transform 0.3s ease-out' // Rút ngắn thời gian transition cho mượt hơn
        }}
        className={`bg-white relative p-5 sm:px-[70px] sm:py-[10px_50px] rounded-lg  w-full mx-[30px] sm:mx-[20%]`}
      >
        <Image className='absolute right-[70px] sm:right-[120px] top-[-30px]' src="/pin.svg" width={44} height={68} alt='Pin'/>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-[25px] uppercase text-blue-1">Nộp Hồ Sơ</h3>
          <h2 className='uppercase text-[40px] text-yellow-1 font-bold'>ứng tuyển</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='border-gray-9 focus-visible:ring-0! focus:border-gray-9! active:border-gray-9! focus-visible:border-gray-9! focus-visible:shadow-none! shadow-none!' placeholder="Họ & tên" {...field} />
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
                    <Input className='border-gray-9 focus-visible:ring-0! focus:border-gray-9! active:border-gray-9! focus-visible:border-gray-9! focus-visible:shadow-none! shadow-none!' placeholder="Số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" className='border-gray-9 focus-visible:ring-0! focus:border-gray-9! active:border-gray-9! focus-visible:border-gray-9! focus-visible:shadow-none! shadow-none!' placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className="custom-select-arrow mt-1 block w-full focus-visible:ring-0! px-3 py-2 border  rounded-md  focus:outline-none border-gray-9 focus:border-gray-9! active:border-gray-9! focus-visible:border-gray-9! focus-visible:shadow-none! shadow-none! sm:text-sm"
                      {...field}
                      // disabled={!!selectedPosition} // Vô hiệu hóa nếu đã có selectedPosition
                    >
                      <option value="" disabled>-- Chọn vị trí --</option>
                      {availablePositions.map((pos, index) => (
                        <option key={index} value={pos as string}>{pos as string}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        id="cvFile"
                        accept=".pdf,.doc,.docx,.zip"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        ref={fileInputRef} // Gán ref vào input ẩn
                        onChange={(e) => field.onChange(e.target.files)} // React Hook Form handles files
                      />
                      <div className="flex justify-between items-center pl-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm cursor-pointer">
                        {cvFileName ? (
                          <span className="text-gray-700 truncate">{cvFileName}</span>
                        ) : (
                          <span className="text-gray-400">File CV: (PDF, DOCX, ZIP)</span>
                        )}
                        <button type="button" onClick={handleButtonClick} className="p-2">
                          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.6189 17.0397L16.4677 23.6103C15.9458 24.1933 15.2032 24.5305 14.4208 24.5396C13.6384 24.5487 12.8882 24.2288 12.353 23.6581C11.1706 22.4238 11.1905 20.4712 12.3977 19.2613L20.6595 10.426C21.5708 9.41141 22.8678 8.82845 24.2315 8.82053C25.5953 8.8126 26.899 9.38044 27.822 10.3843C29.7909 12.5602 29.7769 15.8781 27.7897 18.0372L19.0299 27.3966C17.7832 28.648 16.0768 29.3315 14.311 29.2869C12.5452 29.2423 10.8755 28.4734 9.69358 27.1608C6.99205 24.1135 7.05889 19.5093 9.84775 16.5418L18.1219 7.70801" stroke="#C48C5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </FormControl>
                  {watchedCvFile?.[0]?.size && (
                    <p className="mt-1 text-sm text-gray-500">
                      Kích thước: {(watchedCvFile[0].size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {submissionStatus && (
              <p className={`mb-4 text-center text-sm ${submissionStatus.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>
                {submissionStatus}
              </p>
            )}
            <div className="flex justify-start space-x-3">
              <button
                type="submit"
                className="hover:cursor-pointer hvr-bounce-to-right sm:flex items-center justify-center text-yellow-1 text-[16px] font-semibold w-[150px] h-[35px] border border-yellow-1 hover:text-white focus:text-white"
                disabled={form.formState.isSubmitting} // Vô hiệu hóa nút khi đang gửi
              >
                {form.formState.isSubmitting ? 'Đang gửi...' : 'Nộp hồ sơ'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ApplicationFormPopup;
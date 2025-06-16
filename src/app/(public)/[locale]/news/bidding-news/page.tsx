'use client';
import { ContentBidding } from '@/components/news/ContentBidding';
import { Hero } from '@/components/news/Hero';
import React, { useEffect } from 'react';
import Related from '@/components/news/Related';
import { RegistrationForm } from '@/components/news/RegistrationForm';
// External image URLs (replace with suitable links)
function DetailPost() {
  return (
    <div>
      <Hero post={{ "id": 12, "name": "Pi Group hợp tác với những \"ông lớn\" ngành xây dựng và ngân hàng uy tín", "slug": "pi-group-hop-tac-voi-nhung-ong-lon-nganh-xay-dung-va-ngan-hang-uy-tin", "description": "Với hơn 12 năm phát triển không ngừng, Pi Group đang dần khẳng định vị thế là nhà kiến tạo đô thị số tích hợp tiện ích 5 sao", "is_featured": 1, "image": "pi-group-hop-tac-voi-nhung-ong-lon-nganh-xay-dung.jpg", "created_at": "2025-06-07T07:18:48.000000Z", "content": "", "categories": [{ "id": 1, "name": "Tin Thị Trường", "slug": "tin-thi-truong" }, { "id": 2, "name": "Tin Pi Group", "slug": "tin-pi-group" }, { "id": 3, "name": "Tin Đấu Thầu", "slug": "tin-dau-thau" }] }} />
      <div className="container m-auto max-w-[95%] md:max-w-[76%] 2xl:max-w-[1312px]">
        <ContentBidding post={{ "id": 12, "name": "Pi Group hợp tác với những \"ông lớn\" ngành xây dựng và ngân hàng uy tín", "slug": "pi-group-hop-tac-voi-nhung-ong-lon-nganh-xay-dung-va-ngan-hang-uy-tin", "description": "Với hơn 12 năm phát triển không ngừng, Pi Group đang dần khẳng định vị thế là nhà kiến tạo đô thị số tích hợp tiện ích 5 sao", "is_featured": 1, "image": "pi-group-hop-tac-voi-nhung-ong-lon-nganh-xay-dung.jpg", "created_at": "2025-06-07T07:18:48.000000Z", "content": "", "categories": [{ "id": 1, "name": "Tin Thị Trường", "slug": "tin-thi-truong" }, { "id": 2, "name": "Tin Pi Group", "slug": "tin-pi-group" }, { "id": 3, "name": "Tin Đấu Thầu", "slug": "tin-dau-thau" }] }} />
      </div>
      <div className="container m-auto max-w-[85%] rounded-[10px] bg-[#EAF3FF]/50 mt-[80px] px-[90px] pt-[70px] pb-[70px]">
        <h2 className='text-yellow-1 uppercase text-center text-size-30 md:text-size-35 lg:text-[38px] 2xl:text-[45px] font-bold mb-[35px]'>Đăng ký dự thầu</h2>
        <RegistrationForm />
      </div>
      <div className="container m-auto max-w-[85%] px-[10px]">
        <h2 className='text-yellow-1 uppercase text-center text-[35px] 2xl:text-[45px] font-bold mb-[45px] mt-[90px]'>Tin liên quan</h2>
        <Related post={[ { "id": 14, "name": "Picity High Park: Mọi khoảng cách thế hệ được xóa bỏ", "description": "", "content": "", "status": { "value": "published", "label": "Published" }, "author_id": 1, "author_type": "Botble\\ACL\\Models\\User", "is_featured": 0, "image": "picity-2-1.jpg", "views": 0, "format_type": null, "created_at": "2025-06-16T02:05:29.000000Z", "updated_at": "2025-06-16T02:05:29.000000Z" }, { "id": 13, "name": "Pi Group công bố triển khai dự án mới tại Hội nghị đối tác chiến lược", "description": "", "status": { "value": "published", "label": "Published" }, "author_id": 1, "author_type": "Botble\\ACL\\Models\\User", "is_featured": 0, "image": "3pi-1748053920851780348328-0-62.jpg", "views": 0, "format_type": null, "created_at": "2025-06-16T01:22:42.000000Z", "updated_at": "2025-06-16T01:26:44.000000Z" }, { "id": 10, "name": "Picity Sky Park: Dự án căn hộ tại Bình Dương", "description": "", "status": { "value": "published", "label": "Published" }, "author_id": 1, "author_type": "Botble\\ACL\\Models\\User", "is_featured": 0, "image": "picity-sky-park-binh-duong-1.jpg", "views": 767, "format_type": null, "created_at": "2024-07-25T12:02:58.000000Z", "updated_at": "2025-06-16T01:27:43.000000Z" }, { "id": 8, "name": "Tiềm năng kinh doanh tại Picity High Park: Khổng lồ hơn thường nghĩ", "description": "", "status": { "value": "published", "label": "Published" }, "author_id": 1, "author_type": "Botble\\ACL\\Models\\User", "is_featured": 1, "image": "1-cu-dan-do-thi-luon-co-nhieu-khoan-chi-5918.jpg", "views": 758, "format_type": null, "created_at": "2024-07-25T12:02:58.000000Z", "updated_at": "2025-06-16T02:58:17.000000Z" }, { "id": 7, "name": "Thời điểm tốt để săn căn hộ thương mại tại các đại đô thị", "description": "", "status": { "value": "published", "label": "Published" }, "author_id": 1, "author_type": "Botble\\ACL\\Models\\User", "is_featured": 1, "image": "high-park-1.jpg", "views": 354, "format_type": null, "created_at": "2024-07-25T12:02:58.000000Z", "updated_at": "2025-06-16T00:57:54.000000Z" }, { "id": 6, "name": "Shophouse kết hợp giữa kinh doanh và ở thu hút người mua", "description": "", "status": { "value": "published", "label": "Published" }, "author_id": 1, "author_type": "Botble\\ACL\\Models\\User", "is_featured": 1, "image": "high-park-02.jpg", "views": 2441, "format_type": null, "created_at": "2024-07-25T12:02:58.000000Z", "updated_at": "2025-06-16T00:57:46.000000Z" } ]}/>
      </div>
    </div>
  );
}
export default DetailPost;
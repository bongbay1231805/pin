'use client';
import React, {useState, useEffect, useRef} from 'react';
import EmblaCarouselCenter from '@/components/ui/EmblaCarouselCenter';
import {EmblaOptionsType} from 'embla-carousel';
import Image from 'next/image';
import {useScrollReveal} from '@/hooks/useScrollReveal';
import {useMediaQuery} from '@/hooks/useMediaQuery';
import {ServicesDesktop} from './ServicesDesktop'; // Import component mới
import {ServicesMobile} from './ServicesMobile'; // Import component mới
import SlickCarouselCenter from '../ui/SlickCarouselCenter';
import SliderComponent from '@/components/SliderComponent';
// Định nghĩa kiểu dữ liệu cho props của component
interface ToggleSectionProps {
  headerContent: React.ReactNode; // Nội dung của phần header (có thể là JSX, chuỗi,...)
  children: React.ReactNode; // Nội dung sẽ được ẩn/hiện khi toggle
  initialOpen?: boolean; // Mặc định ban đầu là ẩn hay hiện (optional)
}
export default function Detail2({custom_fields, image}: any) {
  const imageSrc = image
  ? `https://admin.pigroup.vn/storage/${image}`
    : '/banner_dvbds.jpg';
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); // Ref to access the content div directly
  const [contentHeight, setContentHeight] = useState('0px'); // State to control the max-height for animation
  useEffect(() => {
    if (contentRef.current) {
      // When opening, set max-height to the actual scrollHeight of the content
      // This allows the content to expand fully.
      // A small timeout ensures the height calculation happens after the ref is available.
      if (isOpen) {
        // setContentHeight(`${contentRef.current.scrollHeight}px`);
        setContentHeight('100%');
      } else {
        // When closing, set max-height to 0, which will collapse the content.
        // When closing, set max-height to 0, which will collapse the content.
        setContentHeight('10px');
      }
    }
  }, [isOpen]); // Re-run this effect whenever 'isOpen' changes
  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };
  const {
    real_estate_services_title,
    real_estate_services_1,
    real_estate_services_2,
    real_estate_services_3,
    real_estate_services_4,
    real_estate_services_5,
    real_estate_services_6,
    real_estate_services_7,
    real_estate_services_8,
    real_estate_services_9,
    real_estate_services_10,
    real_estate_services_11,
    real_estate_services_12,
    real_estate_services_13,
    real_estate_services_14,
    real_estate_services_15,
    real_estate_services_16,
    real_estate_services_17,
    real_estate_services_18,
    real_estate_services_19,
    real_estate_services_20,
    real_estate_services_21,
    real_estate_services_22,
    real_estate_services_slider
  } = custom_fields;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const IconService1 = (
    // <div dangerouslySetInnerHTML={{__html: real_estate_services_20}}></div>
    <svg
      className="sm:h-28 w-[80px] h-[81px]"
      viewBox="0 0 113 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 31L61.73 10L101 31"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
      />
      <path
        d="M37 25V69H86V25"
        stroke="#4C73A8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
      />
      <path
        d="M70 69V56.5V52C70 47.5817 66.4183 44 62 44V44C57.5817 44 54 47.5817 54 52V56.5V69"
        stroke="#4C73A8"
        strokeWidth="2.5"
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
      />
      <path
        d="M46 10L46 19"
        stroke="#4C73A8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
      />
      <path
        d="M46 9C43.7909 9 42 7.20914 42 5C42 2.79086 43.7909 1 46 1C48.2091 1 50 2.79086 50 5C50 7.20914 48.2091 9 46 9Z"
        stroke="#4C73A8"
        strokeWidth="2"
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
      />
      <path
        d="M6.87109 79.498V79.4971C7.50932 79.5644 8.09123 80.1103 8.58105 80.9844C8.99805 81.7286 9.28818 82.6089 9.45508 83.3184L9.51953 83.6113C10.6346 89.1582 11.8289 98.672 12.2012 104.807L12.2646 105.986V105.987C12.3066 106.861 12.2604 107.909 11.9971 108.825C11.7495 109.686 11.3309 110.367 10.6768 110.729L10.5469 110.795C10.3596 110.88 9.94222 110.995 9.36133 111.108C8.79661 111.219 8.12073 111.319 7.44824 111.392C6.77415 111.464 6.11397 111.506 5.57812 111.499C5.30978 111.496 5.08247 111.481 4.90527 111.454C4.71703 111.426 4.63332 111.391 4.61328 111.379C4.26386 111.165 4.11775 110.767 4.17188 110.384C4.22022 110.042 4.4046 109.813 4.6416 109.738L4.74609 109.716L10.0088 109.072L10.4209 109.022L10.4473 108.607C10.5113 107.575 10.5947 106.482 10.5635 105.395L10.543 104.93L10.542 104.929L10.4658 103.808C10.0763 98.436 9.22912 91.1673 8.27637 85.8857L8.07129 84.7861C7.96035 84.2021 7.77733 83.6369 7.60254 83.1055C7.42426 82.5635 7.25503 82.0584 7.14648 81.5498L7.06445 81.1631L6.66992 81.1543C5.78556 81.1328 4.72403 81.3513 3.7627 81.5381C2.75845 81.7332 1.86402 81.8928 1.1875 81.8301L1.14746 81.8262C0.852178 81.7835 0.598703 81.5131 0.520508 81.083C0.447208 80.6797 0.568776 80.3959 0.733398 80.2734L0.805664 80.2305L0.808594 80.2295C0.808589 80.2295 0.81559 80.2267 0.831055 80.2217C0.847333 80.2164 0.869245 80.2097 0.897461 80.2021C0.954631 80.1868 1.02936 80.1697 1.12109 80.1504C1.30442 80.1119 1.5416 80.0689 1.81836 80.0244C2.37118 79.9355 3.06522 79.841 3.7666 79.7568C4.46771 79.6727 5.1722 79.5996 5.74512 79.5518C6.3403 79.502 6.73995 79.4852 6.87109 79.498ZM99.1963 74.0967C101.794 72.6681 104.522 71.9452 107.72 73.0059V73.0068C108.408 73.2377 109.943 73.9852 111.108 74.9053C111.694 75.3678 112.14 75.8378 112.357 76.2676C112.463 76.4769 112.505 76.6576 112.5 76.8115C112.495 76.9588 112.446 77.1135 112.316 77.2803L112.308 77.291L73.6963 106.876C71.7412 107.722 70.1736 107.822 68.1738 107.623L67.2793 107.521V107.52L66.2256 107.381C60.9558 106.663 55.6298 105.587 50.2822 104.495C44.5846 103.332 38.8612 102.152 33.1885 101.381L33.126 101.372L33.0645 101.38L24.085 102.404L23.7139 102.447L23.6494 102.815C23.4209 104.12 22.4304 105.512 21.1924 106.015L20.9414 106.103C19.1811 106.625 17.8374 106.331 16.9043 105.669C15.9586 104.997 15.3754 103.906 15.2305 102.736C15.0856 101.567 15.3844 100.362 16.1445 99.4697C16.8485 98.6438 17.9884 98.0389 19.665 98.0146L20.0068 98.0176C20.7152 98.0397 21.3602 98.3853 21.9883 98.9072C22.6285 99.4392 23.169 100.078 23.7383 100.663L23.9092 100.839L24.1523 100.812L33.5596 99.7578L68.584 106.089L68.6221 106.096L68.6602 106.097C70.4111 106.143 72.2787 105.928 73.8691 104.947L73.8916 104.933L73.9131 104.916L109.825 77.0273L110.274 76.6777L109.87 76.2773C108.374 74.7917 106.797 74.1298 105.186 74.0596C103.592 73.9901 102.017 74.502 100.515 75.2607C99.012 76.0197 97.5423 77.0469 96.1572 78.0498C94.7584 79.0626 93.457 80.0419 92.2451 80.7529L91.8691 80.9727L92.0361 81.375C92.916 83.5029 91.85 85.398 90.1211 86.3359C88.4406 87.2476 86.266 87.1786 84.8438 85.5391L84.709 85.375L84.5605 85.1787C83.8502 84.1957 83.6199 83.2134 83.709 82.3291C83.8048 81.3789 84.2735 80.5009 84.9902 79.8262C86.4242 78.4764 88.8058 77.9789 90.9775 79.3711L91.249 79.5449L91.5195 79.3701C92.8173 78.5308 94.0942 77.5624 95.3564 76.6377C96.627 75.7069 97.8903 74.8148 99.1963 74.0967ZM20.6611 99.9199C20.1238 99.6407 19.4727 99.562 18.75 99.7422L18.4355 99.8359H18.4346C16.941 100.354 16.5807 101.899 16.9814 103.062C17.1859 103.656 17.5965 104.2 18.2021 104.515C18.7394 104.794 19.3905 104.873 20.1133 104.692L20.4277 104.6L20.4287 104.599C21.9225 104.081 22.2828 102.535 21.8818 101.372C21.6773 100.779 21.2668 100.235 20.6611 99.9199ZM31.042 79.1953C39.7262 74.8842 49.556 71.9175 57.5 78.6221L57.876 78.9482L57.8789 78.9502C58.0408 79.0926 58.3155 79.3953 58.665 79.8018C59.0082 80.2007 59.3961 80.6681 59.7822 81.126C60.1645 81.5792 60.5445 82.0232 60.8594 82.3604C61.0161 82.5281 61.1657 82.6788 61.2959 82.793C61.3606 82.8497 61.4293 82.9046 61.498 82.9502C61.5556 82.9883 61.6608 83.0534 61.792 83.0771L61.8457 83.0859L61.8994 83.084C64.161 83.0036 66.4893 82.63 68.7744 82.2637C70.7849 81.9414 72.762 81.6252 74.6748 81.501L75.4902 81.46C77.3496 81.3963 78.7719 81.983 79.7705 82.9014C80.775 83.8252 81.3793 85.1106 81.5469 86.4824C81.8812 89.2189 80.4766 92.2089 77.1865 93.2246L61.4609 95.1846L61.4502 95.1865L61.0762 95.2324L61.0176 95.6045C60.4412 99.2464 56.057 100.583 53.7002 97.8936L53.4785 97.6211L53.4775 97.6201L53.3281 97.4121C52.613 96.3732 52.4046 95.3382 52.5234 94.4092C52.6514 93.4099 53.1625 92.4967 53.9014 91.8096C55.3412 90.4706 57.5406 90.0588 59.2861 91.4268L59.4531 91.5645C59.5579 91.6551 59.6661 91.7894 59.79 91.9707C59.8507 92.0595 59.9103 92.153 59.9746 92.2529C60.0377 92.3509 60.1052 92.4558 60.1748 92.5576C60.4266 92.9262 60.8311 93.458 61.4932 93.502L61.54 93.5049L61.5869 93.499L76.7471 91.6455L76.8203 91.6367L76.8877 91.6074C79.1823 90.5979 80.2113 88.4664 79.9238 86.5654C79.7802 85.6153 79.306 84.7281 78.5059 84.0918C77.7546 83.4944 76.7438 83.1404 75.5078 83.1348L75.2578 83.1377C72.8595 83.2158 70.3667 83.6191 67.9062 84.0146C65.4913 84.4029 63.1053 84.7812 60.8027 84.8672C60.1795 84.4148 59.7098 83.8228 59.2227 83.1406C58.7142 82.4286 58.1738 81.6032 57.4355 80.8828H57.4365C53.4035 76.9406 48.8191 75.9506 44.1973 76.498C39.8911 77.0081 35.5442 78.8526 31.5518 80.8564L30.7578 81.2588H30.7568C30.214 81.538 29.5031 82.0351 28.8701 82.4639C28.5452 82.684 28.2354 82.8903 27.959 83.0576C27.7468 83.1861 27.5709 83.2812 27.4336 83.3418L27.3086 83.3916H27.3066C26.5821 83.639 25.6801 83.7242 24.6973 83.791C23.7439 83.8559 22.7068 83.9042 21.8223 84.1045L21.542 84.168L21.4561 84.4424C20.5564 87.3134 18.1388 88.213 16.1074 87.6973C15.0838 87.4374 14.1639 86.8185 13.5781 85.9072C12.9965 85.0022 12.7232 83.7758 13.0469 82.2559C13.3497 80.8481 14.4308 79.8634 15.7666 79.4502C17.0233 79.0615 18.4494 79.1989 19.5576 79.9307L19.7754 80.085C20.1152 80.3459 20.332 80.6722 20.5762 81.0684C20.8102 81.4481 21.0831 81.9196 21.5234 82.3018L21.7021 82.4561L21.9346 82.417C22.5713 82.3095 23.2989 82.2744 24.0723 82.2197C24.7309 82.1732 25.4207 82.1122 26.0449 81.9688L26.3076 81.9023L26.3135 81.9004C26.63 81.8082 27.0146 81.6173 27.4053 81.3984C27.8045 81.1748 28.246 80.9016 28.6855 80.624C29.4711 80.1281 30.2346 79.6292 30.8076 79.3174L31.041 79.1963L31.042 79.1953ZM58.3555 92.8066C57.7813 92.3316 57.0044 92.1325 56.1172 92.3779L55.9385 92.4336H55.9365C54.7503 92.839 54.1793 93.9888 54.1758 95.0361C54.1726 96.0243 54.6818 97.0754 55.8027 97.4092L56.0352 97.4658L56.0371 97.4668C57.1732 97.6844 58.0651 97.4478 58.6523 96.874C59.2257 96.3137 59.4211 95.5154 59.3525 94.7793C59.2839 94.0435 58.947 93.296 58.3555 92.8066ZM18.1572 81.1006C17.5854 80.8561 16.9129 80.8297 16.1846 81.0781L15.8701 81.2012C15.1881 81.5016 14.7899 82.0779 14.6318 82.707C14.4761 83.3269 14.5466 84.0115 14.7969 84.6045C15.0477 85.1987 15.4963 85.7393 16.1338 86.0225C16.7429 86.293 17.4665 86.3029 18.248 85.9824L18.4053 85.9131C19.8159 85.261 20.014 83.6385 19.5166 82.4941C19.2598 81.9035 18.801 81.3759 18.1572 81.1006ZM88.1211 80.1289C87.4384 80.1532 86.7805 80.4677 86.2871 80.9209C85.7939 81.3741 85.422 82.0056 85.3721 82.709C85.3239 83.3895 85.5822 84.0736 86.2012 84.6504L86.3291 84.7646H86.3301C87.4376 85.6952 88.8716 85.4172 89.7432 84.6309C90.185 84.2322 90.511 83.6839 90.5947 83.0518C90.6689 82.4916 90.5484 81.8977 90.1973 81.3242L90.0332 81.0801C89.5247 80.3905 88.8247 80.104 88.1211 80.1289Z"
        fill="#4C73A8"
        stroke="#4C73A8"
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
      />
    </svg>
  );
  const IconService2 = (
    // <div dangerouslySetInnerHTML={{__html: real_estate_services_21}} />
    <svg
      className="w-[80px] h-[81px] sm:h-28"
      viewBox="0 0 110 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M31.0234 15L55.5234 2L81.0234 15"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M39.5234 11V38.5H72.0234V11"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M96.5 13.5H103.023C104.523 13.3333 107.523 14 107.523 18V81.5C107.523 89.5 101.023 89 101.023 89H8.02294C6.02294 89.3333 2.02294 89 2.02294 85V18.5C1.85627 16.8333 2.52294 13.5 6.52294 13.5H15.5"
        stroke="#4C73A8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M2.52344 74H26.0234"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M38.5234 74H107.523"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M11.0234 73.5V23.5H39.0234M72.5234 23.5H98.0234V73.5"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M22.5234 109H84.5234"
        stroke="#4C73A8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M63.5234 89L71.5234 109"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M43.5234 89L35.5234 109"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M19.0234 50.5H44.0234"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M19.0234 58H44.0234"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M20 65H81"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M61.5234 39V30.5V27.5C61.5234 24.4624 59.061 22 56.0234 22V22C52.9859 22 50.5234 24.4624 50.5234 27.5V30.5V39"
        stroke="#4C73A8"
        strokeWidth="2.5"
      />
      <circle
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        cx="53.0234"
        cy="80.5"
        r="1.25"
        stroke="#4C73A8"
        strokeWidth="2.5"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M88.5234 40H84.5234V44H80.5234V49.5H86.5234V54H83.0234"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        cx="21"
        cy="13"
        r="4"
        stroke="#4C73A8"
        strokeWidth="2"
      />
      <circle
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        cx="91"
        cy="14"
        r="4"
        stroke="#4C73A8"
        strokeWidth="2"
      />
      <circle
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        cx="86"
        cy="65"
        r="4"
        stroke="#4C73A8"
        strokeWidth="2"
      />
    </svg>
  );
  const IconService3 = (
    // <div dangerouslySetInnerHTML={{__html: real_estate_services_22}} />
    <svg
      className="w-[80px] h-[81px] sm:h-28"
      viewBox="0 0 114 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_1_2377" fill="white">
        <rect x="18" y="22" width="75" height="92" rx="3" />
      </mask>
      <rect
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        x="18"
        y="22"
        width="75"
        height="92"
        rx="3"
        stroke="#4C73A8"
        strokeWidth="8"
        strokeLinejoin="round"
        mask="url(#path-1-inside-1_1_2377)"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M33 23V15C33 13.3431 34.3431 12 36 12H99C100.657 12 102 13.3431 102 15V97C102 98.6569 100.657 100 99 100H91.5"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M43 13V5C43 3.34315 44.3431 2 46 2H109C110.657 2 112 3.34315 112 5V87C112 88.6569 110.657 90 109 90H101.5"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M26 42L42.66 31L60 42"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M31 39V62H55V39"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M47 62V55V52C47 49.7909 45.2091 48 43 48V48C40.7909 48 39 49.7909 39 52V55V62"
        stroke="#4C73A8"
        strokeWidth="2.5"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M65 37H82"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M65 44H82"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M65 51H82"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M65 58H82"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M29 80H43"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M67 87H81"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M54 80L81 80"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M29 87L56 87"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        cx="31"
        cy="97"
        r="4"
        stroke="#4C73A8"
        strokeWidth="2"
      />
      <circle
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        cx="78"
        cy="71"
        r="4"
        stroke="#4C73A8"
        strokeWidth="2"
      />
      <circle
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        cx="7"
        cy="101"
        r="4"
        stroke="#4C73A8"
        strokeWidth="2"
      />
      <circle
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        cx="24"
        cy="7"
        r="4"
        stroke="#4C73A8"
        strokeWidth="2"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M29 71H73"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M36 97L81 97"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M2 42H11.5"
        stroke="#4C73A8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-yellow-1 transition-colors duration-300"
        d="M7 30.25C9.62335 30.25 11.75 32.3766 11.75 35V78.7041C11.75 79.3517 11.669 79.9964 11.5088 80.623L11.4355 80.8906L7.08301 95.6875C7.07218 95.7243 7.03836 95.75 7 95.75C6.97107 95.75 6.94455 95.7358 6.92871 95.7129L6.91699 95.6875L2.56445 80.8906C2.35564 80.1806 2.25002 79.4442 2.25 78.7041V35C2.25 32.3766 4.37665 30.25 7 30.25Z"
        stroke="#4C73A8"
        strokeWidth="2.5"
      />
    </svg>
  );

  const servicesData = [
    {
      id: 1,
      icon: IconService1,
      title: real_estate_services_5,
      text: real_estate_services_13
    },
    {
      id: 2,
      icon: IconService2,
      title: real_estate_services_6,
      text: real_estate_services_14
    },
    {
      id: 3,
      icon: IconService3,
      title: real_estate_services_7,
      text: real_estate_services_15
    }
  ];
  function convertJsonStringToArrayOrObject(jsonString: string): any | null {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error('Error parsing JSON string:', error);
      return null; // Return null or throw the error, depending on your error handling preference
    }
  }
  const slider = convertJsonStringToArrayOrObject(real_estate_services_slider);
  const sliders = [...slider, ...slider];
  // const slides = [
  //   {
  //     image: "/fecosystem/detail/slider-center-1.png"
  //   },
  //   {
  //     image: "/fecosystem/detail/slider-center-2.png"
  //   },
  //   {
  //     image: "/fecosystem/detail/slider-center-3.png"
  //   },
  //   {
  //     image: "/fecosystem/detail/slider-center-1.png"
  //   },
  //   {
  //     image: "/fecosystem/detail/slider-center-2.png"
  //   },
  //   {
  //     image: "/fecosystem/detail/slider-center-3.png"
  //   }
  // ];
  useScrollReveal(); // dùng mặc định `.boxanimation`
  return (
    <>
      <div className="relative mx-auto h-[390px] sm:h-[500px] md:h-[100vh] w-[100vw]  text-center pt-[70px] md:pt-[150px]">
        <div className="relative mx-auto top-[30%] max-w-[85%]">
          <h2
            className="absolute  z-10 left-0 top-[-20px] text-left  uppercase font-bold text-white sm:leading-[50px] xl:leading-[60px] text-[22px] xl:text-[40px] 2xl:text-[70px] 2xl:leading-[100px]"
            dangerouslySetInnerHTML={{__html: real_estate_services_title}}
          ></h2>
        </div>
        <Image
          fill
          src={imageSrc}
          alt="Smart City Features"
          className="object-cover"
        ></Image>
      </div>
      <div className="mx-auto max-w-[85%] mb-[20%] sm:mb-[5%] 2xl:mb-[203px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center mb-[5%] 2xl:mb-[150px]">
          <div className="mt-[100px] sm:w-[85%] 2xl:w-[100%] order-1 sm:order-0">
            <h3
              className="text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px] font-bold mb-[35px]"
              dangerouslySetInnerHTML={{__html: real_estate_services_1}}
            ></h3>
            <div className="text-[13px] 2xl:text-[17px] text-gray-5 mb-[15px] text-justify">
              {real_estate_services_2} 
            </div>
            <p className="text-[13px] 2xl:text-[17px] text-gray-5 text-justify">
              {real_estate_services_3}
            </p>
          </div>
          <div className="relative pt-[85%] sm:pt-[100%] 2xl:pt-[677px] 2xl:w-[85%] 2xl:ml-[110px]">
            <Image
              src="/fecosystem/detail/operation-1.png"
              alt="Modern city skyline"
              fill
              className="rounded-[10px] overflow-hidden absolute"
              style={{
                top: '50px',
                left: '0',
                objectFit: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
        <div>
          <h3
            className="text-yellow-1 text-[21px] sm:text-[28px] 2xl:text-[45px] font-bold text-center uppercase mb-[5%] 2xl:mb-[117px] mt-[20%] sm:mt-[10%]"
            dangerouslySetInnerHTML={{__html: real_estate_services_4}}
          ></h3>
          {isDesktop ? (
            <ServicesDesktop servicesData={servicesData} />
          ) : (
            <ServicesMobile servicesData={servicesData} />
          )}
        </div>
      </div>
      <div className="2xl:mb-[120px] relative">
        <div className="flex bg-[url(/fecosystem/detail/operation-6.png)] bg-cover bg-center sm:h-[100vh] h-[75vh]">
          <div className="max-w-[85%]" style={{marginLeft: '8%'}}>
            <div className="grid items-start">
              <h3
                className="text-yellow-1 text-[22px] sm:text-[28px] 2xl:text-[45px] font-bold uppercase sm:mb-[60px] mb-[50px] mt-[50px] sm:mt-[60px]"
                dangerouslySetInnerHTML={{__html: real_estate_services_8}}
              ></h3>
              <div className="grid grid-cols-2 grid-rows-2 gap-[20px] sm:w-fit">
                <div className="flex flex-col items-center bg-[#20446F]/80 sm:w-[300px] 2xl:h-[234px] rounded-[10px] gap-[20px] justify-center p-4 text-center h-[135px] sm:h-[auto] hover:bg-[#20446F] transition-all duration-300">
                  {/* <div
                    dangerouslySetInnerHTML={{__html: real_estate_services_16}}
                  /> */}
                  <svg
                    className="w-[80px] w-[81px] sm:w-[auto] sm:h-[auto]"
                    width="99"
                    height="91"
                    viewBox="0 0 99 91"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M78.385 63.5135C85.0513 63.5135 90.4555 58.1556 90.4555 51.5463C90.4555 44.937 85.0513 39.5791 78.385 39.5791C71.7186 39.5791 66.3145 44.937 66.3145 51.5463C66.3145 58.1556 71.7186 63.5135 78.385 63.5135Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M73 52.3063L75.8441 55L83 48"
                      stroke="white"
                      strokeWidth="4"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M59.8661 33.6831C61.4489 33.6831 62.7321 32.4109 62.7321 30.8415C62.7321 29.2722 61.4489 28 59.8661 28C58.2832 28 57 29.2722 57 30.8415C57 32.4109 58.2832 33.6831 59.8661 33.6831Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M78.3833 68.7269C87.9537 68.7269 95.712 61.035 95.712 51.5465C95.712 42.0581 87.9537 34.3662 78.3833 34.3662C68.813 34.3662 61.0547 42.0581 61.0547 51.5465C61.0547 61.035 68.813 68.7269 78.3833 68.7269Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M87.2024 66.3008L96.7706 80.2134L88.8449 78.574L86.1166 87.3226L79.0176 68.9183"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M70.1175 66.8472L61.9492 81.3062L69.3293 78.5739L72.0576 87.3226L79.1511 68.9182"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M2 23L39.73 2L68.5 17.5"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path d="M60 13L60 28" stroke="white" strokeWidth="2" />
                    <path
                      d="M15 17V61H56"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M48 61V48.5V44C48 39.5817 44.4183 36 40 36V36C35.5817 36 32 39.5817 32 44V48.5V61"
                      stroke="white"
                      strokeWidth="2.5"
                    />
                  </svg>
                  <h4 className="text-white uppercase text-[12px] 2xl:text-[20px] font-semibold">
                    {real_estate_services_9}
                  </h4>
                </div>
                <div className="flex flex-col items-center bg-[#20446F]/80 sm:w-[300px] 2xl:h-[234px] rounded-[10px] gap-[20px] justify-center p-4 text-center h-[135px] sm:h-[auto] hover:bg-[#20446F] transition-all duration-300">
                  {/* <div
                    dangerouslySetInnerHTML={{__html: real_estate_services_17}}
                  /> */}
                  <svg
                    className="w-[80px] w-[81px] sm:w-[auto] sm:h-[auto]"
                    width="70"
                    height="70"
                    viewBox="0 0 97 87"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M38.3285 53.3725L38.9533 56.9711C39.0493 57.5252 39.431 57.9874 39.9556 58.1863L40.8128 58.5094C40.8128 58.5094 43.1585 65.5697 49.1293 66.4255C49.1293 66.4255 54.0339 66.6395 57.2326 58.2954L57.8425 57.9895C58.2668 57.7777 58.5718 57.384 58.6784 56.9219L59.478 53.3939C59.5399 53.1243 59.429 52.8462 59.1987 52.6943L58.9193 52.5081C58.5312 52.2492 58.2988 51.8128 58.2988 51.3442V49.7396C58.2988 49.7396 61.9239 42.8932 56.3796 41.8235C56.3796 41.8235 54.6737 36.6887 48.0631 37.7584C48.0631 37.7584 38.2539 39.47 38.2539 46.9583L38.8936 50.3815L39.1453 51.0533C39.3734 51.6609 39.1517 52.3477 38.6143 52.7071C38.3968 52.8526 38.2838 53.1136 38.3285 53.3746V53.3725Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M77.0652 81.8276L73.3803 74.7181C72.1755 72.3925 70.2307 70.5375 67.8552 69.4464L58.9395 65.3535"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.4082 81.8276L25.0931 74.7181C26.2979 72.3925 28.2427 70.5375 30.6182 69.4464L39.5339 65.3535"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M45.7188 85.4651L47.9578 74.0338C48.026 73.6829 47.9514 73.317 47.7488 73.0218L46.1431 70.679C45.964 70.4159 46.1495 70.0586 46.4672 70.0586H52.2568C52.566 70.0586 52.7558 70.4009 52.5916 70.6641L51.0904 73.0731C50.9262 73.3384 50.8579 73.6508 50.9006 73.961L52.5404 85.8909"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M73.0331 33.1673L73.402 35.2897C73.4596 35.617 73.6835 35.8888 73.9927 36.0064L74.498 36.1968C74.498 36.1968 75.882 40.3603 79.4026 40.8652C79.4026 40.8652 82.2942 40.9915 84.1814 36.0706L84.5418 35.8909C84.7913 35.7647 84.9726 35.5336 85.0344 35.2619L85.5057 33.1802C85.5419 33.0218 85.4758 32.8571 85.3415 32.7672L85.1773 32.6581C84.9491 32.5062 84.8105 32.2473 84.8105 31.9713V31.0257C84.8105 31.0257 86.9472 26.9885 83.6782 26.3573C83.6782 26.3573 82.6717 23.3299 78.7736 23.9611C78.7736 23.9611 72.9883 24.9709 72.9883 29.3868L73.3657 31.4065L73.515 31.8023C73.6493 32.1618 73.5193 32.5661 73.2015 32.7779C73.0736 32.8635 73.0075 33.0176 73.0331 33.1716V33.1673Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M95.8753 49.9496L93.7023 45.7584C92.9922 44.3869 91.845 43.2937 90.444 42.6497L85.1875 40.2363"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M65.2266 45.7559C65.9367 44.3845 67.0839 43.2912 68.4849 42.6472L73.7414 40.2339"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M77.3906 52.0931L78.7106 45.3515C78.7511 45.144 78.7063 44.9301 78.5869 44.7546L77.6401 43.3746C77.5335 43.2206 77.6444 43.0088 77.832 43.0088H81.2461C81.4295 43.0088 81.5403 43.2099 81.4423 43.3661L80.5573 44.7867C80.4592 44.9429 80.4208 45.1269 80.4464 45.3109L81.4145 52.3455"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.9803 33.1673L11.3492 35.2897C11.4068 35.617 11.6307 35.8888 11.9399 36.0064L12.4453 36.1968C12.4453 36.1968 13.8293 40.3603 17.3499 40.8652C17.3499 40.8652 20.2415 40.9915 22.1287 36.0706L22.4891 35.8909C22.7386 35.7647 22.9198 35.5336 22.9817 35.2619L23.4529 33.1802C23.4892 33.0218 23.4231 32.8571 23.2887 32.7672L23.1245 32.6581C22.8964 32.5062 22.7578 32.2473 22.7578 31.9713V31.0257C22.7578 31.0257 24.8945 26.9885 21.6254 26.3573C21.6254 26.3573 20.6189 23.3299 16.7208 23.9611C16.7208 23.9611 10.9355 24.9709 10.9355 29.3868L11.313 31.4065L11.4623 31.8023C11.5966 32.1618 11.4665 32.5661 11.1488 32.7779C11.0208 32.8635 10.9547 33.0176 10.9803 33.1716V33.1673Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31.6496 45.7559C30.9395 44.3845 29.7922 43.2912 28.3912 42.6472L23.1348 40.2339"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 49.9496L3.17295 45.7584C3.88305 44.3869 5.0303 43.2937 6.43131 42.6497L11.6878 40.2363"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.3359 52.0931L16.6559 45.3515C16.6964 45.144 16.6517 44.9301 16.5322 44.7546L15.5854 43.3746C15.4788 43.2206 15.5897 43.0088 15.7774 43.0088H19.1914C19.3748 43.0088 19.4857 43.2099 19.3876 43.3661L18.5026 44.7867C18.4045 44.9429 18.3661 45.1269 18.3917 45.3109L19.3598 52.3455"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M39.8738 2.48242C40.1744 2.20754 40.5713 2.0542 40.9837 2.0542H60.4182C60.8845 2.0542 61.3277 2.24868 61.6341 2.58901L68.4591 10.1362C69.0179 10.7552 69.0179 11.679 68.4591 12.2961L51.0613 31.5437C50.5853 32.071 49.7414 32.0766 49.2577 31.5568L31.4283 12.4082C30.8117 11.7463 30.8541 10.729 31.5227 10.1175L32.9375 9"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M55.7829 7.77002L59.8613 12.0892L51.8613 21.77"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M44.43 7.77002L40.8613 12.0892L47.8613 21.77"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M50.9375 12L57.9375 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M48.9375 14C50.0421 14 50.9375 13.1046 50.9375 12C50.9375 10.8954 50.0421 10 48.9375 10C47.8329 10 46.9375 10.8954 46.9375 12C46.9375 13.1046 47.8329 14 48.9375 14Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M34.9375 9C36.0421 9 36.9375 8.10457 36.9375 7C36.9375 5.89543 36.0421 5 34.9375 5C33.8329 5 32.9375 5.89543 32.9375 7C32.9375 8.10457 33.8329 9 34.9375 9Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h4 className="text-white uppercase text-[12px] 2xl:text-[20px] font-semibold">
                    {real_estate_services_10}
                  </h4>
                </div>
                <div className="flex flex-col items-center bg-[#20446F]/80 sm:w-[300px] 2xl:h-[234px] rounded-[10px] gap-[20px] justify-center p-4 text-center h-[135px] sm:h-[auto] hover:bg-[#20446F] transition-all duration-300">
                  {/* <div
                    dangerouslySetInnerHTML={{__html: real_estate_services_18}}
                  /> */}
                  <svg
                    className="w-[80px] w-[81px] sm:w-[auto] sm:h-[auto]"
                    width="70"
                    height="90"
                    viewBox="0 0 70 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M61.7627 70.1167C63.4407 69.4312 65.1151 69.2005 66.9395 70.0806V70.0815C67.3266 70.2701 68.1986 70.8454 68.832 71.4976C69.1513 71.8263 69.3694 72.1328 69.458 72.3833C69.5343 72.599 69.5028 72.717 69.4023 72.8237L43.4102 88.4272C42.1958 88.7878 41.2625 88.7342 40.0723 88.4614L39.5361 88.3296H39.5352C36.1375 87.4518 32.7306 86.2961 29.3018 85.1255C25.879 83.957 22.4333 82.7729 18.9873 81.8501L18.9258 81.8335H18.8623L13.25 81.7876L12.874 81.7847L12.7666 82.144C12.6514 82.5302 12.4087 82.9354 12.083 83.2612C11.7971 83.5471 11.4689 83.7518 11.1387 83.8423L10.998 83.8735C9.92584 84.058 9.1832 83.7818 8.70703 83.3394C8.2182 82.8849 7.9559 82.2044 7.95508 81.4985C7.9543 80.793 8.21487 80.1091 8.70801 79.647C9.15914 79.2243 9.84948 78.945 10.835 79.0532L11.0361 79.0806C11.4086 79.1391 11.7436 79.3698 12.0791 79.7329C12.4248 80.1071 12.6959 80.5313 13.0127 80.9565L13.1611 81.1548L13.4082 81.1577L19.2559 81.2173L40.3408 87.8813L40.3779 87.8931L40.417 87.8989C41.5089 88.0651 42.7214 88.0779 43.8262 87.5601L43.8506 87.5483L43.874 87.5347L68.1191 72.7622L68.5967 72.4712L68.2549 72.0298C67.4202 70.9486 66.4578 70.3818 65.416 70.2046C64.3916 70.0304 63.345 70.2415 62.3457 70.6089C61.346 70.9764 60.3505 71.5165 59.4209 72.0405C58.4761 72.5731 57.6111 73.0822 56.8213 73.4312L56.4287 73.605L56.541 74.019C56.8942 75.3202 56.162 76.3467 55.0967 76.7749C54.0927 77.1783 52.9088 77.0024 52.2041 76.0366L52.0693 75.8335L51.9316 75.5786C51.6449 74.9894 51.6006 74.4421 51.7051 73.9712C51.8259 73.427 52.154 72.9478 52.6143 72.603C53.5343 71.914 54.9396 71.7897 56.0996 72.77L56.3496 72.9819L56.6436 72.8364C57.5136 72.4053 58.3817 71.8897 59.2256 71.4077C60.0785 70.9206 60.9159 70.4627 61.7627 70.1167ZM10.1377 79.7056L9.91895 79.7427H9.91797C8.82341 79.9828 8.46216 81.0523 8.63379 81.8745C8.7226 82.2996 8.95667 82.7173 9.35156 82.9937C9.70495 83.2408 10.1497 83.3485 10.6514 83.2856L10.8701 83.2485L10.8711 83.2476C11.9653 83.0073 12.3258 81.9388 12.1543 81.1167C12.0655 80.6915 11.8316 80.2739 11.4365 79.9976C11.0832 79.7504 10.6392 79.6428 10.1377 79.7056ZM54.4219 72.7056C53.944 72.6637 53.4699 72.8303 53.1016 73.0991C52.7325 73.3685 52.4232 73.7746 52.3291 74.2661C52.2434 74.7141 52.3467 75.1818 52.6611 75.6069L52.8086 75.7866C53.4999 76.5433 54.52 76.4618 55.1777 75.9907C55.5124 75.751 55.7826 75.3963 55.8936 74.9604C55.9921 74.5728 55.9575 74.1494 55.7695 73.728L55.6797 73.5474C55.3887 73.0209 54.9221 72.7496 54.4219 72.7056Z"
                      fill="#888888"
                      stroke="white"
                    />
                    <path
                      d="M19.3857 68.3677C25.0998 66.3805 31.311 65.3451 35.6406 69.9468L35.8457 70.1694L35.8467 70.1724C35.9257 70.2598 36.0666 70.4531 36.2539 70.73C36.4357 70.9986 36.6389 71.311 36.8447 71.6216C37.0472 71.9272 37.2519 72.2312 37.4248 72.4653C37.5105 72.5814 37.5955 72.6904 37.6738 72.7769C37.7127 72.8197 37.7575 72.8652 37.8057 72.9058C37.8438 72.9379 37.9277 73.0059 38.0439 73.0415L38.0947 73.0562L38.1484 73.061C39.5699 73.1821 41.0536 73.1268 42.4961 73.0737C43.7694 73.0269 45.0108 72.9819 46.1953 73.0483L46.6992 73.0835C47.8133 73.1799 48.6039 73.6257 49.1182 74.2212C49.6372 74.8224 49.8998 75.6065 49.8994 76.4155C49.8986 78.0247 48.864 79.6564 46.8555 80.02L36.9707 80.0435H36.5889L36.4844 80.4038C35.892 82.4426 33.2686 82.883 32.1055 81.1987L31.9971 81.0298V81.0288C31.5873 80.3299 31.5298 79.685 31.6699 79.1421C31.8124 78.5906 32.1691 78.1069 32.6484 77.7642C33.5568 77.1148 34.7953 77.029 35.6904 77.8306L35.8652 78.0034C35.9062 78.0481 35.954 78.1203 36.0146 78.2358C36.044 78.2919 36.073 78.3512 36.1055 78.4175C36.1368 78.4816 36.1722 78.5534 36.209 78.6235C36.3356 78.8648 36.5825 79.3026 37.0859 79.397L37.1309 79.4058H46.792L46.8613 79.3853C48.4349 78.9175 49.2988 77.6194 49.2627 76.3403C49.2445 75.7015 48.9998 75.0747 48.5156 74.5894C48.0914 74.1642 47.5051 73.8685 46.7783 73.7495L46.458 73.7095C44.9515 73.5768 43.3636 73.638 41.8105 73.6958C40.3035 73.7519 38.8276 73.8028 37.4248 73.6909C37.122 73.3982 36.8996 73.0386 36.6631 72.6099C36.4071 72.1459 36.1248 71.5796 35.708 71.0669H35.707C33.464 68.3037 30.6398 67.3386 27.6885 67.3276C25.1301 67.3182 22.4677 68.0244 19.9834 68.8735L18.9297 69.2446C18.5584 69.3796 18.0656 69.6378 17.6475 69.8491C17.4294 69.9594 17.2254 70.0606 17.0459 70.1401C16.9525 70.1815 16.8735 70.2133 16.8086 70.2368L16.6553 70.2837H16.6533C16.2118 70.3753 15.6688 70.3623 15.0518 70.3296C14.464 70.2984 13.7991 70.2481 13.2178 70.3062L12.9326 70.3345L12.8125 70.5952C12.0821 72.1834 10.6229 72.5233 9.48438 72.0874C8.90887 71.8671 8.42464 71.4508 8.1543 70.8979C7.88746 70.3522 7.81142 69.6365 8.1123 68.7759L8.11133 68.7749C8.37858 68.0172 9.05797 67.533 9.86719 67.3892C10.6303 67.2535 11.4467 67.4346 12.0303 67.9243L12.1436 68.0269C12.3066 68.1849 12.4037 68.371 12.5244 68.6304C12.6372 68.8727 12.7829 69.2117 13.0508 69.5044L13.209 69.6763L13.4424 69.6665C13.8338 69.6489 14.2745 69.6809 14.7646 69.7056C15.117 69.7233 15.4947 69.7367 15.8564 69.7134L16.2119 69.6763L16.2178 69.6753C16.4428 69.639 16.7115 69.5441 16.9717 69.439C17.2411 69.3301 17.5398 69.1942 17.834 69.0571C18.2897 68.8448 18.7236 68.6366 19.0703 68.4907L19.3857 68.3677ZM33.9688 77.9146L33.7188 77.9517H33.7178C32.8576 78.1302 32.3694 78.8702 32.2793 79.5747C32.194 80.2425 32.4563 81.02 33.2188 81.3481L33.3779 81.4077H33.3789C34.1068 81.6384 34.7445 81.565 35.2129 81.2124C35.6672 80.8702 35.8671 80.3356 35.8818 79.8354C35.8966 79.3359 35.7308 78.8005 35.3604 78.4146C35.0204 78.0603 34.5387 77.8646 33.9688 77.9146ZM11.2832 68.2192C10.903 68.0017 10.4418 67.9326 9.93359 68.0376L9.71289 68.0933C9.20486 68.2446 8.87344 68.6143 8.70898 69.0347C8.5483 69.4456 8.54029 69.9138 8.66113 70.3325C8.7825 70.753 9.04601 71.1619 9.46875 71.4116C9.84798 71.6356 10.3088 71.704 10.8154 71.5913L11.0352 71.5317C12.0874 71.1978 12.3502 70.0897 12.1084 69.2847C11.982 68.8641 11.7096 68.4632 11.2832 68.2192Z"
                      fill="#888888"
                      stroke="white"
                    />
                    <circle
                      cx="18.4668"
                      cy="17.5"
                      r="1.5"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx="43.9668"
                      cy="3"
                      r="2"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx="67.4668"
                      cy="19.5"
                      r="1.5"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M39.0702 63L39.0702 58.7936C39.0702 58.7936 36.5954 57.8893 36.7319 53.8291C36.8388 50.6591 35.7358 46.2674 34.5315 44.3149C32.9726 41.7868 24.8603 35.5823 29.2597 25.4713C33.2582 16.2844 42.9195 17.0138 42.9195 17.0138H42.0135C42.0135 17.0138 51.6748 16.283 55.6733 25.4713C60.0742 35.5823 51.9604 41.7882 50.4016 44.3149C49.1986 46.2674 48.0942 50.6591 48.2011 53.8291C48.339 57.8893 45.8628 58.7936 45.8628 58.7936H42.9196"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M61.9668 33H68.9668"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M59.9668 23L65.9668 20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M53.9668 15L56.9668 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M43.9668 12V6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M33.9668 14L30.9668 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.9668 21L20.9668 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.9668 31H16.9668"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M35.7871 38L38.9522 33.7771C38.9522 33.7771 42.0021 35.1298 43.8226 32.562C43.8226 32.562 47.8133 35.5294 49.5311 31.0905C49.5311 31.0905 52.8766 31.4024 52.9668 27.795C52.9668 27.795 51.9719 24.2768 48.5362 25.5081C48.5362 25.5081 48.1588 21.6591 43.9628 22.8363C43.9628 22.8363 40.67 20.6709 38.1391 23.3089C38.1391 23.3089 34.251 23.4844 34.6132 27.0917C34.6132 27.0917 31.4786 28.1474 33.8597 31.6656C33.8597 31.6656 34.3038 32.4567 35.2265 32.8968L35.7885 37.9987L35.7871 38Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M36.9668 49H48.9668"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M36.9668 53H48.9668"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M2.43262 66.8921C2.87333 66.893 3.31466 66.9003 3.67188 66.9136C4.04648 66.9275 4.27771 66.9461 4.34277 66.9595V66.9604C4.64529 67.0279 4.93108 67.3266 5.16113 67.8726C5.32645 68.265 5.4306 68.7126 5.4873 69.1011L5.52832 69.4663C5.79765 72.8901 5.8148 78.7162 5.5791 82.4399L5.52832 83.1548V83.1558C5.48865 83.6751 5.3831 84.2803 5.16211 84.7856C4.96858 85.228 4.71004 85.5451 4.37305 85.7046L4.22363 85.7632C4.11961 85.7938 3.87211 85.8307 3.50781 85.856C3.15375 85.8805 2.73057 85.8913 2.31152 85.8853C1.89111 85.8792 1.48537 85.8564 1.16211 85.814C0.999965 85.7927 0.868145 85.7681 0.770508 85.7417C0.669661 85.7144 0.643824 85.6948 0.654297 85.7026C0.528441 85.6022 0.485784 85.4425 0.529297 85.2847C0.574947 85.1196 0.676073 85.0649 0.757812 85.0649H4.49121L4.56836 84.6587C4.68597 84.0445 4.82388 83.3794 4.88867 82.7065L4.91211 82.4185V82.4175C5.11293 79.0968 5.15867 74.2246 4.95508 70.7202L4.91113 70.0386C4.88562 69.6624 4.81294 69.2949 4.74512 68.9624C4.675 68.6186 4.61047 68.3129 4.58301 68.0112L4.54785 67.6167L4.15625 67.561L3.93652 67.5366C3.41192 67.4933 2.81055 67.5415 2.28223 67.5776C1.6364 67.6218 1.09539 67.6485 0.708984 67.5669L0.693359 67.563C0.612832 67.5413 0.513281 67.4525 0.500977 67.2456C0.495221 67.1482 0.516115 67.066 0.543945 67.0142C0.556367 66.991 0.56746 66.9763 0.578125 66.9673L0.606445 66.9526L0.609375 66.9517C0.602125 66.9538 0.644582 66.9439 0.773438 66.9331C0.886491 66.9237 1.03489 66.9161 1.20898 66.9097C1.55622 66.8969 1.99195 66.8911 2.43262 66.8921Z"
                      fill="#888888"
                      stroke="white"
                    />
                  </svg>
                  <h4 className="text-white uppercase text-[12px] 2xl:text-[20px] font-semibold">
                    {real_estate_services_11}
                  </h4>
                </div>
                <div className="flex flex-col items-center bg-[#20446F]/80 sm:w-[300px] 2xl:h-[234px] rounded-[10px] gap-[20px] justify-center p-4 text-center h-[135px] sm:h-[auto] hover:bg-[#20446F] transition-all duration-300">
                  {/* <div
                    dangerouslySetInnerHTML={{__html: real_estate_services_19}}
                  /> */}
                  <svg
                    className="w-[80px] w-[81px] sm:w-[auto] sm:h-[auto]"
                    width="100"
                    height="105"
                    viewBox="0 0 105 105"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44.6035 56.1301L50.4985 58.5647L56.8832 53.296L61.5474 57.293L66.4593 51.0552"
                      stroke="white"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M69.8534 47.6338L64.4121 49.1606L68.3957 53.3258L69.8534 47.6338Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M42.9727 58.999C44.6295 58.999 45.9727 57.6559 45.9727 55.999C45.9727 54.3422 44.6295 52.999 42.9727 52.999C41.3158 52.999 39.9727 54.3422 39.9727 55.999C39.9727 57.6559 41.3158 58.999 42.9727 58.999Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M54.8419 28.2156C54.8419 28.2156 54.7231 28.2189 54.5464 28.2248C54.3679 28.2336 54.1321 28.2249 53.897 28.2658C53.4269 28.3252 52.9568 28.3847 52.9568 28.3847L52.0165 28.5036C51.7797 28.525 51.5486 28.585 51.3762 28.6223C51.2014 28.6601 51.0873 28.6848 51.0873 28.6848C51.0873 28.6848 50.6245 28.7899 50.1612 28.8927C49.9306 28.9426 49.6985 28.9978 49.5261 29.0352C49.3552 29.0796 49.2423 29.1215 49.2423 29.1215L47.4404 29.7105C47.4404 29.7105 47.3249 29.7405 47.1621 29.8106C46.9994 29.8806 46.7809 29.9752 46.5648 30.0692C46.1303 30.2578 45.6958 30.4464 45.6958 30.4464C45.6958 30.4464 45.5868 30.4949 45.424 30.565C45.2607 30.6327 45.0423 30.7272 44.8372 30.8488C44.4217 31.078 44.0086 31.3068 44.0086 31.3068C44.0086 31.3068 43.593 31.5361 43.1799 31.7649C42.7747 32.0068 42.3904 32.2866 42.3904 32.2866C42.3904 32.2866 40.8149 33.3343 40.8471 33.3771L39.3922 34.5828C39.3922 34.5828 39.3015 34.6572 39.1794 34.7856C39.0537 34.9099 38.8892 35.0774 38.7222 35.2454C38.3901 35.5785 38.0556 35.9122 38.0556 35.9122L37.8468 36.1216C37.7152 36.2422 37.5689 36.4231 37.4206 36.607C37.1229 36.9701 36.8228 37.3336 36.8228 37.3336C36.8228 37.3336 36.5252 37.6966 36.2251 38.0602C35.9609 38.4483 35.6996 38.8383 35.6996 38.8383C35.6996 38.8383 34.6426 40.3909 34.6922 40.42L33.8092 42.0717C33.8092 42.0717 33.7529 42.176 33.6915 42.3386C33.6248 42.4998 33.5372 42.7178 33.4467 42.934C33.2682 43.3658 33.0926 43.7994 33.0926 43.7994C33.0926 43.7994 33.0476 43.9087 32.9809 44.07C32.9087 44.2299 32.8266 44.4493 32.7688 44.6758C32.6367 45.1224 32.5051 45.5714 32.5051 45.5714C32.5051 45.5714 32.373 46.018 32.2414 46.467C32.1646 46.6877 32.1308 46.919 32.0968 47.0906C32.0651 47.2616 32.0441 47.3757 32.0441 47.3757C32.0441 47.3757 31.9579 47.8348 31.8736 48.291C31.8314 48.5191 31.7874 48.7501 31.7558 48.9211C31.7193 49.0933 31.7114 49.2094 31.7114 49.2094L31.5587 51.064C31.5027 51.0636 31.5515 52.9218 31.5515 52.9218C31.5515 52.9218 31.5608 53.3876 31.5696 53.851C31.6261 54.3116 31.6826 54.7721 31.6826 54.7721C31.6826 54.7721 31.8987 56.6165 31.9527 56.6073L32.3627 58.4196L32.9474 60.1817C32.898 60.1999 33.664 61.8954 33.664 61.8954C33.664 61.8954 33.855 62.3194 34.0483 62.7429C34.2784 63.1484 34.508 63.5516 34.508 63.5516C34.508 63.5516 34.7382 63.9571 34.9678 64.3603C35.0782 64.5653 35.1998 64.763 35.3061 64.9017C35.4056 65.0444 35.4744 65.139 35.4744 65.139C35.4744 65.139 35.7422 65.519 36.0105 65.9014C36.1432 66.0916 36.2783 66.2813 36.3783 66.4264C36.4735 66.5725 36.5553 66.6568 36.5553 66.6568L37.7719 68.0732C37.7719 68.0732 37.8469 68.1614 37.9619 68.2933C38.0875 68.4154 38.2573 68.5777 38.4242 68.7382L39.0983 69.3861C39.0983 69.3861 39.182 69.4675 39.31 69.5891C39.4394 69.7054 39.5948 69.8833 39.7872 70.0208C40.1548 70.3095 40.5228 70.6006 40.5228 70.6006L41.2584 71.1805C41.4364 71.3335 41.6379 71.4542 41.7855 71.5491C41.9332 71.6441 42.0332 71.707 42.0332 71.707C42.0332 71.707 42.4286 71.9598 42.8239 72.2127C43.0216 72.3391 43.2193 72.4655 43.3669 72.5605C43.5146 72.6554 43.6237 72.7015 43.6237 72.7015L45.3001 73.553C45.3001 73.553 45.4054 73.6048 45.5626 73.6853C45.7264 73.7493 45.9461 73.8362 46.1651 73.9206C46.6039 74.0919 47.0445 74.2603 47.0445 74.2603C47.0445 74.2603 47.4799 74.4398 47.9271 74.5918C48.3814 74.7175 48.838 74.8426 48.838 74.8426C48.838 74.8426 50.6565 75.3523 50.6663 75.3153C50.6663 75.3153 51.1281 75.4169 51.5958 75.4874C52.0612 75.5708 52.5326 75.623 52.5326 75.623C52.5326 75.623 53.0018 75.6882 53.4744 75.7228C53.9453 75.7726 54.4187 75.7871 54.4187 75.7871C54.4187 75.7871 54.8922 75.814 55.365 75.8137C55.8384 75.8282 56.3138 75.805 56.3138 75.805C56.3138 75.805 56.8297 75.7928 57.6027 75.735C58.3746 75.6725 59.4013 75.5423 60.4151 75.3403C61.4298 75.1431 62.4281 74.8698 63.1634 74.626C63.5331 74.5137 63.836 74.3983 64.0484 74.3225C64.2607 74.2467 64.3834 74.2027 64.3834 74.2027"
                      stroke="white"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M58.9135 30.6983C60.3564 30.386 61.2729 28.9631 60.9606 27.5202C60.6483 26.0773 59.2254 25.1608 57.7825 25.4731C56.3396 25.7854 55.4231 27.2083 55.7354 28.6512C56.0477 30.0941 57.4706 31.0106 58.9135 30.6983Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M79.6754 65.9353C80.3908 64.502 79.8087 62.7601 78.3754 62.0447C76.9421 61.3293 75.2002 61.9113 74.4848 63.3446C73.7694 64.778 74.3514 66.5199 75.7847 67.2353C77.2181 67.9507 78.96 67.3686 79.6754 65.9353Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M68.9707 30.9995C75.5721 35.2898 79.9707 42.9696 79.9707 51.7297C79.9707 55.0117 79.3533 58.1422 78.2339 60.9995"
                      stroke="white"
                      strokeWidth="3"
                    />
                    <path
                      d="M60.3709 13.633L62.6583 20.5867L62.8307 21.111L63.3663 21.2448C66.7985 22.1015 70.011 23.5078 72.9074 25.3627L73.3714 25.6599L73.8713 25.4258L80.5013 22.3122L86.474 28.4594L83.1729 34.9971L82.9238 35.4896L83.208 35.9626C84.9791 38.9108 86.292 42.1625 87.0494 45.6185L87.1681 46.1574L87.6872 46.3448L94.5718 48.8294L94.448 57.3982L87.4952 59.6854L86.971 59.8578L86.8371 60.3933C85.9806 63.8265 84.5743 67.039 82.7195 69.9354L82.4224 70.4004L82.6563 70.8993L85.769 77.5296L79.6218 83.5022L73.0851 80.2009L72.5925 79.9518L72.1195 80.236C69.1713 82.0071 65.9198 83.321 62.4638 84.0784L61.9247 84.1961L61.7373 84.7153L59.2517 91.6L50.6819 91.4755L48.3958 84.5234L48.2234 83.9992L47.6878 83.8653L47.0472 83.6982C43.8556 82.8311 40.8621 81.4865 38.1467 79.7475L37.6827 79.4502L37.1829 79.6843L30.5516 82.7972L24.579 76.65L27.8813 70.1131L28.1304 69.6205L27.8461 69.1475C26.0751 66.1995 24.7623 62.9485 24.0049 59.4926L23.886 58.9528L23.3669 58.7654L16.4822 56.2798L16.605 47.7112L23.558 45.425L24.0822 45.2526L24.2161 44.717C25.0725 41.2839 26.4788 38.0713 28.3337 35.175L28.631 34.711L28.3969 34.2111L25.2831 27.5801L31.4302 21.6074L37.9681 24.9095L38.4606 25.1586L38.9337 24.8743C41.8828 23.103 45.1345 21.7901 48.5905 21.0327L49.1294 20.9141L49.3168 20.3949L51.8012 13.5094L60.3709 13.633ZM94.8234 48.9209L94.8257 48.9224C94.8234 48.9215 94.8212 48.9197 94.8189 48.9188L94.8234 48.9209Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                  <h4 className="text-white uppercase text-[12px] 2xl:text-[20px] font-semibold">
                    {real_estate_services_12}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-16 sliderreal">
        <div className="hidden sm:block">
          <SliderComponent slides={sliders}/>
        </div>

        <div className="sm:hidden">
          <EmblaCarouselCenter slides={sliders} />
        </div>
        
      </div>
    </>
  );
}

import {locales} from '@/config';
import 'react';
import messages from './messages/en.json';
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
  }
}
// src/types/custom.d.ts
// Mở rộng định nghĩa kiểu CSSProperties của React
declare module 'react' {
  interface CSSProperties {
    /**
     * Cho phép các thuộc tính CSS tùy chỉnh (CSS Custom Properties).
     * Ví dụ: '--my-custom-color': 'red', '--tw-translate-y': '50px'
     * @param {string} propertyName - Tên của thuộc tính tùy chỉnh (bắt đầu bằng --)
     * @param {string | number} value - Giá trị của thuộc tính
     */
    [key: `--${string}`]: string | number | undefined;
  }
}
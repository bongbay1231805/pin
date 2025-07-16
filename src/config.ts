import {Locale} from 'next-intl';
export const LANGUAGE = {
  vi: 'vi',
  en: 'en',
};
export type TLANGUAGE = keyof typeof LANGUAGE;
export const locales = ['vi', 'en'] as const;
export const defaultLocale: Locale = 'vi';
import {Montserrat} from 'next/font/google';
import {ReactNode} from 'react';
import './globals.css';
const inter = Montserrat({
  subsets: ['latin'],
  display: 'swap'
});
type Props = {
  children: ReactNode;
  locale: string;
};
export default function Document({children, locale}: Props) {
  return (
    <html className={`overflow-x-hidden ${inter.className}`} lang={locale}>
      <body>{children}</body>
    </html>
  );
}

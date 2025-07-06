// import {useTranslations} from 'next-intl';
// import Login from './Login';
// import NavLink from './NavLink';
import { Suspense } from 'react';

import Navbar from '../app/Navbar';
export default function PublicNavigation() {
  // const t = useTranslations('PublicNavigation');
  return (
    <Suspense fallback={<div>Đang tải thanh điều hướng phụ...</div>}>
      <Navbar />
    </Suspense>
  );
}

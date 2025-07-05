// Tạo file mới: app/posts/[slug]/CategorySetter.tsx
// Đây là một Client Component nhỏ để cập nhật Context
'use client';
import { useEffect } from 'react';
import { useNewsCategory } from '@/context/NewsCategoryContext';

interface CategorySetterProps {
  categorySlug: string | null;
}

function CategorySetter({ categorySlug }: CategorySetterProps) {
  const { setCurrentCategorySlug } = useNewsCategory();

  useEffect(() => {
    setCurrentCategorySlug(categorySlug);
    // Cleanup function để reset slug khi component unmount
    return () => {
      setCurrentCategorySlug(null);
    };
  }, [categorySlug, setCurrentCategorySlug]);

  return null; // Component này không render gì cả
}

export default CategorySetter;
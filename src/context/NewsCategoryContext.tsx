// context/NewsCategoryContext.tsx
'use client'; // Đảm bảo đây là client component

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu cho Context
interface NewsCategoryContextType {
  currentCategorySlug: string | null;
  setCurrentCategorySlug: (slug: string | null) => void;
}

// Tạo Context với giá trị mặc định
const NewsCategoryContext = createContext<NewsCategoryContextType | undefined>(undefined);

// Provider Component
export function NewsCategoryProvider({ children }: { children: ReactNode }) {
  const [currentCategorySlug, setCurrentCategorySlug] = useState<string | null>(null);

  return (
    <NewsCategoryContext.Provider value={{ currentCategorySlug, setCurrentCategorySlug }}>
      {children}
    </NewsCategoryContext.Provider>
  );
}

// Custom Hook để dễ dàng sử dụng Context
export function useNewsCategory() {
  const context = useContext(NewsCategoryContext);
  if (context === undefined) {
    throw new Error('useNewsCategory must be used within a NewsCategoryProvider');
  }
  return context;
}
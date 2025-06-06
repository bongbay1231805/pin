// PathnameProvider.tsx
'use client';
import { usePathname } from 'next/navigation';
import { createContext, useContext } from 'react';
const PathnameContext = createContext<string | null>(null);
export function PathnameProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <PathnameContext.Provider value={pathname}>
      {children}
    </PathnameContext.Provider>
  );
}
export function usePathnameContext() {
  return useContext(PathnameContext);
}

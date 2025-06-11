// src/context/ScrollRefsContext.tsx
'use client'
import { createContext, useContext, useRef } from 'react'
type ScrollRefs = {
  oneRef: React.RefObject<HTMLDivElement | null>
  twoRef: React.RefObject<HTMLDivElement | null>
  threeRef: React.RefObject<HTMLDivElement | null>
  fourRef: React.RefObject<HTMLDivElement | null>
  fiveRef: React.RefObject<HTMLDivElement | null>
  sixRef: React.RefObject<HTMLDivElement | null>
  seventRef: React.RefObject<HTMLDivElement | null>
}
const ScrollRefsContext = createContext<ScrollRefs | null>(null)
export const useScrollRefs = () => {
  const context = useContext(ScrollRefsContext)
  if (!context) throw new Error('useScrollRefs must be used inside ScrollRefsProvider')
  return context
}
export const ScrollRefsProvider = ({ children }: { children: React.ReactNode }) => {
  const oneRef = useRef<HTMLDivElement>(null)
  const twoRef = useRef<HTMLDivElement>(null)
  const threeRef = useRef<HTMLDivElement>(null)
  const fourRef = useRef<HTMLDivElement>(null)
  const fiveRef = useRef<HTMLDivElement>(null)
  const sixRef = useRef<HTMLDivElement>(null)
  const seventRef = useRef<HTMLDivElement>(null)
  return (
    <ScrollRefsContext.Provider value={{ oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef, seventRef }}>
      {children}
    </ScrollRefsContext.Provider>
  )
}

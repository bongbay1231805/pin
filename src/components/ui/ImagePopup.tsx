// components/ImagePopup.tsx
'use client'; // If this component is a Client Component

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ImagePopupProps {
  src: string;
  onClose: () => void;
}

export default function ImagePopup({ src, onClose }: ImagePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup on escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Close popup when clicking outside the image content
  const handleClickOutside = (event: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!src) return null; // Don't render if no image src is provided

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleClickOutside} // Click anywhere on the overlay to close
    >
      <div
        className="relative max-w-3xl max-h-full mx-auto p-4 bg-white rounded-lg shadow-xl flex flex-col"
        ref={popupRef} // Assign ref to the inner content div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside content from closing
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-3xl font-bold leading-none z-10"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="relative w-full h-full" style={{ maxHeight: 'calc(100vh - 80px)' }}> {/* Adjust max-height based on padding/button */}
            <Image
                src={src}
                alt="Full size image"
                width="200"
                height="200"
            />
            </div>
      </div>
    </div>
  );
}
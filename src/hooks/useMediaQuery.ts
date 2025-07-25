// hooks/useMediaQuery.ts
import {useState, useEffect} from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Chỉ chạy ở phía client
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

/*
 * useMediaQuery Hook
 *
 * @Author: VenDream
 * @Date: 2025-06-06 17:35:46
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { useEffect, useState } from 'react';

/**
 * check if the current window matches the media query
 *
 * @export
 * @param {string} query media query
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

/**
 * check if the current window is mobile
 *
 * @export
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 1023px)');
}

/**
 * check if the current window is desktop
 *
 * @export
 */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}

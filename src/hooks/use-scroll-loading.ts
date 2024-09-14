/*
 * useScrollLoading
 *
 * @Author: VenDream
 * @Date: 2024-09-13 17:59:18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { getScrollableAncestor } from '@/utils/common';
import { RefObject, useEffect, useState } from 'react';

export default function useScrollLoading(
  ref: RefObject<HTMLElement>,
  threshold = 0,
  options?: IntersectionObserverInit
) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const scrollableAncestor = getScrollableAncestor(element);

    const observer = new IntersectionObserver(
      ([entry]) => setShouldLoad(entry.intersectionRatio > 0),
      {
        root: scrollableAncestor,
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: [0],
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options, ref, threshold]);

  return shouldLoad;
}

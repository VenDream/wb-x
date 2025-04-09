/*
 * useDetectSticky
 *
 * @Author: VenDream
 * @Date: 2024-09-03 13:55:56
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { getScrollableAncestor } from '@/utils/common';
import { type RefObject, useEffect, useState } from 'react';

export default function useDetectSticky(
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const scrollableAncestor = getScrollableAncestor(element);

    const observer = new IntersectionObserver(
      ([entry]) =>
        setIsSticky(entry.intersectionRatio > 0 && entry.intersectionRatio < 1),
      {
        root: scrollableAncestor,
        rootMargin: '-1px 0px 0px 0px',
        threshold: [1],
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options, ref]);

  return isSticky;
}

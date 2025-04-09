/*
 * useScrollLoading
 *
 * @Author: VenDream
 * @Date: 2024-09-13 17:59:18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { getScrollableAncestor } from '@/utils/common';
import { type RefObject, useEffect } from 'react';

export interface ScrollLoadingOptions {
  callback?: (intersectionRatio: number) => void;
  threshold?: number;
  observerOptions?: IntersectionObserverInit;
}

export default function useScrollLoading(
  ref: RefObject<HTMLElement | null>,
  options?: ScrollLoadingOptions
) {
  const { callback, threshold = 0, observerOptions = {} } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const scrollableAncestor = getScrollableAncestor(element);

    const observer = new IntersectionObserver(
      ([entry]) =>
        entry.intersectionRatio > 0 && callback?.(entry.intersectionRatio),
      {
        root: scrollableAncestor,
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: [0],
        ...observerOptions,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, observerOptions, ref, threshold]);
}

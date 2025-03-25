/*
 * Loading Indicator
 *
 * @Author: VenDream
 * @Date: 2023-12-15 16:40:22
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Loading from '@/components/common/loading';
import { NoData, NoMoreData } from '@/components/common/no-data';
import { Button } from '@/components/daisyui';
import useScrollLoading from '@/hooks/use-scroll-loading';
import { cn } from '@/utils/classnames';
import { useThrottleFn } from 'ahooks';
import { useTranslations } from 'next-intl';
import { useCallback, useRef } from 'react';

interface LoadingIndicatorProps {
  isLoading: boolean;
  isLoadAll: boolean;
  isNoData: boolean;
  loadMore: () => void;

  className?: string;
  size?: DaisyUI.Size;

  scrollLoading?: {
    enabled?: boolean;
    threshold?: number;
    options?: IntersectionObserverInit;
  };
}

const THROTTLE_INTERVAL = 1000 / 60;

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const t = useTranslations('global.dataFetching');
  const {
    isLoading,
    isLoadAll,
    isNoData,
    loadMore,
    className,
    size = 'sm',
  } = props;
  const { enabled, threshold, options } = props.scrollLoading || {};

  const triggerRef = useRef<HTMLDivElement>(null);

  const onIntersect = useCallback(
    (ratio: number) => {
      const isIntersected = ratio > 0 && ratio < 1;
      const isEnabled = enabled && !isLoadAll && !isLoading;
      isEnabled && isIntersected && loadMore();
    },
    [enabled, isLoadAll, isLoading, loadMore]
  );

  const { run: callback } = useThrottleFn(onIntersect, {
    wait: THROTTLE_INTERVAL,
  });

  useScrollLoading(triggerRef, {
    callback,
    threshold,
    observerOptions: options,
  });

  const textClass = cn({
    'text-xs': size === 'xs',
    'text-sm': size === 'sm',
    'text-base': size === 'md',
    'text-lg': size === 'lg',
    'text-xl': size === 'xl',
  });

  const rootClass = cn(
    'flex items-center justify-center',
    {
      'h-[2rem]': size === 'xs',
      'h-[2.5rem]': size === 'sm',
      'h-[3rem]': size === 'md',
      'h-[3.5rem]': size === 'lg',
      'h-[4rem]': size === 'xl',
    },
    className
  );

  const iconSize = ['lg', 'xl'].includes(size || '') ? 24 : 16;

  return (
    <div ref={triggerRef} className={rootClass}>
      {isLoading ? (
        <Loading align="center" textClass={textClass} size={iconSize} />
      ) : isLoadAll ? (
        <NoMoreData className={textClass} />
      ) : isNoData ? (
        <NoData className={textClass} />
      ) : !enabled ? (
        <Button size={size} onClick={loadMore}>
          {t('loadMore')}
        </Button>
      ) : null}
    </div>
  );
}

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

  scrollLoading?: {
    enabled?: boolean;
    threshold?: number;
    options?: IntersectionObserverInit;
  };
}

const THROTTLE_INTERVAL = 300;

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const t = useTranslations('global.dataFetching');
  const { isLoading, isLoadAll, isNoData, loadMore, className } = props;
  const { enabled, threshold, options } = props.scrollLoading || {};

  const triggerRef = useRef<HTMLDivElement>(null);

  const onIntersect = useCallback(
    (_ratio: number) => {
      if (!!enabled && !isLoadAll && !isLoading) {
        loadMore();
      }
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

  return (
    <div
      ref={triggerRef}
      className={cn(className, 'flex h-[4rem] items-center justify-center')}
    >
      {isLoading ? (
        <Loading align="center" />
      ) : isLoadAll ? (
        <NoMoreData />
      ) : isNoData ? (
        <NoData />
      ) : !enabled ? (
        <Button size="sm" onClick={loadMore}>
          {t('loadMore')}
        </Button>
      ) : null}
    </div>
  );
}

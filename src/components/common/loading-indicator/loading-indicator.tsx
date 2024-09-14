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
import { usePrevious } from 'ahooks';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

interface LoadingIndicatorProps {
  isLoading: boolean;
  isLoadAll: boolean;
  isNoData: boolean;
  loadMore: () => void;
  className?: string;
  scrollLoading?: {
    enable?: boolean;
    threshold?: number;
    options?: IntersectionObserverInit;
  };
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const t = useTranslations('global.dataFetching');
  const { isLoading, isLoadAll, isNoData, loadMore, className } = props;
  const { enable, threshold, options } = props.scrollLoading || {};

  const triggerRef = useRef<HTMLDivElement>(null);
  const shouldLoad = useScrollLoading(triggerRef, threshold, options);
  const prevShouldLoad = usePrevious(shouldLoad);

  useEffect(() => {
    if (!enable || isLoadAll) return;

    if (prevShouldLoad === false && shouldLoad === true) {
      loadMore();
    }
  }, [enable, isLoadAll, loadMore, prevShouldLoad, shouldLoad]);

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
      ) : !enable ? (
        <Button size="sm" onClick={loadMore}>
          {t('loadMore')}
        </Button>
      ) : null}
    </div>
  );
}

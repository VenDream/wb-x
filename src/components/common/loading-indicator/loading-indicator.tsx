/*
 * Loading Indicator
 *
 * @Author: VenDream
 * @Date: 2023-12-15 16:40:22
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import NoData from '@/components/common/no-data';
import { Button, Loading } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { useTranslations } from 'next-intl';

interface LoadingIndicatorProps {
  isLoading: boolean;
  isLoadAll: boolean;
  isNoData: boolean;
  loadMore: () => void;
  className?: string;
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const t = useTranslations('global.dataFetching');
  const { isLoading, isLoadAll, isNoData, loadMore, className } = props;

  return (
    <div
      className={cn(
        className,
        'loading-indicator flex h-[6rem] items-center justify-center'
      )}
    >
      {isLoading ? (
        <Loading size="sm" color="primary" />
      ) : isLoadAll ? (
        <p className="text-sm">{t('noMore')}</p>
      ) : isNoData ? (
        <NoData />
      ) : (
        <Button size="sm" onClick={loadMore}>
          {t('loadMore')}
        </Button>
      )}
    </div>
  );
}

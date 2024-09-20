/*
 * No Data
 *
 * @Author: VenDream
 * @Date: 2023-11-20 17:34:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import { BracketsIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IProps {
  tips?: string;
  className?: string;
}

export function NoData(props: IProps) {
  const { tips, className } = props;
  const t = useTranslations('global.dataFetching');

  return (
    <p
      className={cn(
        'flex items-center justify-center text-sm text-base-content/50',
        className
      )}
    >
      <BracketsIcon size={16} className="mr-2 !stroke-2" />
      {tips || t('noData')}
    </p>
  );
}

export function NoMoreData(props: IProps) {
  const { tips, className } = props;
  const t = useTranslations('global.dataFetching');

  return (
    <p
      className={cn(
        'flex items-center justify-center text-sm text-base-content/50',
        className
      )}
    >
      - {tips || t('noMore')} -
    </p>
  );
}

/*
 * No Data
 *
 * @Author: VenDream
 * @Date: 2023-11-20 17:34:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Tooltip from '@/components/common/tooltip';
import { cn } from '@/utils/classnames';
import { BracketsIcon, CircleHelpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export interface IProps {
  tips?: ReactNode;
  icon?: ReactNode;
  tooltips?: ReactNode;
  className?: string;
  tooltipsClassName?: string;
}

export function NoData(props: IProps) {
  const { tips, icon, tooltips, className, tooltipsClassName } = props;
  const t = useTranslations('global.dataFetching');

  return (
    <p
      className={cn(
        'text-base-content/50 flex items-center justify-center gap-2 text-sm',
        className
      )}
    >
      <BracketsIcon size={16} />
      {tips || t('noData')}
      {tooltips && (
        <Tooltip message={tooltips} className={tooltipsClassName}>
          {icon || <CircleHelpIcon size={16} />}
        </Tooltip>
      )}
    </p>
  );
}

export function NoMoreData(props: IProps) {
  const { tips, className } = props;
  const t = useTranslations('global.dataFetching');

  return (
    <p
      className={cn(
        'text-base-content/50 flex items-center justify-center text-sm',
        className
      )}
    >
      - {tips || t('noMore')} -
    </p>
  );
}

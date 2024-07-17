/*
 * Common Loading UI
 *
 * @Author: VenDream
 * @Date: 2023-09-28 14:33:27
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import { LoaderCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IProps extends React.PropsWithChildren {
  size?: number;
  align?: 'center' | 'start' | 'end';
}

const defaultProps: IProps = {
  size: 18,
  align: 'start',
};

export default function LoadingUI(props: IProps) {
  const t = useTranslations('global.action');
  const { size, align, children } = { ...defaultProps, ...props };

  const className = cn('flex items-center gap-2', {
    'justify-end': align === 'end',
    'justify-start': align === 'start',
    'justify-center': align === 'center',
  });

  return (
    <div className={className}>
      <LoaderCircleIcon size={size} className="animate-spin text-primary" />
      {children || <p className="text-sm text-primary">{t('loading')}</p>}
    </div>
  );
}

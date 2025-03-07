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
  text?: string;
  size?: number;
  align?: 'center' | 'start' | 'end';
  className?: string;
  textClass?: string;
  loaderClass?: string;
}

const defaultProps: IProps = {
  size: 18,
  align: 'start',
};

export default function LoadingUI(props: IProps) {
  const t = useTranslations('global.action');
  const { text, size, align, className, textClass, loaderClass, children } = {
    ...defaultProps,
    ...props,
  };

  return (
    <div
      className={cn('flex items-center gap-2', className, {
        'justify-end': align === 'end',
        'justify-start': align === 'start',
        'justify-center': align === 'center',
      })}
    >
      <LoaderCircleIcon
        size={size}
        className={cn('text-primary animate-spin', loaderClass)}
      />
      {children || (
        <p className={cn('text-primary text-sm', textClass)}>
          {text || t('loading')}
        </p>
      )}
    </div>
  );
}

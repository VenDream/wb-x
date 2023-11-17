'use client';

/*
 * Router refresh
 *
 * @Author: VenDream
 * @Date: 2023-08-22 11:28:55
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import useToast from '@/components/common/toast';
import { useRouter } from '@/navigation';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

type RouterRefreshProps = ChildrenProps<{
  /** custome classname */
  className?: string;
  /** auto refresh switch */
  auto?: boolean;
  /** auto refresh interval */
  interval?: number;
}>;

export default function RouterRefresh(props: RouterRefreshProps) {
  const t = useTranslations('global');
  const router = useRouter();
  const { showSuccessTips } = useToast();
  const { className, auto, interval = 3000, children } = props;

  const onBtnClick = () => {
    router.refresh();
    showSuccessTips(t('misc.routerRefreshSuccess'));
  };

  useEffect(() => {
    if (!auto) return;

    let timer: NodeJS.Timeout;
    const refresh = () => {
      timer = setTimeout(() => {
        router.refresh();
        refresh();
      }, interval);
    };

    refresh();

    return () => {
      clearTimeout(timer);
    };
  }, [auto, interval, router]);

  return (
    <div
      className={clsx('router-refresh inline-block', className)}
      onClick={onBtnClick}
    >
      {children}
    </div>
  );
}

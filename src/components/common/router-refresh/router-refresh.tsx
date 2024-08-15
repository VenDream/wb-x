'use client';

/*
 * Router refresh
 *
 * @Author: VenDream
 * @Date: 2023-08-22 11:28:55
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useRouter } from '@/navigation';
import { cn } from '@/utils/classnames';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { toast } from 'sonner';

type RouterRefreshProps = ChildrenProps<{
  /** custome classname */
  className?: string;
  /** auto refresh switch */
  auto?: boolean;
  /** auto refresh interval */
  interval?: number;
  /** server action */
  action?: () => Promise<void>;
}>;

export default function RouterRefresh(props: RouterRefreshProps) {
  const t = useTranslations('global');
  const router = useRouter();
  const { className, auto, interval = 3000, action, children } = props;

  const onBtnClick = async () => {
    await action?.();
    router.refresh();
    toast.success(t('misc.routerRefreshSuccess'));
  };

  useEffect(() => {
    if (!auto) return;

    let timer: NodeJS.Timeout;
    const refresh = () => {
      timer = setTimeout(async () => {
        await action?.();
        router.refresh();
        refresh();
      }, interval);
    };

    refresh();

    return () => {
      clearTimeout(timer);
    };
  }, [action, auto, interval, router]);

  return (
    <div
      className={cn('router-refresh inline-block', className)}
      onClick={onBtnClick}
    >
      {children}
    </div>
  );
}

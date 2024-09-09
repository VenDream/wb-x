'use client';

/*
 * Leftsider
 *
 * @Author: VenDream
 * @Date: 2023-08-17 10:18:19
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Menu, MenuItem } from '@/components/daisyui';
import { MAIN_ROUTES } from '@/contants';
import useUser from '@/hooks/use-user';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/utils/classnames';
import { produce } from 'immer';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import ICONS from './icons';

export default function Leftsider() {
  const pathname = usePathname();
  const t = useTranslations('global.pages');
  const { isAdmin } = useUser();

  const menus = useMemo(() => {
    return isAdmin
      ? MAIN_ROUTES
      : produce(MAIN_ROUTES, draft => {
          draft.ROTN = '';
          draft.USER = '';
        });
  }, [isAdmin]);

  const isActive = useCallback(
    (routePath: string) => {
      return routePath === '/'
        ? pathname === routePath
        : pathname.includes(routePath);
    },
    [pathname]
  );

  return (
    <Menu className="h-full w-60 gap-2 border-r border-base-content/10 bg-base-100 p-4">
      {Object.entries(menus).map(
        ([k, p]) =>
          k &&
          p && (
            <MenuItem key={k}>
              <Link
                href={p}
                className={cn('text-base', { active: isActive(p) })}
              >
                {ICONS[k as keyof typeof MAIN_ROUTES]} {t(k.toLowerCase())}
              </Link>
            </MenuItem>
          )
      )}
    </Menu>
  );
}

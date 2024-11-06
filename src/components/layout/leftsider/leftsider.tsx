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
import {
  ADMIN_ROUTES,
  PRIMARY_ROUTE_KEYS,
  PRIMARY_ROUTES,
  PrimaryRouteKey,
} from '@/contants';
import useUser from '@/hooks/use-user';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { produce } from 'immer';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import ICONS from './icons';

export default function Leftsider() {
  const t = useTranslations('global.pages');
  const { isAdmin } = useUser();
  const pathname = usePathname();

  const routes = useMemo(() => {
    return isAdmin
      ? PRIMARY_ROUTES
      : produce(PRIMARY_ROUTES, draft => {
          Object.keys(ADMIN_ROUTES).forEach(key => {
            delete draft[key as PrimaryRouteKey];
          });
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
    <Menu
      className={cn(
        'h-full w-60 gap-2 border-r border-base-content/10 bg-base-100 p-4',
        '!transition-none !duration-0'
      )}
    >
      {PRIMARY_ROUTE_KEYS.map(k => {
        const p = routes[k];
        if (!p) return null;
        return (
          <MenuItem key={k}>
            <Link href={p} className={cn('text-base', { active: isActive(p) })}>
              {ICONS[k as keyof typeof PRIMARY_ROUTES]} {t(k.toLowerCase())}
            </Link>
          </MenuItem>
        );
      })}
    </Menu>
  );
}

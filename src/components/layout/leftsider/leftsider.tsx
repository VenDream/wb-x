'use client';

/*
 * Leftsider
 *
 * @Author: VenDream
 * @Date: 2023-08-17 10:18:19
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Menu } from '@/components/daisyui';
import {
  ADMIN_ROUTES,
  PRIMARY_ROUTES,
  PRIMARY_ROUTE_KEYS,
  type PrimaryRouteKey,
} from '@/constants';
import { useIsMobile } from '@/hooks/use-media-query';
import useUser from '@/hooks/use-user';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { produce } from 'immer';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import ICONS from './icons';

interface IProps {
  className?: string;
}

export default function Leftsider(props: IProps) {
  const t = useTranslations('global.pages');

  const { isAdmin } = useUser();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const routes = useMemo(() => {
    return isAdmin
      ? PRIMARY_ROUTES
      : produce(PRIMARY_ROUTES, draft => {
          Object.keys(ADMIN_ROUTES).forEach(key => {
            delete draft[key as PrimaryRouteKey];
          });
        });
  }, [isAdmin]);

  const isActiveRoute = useCallback(
    (routePath: string) => {
      return routePath === '/'
        ? pathname === routePath
        : pathname.includes(routePath);
    },
    [pathname]
  );

  const closeDrawer = () => {
    if (!isMobile) return;
    const overlay = document.querySelector('.drawer-overlay') as HTMLElement;
    overlay?.click();
  };

  return (
    <Menu
      size="lg"
      className={cn(
        'border-base-content/10 bg-base-100 h-full w-60 gap-2 border-r p-4',
        'hidden lg:block',
        props.className
      )}
    >
      {PRIMARY_ROUTE_KEYS.map(k => {
        const p = routes[k];
        if (!p) return null;
        const isActive = isActiveRoute(p);

        return (
          <Menu.Item key={k} onClick={closeDrawer} className="mb-1">
            <Link
              href={p}
              className={cn('text-base', {
                'menu-active': isActive,
                'pointer-events-none': isActive,
              })}
            >
              {ICONS[k as keyof typeof PRIMARY_ROUTES]} {t(k.toLowerCase())}
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

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
import { Link, usePathname } from '@/navigation';
import { cn } from '@/utils/classnames';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import ICONS from './icons';

export default function Leftsider() {
  const pathname = usePathname();
  const t = useTranslations('global.pages');

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
      {Object.entries(MAIN_ROUTES).map(([k, p]) => (
        <MenuItem key={k}>
          <Link href={p} className={cn('text-base', { active: isActive(p) })}>
            {ICONS[k as keyof typeof MAIN_ROUTES]} {t(k.toLowerCase())}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
}

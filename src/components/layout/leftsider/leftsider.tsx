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
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next-intl/link';
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
    <Menu className="text-base-conten h-full w-60 gap-2 bg-base-200 p-4">
      {Object.entries(MAIN_ROUTES).map(([k, p]) => (
        <MenuItem key={k}>
          <Link href={p} className={clsx({ active: isActive(p) })}>
            {ICONS[k as keyof typeof MAIN_ROUTES]} {t(k.toLowerCase())}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
}

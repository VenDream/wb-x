'use client';

/*
 * Leftsider
 *
 * @Author: VenDream
 * @Date: 2023-08-17 10:18:19
 *
 * Copyright © 2014-2023 VenDream. All Rights Reserved.
 */

import { Menu, MenuItem } from '@/components/daisyui';
import { ROUTES } from '@/contants';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import ICONS from './icons';

export default function Leftsider() {
  const pathname = usePathname();
  const router = useRouter();

  const go = (path: string) => {
    router.push(path);
  };

  return (
    <Menu className="text-base-conten h-full w-60 gap-2 bg-base-200 p-4">
      {Object.entries(ROUTES).map(([k, p]) => (
        <MenuItem key={k} onClick={() => go(p)}>
          <a className={clsx({ active: pathname === p })}>
            {ICONS[k as keyof typeof ROUTES]} {k}
          </a>
        </MenuItem>
      ))}
    </Menu>
  );
}

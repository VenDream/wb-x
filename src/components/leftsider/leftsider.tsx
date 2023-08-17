'use client';

/*
 * Leftsider
 *
 * @Author: VenDream
 * @Date: 2023-08-17 10:18:19
 *
 * Copyright © 2014-2023 VenDream. All Rights Reserved.
 */

import { ROUTES } from '@/contants';
import { Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Menu } from 'react-daisyui';

const ICONS: Record<keyof typeof ROUTES, React.ReactNode> = {
  HOME: <HomeIcon className="h-5 w-5"></HomeIcon>,
  SETTINGS: <Cog6ToothIcon className="h-5 w-5"></Cog6ToothIcon>,
};

export default function Leftsider() {
  const pathname = usePathname();
  const router = useRouter();

  const go = (path: string) => {
    router.push(path);
  };

  return (
    <Menu className="text-base-conten h-full w-60 gap-2 bg-base-200 p-4">
      {Object.entries(ROUTES).map(([k, p]) => (
        <Menu.Item key={k} onClick={() => go(p)}>
          <a className={clsx({ active: pathname === p })}>
            {ICONS[k as keyof typeof ROUTES]} {k}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );
}

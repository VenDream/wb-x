'use client';

/*
 * Layout menu
 *
 * @Author: VenDream
 * @Date: 2023-06-09 11:14:10
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { ROUTES } from '@/contants';
import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Menu() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col">
      <div className="logo px-4 py-2 shadow-sm">
        <Link
          href={ROUTES.HOME}
          className="base-200 btn-ghost btn text-xl normal-case"
        >
          WB-X
        </Link>
      </div>
      <div className="menu flex-1">
        <ul className="layout-menu menu menu-md h-full w-60 gap-2">
          {Object.entries(ROUTES).map(([routeName, routePath]) => {
            const isActive = pathname === routePath;
            const cls = cx({ active: isActive });

            return (
              <li key={routeName} className={cls}>
                <Link className={isActive ? 'active' : ''} href={routePath}>
                  {routeName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

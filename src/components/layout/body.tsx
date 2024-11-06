'use client';

/*
 * Root layout body
 *
 * @Author: VenDream
 * @Date: 2023-08-17 09:59:05
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import AuthGuard from '@/components/common/auth-guard';
import ScrollArea from '@/components/common/scroll-area';
import { Drawer } from '@/components/daisyui';
import useAdminRoute from '@/hooks/use-admin-route';
import Leftsider from './leftsider';

import './body.sass';

export default function LayoutBody({ children }: ChildrenProps) {
  const isAdminRoute = useAdminRoute();

  return (
    <div className="layout-body">
      <Drawer
        className="drawer-open"
        sideClassName="h-auto"
        side={<Leftsider />}
        contentClassName="layout-content p-4 bg-base-200"
      >
        <div className="h-full rounded-[--rounded-box] bg-base-100 px-6 py-4 text-sm">
          <ScrollArea>
            {isAdminRoute ? (
              <AuthGuard noPermissionClassName="p-0">{children}</AuthGuard>
            ) : (
              children
            )}
          </ScrollArea>
        </div>
      </Drawer>
    </div>
  );
}

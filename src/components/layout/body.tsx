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
import useAdminRoute from '@/hooks/use-admin-route';
import { cn } from '@/utils/classnames';
import Leftsider from './leftsider';

export default function LayoutBody({ children }: ChildrenProps) {
  const isAdminRoute = useAdminRoute();

  return (
    <div className="flex min-h-0 flex-1">
      <Leftsider />
      <div className="bg-base-200 h-full min-w-0 flex-1 p-4">
        <div className={cn('bg-base-100 rounded-box h-full px-6 py-4 text-sm')}>
          <ScrollArea>
            {isAdminRoute ? (
              <AuthGuard noPermissionClassName="p-0">{children}</AuthGuard>
            ) : (
              children
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

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
import store from '@/store';
import { cn } from '@/utils/classnames';
import { Provider } from 'jotai';
import Leftsider from './leftsider';

export default function LayoutBody({ children }: ChildrenProps) {
  const isAdminRoute = useAdminRoute();

  return (
    <Provider store={store}>
      <div className="flex min-h-0 flex-1">
        <Leftsider />
        <div className="bg-base-200 h-full min-w-0 flex-1 p-0 lg:p-4">
          <div
            className={cn(
              'page-container shadow-sm',
              'bg-base-100 rounded-box h-full px-6 py-0 text-sm lg:py-4'
            )}
          >
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
    </Provider>
  );
}

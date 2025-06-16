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
import useIsAdminRoute from '@/hooks/use-admin-route';
import useIsFullPage from '@/hooks/use-full-page';
import store from '@/store';
import { cn } from '@/utils/classnames';
import { Provider } from 'jotai';
import { Leftsider } from './leftsider';

export default function LayoutBody({ children }: ChildrenProps) {
  const isFullPage = useIsFullPage();
  const isAdminRoute = useIsAdminRoute();

  return (
    <Provider store={store}>
      <div className="flex min-h-0 flex-1">
        <Leftsider />
        <div className="bg-base-200 h-full min-w-0 flex-1 p-0 lg:p-4">
          <div
            className={cn(
              'page-container shadow-xs',
              'bg-base-100 rounded-box h-full px-6 py-0 text-sm lg:py-4',
              {
                'px-0': isFullPage,
              }
            )}
          >
            <ScrollArea
              viewportClassName={cn({
                'pb-0 pt-14': isFullPage,
              })}
            >
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

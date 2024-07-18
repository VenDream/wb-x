/*
 * Root layout body
 *
 * @Author: VenDream
 * @Date: 2023-08-17 09:59:05
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Drawer } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Leftsider from './leftsider';

import './body.sass';

export default function LayoutBody({ children }: ChildrenProps) {
  return (
    <div className="layout-body flex flex-1">
      <Drawer
        className="drawer-open"
        sideClassName="h-auto"
        side={<Leftsider />}
        contentClassName="layout-content p-4 bg-base-200"
      >
        <div className="h-full rounded-[--rounded-box] bg-base-100 px-6 py-4 text-sm">
          <ScrollArea.Root className="h-full">
            <ScrollArea.Viewport className="h-full w-full">
              {children}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical"
              className={cn(
                'flex w-2.5 touch-none select-none p-0.5',
                'transition-colors duration-[160ms] ease-out'
              )}
            >
              <ScrollArea.Thumb className="flex-1 rounded-full bg-base-content/15" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </Drawer>
    </div>
  );
}

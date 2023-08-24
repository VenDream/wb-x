/*
 * Root layout body
 *
 * @Author: VenDream
 * @Date: 2023-08-17 09:59:05
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Drawer } from '@/components/daisyui';
import Leftsider from './leftsider';

import './body.sass';

export default function LayoutBody({ children }: ChildrenProps) {
  return (
    <div className="layout-body flex flex-1">
      <Drawer
        className="drawer-open"
        sideClassName="h-auto"
        side={<Leftsider />}
        contentClassName="layout-content ml-4 p-4 overflow-auto"
      >
        <div className="rounded text-base-content">{children}</div>
      </Drawer>
    </div>
  );
}

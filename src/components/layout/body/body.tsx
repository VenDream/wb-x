/*
 * Layout body
 *
 * @Author: VenDream
 * @Date: 2023-06-09 11:14:10
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Menu from '@/components/layout/menu';
import { DRAWER_IDS } from '@/contants';

export default function Body({ children }: ChildrenProps) {
  return (
    <main className="layout-body drawer drawer-open">
      <input id={DRAWER_IDS.LAYOUT} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor={DRAWER_IDS.LAYOUT} className="drawer-overlay"></label>
        <Menu></Menu>
      </div>
    </main>
  );
}

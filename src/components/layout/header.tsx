/*
 * Root layout header
 *
 * @Author: VenDream
 * @Date: 2023-08-16 17:52:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Navbar, NavbarEnd, NavbarStart } from '@/components/daisyui';
import ThemeChange from './theme-change';

export default function Header() {
  return (
    <Navbar className="layout-header z-10 px-4 shadow">
      <NavbarStart className="px-2 lg:flex-none">
        <span className="text-lg font-bold">@WB_X</span>
      </NavbarStart>
      <NavbarEnd>
        <ThemeChange />
      </NavbarEnd>
    </Navbar>
  );
}

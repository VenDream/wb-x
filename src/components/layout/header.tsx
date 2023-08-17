'use client';

/*
 * Root layout header
 *
 * @Author: VenDream
 * @Date: 2023-08-16 17:52:04
 *
 * Copyright © 2014-2023 VenDream. All Rights Reserved.
 */

import ThemeChange from '@/components/theme-change';
import { Navbar } from 'react-daisyui';

export default function Header() {
  return (
    <Navbar className="layout-header z-10 px-4 shadow">
      <Navbar.Start className="px-2 lg:flex-none">
        <span className="text-lg font-bold">@WB_X</span>
      </Navbar.Start>
      <Navbar.End>
        <ThemeChange></ThemeChange>
      </Navbar.End>
    </Navbar>
  );
}

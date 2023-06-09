/*
 * Layout header
 *
 * @Author: VenDream
 * @Date: 2023-06-02 14:21:25
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import ThemeChange from './theme-change';

export default function Header() {
  return (
    <header className="layout-header sticky top-0 z-30 flex h-16 w-full">
      <nav className="navbar w-full justify-end">
        <div className="flex-none">
          <ThemeChange></ThemeChange>
        </div>
      </nav>
    </header>
  );
}

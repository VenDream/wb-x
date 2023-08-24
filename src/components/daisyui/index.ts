'use client';

/*
 * Re-export daisyui components as client components
 *
 * @Author: VenDream
 * @Date: 2023-08-18 11:59:07
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Dropdown, Menu, Navbar, Stats, Tabs } from 'react-daisyui';

/* -------------------------------------------------------------------------- */
/*                  FIXME: DO NOT support sub-compoennts yet                  */
/* -------------------------------------------------------------------------- */
const { Start: NavbarStart, Center: NavbarCenter, End: NavbarEnd } = Navbar;
const { Stat } = Stats;
const { Item: StatItem } = Stat;
const {
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
  Item: DropdownItem,
} = Dropdown;
const { Item: MenuItem } = Menu;
const { Tab } = Tabs;

/* -------------------------------------------------------------------------- */
/*                                 re-exports                                 */
/* -------------------------------------------------------------------------- */
export { Button, Divider, Drawer, Theme, useTheme } from 'react-daisyui';
export {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Menu,
  MenuItem,
  Navbar,
  NavbarCenter,
  NavbarEnd,
  NavbarStart,
  Stat,
  StatItem,
  Stats,
  Tab,
  Tabs,
};

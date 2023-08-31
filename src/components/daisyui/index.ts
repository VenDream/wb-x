'use client';

/*
 * Re-export daisyui components as client components
 *
 * @Author: VenDream
 * @Date: 2023-08-18 11:59:07
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Dropdown, Indicator, Menu, Navbar, Stats, Tabs } from 'react-daisyui';

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
const { Item: IndicatorItem } = Indicator;

/* -------------------------------------------------------------------------- */
/*                                 re-exports                                 */
/* -------------------------------------------------------------------------- */
export {
  Alert,
  Badge,
  Button,
  Divider,
  Drawer,
  Join,
  Loading,
  Modal,
  Theme,
  Toast,
  useTheme,
} from 'react-daisyui';

export {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Indicator,
  IndicatorItem,
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

export type { AlertProps, ModalProps, ToastProps } from 'react-daisyui';

'use client';

/*
 * Re-export daisyui components as client components
 *
 * @Author: VenDream
 * @Date: 2023-08-18 11:59:07
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import {
  Breadcrumbs,
  Dropdown,
  Indicator,
  Menu,
  Modal,
  Navbar,
  Stats,
  Tabs,
} from 'react-daisyui';

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
const { Item: BreadcrumbsItem } = Breadcrumbs;
const {
  Header: ModalHeader,
  Body: ModalBody,
  Actions: ModalActions,
  Legacy: ModalLegacy,
} = Modal;

/* -------------------------------------------------------------------------- */
/*                                 re-exports                                 */
/* -------------------------------------------------------------------------- */
export {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Divider,
  Drawer,
  Input,
  Join,
  Loading,
  Pagination,
  Textarea,
  Theme,
  Toast,
  Toggle,
  Tooltip,
  useTheme,
} from 'react-daisyui';

export type * from 'react-daisyui';

export {
  Breadcrumbs,
  BreadcrumbsItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Indicator,
  IndicatorItem,
  Menu,
  MenuItem,
  Modal,
  ModalActions,
  ModalBody,
  ModalHeader,
  ModalLegacy,
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

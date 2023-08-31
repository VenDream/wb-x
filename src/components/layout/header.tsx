/*
 * Root layout header
 *
 * @Author: VenDream
 * @Date: 2023-08-16 17:52:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import {
  Badge,
  Button,
  Indicator,
  Navbar,
  NavbarEnd,
  NavbarStart,
} from '@/components/daisyui';
import { ROUTES } from '@/contants';
import Link from 'next-intl/link';
import LocaleChange from './locale-change';
import ThemeChange from './theme-change';

export default function Header() {
  return (
    <Navbar className="layout-header z-10 px-4 shadow">
      <NavbarStart className="px-2 lg:flex-none">
        <Indicator>
          <Badge
            color="primary"
            className="indicator-item top-[5px] h-auto text-xs"
          >
            x
          </Badge>
          <Link href={ROUTES.HOME}>
            <Button color="ghost" size="md" className="text-2xl font-bold">
              @W__B
            </Button>
          </Link>
        </Indicator>
      </NavbarStart>
      <NavbarEnd>
        <LocaleChange />
        <ThemeChange />
      </NavbarEnd>
    </Navbar>
  );
}

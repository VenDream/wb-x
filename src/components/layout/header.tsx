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
import { PRIMARY_ROUTES } from '@/constants';
import { Link } from '@/i18n/routing';
import LocaleChange from './locale-change';
import Profile from './profile';
import ThemeChange from './theme-change';

export default function Header() {
  return (
    <Navbar className="relative z-50 border-b border-base-content/10 bg-base-100 px-4">
      <NavbarStart className="px-2 lg:flex-none">
        <Indicator>
          <Badge
            color="primary"
            className="indicator-item top-[5px] h-auto text-xs"
          >
            x
          </Badge>
          <Link href={PRIMARY_ROUTES.HOME}>
            <Button color="ghost" size="md" className="text-2xl font-bold">
              @W__B
            </Button>
          </Link>
        </Indicator>
      </NavbarStart>
      <NavbarEnd className="flex items-center gap-2">
        <LocaleChange />
        <ThemeChange />
        <Profile />
      </NavbarEnd>
    </Navbar>
  );
}

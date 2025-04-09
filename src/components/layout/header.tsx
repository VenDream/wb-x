/*
 * Root layout header
 *
 * @Author: VenDream
 * @Date: 2023-08-16 17:52:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Badge, Button, Indicator, Navbar } from '@/components/daisyui';
import { PRIMARY_ROUTES } from '@/constants';
import { Link } from '@/i18n/routing';
import LocaleChange from './locale-change';
import Profile from './profile';
import ThemeChange from './theme-change';

export default function Header() {
  return (
    <Navbar className="border-base-content/10 bg-base-100 relative z-50 border-b px-4">
      <Navbar.Start className="px-2">
        <Indicator>
          <Indicator.Item placement="end" className="top-[8px] right-[8px]">
            <Badge size="sm" color="primary" className="h-5 w-5 rounded-full">
              ✘
            </Badge>
          </Indicator.Item>
          <Link href={PRIMARY_ROUTES.HOME}>
            <Button size="md" ghost>
              <p className="text-lg">@W__B</p>
            </Button>
          </Link>
        </Indicator>
      </Navbar.Start>
      <Navbar.End className="items-center gap-2">
        <LocaleChange />
        <ThemeChange />
        <Profile />
      </Navbar.End>
    </Navbar>
  );
}

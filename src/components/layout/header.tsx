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
import { cn } from '@/utils/classnames';
import { MiniLeftsider } from './leftsider';
import LocaleChange from './locale-change';
import Profile from './profile';
import ThemeChange from './theme-change';

export default function Header() {
  return (
    <Navbar
      className={cn(
        'border-base-content/10 z-10 px-0 shadow-xs lg:border-b lg:px-4',
        'lg:bg-base-100 fixed top-0 left-0 lg:relative',
        'backdrop-blur-pseudo h-14 min-h-0 lg:h-16'
      )}
    >
      <Navbar.Start className="px-2">
        <MiniLeftsider />
        <Indicator>
          <Indicator.Item placement="end" className="top-2 -right-1">
            <Badge size="sm" color="primary" className="h-5 w-5 rounded-full">
              ✘
            </Badge>
          </Indicator.Item>
          <Link href={PRIMARY_ROUTES.HOME}>
            <Button size="md" ghost className="px-2">
              <p className="text-xl">@W__B</p>
            </Button>
          </Link>
        </Indicator>
      </Navbar.Start>
      <Navbar.End className="items-center gap-2 pr-4 lg:pr-0">
        <LocaleChange />
        <ThemeChange />
        <Profile />
      </Navbar.End>
    </Navbar>
  );
}

/*
 * Root layout header
 *
 * @Author: VenDream
 * @Date: 2023-08-16 17:52:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Badge, Button, Drawer, Indicator, Navbar } from '@/components/daisyui';
import { APP_DRAWER_ID, PRIMARY_ROUTES } from '@/constants';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { MenuIcon } from 'lucide-react';
import Leftsider from './leftsider';
import LocaleChange from './locale-change';
import Profile from './profile';
import ThemeChange from './theme-change';

export default function Header() {
  return (
    <Drawer>
      <Drawer.Toggle id={APP_DRAWER_ID} />
      <Drawer.Side>
        <Drawer.Overlay htmlFor={APP_DRAWER_ID} />
        <Leftsider className="bg-base-100/50 block" />
      </Drawer.Side>
      <Drawer.Content>
        <Navbar
          className={cn(
            'border-base-content/10 relative z-50 border-b px-0 lg:px-4',
            'lg:bg-base-100 fixed top-0 left-0 lg:relative',
            'before:bg-base-100/50 before:absolute before:inset-0 before:z-0',
            'h-14 min-h-0 before:backdrop-blur-lg before:content-[""] lg:h-16'
          )}
        >
          <Navbar.Start className="px-2">
            <Drawer.Button
              htmlFor={APP_DRAWER_ID}
              className="z-1 flex lg:hidden"
            >
              <MenuIcon size={18} />
            </Drawer.Button>
            <Indicator>
              <Indicator.Item placement="end" className="top-2 -right-1">
                <Badge
                  size="sm"
                  color="primary"
                  className="h-5 w-5 rounded-full"
                >
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
          <Navbar.End className="items-center gap-2">
            <LocaleChange />
            <ThemeChange />
            <Profile />
          </Navbar.End>
        </Navbar>
      </Drawer.Content>
    </Drawer>
  );
}

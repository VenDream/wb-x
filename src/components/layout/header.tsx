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
import { useTranslations } from 'next-intl';
import Leftsider from './leftsider';
import LocaleChange from './locale-change';
import Profile from './profile';
import ThemeChange from './theme-change';

export default function Header() {
  const t = useTranslations('global.app');

  return (
    <Drawer>
      <Drawer.Toggle id={APP_DRAWER_ID} />
      <Drawer.Side>
        <Drawer.Overlay htmlFor={APP_DRAWER_ID} />
        <div
          className={cn(
            'flex h-full w-60 flex-col gap-4 p-4',
            'bg-base-100/80 border-base-content/10 border-r backdrop-blur-lg'
          )}
        >
          <h3 className="pl-4 text-lg">{t('title')}</h3>
          <div className="bg-base-content/10 h-px w-full" />
          <Leftsider className="block w-full border-none bg-transparent p-0" />
        </div>
      </Drawer.Side>
      <Drawer.Content>
        <Navbar
          className={cn(
            'border-base-content/10 z-10 border-b px-0 lg:px-4',
            'lg:bg-base-100 fixed top-0 left-0 lg:relative',
            'backdrop-blur-pseudo h-14 min-h-0 lg:h-16'
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

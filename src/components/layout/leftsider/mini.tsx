'use client';

/*
 * Mini Leftsider
 *
 * @Author: VenDream
 * @Date: 2025-06-16 10:28:41
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { MenuIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Drawer } from 'vaul';
import Leftsider from './leftsider';

export default function MiniLeftsider() {
  const t = useTranslations('global.app');

  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root direction="left" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button ghost className="relative flex lg:hidden">
          <MenuIcon size={18} />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="bg-base-100/50 fixed inset-0 z-99 backdrop-blur-xs" />
        <Drawer.Content
          aria-describedby={undefined}
          className={cn(
            'fixed top-0 left-0 z-99 h-full w-60 p-4 backdrop-blur-lg',
            'bg-base-100/80 border-base-content/10 border-r shadow-xs'
          )}
        >
          <div className="flex items-center justify-between">
            <Drawer.Title className="text-lg">{t('title')}</Drawer.Title>
            <Drawer.Close asChild>
              <Button size="sm" ghost circle>
                <XIcon size={18} />
              </Button>
            </Drawer.Close>
          </div>
          <div className="flex h-full flex-col gap-4">
            <div className="border-base-content/10 h-6 w-full border-b" />
            <Leftsider
              className="block w-full border-none bg-transparent p-0"
              onRouteChange={() => setOpen(false)}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

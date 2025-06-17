/*
 * Weibo Status List Mini Filter
 *
 * @Author: VenDream
 * @Date: 2025-06-13 15:42:01
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button } from '@/components/daisyui';
import { ESTIMATE_COUNT } from '@/constants';
import { cn } from '@/utils/classnames';
import { ScanSearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Drawer } from 'vaul';
import Filter, { type FilterProps } from './filter';

export default function MiniFilter(props: FilterProps & { total: number }) {
  const t = useTranslations('pages.status.filter');

  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button
          circle
          className={cn('fixed right-5 bottom-5 h-10 w-10 shadow-xs lg:hidden')}
        >
          <SlidersHorizontalIcon size={18} />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="bg-base-100/50 fixed inset-0 z-99 backdrop-blur-xs" />
        <Drawer.Content
          aria-describedby={undefined}
          className={cn(
            'fixed top-0 right-0 z-99 h-full p-4 backdrop-blur-lg',
            'bg-base-100/80 border-base-content/10 border-l shadow-xs'
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
            <Filter
              {...props}
              displayMode="drawer"
              onApplyFilterParams={() => setOpen(false)}
              onResetFilterParams={() => setOpen(false)}
            />
            <div className="border-base-content/10 h-0 w-full border-b" />
            {props.total >= 0 && (
              <p className="text-base-content/80 flex items-center text-xs">
                <ScanSearchIcon size={14} className="mr-2" />
                {t.rich('totalStatuses', {
                  s: () => <>&nbsp;</>,
                  total: () => (
                    <span className="text-accent underline underline-offset-2">
                      {props.total === ESTIMATE_COUNT ? '1000+' : props.total}
                    </span>
                  ),
                })}
              </p>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

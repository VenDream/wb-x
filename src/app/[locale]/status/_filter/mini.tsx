/*
 * Weibo Status List Mini Filter
 *
 * @Author: VenDream
 * @Date: 2025-06-13 15:42:01
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Drawer } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Filter, { type FilterProps } from './filter';

const DRAWER_ID = 'STATUS_LIST_MINI_FILTER';

export default function MiniFilter(props: FilterProps) {
  const t = useTranslations('pages.status.filter');

  const closeDrawer = () => {
    const selector = `.drawer-overlay[for="${DRAWER_ID}"]`;
    const overlay = document.querySelector(selector) as HTMLElement;
    overlay?.click();
  };

  return (
    <Drawer end>
      <Drawer.Toggle id={DRAWER_ID} />
      <Drawer.Side>
        <Drawer.Overlay htmlFor={DRAWER_ID} />
        <div
          className={cn(
            'flex h-full flex-col gap-4 p-4',
            'bg-base-100/80 border-base-content/10 border-l backdrop-blur-lg'
          )}
        >
          <h3 className="text-lg">{t('title')}</h3>
          <div className="bg-base-content/10 h-px w-full" />
          <Filter
            {...props}
            displayMode="drawer"
            onApplyFilterParams={closeDrawer}
            onResetFilterParams={closeDrawer}
          />
        </div>
      </Drawer.Side>
      <Drawer.Content>
        <Drawer.Button
          htmlFor={DRAWER_ID}
          className={cn(
            'fixed right-5 bottom-5 shadow lg:hidden',
            'bg-primary text-primary-content h-10 w-10 rounded-full p-0'
          )}
        >
          <SlidersHorizontalIcon size={18} />
        </Drawer.Button>
      </Drawer.Content>
    </Drawer>
  );
}

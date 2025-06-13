/*
 * ROTN List Menu
 *
 * @Author: VenDream
 * @Date: 2025-06-11 14:58:28
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button, Drawer, Input } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { RotateCcwIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const DRAWER_ID = 'ROTN_LIST_MENU';

interface IProps {
  itemId: string;
  setItemId: (itemId: string) => void;
  applyItemId: (itemId: string) => void;
  resetItemId: () => void;
}

export default function UserListMenu(props: IProps) {
  const t = useTranslations('pages.rotn');
  const { itemId, setItemId } = props;

  const closeDrawer = () => {
    const selector = `.drawer-overlay[for="${DRAWER_ID}"]`;
    const overlay = document.querySelector(selector) as HTMLElement;
    overlay?.click();
  };

  const applyItemId = (itemId: string) => {
    props.applyItemId(itemId);
    closeDrawer();
  };

  const resetItemId = () => {
    props.resetItemId();
    closeDrawer();
  };

  return (
    <Drawer className="absolute top-2 right-2 w-auto lg:hidden" end>
      <Drawer.Toggle id={DRAWER_ID} />
      <Drawer.Side>
        <Drawer.Overlay htmlFor={DRAWER_ID} />
        <div
          className={cn(
            'flex h-full w-60 flex-col gap-4 p-4',
            'border-base-content/10 bg-base-100/80 border-l backdrop-blur-lg'
          )}
        >
          <h3 className="text-lg">{t('filters.title')}</h3>
          <div className="bg-base-content/10 h-px w-full" />
          <Input
            size="sm"
            className="bg-transparent"
            placeholder={t('search.placeholder')}
            value={itemId}
            onChange={e => setItemId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyItemId(itemId)}
          />
          <Button size="sm" color="primary" onClick={() => applyItemId(itemId)}>
            <SearchIcon size={16} />
            {t('search.search')}
          </Button>
          <Button
            size="sm"
            ghost
            className="bg-base-content/10"
            onClick={resetItemId}
          >
            <RotateCcwIcon size={16} />
            {t('search.reset')}
          </Button>
        </div>
      </Drawer.Side>
      <Drawer.Content>
        <Drawer.Button htmlFor={DRAWER_ID} className="h-8">
          <SlidersHorizontalIcon size={16} />
        </Drawer.Button>
      </Drawer.Content>
    </Drawer>
  );
}

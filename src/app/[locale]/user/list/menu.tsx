/*
 * User List Menu
 *
 * @Author: VenDream
 * @Date: 2025-06-10 17:45:05
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button, Drawer, Input, Toggle } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { RotateCcwIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const DRAWER_ID = 'USER_LIST_MENU';

interface IProps {
  keyword: string;
  isTracking: boolean;

  setKeyword: (keyword: string) => void;
  applyKeyword: (keyword: string) => void;
  onToggleTracking: (isTracking: boolean) => void;
}

export default function UserListMenu(props: IProps) {
  const t = useTranslations('pages.users');
  const { keyword, isTracking, setKeyword, onToggleTracking } = props;

  const closeDrawer = () => {
    const selector = `.drawer-overlay[for="${DRAWER_ID}"]`;
    const overlay = document.querySelector(selector) as HTMLElement;
    overlay?.click();
  };

  const toggleTracking = () => {
    onToggleTracking(!isTracking);
    // closeDrawer();
  };

  const applyKeyword = (keyword: string) => {
    props.applyKeyword(keyword);
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
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm">{t('isTracking')}</span>
            <Toggle
              color="primary"
              checked={isTracking}
              onChange={toggleTracking}
            />
          </div>
          <Input
            size="sm"
            className="bg-transparent"
            placeholder={t('search.placeholder')}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyKeyword(keyword)}
          />
          <Button
            size="sm"
            color="primary"
            onClick={() => applyKeyword(keyword)}
          >
            <SearchIcon size={16} />
            {t('search.search')}
          </Button>
          <Button
            size="sm"
            ghost
            className="bg-base-content/10"
            onClick={() => applyKeyword('')}
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

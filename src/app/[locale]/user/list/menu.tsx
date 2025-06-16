/*
 * User List Menu
 *
 * @Author: VenDream
 * @Date: 2025-06-10 17:45:05
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button, Input, Toggle } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import {
  RotateCcwIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Drawer } from 'vaul';

interface IProps {
  keyword: string;
  isTracking: boolean;

  setKeyword: (keyword: string) => void;
  applyKeyword: (keyword: string) => void;
  onToggleTracking: (isTracking: boolean) => void;
}

export default function UserListMenu(props: IProps) {
  const t = useTranslations('pages.users');
  const { keyword, isTracking, setKeyword } = props;

  const [open, setOpen] = useState(false);

  const toggleTracking = () => {
    props.onToggleTracking(!isTracking);
    setOpen(false);
  };

  const applyKeyword = (keyword: string) => {
    props.applyKeyword(keyword);
    setOpen(false);
  };

  return (
    <Drawer.Root direction="bottom" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button
          ghost
          size="sm"
          className="absolute top-2.5 right-2 w-auto lg:hidden"
          onClick={() => setOpen(true)}
        >
          <SlidersHorizontalIcon size={16} />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn('bg-base-100/50 fixed inset-0 z-99 backdrop-blur-xs')}
        />
        <Drawer.Content
          aria-describedby={undefined}
          className={cn(
            'fixed bottom-0 left-[5%] z-99 h-fit w-[90%] after:!bg-transparent'
          )}
        >
          <div
            className={cn(
              'rounded-box mb-6 p-4 shadow-sm',
              'bg-base-100/80 border-base-content/10 border-1 backdrop-blur-lg'
            )}
          >
            <div className="flex items-center justify-between">
              <Drawer.Title>{t('filters.title')}</Drawer.Title>
              <Drawer.Close asChild>
                <Button size="sm" circle ghost>
                  <XIcon size={18} />
                </Button>
              </Drawer.Close>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-base-content/10 h-6 w-full border-b" />
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
                className="w-full bg-transparent"
                placeholder={t('search.placeholder')}
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && applyKeyword(keyword)}
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  color="primary"
                  className="flex-1"
                  onClick={() => applyKeyword(keyword)}
                >
                  <SearchIcon size={16} />
                  {t('search.search')}
                </Button>
                <Button
                  size="sm"
                  ghost
                  className="bg-base-content/10 flex-1"
                  onClick={() => applyKeyword('')}
                >
                  <RotateCcwIcon size={16} />
                  {t('search.reset')}
                </Button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

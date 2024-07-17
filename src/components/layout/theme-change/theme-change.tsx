'use client';

/*
 * Theme change
 *
 * @Author: VenDream
 * @Date: 2023-08-15 16:23:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  useTheme,
} from '@/components/daisyui';
import { THEMES } from '@/contants';
import { cn } from '@/utils/classnames';
import { getLsTheme, isDarkTheme, setLsTheme } from '@/utils/theme';
import { ChevronDownIcon, CircleCheckBigIcon, PaletteIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';

import './theme-change.sass';

export default function ThemeChange() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('global.theming');

  const applyTheme = useCallback(
    (t: string) => {
      const html = document.getElementsByTagName('html')[0];
      html.setAttribute('data-theme', t);

      if (isDarkTheme(t)) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      setTheme(t);
    },
    [setTheme]
  );

  const switchTheme = (t: string) => {
    applyTheme(t);
    setLsTheme(t);
  };

  useEffect(() => {
    const t = getLsTheme();
    t && applyTheme(t);
    setTimeout(() => {
      const root = document.getElementsByTagName('html')[0];
      root.classList.remove('rendering');
    });
  }, [applyTheme]);

  return (
    <div className="theme-change">
      <Dropdown end>
        <DropdownToggle button={false}>
          <Button color="ghost">
            <PaletteIcon size={18} />
            <span className="text-sm">{t('switcherLabel')}</span>
            <ChevronDownIcon size={18} />
          </Button>
        </DropdownToggle>
        <DropdownMenu
          className={cn(
            'z-10 mt-4 h-96 w-60 flex-nowrap gap-1 overflow-auto rounded-lg',
            'border border-base-content/10 bg-base-100 shadow'
          )}
        >
          {THEMES.map((t, i) => {
            const isSelected = t === theme;
            return (
              <DropdownItem key={i} anchor={false}>
                <div className="theme-item flex" onClick={() => switchTheme(t)}>
                  <div
                    data-theme={t}
                    className="flex w-full items-center justify-between rounded border border-base-content/10 p-2 shadow"
                  >
                    <div className="flex items-center">
                      {isSelected ? (
                        <CircleCheckBigIcon size={16} className="mr-2" />
                      ) : (
                        <div className="mr-2 h-4 w-4" />
                      )}
                      {t}
                    </div>
                    <div className="flex h-4 gap-1">
                      <div className="w-2 rounded bg-primary" />
                      <div className="w-2 rounded bg-secondary" />
                      <div className="w-2 rounded bg-accent" />
                      <div className="w-2 rounded bg-neutral" />
                    </div>
                  </div>
                </div>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

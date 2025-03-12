'use client';

/*
 * Theme change
 *
 * @Author: VenDream
 * @Date: 2023-08-15 16:23:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Dropdown } from '@/components/daisyui/index2';
import { LS_KEYS, THEMES } from '@/constants';
import { cn } from '@/utils/classnames';
import { useLocalStorageState } from 'ahooks';
import { ChevronDownIcon, CircleCheckBigIcon, PaletteIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

import './theme-change.sass';

export default function ThemeChange() {
  const t = useTranslations('global.theming');
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useLocalStorageState<DaisyUI.Theme>(LS_KEYS.THEME, {
    defaultValue: 'light',
  });

  useEffect(() => {
    setMounted(true);

    const loadingMask = document.querySelector('[data-role="loading-mask"]');
    loadingMask?.classList.add('hidden');
  }, []);

  useEffect(() => {
    mounted && theme && themeChange(false);
  }, [theme, mounted]);

  // @note prevent hydration error
  if (!mounted) return null;

  return (
    <Dropdown align="end" className="theme-change">
      <Dropdown.Toggle>
        <Button ghost>
          <PaletteIcon size={18} />
          <span className="text-sm">{t('switcherLabel')}</span>
          <ChevronDownIcon size={18} />
        </Button>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={cn(
          'z-10 mt-4 h-96 w-60 flex-nowrap gap-1 overflow-auto',
          'bg-base-100/50 border-base-content/10 border backdrop-blur-lg'
        )}
      >
        {Object.values(THEMES).map(t => {
          const isSelected = t === theme;
          return (
            <Dropdown.Item key={t}>
              <div
                data-set-theme={t}
                className="flex h-10 items-center gap-3"
                onClick={() => setTheme(t as DaisyUI.Theme)}
              >
                {isSelected ? (
                  <CircleCheckBigIcon size={16} />
                ) : (
                  <div className="h-4 w-4" />
                )}
                <p className="basis-1/2 text-left">{t.toUpperCase()}</p>
                <div className="flex h-4 gap-1 bg-transparent" data-theme={t}>
                  <div className="bg-primary w-2 rounded-xs" />
                  <div className="bg-secondary w-2 rounded-xs" />
                  <div className="bg-accent w-2 rounded-xs" />
                  <div className="bg-neutral w-2 rounded-xs" />
                </div>
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

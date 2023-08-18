'use client';

/*
 * Theme change
 *
 * @Author: VenDream
 * @Date: 2023-08-15 16:23:57
 *
 * Copyright © 2014-2023 VenDream. All Rights Reserved.
 */

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Theme as ThemeProvoder,
  useTheme,
} from '@/components/daisyui';
import { LS_KEYS, THEMES } from '@/contants';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';

import { useCallback, useEffect } from 'react';
import './theme-change.sass';

function ThemeConsumer() {
  const { theme, setTheme } = useTheme();

  const applyTheme = useCallback(
    (t: string) => {
      document.getElementsByTagName('html')[0].setAttribute('data-theme', t);
      setTheme(t);
    },
    [setTheme]
  );

  const switchTheme = (t: string) => {
    applyTheme(t);
    window.localStorage.setItem(LS_KEYS.THEME, t);
  };

  useEffect(() => {
    const t = window.localStorage.getItem(LS_KEYS.THEME);
    if (t) applyTheme(t);
  }, [applyTheme]);

  return (
    <div className="theme-change">
      <Dropdown end>
        <DropdownToggle button={false}>
          <Button color="ghost">
            <SwatchIcon />
            <span className="text-sm">THEMES</span>
            <ChevronDownIcon />
          </Button>
        </DropdownToggle>
        <DropdownMenu className="z-10 mt-4 h-96 w-60 flex-nowrap gap-1 overflow-auto rounded-lg bg-base-300 shadow">
          {THEMES.map((t, i) => {
            const isSelected = t === theme;
            return (
              <DropdownItem key={i} anchor={false}>
                <div className="theme-item flex" onClick={() => switchTheme(t)}>
                  <div
                    data-theme={t}
                    className="flex w-full items-center justify-between rounded-sm p-2 shadow"
                  >
                    <div className="left-block flex w-2/3 items-center">
                      {isSelected ? (
                        <CheckCircleIcon className="mr-1"></CheckCircleIcon>
                      ) : (
                        <div className="mr-1 h-5 w-5"></div>
                      )}
                      {t}
                    </div>
                    <div className="right-block flex h-4 gap-1">
                      <div className="w-2 rounded bg-primary"></div>
                      <div className="w-2 rounded bg-secondary"></div>
                      <div className="w-2 rounded bg-accent"></div>
                      <div className="w-2 rounded bg-neutral"></div>
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

export default function ThemeChange() {
  return (
    <ThemeProvoder>
      <ThemeConsumer />
    </ThemeProvoder>
  );
}

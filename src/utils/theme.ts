/*
 * Theme Utils
 *
 * @Author: VenDream
 * @Date: 2024-04-07 14:32:18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { DARK_THEMES, LS_KEYS } from '@/contants';
import { getLocalStorageValue, setLocalStorageValue } from './common';

export function getLsTheme() {
  return getLocalStorageValue<string>(LS_KEYS.THEME) || '';
}

export function setLsTheme(theme: string) {
  return setLocalStorageValue(LS_KEYS.THEME, theme);
}

export function isDarkTheme(theme?: string) {
  const t = theme || getLsTheme();
  return DARK_THEMES.includes(t);
}

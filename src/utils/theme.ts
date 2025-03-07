/*
 * Theme Utils
 *
 * @Author: VenDream
 * @Date: 2024-04-07 14:32:18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { DARK_THEMES, LS_KEYS } from '@/constants';
import { getLocalStorageValue } from './common';

export function getLsTheme() {
  return getLocalStorageValue<string>(LS_KEYS.THEME) || '';
}

export function isDarkTheme(theme?: string) {
  const t = theme || getLsTheme();
  return DARK_THEMES.includes(t as DaisyUI.DarkTheme);
}

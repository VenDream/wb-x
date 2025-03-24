/*
 * useTheme Hooks
 *
 * @Author: VenDream
 * @Date: 2025-03-24 15:31:11
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { LS_KEYS } from '@/constants';
import { useLocalStorageState } from 'ahooks';

export default function useTheme() {
  const [theme, setTheme] = useLocalStorageState<DaisyUI.Theme>(LS_KEYS.THEME, {
    defaultValue: 'light',
    listenStorageChange: true,
  });

  return [theme, setTheme] as const;
}

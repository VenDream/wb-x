/*
 * 设置相关工具函数
 *
 * @Author: VenDream
 * @Date: 2024-01-10 10:49:28
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { LS_KEYS } from '@/contants';
import { getLocalStorageValue } from './common';

export const DEFAULT_SETTINGS: App.Settings = {
  useImageProxy: false,
  useVideoProxy: true,
};

export function getAppSettings() {
  return (
    getLocalStorageValue<App.Settings>(LS_KEYS.SETTINGS) || DEFAULT_SETTINGS
  );
}

/*
 * Global Store
 *
 * @Author: VenDream
 * @Date: 2024-08-16 11:36:55
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { LS_KEYS } from '@/contants';
import { createStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const DEFAULT_SETTINGS: App.Settings = {
  useImageProxy: false,
  useVideoProxy: true,
};

export const settingsAtom = atomWithStorage<App.Settings>(
  LS_KEYS.SETTINGS,
  DEFAULT_SETTINGS
);

export default createStore();

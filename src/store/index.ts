/*
 * Global Store
 *
 * @Author: VenDream
 * @Date: 2024-08-16 11:36:55
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { LS_KEYS } from '@/constants';
import { atom, createStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const DEFAULT_SETTINGS: App.Settings = {
  useImageProxy: false,
  useVideoProxy: true,
};

export const settingsAtom = atomWithStorage<App.Settings>(
  LS_KEYS.SETTINGS,
  DEFAULT_SETTINGS
);

export const wbUserTrackingsAtom = atom<Record<string, boolean>>({});
export const wbStatusFavouritesAtom = atom<Record<string, boolean>>({});

export const twUserTrackingsAtom = atom<Record<string, boolean>>({});
export const twStatusFavouritesAtom = atom<Record<string, boolean>>({});

const store = createStore();
export default store;

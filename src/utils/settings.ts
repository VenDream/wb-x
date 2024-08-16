/*
 * Settings Utils
 *
 * @Author: VenDream
 * @Date: 2024-01-10 10:49:28
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import store, { settingsAtom } from '@/store';

export function getAppSettings() {
  return store.get(settingsAtom);
}

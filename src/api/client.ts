/*
 * Clientside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-24 10:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { get, post } from '@/utils/request';

/** get system config */
export async function getSystemConfig() {
  const config = await get<string>('/api/config');
  return config;
}

/** save system config */
export async function saveSystemConfig(configStr: string) {
  const rlt = await post('/api/config', { config: configStr });
  return rlt;
}

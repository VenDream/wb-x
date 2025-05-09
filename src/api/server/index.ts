/*
 * Serverside APIs
 *
 * @Author: VenDream
 * @Date: 2025-05-09 14:38:49
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { getApiHost } from '@/utils/api-host';
import { get } from '@/utils/request/server';

export async function getDatabaseInfo() {
  const url = `${getApiHost()}/api/db/info`;
  const info = await get<DB.Info>(url, {
    next: { tags: ['db-info'] },
  });
  return info;
}

export * as twitter from './twitter';
export * as weibo from './weibo';

/*
 * Clientside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-24 10:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { get, post } from '@/utils/request';
import { appendURLParams } from '@/utils/url';

type ROTNPaginationParams = PaginationParams & {
  type?: Backend.ROTN_TYPE;
};

/**
 * get db rotns
 *
 * @export
 * @param {ROTNPaginationParams} params params
 */
export async function getDbROTNs(params: ROTNPaginationParams) {
  let url = '/api/db/rotn/list';
  url = appendURLParams(url, params);
  const items = await get<Backend.ROTNItemList>(url);
  return items;
}

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

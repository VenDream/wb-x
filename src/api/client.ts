/*
 * Clientside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-24 10:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { sleep } from '@/utils/common';
import { get, post } from '@/utils/request';
import { appendURLParams } from '@/utils/url';

type ROTNPaginationParams = PaginationParams & {
  type?: Backend.ROTN_TYPE;
};

export async function getDbStatusList(params: PaginationParams) {
  let url = '/api/db/status/list';
  url = appendURLParams(url, params);
  await sleep(500);
  const statuses = await get<Backend.StatusList>(url);
  return statuses;
}

export async function getDbStatusVideo(id: string) {
  let url = '/api/weibo/status/video';
  url = appendURLParams(url, { id });
  const videoUrl = await get<string>(url);
  return videoUrl;
}

export async function getDbRotnList(params: ROTNPaginationParams) {
  let url = '/api/db/rotn/list';
  url = appendURLParams(url, params);
  await sleep(500);
  const items = await get<Backend.ROTNItemList>(url);
  return items;
}

export async function getSystemConfig() {
  const config = await get<string>('/api/config');
  return config;
}

export async function saveSystemConfig(configStr: string) {
  const rlt = await post('/api/config', { config: configStr });
  return rlt;
}

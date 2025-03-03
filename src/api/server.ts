/*
 * Serverside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-18 14:40:26
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getApiHost } from '@/utils/api-host';
import { get } from '@/utils/request';
import { appendURLParams } from '@/utils/url';

export async function getDbStatusDetail(id: string) {
  let url = `${getApiHost()}/api/db/weibo/status/list`;
  url = appendURLParams(url, { id });
  const { list } = await get<Backend.DBList<Backend.Status>>(url, {
    cache: 'no-store',
  });
  return list ? list[0] : null;
}

export async function getDbUsers(params: PaginationParams) {
  let url = `${getApiHost()}/api/db/weibo/users/list`;
  url = appendURLParams(url, params);
  const { list } = await get<Backend.DBList<Backend.User>>(url);
  return list;
}

export async function getDatabaseInfo() {
  const url = `${getApiHost()}/api/db/info`;
  const info = await get<Backend.DbInfo>(url, {
    next: { tags: ['db-info'] },
  });
  return info;
}

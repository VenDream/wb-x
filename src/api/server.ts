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
  let url = getApiHost() + '/api/db/status';
  url = appendURLParams(url, { id });
  const status = await get<Backend.Status>(url);
  return status;
}

export async function getDbRotnItem(id: string) {
  let url = getApiHost() + '/api/db/rotn';
  url = appendURLParams(url, { id });
  const item = await get<Backend.ROTNItem>(url);
  return item;
}

export async function getDbUsers(params: PaginationParams) {
  let url = getApiHost() + '/api/db/user/list';
  url = appendURLParams(url, params);
  const users = await get<Backend.UserList>(url);
  return users;
}

export async function getDatabaseInfo() {
  const url = getApiHost() + '/api/db/info';
  const info = await get<Backend.DbInfo>(url);
  return info;
}

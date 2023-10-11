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

/*
 * Serverside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-18 14:40:26
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getApiHost } from '@/utils/api-host';
import { get } from '@/utils/request/server';
import { appendURLParams } from '@/utils/url';

type UserListParams = PaginationParams & Backend.UserListFilterParams;

export async function getUserList(params: UserListParams) {
  let url = `${getApiHost()}/api/db/weibo/users/list`;
  url = appendURLParams(url, params);
  const users = await get<Backend.DBList<Backend.User>>(url);
  return users;
}

export async function getTrackingUsers() {
  return getUserList({ limit: 9999, isTracking: true });
}

export async function getDatabaseInfo() {
  const url = `${getApiHost()}/api/db/info`;
  const info = await get<Backend.DbInfo>(url, {
    next: { tags: ['db-info'] },
  });
  return info;
}

/*
 * Weibo Serverside APIs
 *
 * @Author: VenDream
 * @Date: 2025-05-09 14:38:24
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { getApiHost } from '@/utils/api-host';
import { get } from '@/utils/request/server';
import { appendURLParams } from '@/utils/url';

type UserListParams = PaginationParams & Weibo.UserListFilterParams;

export async function getUserList(params: UserListParams) {
  let url = `${getApiHost()}/api/db/weibo/users/list`;
  url = appendURLParams(url, params);
  const users = await get<DB.List<Weibo.User>>(url);
  return users;
}

export async function getTrackingUsers() {
  return getUserList({ limit: 9999, isTracking: true });
}

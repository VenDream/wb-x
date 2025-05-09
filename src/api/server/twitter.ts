/*
 * Twitter Serverside APIs
 *
 * @Author: VenDream
 * @Date: 2025-05-09 14:39:58
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { getApiHost } from '@/utils/api-host';
import { get } from '@/utils/request/server';
import { appendURLParams } from '@/utils/url';

type UserListParams = PaginationParams & Twitter.UserListFilterParams;

export async function getUserList(params: UserListParams) {
  let url = `${getApiHost()}/api/db/twitter/users/list`;
  url = appendURLParams(url, params);
  const users = await get<DB.List<Twitter.User>>(url);
  return users;
}

export async function getTrackingUsers() {
  return getUserList({ limit: 9999, isTracking: true });
}

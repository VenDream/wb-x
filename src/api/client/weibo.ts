/*
 * Weibo Clientside APIs
 *
 * @Author: VenDream
 * @Date: 2025-05-09 14:45:39
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { get, post } from '@/utils/request/client';
import { appendURLParams } from '@/utils/url';

type StatusListParams = PaginationParams & Weibo.StatusListFilterParams;
type StatusCommentsParams = {
  id: string;
  maxId?: string;
  orderBy?: Weibo.CommentsOrderBy;
};
type StatusCommentsRepliesParams = {
  id: string;
  maxId?: string;
  orderBy?: Weibo.CommentsRepliesOrderBy;
};

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */

type UserListParams = PaginationParams & Weibo.UserListFilterParams;

export async function getUserList(params: UserListParams) {
  let url = '/api/db/weibo/users/list';
  url = appendURLParams(url, params);
  const users = await get<DB.List<Weibo.User>>(url);
  return users;
}

export async function getUserByName(name: string) {
  let url = '/api/weibo/user/info';
  url = appendURLParams(url, { name });
  const data = await get<Weibo.User>(url);
  return data;
}

export async function trackUser(uid: string) {
  const url = '/api/weibo/user/track';
  const rlt = await post(url, { uid });
  return rlt;
}

export async function untrackUser(uid: string) {
  const url = '/api/weibo/user/untrack';
  const rlt = await post(url, { uid });
  return rlt;
}

/* -------------------------------------------------------------------------- */
/*                                   Status                                   */
/* -------------------------------------------------------------------------- */

export async function getStatusList(params: StatusListParams) {
  let url = '/api/db/weibo/status/list';
  if (params.startDate) params.startDate += ' 00:00:00';
  if (params.endDate) params.endDate += ' 23:59:59';
  url = appendURLParams(url, params);
  const statuses = await get<DB.List<Weibo.Status>>(url);
  return statuses;
}

export async function getStatusVideo(id: string) {
  let url = '/api/weibo/status/video';
  url = appendURLParams(url, { id });
  const { url: videoUrl } = await get<{ url: string }>(url);
  return videoUrl;
}

export async function getStatusComments(params: StatusCommentsParams) {
  let url = '/api/weibo/status/comments';
  url = appendURLParams(url, params);
  const comments = await get<Weibo.CommentList>(url);
  return comments;
}

export async function getStatusCommentsReplies(
  params: StatusCommentsRepliesParams
) {
  let url = '/api/weibo/status/comments/replies';
  url = appendURLParams(url, params);
  const comments = await get<Weibo.CommentList>(url);
  return comments;
}

export async function getStatusDetail(id: string) {
  let url = '/api/weibo/status/detail';
  url = appendURLParams(url, { id });
  const status = await get<Weibo.Status>(url);
  return status;
}

export async function favouriteStatus(uid: string, sid: string) {
  const url = '/api/weibo/status/favourite';
  const rlt = await post(url, { uid, statusId: sid });
  return rlt;
}

export async function unfavouriteStatus(uid: string, sid: string) {
  const url = '/api/weibo/status/unfavourite';
  const rlt = await post(url, { uid, statusId: sid });
  return rlt;
}

export async function refreshStatus(id: string) {
  const url = '/api/weibo/status/refresh';
  const rlt = await post<Weibo.Status>(url, { id });
  return rlt;
}

/* -------------------------------------------------------------------------- */
/*                                   Cookies                                  */
/* -------------------------------------------------------------------------- */

export async function listCookies() {
  const cookies = await get<DB.List<string>>('/api/weibo/cookies/list');
  return cookies;
}

export async function updateCookie(idx: number, cookie: string) {
  const rlt = await post('/api/weibo/cookies/update', { idx, cookie });
  return rlt;
}

export async function checkCookie(idx: number) {
  const rlt = await post<{ isValid: boolean }>('/api/weibo/cookies/check', {
    idx,
    notify: false,
  });
  return rlt;
}

export async function removeCookie(idx: number) {
  const rlt = await post('/api/weibo/cookies/remove', { idx });
  return rlt;
}

export async function appendCookie(cookie: string) {
  const rlt = await post('/api/weibo/cookies/append', { cookie });
  return rlt;
}

/* -------------------------------------------------------------------------- */
/*                                  Scanning                                  */
/* -------------------------------------------------------------------------- */

export async function triggerScan(params: Weibo.ScanningParams) {
  const scanParams: Weibo.ScanningParams = {
    ...params,
    triggerOnly: true,
  };
  const rlt = await post('/api/weibo/user/scan', scanParams);
  return rlt;
}

export async function triggerFullScan(uid: string) {
  const fullScanParams: Weibo.ScanningParams = {
    uid,
    all: true,
    upload: true,
    useCookie: true,
  };
  return triggerScan(fullScanParams);
}

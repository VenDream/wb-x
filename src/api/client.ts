/*
 * Clientside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-24 10:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { get, post } from '@/utils/request/client';
import { appendURLParams } from '@/utils/url';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type StatusListParams = PaginationParams & Backend.StatusListFilterParams;
type StatusCommentsParams = {
  id: string;
  maxId?: string;
  orderBy?: Backend.CommentsOrderBy;
};
type StatusCommentsRepliesParams = {
  id: string;
  maxId?: string;
  orderBy?: Backend.CommentsRepliesOrderBy;
};
type ROTNListParams = PaginationParams & {
  id?: string;
  type?: Backend.ROTN_TYPE;
};

/* -------------------------------------------------------------------------- */
/*                                   Status                                   */
/* -------------------------------------------------------------------------- */

export async function getStatusList(params: StatusListParams) {
  let url = '/api/db/weibo/status/list';
  if (params.startDate) params.startDate += ' 00:00:00';
  if (params.endDate) params.endDate += ' 23:59:59';
  url = appendURLParams(url, params);
  const statuses = await get<Backend.DBList<Backend.Status>>(url);
  return statuses;
}

export async function getStatusVideo(id: string) {
  let url = '/api/weibo/status/video';
  url = appendURLParams(url, { id });
  const { video: videoUrl } = await get<{ video: string }>(url);
  return videoUrl;
}

export async function getStatusComments(params: StatusCommentsParams) {
  let url = '/api/weibo/status/comments';
  url = appendURLParams(url, params);
  const comments = await get<Backend.StatusCommentList>(url);
  return comments;
}

export async function getStatusCommentsReplies(
  params: StatusCommentsRepliesParams
) {
  let url = '/api/weibo/status/comments/replies';
  url = appendURLParams(url, params);
  const comments = await get<Backend.StatusCommentList>(url);
  return comments;
}

export async function getStatusDetail(id: string) {
  let url = '/api/weibo/status/detail';
  url = appendURLParams(url, { id });
  const status = await get<Backend.Status>(url);
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

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */

export async function getUserByName(name: string) {
  let url = '/api/weibo/user/info';
  url = appendURLParams(url, { name });
  const data = await get<Backend.User>(url);
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
/*                                    ROTN                                    */
/* -------------------------------------------------------------------------- */

export async function getRotnList(params: ROTNListParams) {
  let url = '/api/db/rotn/items/list';
  url = appendURLParams(url, params);
  const items = await get<Backend.DBList<Backend.ROTNItem>>(url);
  return items;
}

/* -------------------------------------------------------------------------- */
/*                                   Cookies                                  */
/* -------------------------------------------------------------------------- */

export async function listCookies() {
  const cookies = await get<Backend.DBList<string>>('/api/weibo/cookies/list');
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

export async function triggerScan(params: Backend.ScanningParams) {
  const scanParams: Backend.ScanningParams = {
    ...params,
    triggerOnly: true,
  };
  const rlt = await post('/api/weibo/scan', scanParams);
  return rlt;
}

export async function triggerFullScan(uid: string) {
  const fullScanParams: Backend.ScanningParams = {
    uid,
    all: true,
    upload: true,
    useCookie: true,
  };
  return triggerScan(fullScanParams);
}

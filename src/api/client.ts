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

const WBU_PROXY = process.env.NEXT_PUBLIC_WBU_PROXY;

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
  type?: Backend.ROTN_TYPE;
};

/* -------------------------------------------------------------------------- */
/*                                   Status                                   */
/* -------------------------------------------------------------------------- */

export async function getStatusList(params: StatusListParams) {
  let url = '/api/db/weibo/status/list';
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

export async function getUserIdByName(name: string) {
  const url = `${WBU_PROXY}/n/${name}`;
  const data = await get<{ uid: string }>(url);
  return data;
}

export async function searchUserById(uid: string) {
  let url = '/api/weibo/user/info';
  url = appendURLParams(url, { uid });
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

export async function getDbRotnList(params: ROTNListParams) {
  let url = '/api/db/rotn/list';
  url = appendURLParams(url, params);
  const items = await get<Backend.DBList<Backend.ROTNItem>>(url);
  return items;
}

/* -------------------------------------------------------------------------- */
/*                                   Configs                                  */
/* -------------------------------------------------------------------------- */

export async function getSystemConfig() {
  const config = await get<string>('/api/config');
  return config;
}

export async function saveSystemConfig(configStr: string, locale: string) {
  const rlt = await post('/api/config', { config: configStr, locale });
  return rlt;
}

/* -------------------------------------------------------------------------- */
/*                                   Cookies                                  */
/* -------------------------------------------------------------------------- */

export async function listCookies() {
  const config = await get<Backend.Cookie[]>('/api/weibo/cookie/list');
  return config;
}

export async function updateCookie(idx: number, raw: string | string[]) {
  const rlt = await post('/api/weibo/cookie/update', { idx, cookie: raw });
  return rlt;
}

export async function checkCookie(cookie: string) {
  const rlt = await post('/api/weibo/cookie/check', { cookie });
  return rlt;
}

export async function removeCookie(idx: number) {
  const rlt = await post('/api/weibo/cookie/remove', { idx });
  return rlt;
}

export async function appendCookie(cookie: string) {
  const rlt = await post('/api/weibo/cookie/append', { cookie: cookie });
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

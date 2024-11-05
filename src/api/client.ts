/*
 * Clientside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-24 10:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { omit } from '@/utils/common';
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

export async function getDbStatusList(params: StatusListParams) {
  let url = '/api/db/status/list';
  params = omit(params, ['dataSource']);
  if (params.endDate) params.endDate += ' 23:59:59';
  url = appendURLParams(url, params);
  let statuses = await get<Backend.StatusList>(url);
  return statuses;
}

export async function getDbRetweetStatusList(params: StatusListParams) {
  let url = '/api/db/retweet_status/list';
  params = omit(params, ['dataSource']);
  if (params.endDate) params.endDate += ' 23:59:59';
  url = appendURLParams(url, params);
  const retweetStatuses = await get<Backend.RetweetStatusList>(url);
  const statuses: Backend.StatusList = {
    statuses: retweetStatuses.retweetStatuses,
    count: retweetStatuses.count,
    total: retweetStatuses.total,
  };
  return statuses;
}

export async function getDbStatusVideo(id: string) {
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

export async function getWeiboStatusDetail(id: string) {
  let url = '/api/weibo/status/detail';
  url = appendURLParams(url, { id });
  const status = await get<Backend.Status>(url);
  return status;
}

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */

export async function getTrackingUsers() {
  const url = '/api/config/users/list';
  const data = await get<{ userIds: string[]; count: number }>(url, {
    next: { tags: ['tracking-users'] },
  });
  return data;
}

export async function getUserIdByName(name: string) {
  let url = `${WBU_PROXY}/n/${name}`;
  const data = await get<{ uid: string }>(url);
  return data;
}

export async function searchUserById(uid: string) {
  let url = '/api/weibo/user/info';
  url = appendURLParams(url, { uid });
  const data = await get<Backend.User>(url);
  return data;
}

export async function appendTrackingUser(userId: string) {
  const url = '/api/config/users/append';
  const rlt = await post(url, { userId });
  return rlt;
}

export async function removeTrackingUser(userId: string) {
  const url = '/api/config/users/remove';
  const rlt = await post(url, { userId });
  return rlt;
}

/* -------------------------------------------------------------------------- */
/*                                    ROTN                                    */
/* -------------------------------------------------------------------------- */

export async function getDbRotnList(params: ROTNListParams) {
  let url = '/api/db/rotn/list';
  url = appendURLParams(url, params);
  const items = await get<Backend.ROTNItemList>(url);
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

export async function updateCookie(idx: number, raw: string | any[]) {
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
  const rlt = await post('/api/weibo/scan', { ...params, trigger: true });
  return rlt;
}

export async function triggerFullScan(uid: string) {
  const fullScanParams: Backend.ScanningParams = {
    uid,
    all: true,
    useCookie: true,
  };
  return triggerScan(fullScanParams);
}

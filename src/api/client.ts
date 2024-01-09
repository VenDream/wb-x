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

type StatusListParams = PaginationParams & Backend.StatusListFilterParams;
type StatusCommentsParams = {
  id: string;
  maxId?: string;
  orderBy?: Backend.StatusCommentOrderBy;
};
type ROTNListParams = PaginationParams & {
  type?: Backend.ROTN_TYPE;
};

export async function getDbStatusList(params: StatusListParams) {
  let url = '/api/db/status/list';
  if (params.endDate) params.endDate += ' 23:59:59';
  url = appendURLParams(url, params);
  let statuses = await get<Backend.StatusList>(url);
  // if no statuses, check retweet status instead
  if (!statuses.statuses?.length) {
    const retweetStatuses = await getDbRetweetStatusList(params);
    statuses = {
      total: retweetStatuses.total,
      count: retweetStatuses.count,
      statuses: retweetStatuses.retweetStatuses,
    };
  }
  return statuses;
}

export async function getDbRetweetStatusList(params: StatusListParams) {
  let url = '/api/db/retweet_status/list';
  if (params.endDate) params.endDate += ' 23:59:59';
  url = appendURLParams(url, params);
  const statuses = await get<Backend.RetweetStatusList>(url);
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

export async function getStatusCommentsReplies(params: StatusCommentsParams) {
  let url = '/api/weibo/status/comments/replies';
  url = appendURLParams(url, params);
  const comments = await get<Backend.StatusCommentList>(url);
  return comments;
}

export async function getDbRotnList(params: ROTNListParams) {
  let url = '/api/db/rotn/list';
  url = appendURLParams(url, params);
  const items = await get<Backend.ROTNItemList>(url);
  return items;
}

export async function getSystemConfig() {
  const config = await get<string>('/api/config');
  return config;
}

export async function saveSystemConfig(configStr: string) {
  const rlt = await post('/api/config', { config: configStr });
  return rlt;
}

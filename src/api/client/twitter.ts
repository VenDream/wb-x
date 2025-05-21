/*
 * Twitter Clientside APIs
 *
 * @Author: VenDream
 * @Date: 2025-05-09 14:46:41
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { get, post } from '@/utils/request/client';
import { appendURLParams } from '@/utils/url';

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */

type UserListParams = PaginationParams & Twitter.UserListFilterParams;

export async function getUserList(params: UserListParams) {
  let url = '/api/db/twitter/users/list';
  url = appendURLParams(url, params);
  const users = await get<DB.List<Twitter.User>>(url);
  return users;
}

export async function getUserByName(name: string) {
  let url = '/api/twitter/user/info';
  url = appendURLParams(url, { name });
  const data = await get<Twitter.User>(url);
  return data;
}

export async function trackUser(uid: string) {
  const url = '/api/twitter/user/track';
  const rlt = await post(url, { uid });
  return rlt;
}

export async function untrackUser(uid: string) {
  const url = '/api/twitter/user/untrack';
  const rlt = await post(url, { uid });
  return rlt;
}

/* -------------------------------------------------------------------------- */
/*                                   Tweets                                   */
/* -------------------------------------------------------------------------- */

type TweetListParams = PaginationParams & Twitter.TweetListFilterParams;

export async function getTweetList(params: TweetListParams) {
  let url = '/api/db/twitter/tweets/list';
  url = appendURLParams(url, params);
  const tweets = await get<DB.List<Twitter.Tweet>>(url);
  return tweets;
}

export async function getTweetDetail(id: string) {
  let url = '/api/twitter/tweet/detail';
  url = appendURLParams(url, { id });
  const tweet = await get<Twitter.Tweet>(url);
  return tweet;
}

export async function favouriteTweet(uid: string, tid: string) {
  const url = '/api/twitter/tweet/favourite';
  const rlt = await post(url, { uid, tweetId: tid });
  return rlt;
}

export async function unfavouriteTweet(uid: string, tid: string) {
  const url = '/api/twitter/tweet/unfavourite';
  const rlt = await post(url, { uid, tweetId: tid });
  return rlt;
}

export async function refreshTweet(id: string) {
  const url = '/api/twitter/tweet/refresh';
  const rlt = await post<Twitter.Tweet>(url, { id });
  return rlt;
}

/* -------------------------------------------------------------------------- */
/*                                  Scanning                                  */
/* -------------------------------------------------------------------------- */

export async function triggerScan(params: Twitter.ScanningParams) {
  const scanParams: Twitter.ScanningParams = {
    ...params,
    triggerOnly: true,
  };
  const rlt = await post('/api/twitter/user/scan', scanParams);
  return rlt;
}

export async function triggerFullScan(uid: string) {
  const fullScanParams: Twitter.ScanningParams = {
    uid,
    all: true,
    upload: true,
  };
  return triggerScan(fullScanParams);
}

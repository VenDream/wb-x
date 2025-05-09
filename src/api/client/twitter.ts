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

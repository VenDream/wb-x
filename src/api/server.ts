/*
 * Serverside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-18 14:40:26
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getApiHost } from '@/utils';

interface DbInfo {
  /** db file size */
  fileSize: string;
  records: {
    /** user records */
    user: number;
    /** status records */
    status: number;
    /** retweet status records */
    retweetStatus: number;
    /** rotn records */
    rotn: number;
  };
}

/** get database info */
export async function getDatabaseInfo() {
  const apiHost = getApiHost();
  const res = await fetch(apiHost + '/api/db/info');
  const info = (await res.json()).data as DbInfo;
  return info;
}

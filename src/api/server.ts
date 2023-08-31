/*
 * Serverside APIs
 *
 * @Author: VenDream
 * @Date: 2023-08-18 14:40:26
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getApiHost } from '@/utils/api-host';
import { get } from '@/utils/request';

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
  const url = getApiHost() + '/api/db/info';
  const info = await get<DbInfo>(url);
  return info;
}

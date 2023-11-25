/*
 * Weibo Status Detail
 *
 * @Author: VenDream
 * @Date: 2023-11-23 11:42:51
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbRetweetStatusDetail, getDbStatusDetail } from '@/api/server';
import NoData from '@/components/common/no-data';
import StatusCard from './_card';

export default async function Page({ params }: ParamsBody) {
  const { id } = params;
  let status: Backend.Status;

  // try status first
  status = await getDbStatusDetail(id);
  // if not found, try retweet status
  if (!status) {
    status = await getDbRetweetStatusDetail(id);
  }

  return (
    <div className="status-detail flex flex-col items-center overflow-auto py-4">
      {status ? <StatusCard status={status} /> : <NoData />}
    </div>
  );
}

/*
 * Weibo Status Detail
 *
 * @Author: VenDream
 * @Date: 2023-11-23 11:42:51
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbStatusDetail } from '@/api/server';
import StatusCard from './card';

export default async function Page({ params }: ParamsBody) {
  const { id } = params;
  const status = await getDbStatusDetail(id);

  return (
    <div className="status-detail flex h-full flex-col items-center">
      <StatusCard status={status} />
    </div>
  );
}

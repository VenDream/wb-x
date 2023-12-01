'use client';

/*
 * Weibo Status List Page
 *
 * @Author: VenDream
 * @Date: 2023-12-01 17:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbStatusList } from '@/api/client';
import VirtualList, {
  VirtualListProps,
} from '@/components/common/virtual-list';
import { dedupeStatusList } from '@/utils/weibo';
import { StatusCard } from '../detail';

export default function Page() {
  const listProps: VirtualListProps<Backend.Status, Backend.StatusList> = {
    getDataFetcher: params => () => getDbStatusList(params),
    getDataParser: () => data => data.statuses,
    getRowItemKey: (_, list) => list.id,
    renderRowItemContent: (ref, data) => <StatusCard ref={ref} status={data} />,
    concatList: (prevList, list) => dedupeStatusList([...prevList, ...list]),
    className: 'status-list',
    estimatedRowHeight: 500,
  };

  return <VirtualList {...listProps} />;
}

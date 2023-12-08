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
  VirtualListHandle,
  VirtualListProps,
} from '@/components/common/virtual-list';
import { dedupeStatusList } from '@/utils/weibo';
import { useCallback, useRef, useState } from 'react';
import { StatusCard } from '../detail';
import Filter from './_filter';

export default function Page() {
  const listRef = useRef<VirtualListHandle>(null);

  const [filterParams, setFilterParams] =
    useState<Backend.StatusListFilterParams>({
      uid: '',
      keyword: '',
      startDate: '',
      endDate: '',
      needTotal: true,
    });

  const listProps: VirtualListProps<Backend.Status, Backend.StatusList> = {
    getDataFetcher: params => () =>
      getDbStatusList({ ...params, ...filterParams }),
    getDataParser: () => data => data.statuses,
    getRowItemKey: (_, list) => list.id,
    renderRowItemContent: data => <StatusCard status={data} />,
    concatList: (prevList, list) => dedupeStatusList([...prevList, ...list]),
    className: 'status-list pl-64 2xl:pl-0',
    estimatedRowHeight: 500,
  };

  const updateFilterParams = useCallback(
    (patch: Partial<Backend.StatusListFilterParams>) => {
      setFilterParams(params => ({ ...params, ...patch }));
      listRef.current?.reset();
    },
    []
  );

  return (
    <div className="relative h-full">
      <VirtualList {...listProps} ref={listRef} />
      <Filter
        filterParams={filterParams}
        updateFilterParams={updateFilterParams}
      />
    </div>
  );
}

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
import { Divider } from '@/components/daisyui';
import { dedupeStatusList } from '@/utils/weibo';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { StatusCard } from '../detail';
import Filter from './_filter';

export default function Page() {
  const t = useTranslations('pages.status.filter');
  const listRef = useRef<VirtualListHandle>(null);
  const [total, setTotal] = useState(-1);

  const [filterParams, setFilterParams] =
    useState<Backend.StatusListFilterParams>({
      uid: '',
      keyword: '',
      original: false,
      hasImages: false,
      startDate: '',
      endDate: '',
      needTotal: true,
    });

  const listProps: VirtualListProps<Backend.Status, Backend.StatusList> = {
    getDataFetcher: params => () =>
      getDbStatusList({ ...params, ...filterParams }),
    getDataParser: () => data => data.statuses,
    getTotalParser: () => data => data.total as number,
    getRowItemKey: (_, list) => list.id,
    renderRowItemContent: data => <StatusCard status={data} />,
    concatList: (prevList, list) => dedupeStatusList([...prevList, ...list]),
    onTotalUpdate: total => setTotal(total),
    className: 'status-list pl-72 2xl:pl-0',
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
      <div className="absolute left-0 top-0">
        <Filter
          filterParams={filterParams}
          updateFilterParams={updateFilterParams}
        />
        {total >= 0 && (
          <div className="w-72">
            <Divider className="before:h-[1px] after:h-[1px]" />
            <p className="text-xs italic text-base-content/80">
              {t('totalStatuses', { num: total })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

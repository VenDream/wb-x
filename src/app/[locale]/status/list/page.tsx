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
import { Divider, DropdownItem } from '@/components/daisyui';
import { dedupeStatusList } from '@/utils/weibo';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { CardContext } from '../detail';
import { StatusCard } from '../detail';
import Filter from './_filter';

const defaultFilterParams: Backend.StatusListFilterParams = {
  uid: '',
  keyword: '',
  original: false,
  hasImages: false,
  startDate: '',
  endDate: '',
  needTotal: true,
};

export default function Page() {
  const t1 = useTranslations('pages.status.filter');
  const t2 = useTranslations('pages.status.menu');
  const listRef = useRef<VirtualListHandle>(null);
  const [total, setTotal] = useState(-1);

  const [filterParams, setFilterParams] =
    useState<Backend.StatusListFilterParams>(defaultFilterParams);

  const updateFilterParams = useCallback(
    (patch: Partial<Backend.StatusListFilterParams>) => {
      setFilterParams(params => ({ ...params, ...patch }));
      listRef.current?.reset();
    },
    []
  );

  const renderCustomMenus = useCallback(
    (ctx: CardContext) => {
      const { user } = ctx.status!;

      return (
        <DropdownItem anchor={false}>
          <span
            className="rounded p-2"
            onClick={() => {
              updateFilterParams({ ...defaultFilterParams, uid: user.id });
            }}
          >
            <ListBulletIcon />
            {t2('opPosts')}
          </span>
        </DropdownItem>
      );
    },
    [t2, updateFilterParams]
  );

  const listProps: VirtualListProps<Backend.Status, Backend.StatusList> =
    useMemo(
      () => ({
        getDataFetcher: params => () =>
          getDbStatusList({ ...params, ...filterParams }),
        getDataParser: () => data => data.statuses,
        getTotalParser: () => data => data.total as number,
        getRowItemKey: (_, list) => list.id,
        renderRowItemContent: data => (
          <StatusCard status={data} renderCustomMenus={renderCustomMenus} />
        ),
        concatList: (prevList, list) =>
          dedupeStatusList([...prevList, ...list]),
        onTotalUpdate: total => setTotal(total),
        className: 'status-list pl-72 2xl:pl-0',
        estimatedRowHeight: 500,
      }),
      [filterParams, renderCustomMenus]
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
              {t1('totalStatuses', { num: total })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

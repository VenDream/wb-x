'use client';

/*
 * Weibo Status List
 *
 * @Author: VenDream
 * @Date: 2023-12-01 17:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getStatusList } from '@/api/client';
import Loading from '@/components/common/loading';
import VirtualList, {
  type VirtualListHandle,
  type VirtualListProps,
} from '@/components/common/virtual-list';
import { ESTIMATE_COUNT } from '@/constants';
import useFavUid from '@/hooks/use-fav-uid';
import useUser from '@/hooks/use-user';
import { cn } from '@/utils/classnames';
import { dedupeStatusList } from '@/utils/weibo';
import { CircleHelpIcon, ListRestartIcon, ScanSearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StatusCard } from '../detail';
import Filter from './_filter';

export const defaultFilterParams: Backend.StatusListFilterParams = {
  order: 'desc',
  orderBy: 'createdAt',
  isTracking: true,
};

export default function StatusList() {
  const t = useTranslations('pages.status');
  const listRef = useRef<VirtualListHandle>(null);
  const [total, setTotal] = useState(-1);
  const [isFetching, setIsFetching] = useState(false);

  const favUid = useFavUid();
  const { isInited } = useUser();
  const searchParams = useSearchParams();

  const [filterParams, setFilterParams] =
    useState<Backend.StatusListFilterParams>(() => {
      const uid = searchParams.get('uid');
      const initParams = { ...defaultFilterParams };
      if (typeof window === 'undefined') return initParams;
      uid && (initParams.uid = uid);
      return initParams;
    });

  const updateFilterParams = useCallback(
    (patch: Partial<Backend.StatusListFilterParams>) => {
      setFilterParams(params => ({ ...params, ...patch }));
      listRef.current?.reset();
    },
    []
  );

  const resetFilterParams = useCallback(() => {
    setFilterParams(params => ({
      ...defaultFilterParams,
      favUid: params.favUid,
    }));
    listRef.current?.reset();
  }, []);

  const listProps: VirtualListProps<
    Backend.Status,
    Backend.DBList<Backend.Status>
  > = useMemo(
    () => ({
      getDataFetcher: params => () =>
        getStatusList({ ...params, ...filterParams }),
      getDataParser: () => data => data.list,
      getTotalParser: () => data => data.total as number,
      getRowItemKey: (_, item) => item.id,
      renderRowItemContent: data => <StatusCard status={data} />,
      concatList: (prevList, list) => dedupeStatusList([...prevList, ...list]),
      onTotalUpdate: total => setTotal(total),
      onDataFetchingStart: () => setIsFetching(true),
      onDataFetchingEnd: () => setIsFetching(false),
      className: 'pl-72 2xl:pl-0',
      estimatedRowHeight: 500,
      noDataProps: {
        tips: t('noData'),
        tooltips: t('noDataTips'),
        tooltipsClassName: 'text-xs',
        icon: <CircleHelpIcon size={16} className="!stroke-2" />,
      },
    }),
    [t, filterParams]
  );

  useEffect(() => {
    if (isInited) {
      updateFilterParams({ favUid });
    }
  }, [isInited, updateFilterParams, favUid]);

  return (
    <div className="relative h-[calc(100vh-8rem)]">
      {isInited && filterParams.favUid && (
        <VirtualList {...listProps} ref={listRef} />
      )}
      <div className="absolute top-0 left-0">
        <Filter
          filterParams={filterParams}
          resetFilterParams={resetFilterParams}
          updateFilterParams={updateFilterParams}
        />
        <div
          className={cn(
            'text-base-content/80 mt-6 flex w-72 flex-col gap-2 pt-4 text-xs',
            'border-base-content/10 border-t drop-shadow-md'
          )}
        >
          <p className="flex items-center">
            <ListRestartIcon size={18} className="mr-2" />
            {t('updateFrequency')}
          </p>
          {isFetching ? (
            <Loading
              size={16}
              textClass="text-base-content/80 text-xs"
              loaderClass="text-base-content/80"
            />
          ) : total >= 0 ? (
            <p className="flex items-center">
              <ScanSearchIcon size={18} className="mr-2" />
              {t.rich('filter.totalStatuses', {
                s: () => <>&nbsp;</>,
                total: () => (
                  <span className="text-accent underline underline-offset-4">
                    {total === ESTIMATE_COUNT ? '1000+' : total}
                  </span>
                ),
              })}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

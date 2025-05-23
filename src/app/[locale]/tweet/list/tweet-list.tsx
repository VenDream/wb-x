'use client';

/*
 * Twitter Tweet List
 *
 * @Author: VenDream
 * @Date: 2025-05-15 10:19:25
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { twitter } from '@/api/client';
import { TweetCard } from '@/app/[locale]/tweet/_card';
import Loading from '@/components/common/loading';
import VirtualList, {
  type VirtualListHandle,
  type VirtualListProps,
} from '@/components/common/virtual-list';
import { ESTIMATE_COUNT } from '@/constants';
import useFavUid from '@/hooks/use-fav-uid';
import useUser from '@/hooks/use-user';
import { cn } from '@/utils/classnames';
import { dedupeTweetList } from '@/utils/twitter';
import { CircleHelpIcon, ListRestartIcon, ScanSearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Filter from './filter';

export const defaultFilterParams: Twitter.TweetListFilterParams = {
  order: 'desc',
  orderBy: 'createdAt',
  isTracking: true,
};

export default function TweetList() {
  const t = useTranslations('pages.tweet');
  const listRef = useRef<VirtualListHandle>(null);
  const [total, setTotal] = useState(-1);
  const [isFetching, setIsFetching] = useState(false);

  const favUid = useFavUid();
  const { isInited } = useUser();
  const searchParams = useSearchParams();

  const [filterParams, setFilterParams] =
    useState<Twitter.TweetListFilterParams>(() => {
      const uid = searchParams.get('uid');
      const initParams = { ...defaultFilterParams };
      if (typeof window === 'undefined') return initParams;
      uid && (initParams.uid = uid);
      return initParams;
    });

  const updateFilterParams = useCallback(
    (patch: Partial<Twitter.TweetListFilterParams>) => {
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
    Twitter.Tweet,
    DB.List<Twitter.Tweet>
  > = useMemo(
    () => ({
      getDataFetcher: params => () =>
        twitter.getTweetList({ ...params, ...filterParams }),
      getDataParser: () => data => data.list,
      getTotalParser: () => data => data.total as number,
      getRowItemKey: (_, item) => item.id,
      renderRowItemContent: data => <TweetCard tweet={data} />,
      concatList: (prevList, list) => dedupeTweetList([...prevList, ...list]),
      onTotalUpdate: total => setTotal(total),
      onDataFetchingStart: () => setIsFetching(true),
      onDataFetchingEnd: () => setIsFetching(false),
      className: 'pl-72 2xl:pl-4',
      estimatedRowHeight: 500,
      noDataProps: {
        tips: t('noData'),
        tooltips: t('noDataTips'),
        tooltipsClassName: 'text-xs',
        icon: <CircleHelpIcon size={16} />,
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
              {t.rich('filter.totalTweets', {
                s: () => <>&nbsp;</>,
                total: () => (
                  <span className="text-accent underline underline-offset-2">
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

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
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Filter from './filter';
import {
  BOOLEAN_PARAMS_KEYS,
  DEFAULT_FILTER_PARAMS,
  NUMBER_PARAMS_KEYS,
  PARAMS_KEYS,
  STRING_PARAMS_KEYS,
} from './params';

export default function TweetList() {
  const t = useTranslations('pages.tweet');
  const router = useRouter();

  const listRef = useRef<VirtualListHandle>(null);
  const [total, setTotal] = useState(-1);
  const [isFetching, setIsFetching] = useState(false);

  const favUid = useFavUid();
  const { isInited } = useUser();
  const searchParams = useSearchParams();

  const getInitialParams = useCallback(() => {
    const initParams: Record<string, any> = {
      ...DEFAULT_FILTER_PARAMS,
    };
    for (const key of PARAMS_KEYS) {
      const value = searchParams.get(key);

      if (BOOLEAN_PARAMS_KEYS.includes(key)) {
        initParams[key] = value === 'true' ? true : undefined;
      }

      if (value === undefined || value === null) continue;

      if (NUMBER_PARAMS_KEYS.includes(key)) {
        initParams[key] = Number(value);
      } else if (STRING_PARAMS_KEYS.includes(key)) {
        initParams[key] = value;
      }
    }

    return initParams;
  }, [searchParams]);

  const setParamsToSearchParams = useCallback(
    (params: Twitter.TweetListFilterParams) => {
      const searchParams = new URLSearchParams();

      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        const paramsKey = key as keyof Twitter.TweetListFilterParams;

        if (BOOLEAN_PARAMS_KEYS.includes(paramsKey)) {
          value === true && searchParams.set(key, 'true');
        } else if (NUMBER_PARAMS_KEYS.includes(paramsKey)) {
          searchParams.set(key, String(value));
        } else if (STRING_PARAMS_KEYS.includes(paramsKey)) {
          searchParams.set(key, value);
        }
      }
      router.replace(`?${searchParams.toString()}`);
    },
    [router]
  );

  const [filterParams, setFilterParams] =
    useState<Twitter.TweetListFilterParams>(getInitialParams);

  const updateFilterParams = useCallback(
    (patch: Partial<Twitter.TweetListFilterParams>) => {
      setFilterParams(params => {
        const newParams = { ...params, ...patch };
        setTimeout(() => {
          setParamsToSearchParams(newParams);
        });
        return newParams;
      });
      listRef.current?.reset();
    },
    [setParamsToSearchParams]
  );

  const resetFilterParams = useCallback(() => {
    setFilterParams(params => {
      const newParams = { ...DEFAULT_FILTER_PARAMS, favUid: params.favUid };
      setTimeout(() => {
        setParamsToSearchParams(newParams);
      });
      return newParams;
    });
    listRef.current?.reset();
  }, [setParamsToSearchParams]);

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
    <div className="relative h-[calc(100dvh-8rem)]">
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
            'border-base-content/10 border-t drop-shadow-xs'
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

'use client';

/*
 * Weibo Status List
 *
 * @Author: VenDream
 * @Date: 2023-12-01 17:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { weibo } from '@/api/client';
import { StatusCard } from '@/app/[locale]/status/_card';
import {
  DEFAULT_FILTER_PARAMS,
  Filter,
  MiniFilter,
} from '@/app/[locale]/status/_filter';
import {
  BOOLEAN_PARAMS_KEYS,
  NUMBER_PARAMS_KEYS,
  PARAMS_KEYS,
  STRING_PARAMS_KEYS,
} from '@/app/[locale]/status/_filter/params';
import Loading from '@/components/common/loading';
import VirtualList, {
  type VirtualListHandle,
  type VirtualListProps,
} from '@/components/common/virtual-list';
import { Button } from '@/components/daisyui';
import { ESTIMATE_COUNT } from '@/constants';
import useFavUid from '@/hooks/use-fav-uid';
import { useIsMobile } from '@/hooks/use-media-query';
import useUser from '@/hooks/use-user';
import { cn } from '@/utils/classnames';
import { dedupeStatusList } from '@/utils/weibo';
import {
  CircleHelpIcon,
  ListRestartIcon,
  RefreshCcwIcon,
  ScanSearchIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function StatusList() {
  const t = useTranslations('pages.status');
  const router = useRouter();
  const isMobile = useIsMobile();

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
    (params: Weibo.StatusListFilterParams) => {
      const searchParams = new URLSearchParams();

      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        const paramsKey = key as keyof Weibo.StatusListFilterParams;

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
    useState<Weibo.StatusListFilterParams>(getInitialParams);

  const updateFilterParams = useCallback(
    (patch: Partial<Weibo.StatusListFilterParams>) => {
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
    Weibo.Status,
    DB.List<Weibo.Status>
  > = useMemo(
    () => ({
      gutter: isMobile ? 0 : 10,
      getDataFetcher: params => () =>
        weibo.getStatusList({ ...params, ...filterParams }),
      getDataParser: () => data => data.list,
      getTotalParser: () => data => data.total as number,
      getRowItemKey: (_, item) => item.id,
      renderRowItemContent: data => <StatusCard status={data} />,
      concatList: (prevList, list) => dedupeStatusList([...prevList, ...list]),
      onTotalUpdate: total => setTotal(total),
      onDataFetchingStart: () => setIsFetching(true),
      onDataFetchingEnd: () => setIsFetching(false),
      className: 'pl-0 lg:pl-72 2xl:pl-4',
      estimatedRowHeight: 500,
      noDataProps: {
        tips: t('noData'),
        tooltips: t('noDataTips'),
        tooltipsClassName: 'text-xs',
        icon: <CircleHelpIcon size={16} />,
      },
    }),
    [isMobile, t, filterParams]
  );

  useEffect(() => {
    if (isInited) {
      updateFilterParams({ favUid });
    }
  }, [isInited, updateFilterParams, favUid]);

  return (
    <div
      className={cn(
        'no-scrollbar lg:scrollbar relative overflow-y-auto',
        'h-[calc(100dvh-3.5rem)] lg:h-[calc(100dvh-8rem)]'
      )}
    >
      {true && isInited && filterParams.favUid && (
        <VirtualList {...listProps} ref={listRef} />
      )}
      <Button
        circle
        onClick={() => updateFilterParams({})}
        className={cn(
          'fixed right-5 bottom-18 h-10 w-10 shadow-xs lg:right-15 lg:bottom-15',
          'bg-base-content/10 border-base-content/10 border backdrop-blur-lg'
        )}
      >
        <RefreshCcwIcon size={18} />
      </Button>
      <MiniFilter
        total={total}
        filterParams={filterParams}
        resetFilterParams={resetFilterParams}
        updateFilterParams={updateFilterParams}
      />
      <div className="absolute top-0 left-0 hidden lg:block">
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
              {t.rich('filter.totalStatuses', {
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

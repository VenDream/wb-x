'use client';

/*
 * Weibo Status List
 *
 * @Author: VenDream
 * @Date: 2023-11-29 15:54:52
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbStatusList } from '@/api/client';
import NoData from '@/components/common/no-data';
import useToast from '@/components/common/toast';
import { PAGINATION_LIMIT } from '@/contants';
import { dedupeStatusList } from '@/utils/weibo';
import clsx from 'clsx';
import memoize from 'memoize-one';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Loading } from 'react-daisyui';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Row from './row';

const LOADING_THRESHOLD = 5;
const ESTIMATED_ROW_H = 500;

const getListCtx = memoize(
  (
    list: Backend.Status[],
    setRowHeight: (index: number, height: number) => void
  ) => ({
    list,
    setRowHeight,
  })
);

export default function StatusList() {
  const t = useTranslations('global.dataFetching');
  const listRef = useRef<VariableSizeList>();
  const { showInfoTips, showErrorTips } = useToast();

  const [pageNo, setPageNo] = useState(0);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [statusList, setStatusList] = useState<Backend.Status[]>([]);
  const rowHeightsRef = useRef<Record<string, number>>({});

  const fetchStatuses = useCallback(async () => {
    try {
      setIsLoading(true);
      const limit = PAGINATION_LIMIT;
      const offset = pageNo * limit;
      const { statuses: list = [] } = await getDbStatusList({
        limit,
        offset,
      });
      if (pageNo === 0) {
        setStatusList(list);
      } else {
        setStatusList(prevList => dedupeStatusList([...prevList, ...list]));
      }
      if (list.length < limit) setIsLoadAll(true);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      showErrorTips(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [pageNo, showErrorTips]);

  const getRowHeight = useCallback((idx: number) => {
    return rowHeightsRef.current[idx] || 50;
  }, []);

  const setRowHeight = useCallback((idx: number, height: number) => {
    const hasMeasured = !!rowHeightsRef.current[idx];
    if (hasMeasured) return;

    listRef.current?.resetAfterIndex(0);
    rowHeightsRef.current = {
      ...rowHeightsRef.current,
      [idx]: height,
    };
    console.log('set row height: ', idx, height);
  }, []);

  const itemData = getListCtx(statusList, setRowHeight);
  const isNoData = pageNo === 0 && isLoadAll;
  const isFirstLoading = pageNo === 0 && isLoading;

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  useEffect(() => {
    pageNo > 0 && isLoadAll && showInfoTips(t('noMore'));
  }, [isLoadAll, pageNo, showInfoTips, t]);

  return (
    <div
      className={clsx(
        'status-list relative m-auto h-full',
        (isNoData || isFirstLoading) && 'flex items-center justify-center'
      )}
    >
      {isFirstLoading ? (
        <Loading color="primary" />
      ) : isNoData ? (
        <NoData />
      ) : (
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              threshold={LOADING_THRESHOLD}
              isItemLoaded={idx => isLoadAll || idx < statusList.length}
              itemCount={isLoadAll ? statusList.length : statusList.length + 1}
              loadMoreItems={() => setPageNo(pageNo + 1)}
            >
              {({ onItemsRendered, ref }) => (
                <VariableSizeList
                  ref={(list: VariableSizeList) => {
                    listRef.current = list;
                    ref(list);
                  }}
                  width={width}
                  height={height}
                  useIsScrolling
                  itemData={itemData}
                  itemSize={getRowHeight}
                  itemCount={statusList.length}
                  itemKey={idx => statusList[idx].id}
                  onItemsRendered={onItemsRendered}
                  /**
                   * @FIXME scroll shrinks
                   * @refer https://github.com/bvaughn/react-window/issues/408
                   */
                  estimatedItemSize={ESTIMATED_ROW_H}
                >
                  {Row}
                </VariableSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      )}
    </div>
  );
}

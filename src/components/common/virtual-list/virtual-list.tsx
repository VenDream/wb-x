'use client';

/*
 * Virutal List with infinite scrolling
 *
 * @Author: VenDream
 * @Date: 2023-12-01 14:31:30
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import NoData from '@/components/common/no-data';
import useToast from '@/components/common/toast';
import clsx from 'clsx';
import memoize from 'memoize-one';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Loading } from 'react-daisyui';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { VirtualListContext } from './context';
import ListRow from './list-row';
import type { VirtualListCtx, VirtualListProps } from './types';

export default function VirtualList<T, R>(props: VirtualListProps<T, R>) {
  const {
    getDataFetcher,
    getDataParser,
    getRowItemKey,
    renderRowItemContent,
    pageSize = 10,
    concatList = Array.prototype.concat,
    className = '',
    loadingThreshold = 5,
    estimatedRowHeight = 50,
  } = props;

  const t = useTranslations('global.dataFetching');
  const listRef = useRef<VariableSizeList>();
  const { showInfoTips, showErrorTips } = useToast();

  const [pageNo, setPageNo] = useState(0);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dataList, setDataList] = useState<T[]>([]);
  const rowHeightsRef = useRef<Record<string, number>>({});

  const fetchDataList = useCallback(async () => {
    try {
      setIsLoading(true);
      const limit = pageSize;
      const offset = pageNo * limit;
      const parseListData = getDataParser();
      const dataFetcher = getDataFetcher({ limit, offset });
      const data = await dataFetcher();
      const list = parseListData(data);

      if (pageNo === 0) {
        setDataList(list);
      } else {
        setDataList(prevList => concatList(prevList, list));
      }
      if (list.length < limit) setIsLoadAll(true);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      showErrorTips(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [
    concatList,
    getDataFetcher,
    getDataParser,
    pageNo,
    pageSize,
    showErrorTips,
  ]);

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
  }, []);

  const isNoData = pageNo === 0 && isLoadAll;
  const isFirstLoading = pageNo === 0 && isLoading;

  const getListCtx = memoize(
    (
      list: T[],
      setRowHeight: VirtualListCtx<T>['setRowHeight'],
      renderRowItemContent: VirtualListCtx<T>['renderRowItemContent']
    ) => ({
      list,
      setRowHeight,
      renderRowItemContent,
    })
  );

  useEffect(() => {
    fetchDataList();
  }, [fetchDataList]);

  useEffect(() => {
    pageNo > 0 && isLoadAll && showInfoTips(t('noMore'));
  }, [isLoadAll, pageNo, showInfoTips, t]);

  return (
    <div
      className={clsx(
        className,
        'virtual-list relative m-auto h-full',
        (isNoData || isFirstLoading) && 'flex items-center justify-center'
      )}
    >
      <VirtualListContext.Provider
        value={getListCtx(dataList, setRowHeight, renderRowItemContent)}
      >
        {isFirstLoading ? (
          <Loading color="primary" />
        ) : isNoData ? (
          <NoData />
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                threshold={loadingThreshold}
                isItemLoaded={idx => isLoadAll || idx < dataList.length}
                itemCount={isLoadAll ? dataList.length : dataList.length + 1}
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
                    itemSize={getRowHeight}
                    itemCount={dataList.length}
                    itemKey={idx => getRowItemKey(idx, dataList[idx])}
                    onItemsRendered={onItemsRendered}
                    /**
                     * @FIXME scroll shrinks
                     * @refer https://github.com/bvaughn/react-window/issues/408
                     */
                    estimatedItemSize={estimatedRowHeight}
                  >
                    {ListRow}
                  </VariableSizeList>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        )}
      </VirtualListContext.Provider>
    </div>
  );
}

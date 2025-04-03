'use client';

/*
 * Virutal List with infinite scrolling
 *
 * @Author: VenDream
 * @Date: 2023-12-01 14:31:30
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Loading from '@/components/common/loading';
import { NoData } from '@/components/common/no-data';
import { cn } from '@/utils/classnames';
import { useTranslations } from 'next-intl';
import type { ForwardedRef } from 'react';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { toast } from 'sonner';
import { VirtualListContext } from './context';
import ListRow from './list-row';
import { LOAD_ALL_ITEM } from './placeholders';
import type {
  VirtualListCtx,
  VirtualListHandle,
  VirtualListProps,
} from './types';

function VirtualListRenderFunc<T, R>(
  props: VirtualListProps<T, R>,
  ref: ForwardedRef<VirtualListHandle>
) {
  const {
    getDataFetcher,
    getDataParser,
    getRowItemKey,
    getTotalParser,

    className = '',
    width = 0,
    height = 0,
    gutter = 10,
    pageSize = 10,
    loadingThreshold = 5,
    estimatedRowHeight = 50,
    concatList = Array.prototype.concat,
    renderRowItemContent,
    renderNoMoreContent,

    noDataProps,

    onTotalUpdate,
    onDataFetchingStart,
    onDataFetchingEnd,
  } = props;

  const t = useTranslations('global.dataFetching');
  const listRef = useRef<VariableSizeList<T>>(null);
  const canLoadMoreRef = useRef(false);

  const [pageNo, setPageNo] = useState(0);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dataList, setDataList] = useState<T[]>([]);
  const rowHeightsRef = useRef<Record<string, number>>({});

  const fetchDataList = useCallback(async () => {
    const isNewDataFetch = pageNo === 0;

    try {
      setIsLoading(true);
      isNewDataFetch && onDataFetchingStart?.();
      const limit = pageSize;
      const offset = pageNo * limit;
      const parseListData = getDataParser();
      const fetchListData = getDataFetcher({ limit, offset, needTotal: true });
      const data = await fetchListData();
      const list = parseListData(data);
      const isLoadAll = list.length < limit;

      setDataList(prevList => {
        const newList = pageNo === 0 ? list : concatList(prevList, list);
        isLoadAll && list.length > 0 && newList.push(LOAD_ALL_ITEM);
        return newList;
      });

      if (isLoadAll) setIsLoadAll(true);
      if (getTotalParser && onTotalUpdate) {
        const parseListTotal = getTotalParser();
        const total = parseListTotal(data);
        onTotalUpdate(total);
      }
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      isNewDataFetch && onDataFetchingEnd?.();
    }
  }, [
    concatList,
    getDataFetcher,
    getDataParser,
    getTotalParser,
    onDataFetchingEnd,
    onDataFetchingStart,
    onTotalUpdate,
    pageNo,
    pageSize,
  ]);

  const getRowHeight = useCallback((idx: number) => {
    return rowHeightsRef.current[idx] || 50;
  }, []);

  const setRowHeight = useCallback(
    (idx: number, height: number, force?: boolean) => {
      const hasMeasured = !!rowHeightsRef.current[idx];
      if (!force && hasMeasured) return;

      listRef.current?.resetAfterIndex(0);
      rowHeightsRef.current = {
        ...rowHeightsRef.current,
        [idx]: height,
      };
    },
    []
  );

  const listCtx = useMemo<VirtualListCtx<T>>(
    () => ({
      list: dataList,
      gutter,
      setRowHeight,
      getRowItemKey,
      renderRowItemContent,
      renderNoMoreContent,
    }),
    [
      dataList,
      getRowItemKey,
      gutter,
      renderNoMoreContent,
      renderRowItemContent,
      setRowHeight,
    ]
  );

  const isNoData = pageNo === 0 && isLoadAll && dataList.length === 0;
  const isFirstLoading = pageNo === 0 && isLoading;

  const loadMore = useCallback(() => {
    // stop the first loadMore request
    if (!canLoadMoreRef.current) {
      canLoadMoreRef.current = true;
      return;
    }

    if (isLoading || isLoadAll) return;

    setPageNo(pn => pn + 1);
  }, [isLoadAll, isLoading]);

  useEffect(() => {
    fetchDataList();
  }, [fetchDataList]);

  useEffect(() => {
    pageNo > 0 && isLoadAll && toast.info(t('noMore'));
  }, [isLoadAll, pageNo, t]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setPageNo(0);
      setDataList([]);
      setIsLoadAll(false);
      rowHeightsRef.current = {};
      canLoadMoreRef.current = false;
    },
  }));

  return (
    <div className={cn(className, 'relative m-auto h-full')}>
      {isFirstLoading ? (
        <Loading className="h-10" align="center" />
      ) : isNoData ? (
        <NoData tips={t('noMatchingData')} className="h-10" {...noDataProps} />
      ) : (
        <VirtualListContext.Provider value={listCtx}>
          <AutoSizer>
            {({ height: h, width: w }) => (
              <InfiniteLoader
                threshold={loadingThreshold}
                isItemLoaded={idx => isLoadAll || idx < dataList.length}
                itemCount={isLoadAll ? dataList.length : dataList.length + 1}
                loadMoreItems={loadMore}
              >
                {({ onItemsRendered, ref }) => (
                  <VariableSizeList
                    ref={(list: VariableSizeList) => {
                      ref(list);
                      listRef.current = list;
                    }}
                    className="!overflow-x-hidden !will-change-[transform,scroll-position]"
                    width={width || w}
                    height={height || h}
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
        </VirtualListContext.Provider>
      )}
    </div>
  );
}

const forwardRef = React.forwardRef as typeof React.IForwardRef;
const VirtualList = forwardRef(VirtualListRenderFunc);

export default VirtualList;

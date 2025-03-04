/*
 * Virtual List Types
 *
 * @Author: VenDream
 * @Date: 2023-12-01 14:39:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import type { NoDataProps } from '@/components/common/no-data';
import type React from 'react';

export interface VirtualListHandle {
  /** reset */
  reset: () => void;
}

export interface VirtualListCtx<T = any> {
  /** item data list */
  list: T[];
  /** item gutter */
  gutter?: number;
  /** row height updater */
  setRowHeight: (idx: number, height: number, force?: boolean) => void;
  /** row item key generator */
  getRowItemKey: (idx: number, item: T) => string;
  /** render row item content */
  renderRowItemContent: (data: T) => React.ReactNode;
}

export interface VirtualListProps<T, R> {
  /** data fetcher generator */
  getDataFetcher: (params: PaginationParams) => () => Promise<R>;
  /** list data parser */
  getDataParser: () => (data: R) => T[];
  /** row item key generator */
  getRowItemKey: (idx: number, item: T) => string;
  /** list total parser */
  getTotalParser?: () => (data: R) => number;
  /** render row item content */
  renderRowItemContent: VirtualListCtx<T>['renderRowItemContent'];

  /** custom class */
  className?: string;
  /** list width */
  width?: number;
  /** list height */
  height?: number;
  /** page size */
  pageSize?: number;
  /** item gutter */
  gutter?: number;
  /** loading threshold */
  loadingThreshold?: number;
  /** estimated row height */
  estimatedRowHeight?: number;
  /** how to concat new list */
  concatList?: (prevList: T[], newList: T[]) => T[];

  /** no data props */
  noDataProps?: NoDataProps;

  /** total count update callback */
  onTotalUpdate?: (total: number) => void;
  /** data fetching start */
  onDataFetchingStart?: () => void;
  /** data fetching end */
  onDataFetchingEnd?: () => void;
}

export interface VirtualListRowProps {
  /** row index */
  index: number;
  /** scroling status */
  isScrolling?: boolean;
  /** row style */
  style: React.CSSProperties;
}

export type VirtualListRowItemProps = VirtualListRowProps;

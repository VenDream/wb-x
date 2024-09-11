/*
 * Virtual List Context
 *
 * @Author: VenDream
 * @Date: 2023-12-01 17:28:03
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { createContext } from 'react';
import type { VirtualListCtx } from './types';

export const VirtualListContext = createContext<VirtualListCtx>({
  list: [],
  setRowHeight: () => {},
  getRowItemKey: () => '',
  renderRowItemContent: () => null,
});

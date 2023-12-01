/*
 * Virtual List Row
 *
 * @Author: VenDream
 * @Date: 2023-12-01 14:31:50
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { memo } from 'react';
import { areEqual } from 'react-window';
import RowItem from './row-item';
import type { VirtualListRowProps } from './types';

const Row = memo(function R<T>(props: VirtualListRowProps<T>) {
  const { index, style } = props;
  return <RowItem index={index} style={style} />;
}, areEqual);

export default Row;

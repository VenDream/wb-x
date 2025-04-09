/*
 * Virtual List Row
 *
 * @Author: VenDream
 * @Date: 2023-12-01 14:31:50
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { memo, useContext } from 'react';
import { areEqual } from 'react-window';
import { NoMoreData } from '../no-data';
import { VirtualListContext } from './context';
import { LOAD_ALL } from './placeholders';
import RowItem from './row-item';
import type { VirtualListRowProps } from './types';

const Row = memo(function R(props: VirtualListRowProps) {
  const { index, style } = props;
  const { list, renderNoMoreContent } = useContext(VirtualListContext);
  const item = list[index];

  if (item?.id === LOAD_ALL) {
    return (
      <div
        data-row-item-id={LOAD_ALL}
        style={{ ...style, height: 40 }}
        className="flex items-center justify-center"
      >
        {renderNoMoreContent ? (
          renderNoMoreContent()
        ) : (
          <NoMoreData className="h-full" />
        )}
      </div>
    );
  }

  return <RowItem index={index} style={style} />;
}, areEqual);

export default Row;

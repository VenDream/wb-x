/*
 * Virtual List Row Item
 *
 * @Author: VenDream
 * @Date: 2023-12-01 14:32:00
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { VirtualListContext } from './context';
import type { VirtualListRowItemProps } from './types';

export default function RowItem<T>(props: VirtualListRowItemProps<T>) {
  const { index, style } = props;
  const {
    list,
    gutter = 10,
    renderRowItemContent,
    setRowHeight,
  } = useContext(VirtualListContext);

  const cardRef = useRef<HTMLDivElement>(null);
  const GUTTER = index === 0 ? 0 : gutter;

  const [visible, setVisible] = useState(false);

  const itemStyle = {
    ...style,
    top: index === 0 ? style.top : (style.top as number) + GUTTER,
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const cardH = card.getBoundingClientRect().height + GUTTER * 2;
    setRowHeight(index, cardH);
    setTimeout(() => {
      setVisible(true);
    });
  }, [GUTTER, index, setRowHeight]);

  return (
    <div
      style={itemStyle}
      className={clsx(
        'virtual-list-row-item flex items-center justify-center',
        {
          visible: visible,
          invisible: !visible,
        }
      )}
    >
      {/* @TODO add scrolling indicator */}
      {renderRowItemContent(cardRef, list[index])}
    </div>
  );
}

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

const GUTTER_SIZE = 10;

export default function RowItem<T>(props: VirtualListRowItemProps<T>) {
  const { index, style } = props;
  const { list, renderRowItemContent, setRowHeight } =
    useContext(VirtualListContext);

  const cardRef = useRef<HTMLDivElement>(null);
  const gutter = index === 0 ? 0 : GUTTER_SIZE;

  const [visible, setVisible] = useState(false);

  const itemStyle = {
    ...style,
    top: index === 0 ? style.top : (style.top as number) + gutter,
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const cardH = card.getBoundingClientRect().height + gutter * 2;
    setRowHeight(index, cardH);
    setTimeout(() => {
      setVisible(true);
    });
  }, [gutter, index, setRowHeight]);

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

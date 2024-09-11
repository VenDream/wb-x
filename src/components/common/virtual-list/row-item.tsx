/*
 * Virtual List Row Item
 *
 * @Author: VenDream
 * @Date: 2023-12-01 14:32:00
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { fadeIn } from '@/contants/motions';
import { cn } from '@/utils/classnames';
import EVENT_EMITTER, { RESIZE_ROW_ITEM } from '@/utils/eventemitter';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { VirtualListContext } from './context';
import type { VirtualListRowItemProps } from './types';

export default function RowItem(props: VirtualListRowItemProps) {
  const { index, style } = props;
  const {
    list,
    gutter = 10,
    renderRowItemContent,
    setRowHeight,
    getRowItemKey,
  } = useContext(VirtualListContext);
  const itemId = getRowItemKey(index, list[index]);

  const domRef = useRef<HTMLDivElement>(null);
  const GUTTER = index === 0 ? 0 : gutter;

  const [visible, setVisible] = useState(false);

  const itemStyle = {
    ...style,
    top: index === 0 ? style.top : (style.top as number) + GUTTER,
  };

  const measureSize = useCallback(
    (init?: boolean) => {
      const card = domRef.current;
      if (!card) return;

      !!init && setVisible(false);
      const cardH = card.getBoundingClientRect().height + GUTTER * 2;
      setRowHeight(index, cardH, !init);
      !!init &&
        setTimeout(() => {
          setVisible(true);
        });
    },
    [GUTTER, index, setRowHeight]
  );

  const reMeasureSize = useCallback(
    (id: string) => {
      if (id !== itemId) return;
      measureSize(false);
    },
    [itemId, measureSize]
  );

  useEffect(() => {
    measureSize(true);
    EVENT_EMITTER.on(RESIZE_ROW_ITEM, reMeasureSize);
    return () => {
      EVENT_EMITTER.off(RESIZE_ROW_ITEM, reMeasureSize);
    };
  }, [measureSize, reMeasureSize]);

  return (
    <div
      data-row-item-id={itemId}
      style={itemStyle}
      className={cn('flex items-start justify-center', {
        visible: visible,
        invisible: !visible,
      })}
    >
      {visible ? (
        <MotionContainer ref={domRef} motion={fadeIn}>
          {renderRowItemContent(list[index])}
        </MotionContainer>
      ) : (
        <div ref={domRef}>
          {/* @TODO add scrolling indicator */}
          {renderRowItemContent(list[index])}
        </div>
      )}
    </div>
  );
}

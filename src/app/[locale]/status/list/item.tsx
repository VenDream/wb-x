/*
 * Weibo Status List Item
 *
 * @Author: VenDream
 * @Date: 2023-11-29 16:49:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { StatusCard } from '../detail';

const GUTTER_SIZE = 10;

interface StatusItemProps {
  index: number;
  status: Backend.Status;
  isScrolling?: boolean;
  style: React.CSSProperties;
  setRowHeight: (idx: number, height: number) => void;
}

export default function StatusItem(props: StatusItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('global.dataFetching');
  const { index, style, status, setRowHeight } = props;
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
      className={clsx('status-list-item flex items-center justify-center', {
        visible: visible,
        invisible: !visible,
      })}
    >
      {/* @TODO add scrolling indicator */}
      <StatusCard ref={cardRef} status={status} />
    </div>
  );
}

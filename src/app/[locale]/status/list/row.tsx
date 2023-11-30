/*
 * Weibo Status List Row
 *
 * @Author: VenDream
 * @Date: 2023-11-30 11:24:59
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useTranslations } from 'next-intl';
import { CSSProperties, memo } from 'react';
import { areEqual } from 'react-window';
import StatusItem from './item';

export interface RowProps {
  index: number;
  style: CSSProperties;
  isScrolling?: boolean;
  data: {
    list: Backend.Status[];
    setRowHeight: (idx: number, height: number) => void;
  };
}

const Row = memo(function R(props: RowProps) {
  const t = useTranslations('global.dataFetching');
  const { index, style, data } = props;
  const { list, setRowHeight } = data;

  return (
    <StatusItem
      index={index}
      style={style}
      status={list[index]}
      setRowHeight={setRowHeight}
    />
  );
}, areEqual);

export default Row;

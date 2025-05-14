'use client';

/*
 * Paginator
 *
 * @Author: VenDream
 * @Date: 2023-09-28 10:58:32
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import IPaginator, { type PaginatorProps } from '@/components/common/paginator';

export default function Paginator(props: PaginatorProps) {
  const { total, pageSize, defaultCurrent, onCurrentPageChange } = props;

  return (
    <IPaginator
      total={total}
      pageSize={pageSize}
      defaultCurrent={defaultCurrent}
      onCurrentPageChange={onCurrentPageChange}
    />
  );
}

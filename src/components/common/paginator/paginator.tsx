'use client';

/*
 * Paginator (Uncontrolled)
 *
 * @Author: VenDream
 * @Date: 2023-09-27 14:50:29
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Input, Pagination } from '@/components/daisyui';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';

export interface PaginatorProps {
  /** total records */
  total: number;
  /** page size */
  pageSize?: number;
  /** default current page */
  defaultCurrent?: number;
  /** hide on single page */
  hideOnSinglePage?: boolean;
  /** on current page change */
  onCurrentPageChange?: (current: number) => void;
}

export default function Paginator(props: PaginatorProps) {
  const t = useTranslations('global.paginator');
  const {
    total = 0,
    pageSize = 10,
    defaultCurrent: currPage = 1,
    hideOnSinglePage = true,
    onCurrentPageChange,
  } = props;

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize!),
    [pageSize, total]
  );
  const shouldHide = hideOnSinglePage && totalPages <= 1;

  const inputRef = useRef<HTMLInputElement>(null);

  const pages = useMemo(() => {
    const firstPage = 1;
    const lastPage = totalPages;
    let middlePages = [
      currPage - 2,
      currPage - 1,
      currPage,
      currPage + 1,
      currPage + 2,
    ];

    if (currPage - firstPage <= 2) {
      middlePages = Array.from('0000').map((_, idx) => firstPage + idx + 1);
    }
    if (lastPage - currPage <= 2) {
      middlePages = Array.from('0000')
        .map((_, idx) => lastPage - idx - 1)
        .reverse();
    }

    const pages: (number | string)[] = [firstPage, ...middlePages, lastPage];

    if (pages[1] !== firstPage + 1) {
      pages.splice(1, 0, '...');
    }

    if (pages[pages.length - 2] !== lastPage - 1) {
      pages.splice(pages.length - 1, 0, '...');
    }

    return pages;
  }, [currPage, totalPages]);

  const jumpPage = useCallback(
    (key: string) => {
      const input = inputRef.current;
      if (!input || key !== 'Enter') return;

      let targetPage = Number(input.value);
      if (isNaN(targetPage) || !Number.isInteger(targetPage)) {
        input.value = '';
        return;
      }
      if (targetPage < 1) {
        targetPage = 1;
      }
      if (targetPage > totalPages) {
        targetPage = totalPages;
      }

      onCurrentPageChange?.(targetPage);
      input.value = '';
    },
    [onCurrentPageChange, totalPages]
  );

  if (shouldHide) return null;

  return (
    <div className="paginator flex items-center justify-start">
      <Pagination horizontal>
        {pages.map((page, idx) =>
          typeof page === 'number' ? (
            <Button
              key={idx}
              size="sm"
              active={page === currPage}
              className="join-item px-6"
              onClick={() => {
                onCurrentPageChange?.(page);
              }}
            >
              {page}
            </Button>
          ) : (
            <span key={idx} className="px-4">
              {page}
            </span>
          )
        )}
      </Pagination>
      <div className="page-jumper ml-4 flex items-center text-sm">
        {t('jumpTo')}
        <Input
          ref={inputRef}
          size="sm"
          className="mx-2 w-16 p-2"
          onKeyDown={evt => jumpPage(evt.key)}
        ></Input>
        {t('page')}
      </div>
    </div>
  );
}

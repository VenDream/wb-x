'use client';

/*
 * Paginator (Uncontrolled)
 *
 * @Author: VenDream
 * @Date: 2023-09-27 14:50:29
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Input, Pagination } from '@/components/daisyui';
import { useIsMobile } from '@/hooks/use-media-query';
import { cn } from '@/utils/classnames';
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

  const isMobile = useIsMobile();
  const displayPages = isMobile ? 3 : 5;

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [pageSize, total]
  );
  const shouldHide = hideOnSinglePage === true && totalPages <= 1;

  const inputRef = useRef<HTMLInputElement>(null);

  const pages = useMemo(() => {
    const firstPage = 1;
    const lastPage = totalPages;

    if (lastPage <= displayPages) {
      return Array.from({ length: lastPage }, (_, idx) => idx + 1);
    }

    let middlePages = [
      currPage - 2,
      currPage - 1,
      currPage,
      currPage + 1,
      currPage + 2,
    ];
    if (isMobile) {
      middlePages = middlePages.slice(1, 4);
    }

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
  }, [currPage, displayPages, isMobile, totalPages]);

  const jumpPage = useCallback(
    (key: string) => {
      const input = inputRef.current;
      if (!input || key !== 'Enter') return;

      let targetPage = Number(input.value);
      if (Number.isNaN(targetPage) || !Number.isInteger(targetPage)) {
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
    <div className="flex flex-col items-center justify-start gap-4 lg:flex-row">
      <Pagination className="w-full justify-center lg:w-auto">
        {pages.map((page, idx) => {
          const isActive = page === currPage;
          return typeof page === 'number' ? (
            <Pagination.Item
              key={idx}
              size="sm"
              active={isActive}
              className={cn('max-w-13 min-w-10', {
                'pointer-events-none': isActive,
              })}
              onClick={() => {
                onCurrentPageChange?.(page);
              }}
            >
              {page}
            </Pagination.Item>
          ) : (
            <span key={idx} className="px-3 lg:px-4">
              {page}
            </span>
          );
        })}
      </Pagination>
      {totalPages > 1 && (
        <div className="flex w-full items-center justify-center lg:w-auto">
          {t('jumpTo')}
          <Input
            ref={inputRef}
            size="sm"
            className="mx-2 w-16 p-2"
            onKeyDown={evt => jumpPage(evt.key)}
          />
          {t('page')}
        </div>
      )}
    </div>
  );
}

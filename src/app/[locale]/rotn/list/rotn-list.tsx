'use client';

/*
 * ROTN list
 *
 * @Author: VenDream
 * @Date: 2023-10-18 15:38:40
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { rotn } from '@/api/client';
import LoadingIndicator from '@/components/common/loading-indicator';
import Tabs from '@/components/common/tabs';
import { Button, Input } from '@/components/daisyui';
import { PAGINATION_LIMIT } from '@/constants';
import useDetectSticky from '@/hooks/use-detect-sticky';
import { RotateCcwIcon, SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import { toast } from 'sonner';
import RotnCard from './rotn-card';

import { cn } from '@/utils/classnames';
import './rotn-list.css';

const BREAKPOINT_COLS = {
  default: 5,
  1600: 4,
};

export default function RotnList() {
  const t = useTranslations('pages.rotn');

  const [refresh, setRefresh] = useState({});
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  const [id, setId] = useState('');
  const [itemId, setItemId] = useState('');
  const [items, setItems] = useState<ROTN.BrandItem[]>([]);
  const [itemType, setItemType] = useState<ROTN.Type>('');

  const listHeaderRef = useRef<HTMLDivElement>(null);
  const isSticky = useDetectSticky(listHeaderRef);

  const fetchItems = useCallback(async () => {
    if (!refresh) return;

    try {
      setIsLoading(true);
      const limit = PAGINATION_LIMIT * 2;
      const offset = pageNo * limit;
      const { list: items = [] } = await rotn.getItemList({
        id: itemId,
        limit,
        offset,
        type: itemType,
      });
      setItems(pageNo === 0 ? items : list => [...list, ...items]);
      setIsLoadFailed(false);
      setIsLoadAll(items.length < limit);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
      setIsLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [itemId, itemType, pageNo, refresh]);

  const loadMore = useCallback(() => {
    if (isLoadAll || isLoading || isLoadFailed) return;
    setPageNo(pageNo => pageNo + 1);
  }, [isLoadAll, isLoading, isLoadFailed]);

  const switchItemType = (type: string | number) => {
    setItemType(type as ROTN.Type);
    setPageNo(0);
    setItems([]);
  };

  const searchItem = () => {
    setItemId(id);
    switchItemType('');
    setRefresh({});
  };

  const resetId = () => {
    setId('');
    setItemId('');
    switchItemType('');
    setRefresh({});
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const cards = useMemo(
    () => (
      <Masonry
        breakpointCols={BREAKPOINT_COLS}
        className="rotn-masonry-list"
        columnClassName="rotn-masonry-list-column"
      >
        {items.map(item => (
          <div key={item.id} data-id={item.id} data-type={item.type}>
            <RotnCard item={item} />
          </div>
        ))}
      </Masonry>
    ),
    [items]
  );

  return (
    <div className="flex h-full flex-col gap-4 pr-8">
      <div
        ref={listHeaderRef}
        className={cn('sticky top-0 z-10', {
          'rounded-t-none': isSticky,
        })}
      >
        <Tabs
          size="sm"
          name="rotn_type"
          itemClassName="w-20"
          value={itemType}
          onChange={switchItemType}
          items={[
            {
              label: t('type.all'),
              value: '',
            },
            {
              label: t('type.ro'),
              value: 'RO',
            },
            {
              label: t('type.tn'),
              value: 'TN',
            },
          ]}
        />
        <div className="absolute top-0 right-2 flex h-full items-center gap-4">
          <Input
            size="sm"
            value={id}
            className="bg-transparent"
            placeholder={t('search.placeholder')}
            onChange={e => setId(e.target.value)}
          />
          <Button size="sm" color="primary" onClick={searchItem}>
            <SearchIcon size={16} />
            {t('search.search')}
          </Button>
          <Button
            size="sm"
            ghost
            className="bg-base-content/10"
            onClick={resetId}
          >
            <RotateCcwIcon size={16} />
            {t('search.reset')}
          </Button>
        </div>
      </div>
      {items.length > 0 && cards}
      <LoadingIndicator
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={items.length === 0}
        loadMore={loadMore}
        scrollLoading={{ enabled: true, threshold: 200 }}
      />
    </div>
  );
}

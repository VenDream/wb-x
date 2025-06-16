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
import { useIsMobile } from '@/hooks/use-media-query';
import { cn } from '@/utils/classnames';
import { RotateCcwIcon, SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Masonry from 'react-masonry-css';
import { toast } from 'sonner';
import Menu from './menu';
import RotnCard from './rotn-card';

import './rotn-list.css';

const BREAKPOINT_COLS = {
  default: 5,
  1600: 4,
  1024: 3,
  768: 2,
};

export default function RotnList() {
  const t = useTranslations('pages.rotn');
  const isMobile = useIsMobile();

  const [refresh, setRefresh] = useState({});
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  const [id, setId] = useState('');
  const [itemId, setItemId] = useState('');
  const [items, setItems] = useState<ROTN.BrandItem[]>([]);
  const [itemType, setItemType] = useState<ROTN.Type>('');

  const fetchItems = useCallback(async () => {
    if (!refresh) return;

    try {
      setIsLoading(true);
      const limit = PAGINATION_LIMIT * (isMobile ? 0.5 : 2);
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
  }, [isMobile, itemId, itemType, pageNo, refresh]);

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
    () =>
      items.length > 0 ? (
        <Masonry
          breakpointCols={BREAKPOINT_COLS}
          className="rotn-masonry-list"
          columnClassName="rotn-masonry-list-column"
          style={
            {
              '--rotn-masonry-gap': isMobile ? '10px' : '20px',
            } as React.CSSProperties
          }
        >
          {items.map(item => (
            <div key={item.id} data-id={item.id} data-type={item.type}>
              <RotnCard item={item} />
            </div>
          ))}
        </Masonry>
      ) : null,
    [isMobile, items]
  );

  return (
    <div className="flex h-full flex-col gap-2 pr-0 lg:gap-4 lg:pr-6">
      <div className="relative top-0 lg:sticky lg:z-1">
        <Tabs
          size="sm"
          name="rotn_type"
          className="border-base-content/10 border shadow-xs"
          itemClassName="w-16 lg:w-20"
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
        <Menu
          itemId={id}
          setItemId={setId}
          applyItemId={searchItem}
          resetItemId={resetId}
        />
        <div
          className={cn(
            'absolute top-0 right-2 hidden h-full items-center gap-4 lg:flex'
          )}
        >
          <Input
            size="sm"
            value={id}
            className="bg-transparent"
            placeholder={t('search.placeholder')}
            onChange={e => setId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchItem()}
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
      {isMobile ? (
        <div
          className={cn(
            'no-scrollbar h-[calc(100dvh_-_164px)] overflow-y-auto'
          )}
        >
          {cards}
          <LoadingIndicator
            isLoading={isLoading}
            isLoadAll={isLoadAll}
            isNoData={items.length === 0}
            loadMore={loadMore}
            scrollLoading={{ enabled: true, threshold: 200 }}
            className="flex lg:hidden"
          />
        </div>
      ) : (
        cards
      )}
      <LoadingIndicator
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={items.length === 0}
        loadMore={loadMore}
        scrollLoading={{ enabled: true, threshold: 200 }}
        className="hidden lg:flex"
      />
    </div>
  );
}

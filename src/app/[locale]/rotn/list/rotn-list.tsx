'use client';

/*
 * ROTN list
 *
 * @Author: VenDream
 * @Date: 2023-10-18 15:38:40
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getRotnList } from '@/api/client';
import LoadingIndicator from '@/components/common/loading-indicator';
import { Button, Input, Tab, Tabs } from '@/components/daisyui';
import { PAGINATION_LIMIT } from '@/constants';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { toast } from 'sonner';
import RotnCard from './rotn-card';

import { RotateCcwIcon } from 'lucide-react';
import './rotn-list.sass';

const BREAKPOINT_COLS = {
  default: 5,
  1600: 4,
};

export default function RotnList() {
  const t = useTranslations('pages.rotn');

  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  const [id, setId] = useState('');
  const [itemId, setItemId] = useState('');
  const [items, setItems] = useState<Backend.ROTNItem[]>([]);
  const [itemType, setItemType] = useState<Backend.ROTN_TYPE>('');

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const limit = PAGINATION_LIMIT * 2;
      const offset = pageNo * limit;
      const { list: items = [] } = await getRotnList({
        id: itemId,
        limit,
        offset,
        type: itemType,
      });
      setItems(pageNo === 0 ? items : list => [...list, ...items]);
      setIsLoadFailed(false);
      if (items.length < limit) setIsLoadAll(true);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
      setIsLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [itemId, itemType, pageNo]);

  const loadMore = useCallback(() => {
    if (isLoadAll || isLoading || isLoadFailed) return;
    setPageNo(pageNo => pageNo + 1);
  }, [isLoadAll, isLoading, isLoadFailed]);

  const switchItemType = (type: Backend.ROTN_TYPE) => {
    setItemType(type);
    setPageNo(0);
    setItems([]);
    setIsLoadAll(false);
  };

  const searchItem = () => {
    setItemId(id);
    switchItemType('');
  };

  const resetId = () => {
    setId('');
    setItemId('');
    switchItemType('');
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="flex h-full flex-col gap-4 pr-8">
      <div className="sticky top-0 z-10">
        <Tabs
          boxed
          value={itemType}
          onChange={switchItemType}
          className="h-12 items-center bg-base-200/50 p-2 backdrop-blur-lg"
        >
          <Tab className="w-32" value="">
            {t('type.all')}
          </Tab>
          <Tab className="w-32" value="RO">
            {t('type.ro')}
          </Tab>
          <Tab className="w-32" value="TN">
            {t('type.tn')}
          </Tab>
        </Tabs>
        <div className="absolute right-2 top-0 flex h-full items-center gap-4">
          <Input
            size="sm"
            value={id}
            className="bg-transparent"
            placeholder={t('search.placeholder')}
            onChange={e => setId(e.target.value)}
          />
          <Button
            size="sm"
            color="primary"
            startIcon={<SearchIcon size={16} />}
            onClick={searchItem}
          >
            {t('search.search')}
          </Button>
          <Button
            size="sm"
            color="ghost"
            className="bg-base-content/10"
            startIcon={<RotateCcwIcon size={16} />}
            onClick={resetId}
          >
            {t('search.reset')}
          </Button>
        </div>
      </div>
      {items.length > 0 && (
        <Masonry
          breakpointCols={BREAKPOINT_COLS}
          className="rotn-masonry-list"
          columnClassName="rotn-masonry-list-column"
        >
          {items.map(item => (
            <div key={item.id}>
              <RotnCard item={item} />
            </div>
          ))}
        </Masonry>
      )}
      <LoadingIndicator
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={items.length === 0}
        loadMore={loadMore}
        scrollLoading={{ enabled: !isLoadFailed, threshold: 200 }}
      />
    </div>
  );
}

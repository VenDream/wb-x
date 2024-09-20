'use client';

/*
 * ROTN list
 *
 * @Author: VenDream
 * @Date: 2023-10-18 15:38:40
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbRotnList } from '@/api/client';
import LoadingIndicator from '@/components/common/loading-indicator';
import { Tab, Tabs } from '@/components/daisyui';
import { PAGINATION_LIMIT } from '@/contants';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import RotnCard from './rotn-card';

export default function RotnList() {
  const t = useTranslations('pages.rotn.type');

  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  const [items, setItems] = useState<Backend.ROTNItem[]>([]);
  const [itemType, setItemType] = useState<Backend.ROTN_TYPE>('ALL');

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const limit = PAGINATION_LIMIT;
      const offset = pageNo * limit;
      const { items = [] } = await getDbRotnList({
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
  }, [itemType, pageNo]);

  const loadMore = useCallback(() => {
    setPageNo(pageNo => pageNo + 1);
  }, []);

  const switchItemType = (type: Backend.ROTN_TYPE) => {
    setItemType(type);
    setPageNo(0);
    setItems([]);
    setIsLoadAll(false);
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="flex h-full flex-col gap-4 pr-8">
      <Tabs boxed value={itemType} onChange={switchItemType}>
        <Tab className="w-32" value="ALL">
          {t('all')}
        </Tab>
        <Tab className="w-32" value="RO">
          {t('ro')}
        </Tab>
        <Tab className="w-32" value="TN">
          {t('tn')}
        </Tab>
      </Tabs>
      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-6 2xl:grid-cols-3">
          {items.map(item => (
            <RotnCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <LoadingIndicator
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={items.length === 0}
        loadMore={loadMore}
        // @TODO enable scroll loading
        scrollLoading={{ enable: false && !isLoadFailed, threshold: 500 }}
      />
    </div>
  );
}

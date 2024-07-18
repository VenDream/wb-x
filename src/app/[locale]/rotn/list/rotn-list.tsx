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

export default function Page() {
  const t1 = useTranslations('pages.rotn');
  const t2 = useTranslations('global.dataFetching');

  const [pageNo, setPageNo] = useState(0);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      if (items.length < limit) setIsLoadAll(true);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [itemType, pageNo]);

  const loadMore = () => {
    setPageNo(pageNo => pageNo + 1);
  };

  const switchItemType = (type: Backend.ROTN_TYPE) => {
    if (type === itemType) return;

    setItemType(type);
    setPageNo(0);
    setItems([]);
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="flex h-full flex-col gap-4 pr-8">
      <Tabs boxed value={itemType} onChange={switchItemType}>
        <Tab className="w-32" value="ALL">
          {t1('type.all')}
        </Tab>
        <Tab className="w-32" value="RO">
          {t1('type.ro')}
        </Tab>
        <Tab className="w-32" value="TN">
          {t1('type.tn')}
        </Tab>
      </Tabs>
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-6 2xl:grid-cols-4">
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
      />
    </div>
  );
}

'use client';

/*
 * ROTN list
 *
 * @Author: VenDream
 * @Date: 2023-10-18 15:38:40
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbROTNs } from '@/api/client';
import useToast from '@/components/common/toast';
import { Loading, Tab, Tabs } from '@/components/daisyui';
import { IMG_PLACEHOLDER, PAGINATION_LIMIT } from '@/contants';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function ROTN() {
  const t = useTranslations('pages.rotn');
  const { showErrorTips } = useToast();

  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [itemType, setItemType] = useState<Backend.ROTN_TYPE>('ALL');
  const [items, setItems] = useState<Backend.ROTNItem[]>([]);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const offset = pageNo * PAGINATION_LIMIT;
      const { items } = await getDbROTNs({
        limit: PAGINATION_LIMIT,
        offset,
        type: itemType,
      });
      setItems(pageNo === 0 ? items : list => [...list, ...items]);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      showErrorTips(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [itemType, pageNo, showErrorTips]);

  const switchItemType = (type: Backend.ROTN_TYPE) => {
    setItemType(type);
    setPageNo(0);
    setItems([]);
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="rotn-page">
      <Tabs boxed className="mb-4" value={itemType} onChange={switchItemType}>
        <Tab className="w-32" value="ALL">
          {t('type.all')}
        </Tab>
        <Tab className="w-32" value="RO">
          {t('type.ro')}
        </Tab>
        <Tab className="w-32" value="TN">
          {t('type.tn')}
        </Tab>
      </Tabs>
      <div className="item-list grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {items.map(item => (
          <div key={item.id} className="item flex flex-col p-4 shadow">
            <p>{'img' || item.name}</p>
            <div className="item-imgs mt-4 flex gap-1">
              {item.images.slice(0, 3).map((img, idx) => (
                <div key={idx} className="relative h-20 w-20">
                  <Image
                    fill
                    alt="ROTN_IMG"
                    src={IMG_PLACEHOLDER || img}
                    className="object-contain shadow"
                    placeholder={IMG_PLACEHOLDER}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isLoading && <Loading size="lg" className="mt-4" />}
    </div>
  );
}

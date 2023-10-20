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
import Image from '@/components/common/image';
import useToast from '@/components/common/toast';
import { Loading, Tab, Tabs } from '@/components/daisyui';
import {
  IMG_PLACEHOLDER,
  PAGINATION_LIMIT,
  SECONDARY_ROUTES,
  STYLES,
} from '@/contants';
import { useThrottleFn } from 'ahooks';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

const SCROLL_LOADING_THRESHOLD = 200;

export default function Page() {
  const t = useTranslations('pages.rotn');
  const { showErrorTips } = useToast();

  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [itemType, setItemType] = useState<Backend.ROTN_TYPE>('ALL');
  const [items, setItems] = useState<Backend.ROTNItem[]>([]);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const limit = PAGINATION_LIMIT * 2;
      const offset = pageNo * limit;
      const { items } = await getDbRotnList({
        limit,
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

  const handleScrollLoading = (evt: React.MouseEvent<HTMLDivElement>) => {
    const container = evt.target as HTMLDivElement;
    if (!container || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - SCROLL_LOADING_THRESHOLD) {
      setPageNo(pageNo + 1);
    }
  };
  const { run: onScroll } = useThrottleFn(handleScrollLoading, { wait: 300 });

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
    <div className="rotn-page flex h-full flex-col">
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
      <div
        style={{ scrollbarGutter: 'stable' }}
        className="item-list-wrapper flex-1 overflow-auto pr-4"
        onScroll={onScroll}
      >
        <div className="item-list grid grid-cols-3 gap-6 xl:grid-cols-4">
          {items.map(item => (
            <Link
              key={item.id}
              href={`${SECONDARY_ROUTES.ROTN_ITEM_DETAIL}/${item.id}`}
            >
              <div className="item flex flex-col rounded border p-4 transition-all hover:bg-base-200 hover:shadow">
                <p style={STYLES.TWO_LINE_ELLIPSIS_TEXT}>
                  {'IMG' || item.name}
                </p>
                <div className="item-imgs mt-4 flex justify-around gap-1">
                  {item.images.slice(0, 3).map((img, imgIdx) => (
                    <div key={imgIdx} className="relative h-20 w-16">
                      <Image
                        fill
                        alt="IMG"
                        sizes="4rem"
                        src={IMG_PLACEHOLDER || img}
                        className="rounded border object-cover p-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {isLoading && <Loading size="lg" className="mt-4" />}
      </div>
    </div>
  );
}

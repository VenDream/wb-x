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
import NoData from '@/components/common/no-data';
import useToast from '@/components/common/toast';
import { Button, Loading, Tab, Tabs } from '@/components/daisyui';
import {
  IMG_PLACEHOLDER,
  PAGINATION_LIMIT,
  SECONDARY_ROUTES,
  STYLES,
} from '@/contants';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const t1 = useTranslations('pages.rotn');
  const t2 = useTranslations('global.dataFetching');
  const { showErrorTips } = useToast();

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
      showErrorTips(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [itemType, pageNo, showErrorTips]);

  const switchItemType = (type: Backend.ROTN_TYPE) => {
    if (type === itemType) return;

    setItemType(type);
    setPageNo(0);
    setItems([]);
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const renderAniItem = useCallback((item: Backend.ROTNItem) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className="item border-regular flex flex-col rounded p-4 transition-all hover:bg-base-200">
          <p style={STYLES.TWO_LINE_ELLIPSIS_TEXT}>{'IMG' || item.name}</p>
          <div className="item-imgs mt-4 flex justify-around gap-1">
            {item.images.slice(0, 3).map((img, imgIdx) => (
              <div key={imgIdx} className="relative h-20 w-16">
                <Image
                  fill
                  alt="IMG"
                  sizes="4rem"
                  src={IMG_PLACEHOLDER || img}
                  className="border-regular rounded object-cover p-1"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }, []);

  return (
    <div className="rotn-page flex h-full flex-col">
      <Tabs boxed className="mb-4" value={itemType} onChange={switchItemType}>
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
      <div
        style={{ scrollbarGutter: 'stable' }}
        className="item-list-wrapper flex-1 overflow-auto pr-4"
      >
        <div className="item-list grid grid-cols-3 gap-6 xl:grid-cols-4">
          {items.map(item => (
            <Link
              key={item.id}
              scroll={false}
              href={`${SECONDARY_ROUTES.ROTN_ITEM_DETAIL}/${item.id}`}
            >
              {renderAniItem(item)}
            </Link>
          ))}
        </div>
        <div className="flex h-[6rem] items-center justify-center">
          {isLoading ? (
            <Loading color="primary" />
          ) : isLoadAll ? (
            <p className="text-sm">{t2('noMore')}</p>
          ) : items.length > 0 ? (
            <Button size="sm" onClick={() => setPageNo(pageNo + 1)}>
              {t2('loadMore')}
            </Button>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  );
}

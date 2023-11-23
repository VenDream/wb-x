'use client';

/*
 * Weibo Status List
 *
 * @Author: VenDream
 * @Date: 2023-11-22 16:25:08
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbStatusList } from '@/api/client';
import NoData from '@/components/common/no-data';
import useToast from '@/components/common/toast';
import { Button, Loading } from '@/components/daisyui';
import { PAGINATION_LIMIT } from '@/contants';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import StatusCard from '../detail/[id]/card';

export default function Page() {
  const { showErrorTips } = useToast();
  const t2 = useTranslations('global.dataFetching');

  const [pageNo, setPageNo] = useState(0);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [statusList, setStatusList] = useState<Backend.Status[]>([]);

  const fetchStatuses = useCallback(async () => {
    try {
      setIsLoading(true);
      const limit = PAGINATION_LIMIT / 2;
      const offset = pageNo * limit;
      const { statuses = [] } = await getDbStatusList({
        limit,
        offset,
      });
      setStatusList(pageNo === 0 ? statuses : list => [...list, ...statuses]);
      if (statuses.length < limit) setIsLoadAll(true);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      showErrorTips(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [pageNo, showErrorTips]);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  return (
    <div className="status-list m-auto h-full">
      <div
        style={{ scrollbarGutter: 'stable' }}
        className="status-list-wrapper flex flex-col items-center gap-4 overflow-auto"
      >
        {statusList.map(status => (
          <StatusCard key={status.id} status={status} />
        ))}
        <div className="flex h-[6rem] items-center justify-center">
          {isLoading ? (
            <Loading color="primary" />
          ) : isLoadAll ? (
            <p className="text-sm">{t2('noMore')}</p>
          ) : statusList.length > 0 ? (
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

/*
 * Weibo Status List Filter
 *
 * @Author: VenDream
 * @Date: 2023-12-04 17:33:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Input } from '@/components/daisyui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface FilterProps {
  /** filter params */
  filterParams: Backend.StatusListFilterParams;
  /** update filter params */
  updateFilterParams: (patch: Partial<Backend.StatusListFilterParams>) => void;
}

export default function Filter(props: FilterProps) {
  const t1 = useTranslations('global.action');
  const t2 = useTranslations('pages.status.filter');
  const { filterParams, updateFilterParams } = props;
  const { keyword, startDate, endDate } = filterParams;

  const [filter, setFilter] = useState<Backend.StatusListFilterParams>({
    keyword,
    startDate,
    endDate,
  });

  return (
    <div className="status-list-filter form-control absolute left-0 top-0 z-10 grid w-[20rem] grid-cols-2 gap-4">
      <div className="form-item col-start-1 col-end-3">
        <Input
          value={filter.keyword}
          size="sm"
          placeholder={t2('keyword')}
          className="w-full rounded"
          onChange={e => setFilter(f => ({ ...f, keyword: e.target.value }))}
        />
      </div>
      <div className="form-item">
        <Input
          value={filter.startDate}
          size="sm"
          placeholder={t2('startDate')}
          className="w-full rounded"
          onChange={e => setFilter(f => ({ ...f, startDate: e.target.value }))}
        />
      </div>
      <div className="form-item">
        <Input
          value={filter.endDate}
          size="sm"
          placeholder={t2('endDate')}
          className="w-full rounded"
          onChange={e => setFilter(f => ({ ...f, endDate: e.target.value }))}
        />
      </div>
      <Button
        size="sm"
        className="col-start-1 col-end-3 rounded"
        onClick={() => updateFilterParams(filter)}
      >
        {t1('search')}
      </Button>
    </div>
  );
}

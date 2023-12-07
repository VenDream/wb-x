/*
 * Weibo Status List Filter
 *
 * @Author: VenDream
 * @Date: 2023-12-04 17:33:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import DatePicker from '@/components/common/datepicker';
import { Button, Input } from '@/components/daisyui';
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface FilterProps {
  /** filter params */
  filterParams: Backend.StatusListFilterParams;
  /** update filter params */
  updateFilterParams: (patch: Partial<Backend.StatusListFilterParams>) => void;
}

const initialFilter: Backend.StatusListFilterParams = {
  uid: '',
  keyword: '',
  startDate: '',
  endDate: '',
};

export default function Filter(props: FilterProps) {
  const t1 = useTranslations('global.action');
  const t2 = useTranslations('pages.status.filter');
  const { filterParams, updateFilterParams } = props;
  const { uid, keyword, startDate, endDate } = filterParams;

  const [filter, setFilter] = useState<Backend.StatusListFilterParams>({
    uid,
    keyword,
    startDate,
    endDate,
  });

  const applyFilter = () => {
    updateFilterParams(filter);
  };

  const resetFilter = () => {
    setFilter(initialFilter);
    updateFilterParams(initialFilter);
  };

  return (
    <div className="status-list-filter border-regular-10 absolute left-0 top-0 flex w-64 flex-col gap-4 rounded p-4 shadow">
      <div className="form-items flex flex-col gap-2">
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs">{t2('uid')}</p>
          <Input
            value={filter.uid}
            size="xs"
            placeholder={t2('uid')}
            className="h-[2rem] w-40 rounded"
            onChange={e => setFilter(f => ({ ...f, uid: e.target.value }))}
          />
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs">{t2('keyword')}</p>
          <Input
            value={filter.keyword}
            size="xs"
            placeholder={t2('keyword')}
            className="h-[2rem] w-40 rounded"
            onChange={e => setFilter(f => ({ ...f, keyword: e.target.value }))}
          />
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs">{t2('startDate')}</p>
          <DatePicker
            classNames="w-[10rem] relative"
            value={filter.startDate ? new Date(filter.startDate) : undefined}
            onChange={date =>
              setFilter(f => ({
                ...f,
                startDate: dayjs(date).format('YYYY-MM-DD'),
              }))
            }
            options={{
              defaultDate: new Date(),
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs">{t2('endDate')}</p>
          <DatePicker
            classNames="w-[10rem] relative"
            value={filter.endDate ? new Date(filter.endDate) : undefined}
            onChange={date =>
              setFilter(f => ({
                ...f,
                endDate: dayjs(date).format('YYYY-MM-DD'),
              }))
            }
            options={{
              defaultDate: new Date(),
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button
          size="xs"
          className="h-[2rem] rounded"
          startIcon={<ArrowPathIcon className="h-4 w-4" />}
          onClick={resetFilter}
        >
          {t1('reset')}
        </Button>
        <Button
          size="xs"
          color="primary"
          className="h-[2rem] rounded"
          startIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
          onClick={applyFilter}
        >
          {t1('search')}
        </Button>
      </div>
    </div>
  );
}

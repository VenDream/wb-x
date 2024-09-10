/*
 * Weibo Status List Filter
 *
 * @Author: VenDream
 * @Date: 2023-12-04 17:33:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import DatePicker, { DateValueType } from '@/components/common/datepicker';
import MotionContainer from '@/components/common/motion-container';
import { Button, Checkbox, Input } from '@/components/daisyui';
import { MAX_IMAGES_COUNT, MIN_IMAGES_COUNT } from '@/contants';
import { cn } from '@/utils/classnames';
import dayjs from '@/utils/dayjs';
import { RotateCcwIcon, SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

interface FilterProps {
  /** filter params */
  filterParams: Backend.StatusListFilterParams;
  /** update filter params */
  updateFilterParams: (patch: Partial<Backend.StatusListFilterParams>) => void;
}

const initialFilter: Backend.StatusListFilterParams = {
  uid: '',
  keyword: '',
  original: false,
  leastImagesCount: '',
  startDate: '',
  endDate: '',
};

export default function Filter(props: FilterProps) {
  const t1 = useTranslations('global.action');
  const t2 = useTranslations('pages.status.filter');
  const { filterParams, updateFilterParams } = props;

  const [filter, setFilter] =
    useState<Backend.StatusListFilterParams>(filterParams);

  const startDate: DateValueType = useMemo<DateValueType>(() => {
    const date = filter.startDate ? new Date(filter.startDate) : null;
    return { startDate: date, endDate: date && new Date(date) };
  }, [filter.startDate]);

  const endDate: DateValueType = useMemo<DateValueType>(() => {
    const date = filter.endDate ? new Date(filter.endDate) : null;
    return { startDate: date && new Date(date), endDate: date };
  }, [filter.endDate]);

  const applyFilter = () => {
    updateFilterParams(filter);
  };

  const resetFilter = () => {
    setFilter(initialFilter);
    updateFilterParams(initialFilter);
  };

  useEffect(() => {
    filterParams && setFilter(filterParams);
  }, [filterParams]);

  return (
    <MotionContainer
      className={cn(
        'flex w-72 flex-col gap-4 border border-base-content/10 p-4',
        'rounded-[--rounded-box] bg-base-200/30 shadow-sm'
      )}
    >
      <div className="m-auto flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('uid')}</p>
          <Input
            value={filter.uid}
            size="xs"
            placeholder={t2('uid')}
            className="h-[2rem] w-40 rounded"
            onKeyDown={e => e.key === 'Enter' && applyFilter()}
            onChange={e => setFilter(f => ({ ...f, uid: e.target.value }))}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('keyword')}</p>
          <Input
            value={filter.keyword}
            size="xs"
            placeholder={t2('keyword')}
            className="h-[2rem] w-40 rounded"
            onKeyDown={e => e.key === 'Enter' && applyFilter()}
            onChange={e => setFilter(f => ({ ...f, keyword: e.target.value }))}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('startDate')}</p>
          <DatePicker
            asSingle={true}
            useRange={false}
            containerClassName="w-40 h-[2rem]"
            inputClassName="input-xs"
            value={startDate}
            onChange={date =>
              setFilter(f => ({
                ...f,
                startDate: date?.startDate
                  ? dayjs(date?.startDate).format('YYYY-MM-DD')
                  : '',
              }))
            }
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('endDate')}</p>
          <DatePicker
            asSingle={true}
            useRange={false}
            containerClassName="w-40 h-[2rem]"
            inputClassName="input-xs"
            value={endDate}
            onChange={date =>
              setFilter(f => ({
                ...f,
                endDate: date?.endDate
                  ? dayjs(date?.endDate).format('YYYY-MM-DD')
                  : '',
              }))
            }
          />
        </div>
        <div className="flex h-[2rem] items-center gap-1">
          <p className="w-20 text-xs">{t2('leastImagesCount')}</p>
          <Input
            value={filter.leastImagesCount}
            size="xs"
            type="number"
            placeholder={t2('leastImagesCountTips')}
            className="m-0 h-[2rem] w-40 appearance-none rounded"
            onKeyDown={e => e.key === 'Enter' && applyFilter()}
            onChange={e => {
              const val = e.target.value;
              if (val === '') {
                setFilter(f => ({ ...f, leastImagesCount: val }));
              } else {
                let count = +val;
                count = Math.max(count, MIN_IMAGES_COUNT);
                count = Math.min(count, MAX_IMAGES_COUNT);
                setFilter(f => ({ ...f, leastImagesCount: String(count) }));
              }
            }}
          />
        </div>
        <div className="flex h-[2rem] items-center gap-1">
          <p className="w-20 text-xs">{t2('original')}</p>
          <Checkbox
            checked={!!filter.original}
            size="xs"
            className="rounded-none"
            onChange={e =>
              setFilter(f => ({ ...f, original: e.target.checked }))
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button
          size="xs"
          color="ghost"
          className="h-[2rem] rounded border-base-content/10 bg-base-content/10"
          startIcon={<RotateCcwIcon size={16} />}
          onClick={resetFilter}
        >
          {t1('reset')}
        </Button>
        <Button
          size="xs"
          color="primary"
          className="h-[2rem] rounded"
          startIcon={<SearchIcon size={16} />}
          onClick={applyFilter}
        >
          {t1('search')}
        </Button>
      </div>
    </MotionContainer>
  );
}

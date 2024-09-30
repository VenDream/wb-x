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
import Tooltip from '@/components/common/tooltip';
import { Button, Checkbox, Input, Tab, Tabs } from '@/components/daisyui';
import { MAX_IMAGES_COUNT, MIN_IMAGES_COUNT } from '@/contants';
import { cn } from '@/utils/classnames';
import { omit } from '@/utils/common';
import dayjs from '@/utils/dayjs';
import { CircleHelpIcon, RotateCcwIcon, SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { defaultFilterParams } from '../status-list';

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

  const applyFilter = (f?: Backend.StatusListFilterParams) => {
    updateFilterParams(f || filter);
  };

  const resetFilter = () => {
    const resetParams = omit(defaultFilterParams, ['dataSource']);
    setFilter(resetParams);
    updateFilterParams(resetParams);
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
          <p className="w-20 text-xs">{t2('dataSource')}</p>
          <Tabs
            boxed
            size="sm"
            value={filter.dataSource}
            className={cn(
              '[&>.tab]:text-base-content',
              'h-[2rem] w-40 flex-nowrap items-center bg-transparent p-0',
              '[&>.tab]:h-full [&>.tab]:w-1/2 [&>.tab]:px-1 [&>.tab]:py-0',
              '[&>.tab]:rounded [&>.tab]:bg-base-100 [&>.tab]:text-xs',
              '[&>.tab]:border [&>.tab]:!border-base-content/20',
              '[&>.tab.tab-active]:!border-primary',
              '[&>.tab:first-child]:rounded-r-none',
              '[&>.tab:first-child]:border-r-0',
              '[&>.tab:last-child]:rounded-l-none',
              '[&>.tab:last-child]:border-l-0'
            )}
            onChange={ds => applyFilter({ ...filter, dataSource: ds })}
          >
            <Tab value="trackings">{t2('trackings')}</Tab>
            <Tab value="retweets">{t2('retweets')}</Tab>
          </Tabs>
        </div>
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
          <p className="flex w-20 items-center gap-1 text-xs">
            {t2('original')}
            <Tooltip message={t2('originalTips')} className="text-xs">
              <CircleHelpIcon size={14} />
            </Tooltip>
          </p>
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
          onClick={() => applyFilter()}
        >
          {t1('search')}
        </Button>
      </div>
    </MotionContainer>
  );
}

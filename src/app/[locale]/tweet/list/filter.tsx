/*
 * Twitter Tweet List Filter
 *
 * @Author: VenDream
 * @Date: 2025-05-15 10:22:22
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import DatePicker from '@/components/common/datepicker';
import MotionContainer from '@/components/common/motion-container';
import Tabs from '@/components/common/tabs';
import Tooltip from '@/components/common/tooltip';
import { Button, Input, Toggle } from '@/components/daisyui';
import { MAX_IMAGES_NUM, MIN_IMAGES_NUM } from '@/constants';
import { cn } from '@/utils/classnames';
import { CircleHelpIcon, RotateCcwIcon, SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { DEFAULT_FILTER_PARAMS } from './params';

type FilterParams = Twitter.TweetListFilterParams;

interface FilterProps {
  /** filter params */
  filterParams: FilterParams;
  /** reset filter params */
  resetFilterParams: () => void;
  /** update filter params */
  updateFilterParams: (patch: Partial<FilterParams>) => void;
}

export default function Filter(props: FilterProps) {
  const t1 = useTranslations('global.action');
  const t2 = useTranslations('pages.tweet.filter');
  const { filterParams, resetFilterParams, updateFilterParams } = props;

  const [filter, setFilter] = useState<FilterParams>(filterParams);

  const updateFilter = (patch: Partial<FilterParams>) => {
    setFilter(f => ({ ...f, ...patch }));
  };

  const applyFilter = (f?: FilterParams) => {
    updateFilterParams(f || filter);
  };

  const resetFilter = () => {
    setFilter(DEFAULT_FILTER_PARAMS);
    resetFilterParams();
  };

  useEffect(() => {
    filterParams && setFilter(filterParams);
  }, [filterParams]);

  return (
    <MotionContainer
      className={cn(
        'border-base-content/10 flex w-72 flex-col gap-4 border p-4',
        'bg-base-200/30 rounded-box shadow-xs'
      )}
    >
      <div className="m-auto flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('dataSource')}</p>
          <Tabs
            size="xs"
            name="scope"
            className="bg-base-300 flex-1 flex-nowrap space-x-0 rounded-sm p-1"
            itemClassName="basis-1/2 !rounded-sm"
            value={filter.scope}
            onChange={value =>
              applyFilter({ scope: value as FilterParams['scope'] })
            }
            items={[
              {
                label: t2('trackings'),
                value: 'tracking',
              },
              {
                label: t2('all'),
                value: 'all',
              },
            ]}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('order')}</p>
          <Tabs
            size="xs"
            name="order"
            className="bg-base-300 flex-1 flex-nowrap space-x-0 rounded-sm p-1"
            itemClassName="basis-1/2 !rounded-sm"
            value={filter.order}
            onChange={value => applyFilter({ order: value as 'asc' | 'desc' })}
            items={[
              {
                label: t2('desc'),
                value: 'desc',
              },
              {
                label: t2('asc'),
                value: 'asc',
              },
            ]}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('id')}</p>
          <Input
            value={filter.id || ''}
            size="xs"
            placeholder={t2('id')}
            className="h-[2rem] w-40 rounded-sm"
            onKeyDown={e => e.key === 'Enter' && applyFilter()}
            onChange={e => updateFilter({ id: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('uid')}</p>
          <Input
            value={filter.uid || ''}
            size="xs"
            placeholder={t2('uid')}
            className="h-[2rem] w-40 rounded-sm"
            onKeyDown={e => e.key === 'Enter' && applyFilter()}
            onChange={e => updateFilter({ uid: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('keyword')}</p>
          <Input
            value={filter.keyword || ''}
            size="xs"
            placeholder={t2('keyword')}
            className="h-[2rem] w-40 rounded-sm"
            onKeyDown={e => e.key === 'Enter' && applyFilter()}
            onChange={e => updateFilter({ keyword: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('startDate')}</p>
          <DatePicker
            date={filter.startDate}
            inputClassName="text-xs rounded-sm h-[2rem] w-40 flex-1"
            onChange={date => updateFilter({ startDate: date })}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-20 text-xs">{t2('endDate')}</p>
          <DatePicker
            date={filter.endDate}
            inputClassName="text-xs rounded-sm h-[2rem] w-40 flex-1"
            onChange={date => updateFilter({ endDate: date })}
          />
        </div>
        <div className="flex h-[2rem] items-center gap-1">
          <p className="w-20 text-xs">{t2('leastImagesCount')}</p>
          <Input
            value={filter.leastImagesCount || ''}
            size="xs"
            type="number"
            placeholder={t2('leastImagesCountTips')}
            className="m-0 h-[2rem] w-40 appearance-none rounded-sm"
            onKeyDown={e => e.key === 'Enter' && applyFilter()}
            onChange={e => {
              const val = e.target.value;
              if (val === '') {
                updateFilter({ leastImagesCount: 0 });
              } else {
                let count = +val;
                count = Math.max(count, MIN_IMAGES_NUM);
                count = Math.min(count, MAX_IMAGES_NUM);
                updateFilter({ leastImagesCount: count });
              }
            }}
          />
        </div>
        <div className="flex h-[2rem] items-center gap-1">
          <p className="w-20 text-xs">{t2('leastVideosCount')}</p>
          <Input
            value={filter.leastVideosCount || ''}
            size="xs"
            type="number"
            placeholder={t2('leastVideosCountTips')}
            className="m-0 h-[2rem] w-40 appearance-none rounded-sm"
            onKeyDown={e => e.key === 'Enter' && applyFilter()}
            onChange={e => {
              const val = e.target.value;
              if (val === '') {
                updateFilter({ leastVideosCount: 0 });
              } else {
                let count = +val;
                count = Math.max(count, MIN_IMAGES_NUM);
                count = Math.min(count, MAX_IMAGES_NUM);
                updateFilter({ leastVideosCount: count });
              }
            }}
          />
        </div>
        <div className="flex h-[2rem] items-center gap-1">
          <p className="flex w-20 items-center gap-1 text-xs">
            {t2('favourite')}
          </p>
          <Toggle
            color="primary"
            checked={!!filter.isFavourite}
            onChange={e =>
              updateFilter({
                isFavourite: e.target.checked ? true : undefined,
              })
            }
          />
        </div>
        <div className="flex h-[2rem] items-center gap-1">
          <p className="flex w-20 items-center gap-1 text-xs">
            {t2('original')}
            <Tooltip message={t2('originalTips')} className="text-xs">
              <CircleHelpIcon size={14} />
            </Tooltip>
          </p>
          <Toggle
            color="primary"
            checked={!!filter.isOriginal}
            onChange={e =>
              updateFilter({
                isOriginal: e.target.checked ? true : undefined,
              })
            }
          />
        </div>
        <div className="flex h-[2rem] items-center gap-1">
          <p className="flex w-20 items-center gap-1 text-xs">
            {t2('hasVideo')}
          </p>
          <Toggle
            color="primary"
            checked={!!filter.hasVideos}
            onChange={e =>
              updateFilter({
                hasVideos: e.target.checked ? true : undefined,
              })
            }
          />
        </div>
        <div className="flex h-[2rem] items-center gap-1">
          <p className="flex w-20 items-center gap-1 text-xs">
            {t2('hasImages')}
          </p>
          <Toggle
            color="primary"
            checked={!!filter.hasImages}
            onChange={e =>
              updateFilter({
                hasImages: e.target.checked ? true : undefined,
              })
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          ghost
          className="border-base-content/10 bg-base-content/10"
          onClick={resetFilter}
        >
          <RotateCcwIcon size={16} />
          {t1('reset')}
        </Button>
        <Button size="sm" color="primary" onClick={() => applyFilter()}>
          <SearchIcon size={16} />
          {t1('search')}
        </Button>
      </div>
    </MotionContainer>
  );
}

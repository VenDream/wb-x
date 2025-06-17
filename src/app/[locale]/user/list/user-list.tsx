'use client';

/*
 * User List
 *
 * @Author: VenDream
 * @Date: 2023-09-27 14:49:32
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { twitter, weibo } from '@/api/client';
import { UserCard } from '@/app/[locale]/user/_card';
import Loading from '@/components/common/loading';
import { NoData } from '@/components/common/no-data';
import Tabs from '@/components/common/tabs';
import { Button, Input } from '@/components/daisyui';
import { TwitterIcon, WeiboIcon } from '@/components/icons';
import { PAGINATION_LIMIT } from '@/constants';
import { cn } from '@/utils/classnames';
import { useMount, useUpdateEffect } from 'ahooks';
import { RotateCcwIcon, SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useUrlState } from 'state-in-url';
import Filter from './filter';
import Menu from './menu';
import Paginator from './paginator';

interface UserListProps {
  platform: Platform;
  users: Weibo.User[] | Twitter.User[];

  keyword?: string;
  isTracking?: boolean;

  page: number;
  total: number;
}

type UrlState = {
  page: number;
  keyword?: string;
  platform: Platform;
  isTracking: boolean | '';
};

const DEFAULT_URL_STATE: UrlState = {
  page: 1,
  keyword: '',
  platform: 'weibo',
  isTracking: '',
};

export default function UserList(props: UserListProps) {
  const t1 = useTranslations('global.platform');
  const t2 = useTranslations('pages.users');

  const serverUrlState: UrlState = useMemo(
    () => ({
      page: props.page,
      keyword: props.keyword,
      platform: props.platform,
      isTracking: props.isTracking ?? '',
    }),
    [props.keyword, props.page, props.platform, props.isTracking]
  );

  const [refresh, setRefresh] = useState({});
  const [users, setUsers] = useState(props.users);
  const [total, setTotal] = useState(props.total);
  const [isLoading, setIsLoading] = useState(false);
  const [localKw, setLocalKw] = useState(props.keyword || '');
  const [localIsTracking, setLocalIsTracking] = useState(!!props.isTracking);

  const { urlState, setUrl } = useUrlState(DEFAULT_URL_STATE);
  const { page, keyword, platform, isTracking } = urlState;

  const isWeibo = platform === 'weibo';
  const apiClient = isWeibo ? weibo : twitter;

  const fetchUserList = useCallback(async () => {
    if (!refresh) return;

    const pageNo = page - 1;
    const pageSize = PAGINATION_LIMIT;

    try {
      setIsLoading(true);
      const { list: users, total } = await apiClient.getUserList({
        keyword,
        limit: pageSize,
        offset: pageNo * pageSize,
        isTracking: isTracking === true ? true : undefined,
        needTotal: true,
      });
      setUsers(users);
      setTotal(total as number);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [apiClient, isTracking, keyword, page, refresh]);

  const resetList = () => {
    setUsers([]);
    setTotal(0);
  };

  const switchPlatform = (platform: Platform) => {
    resetList();
    setLocalKw('');
    setLocalIsTracking(false);
    setUrl(state => ({
      ...state,
      platform,
      keyword: '',
      isTracking: '',
      page: 1,
    }));
    setRefresh({});
  };

  const toggleTracking = (isTracking: boolean) => {
    resetList();
    setLocalIsTracking(isTracking);
    setUrl(state => ({
      ...state,
      isTracking: isTracking === true ? true : '',
      page: 1,
    }));
    setRefresh({});
  };

  const applyKeyword = (keyword: string) => {
    resetList();
    setLocalKw(keyword);
    setLocalIsTracking(false);
    setUrl(state => ({
      ...state,
      keyword,
      isTracking: '',
      page: 1,
    }));
    setRefresh({});
  };

  const jumpPage = (page: number) => {
    resetList();
    setUrl(state => ({ ...state, page }));
    setRefresh({});
  };

  useMount(() => {
    setUrl(serverUrlState);
  });

  useUpdateEffect(() => {
    fetchUserList();
  }, [refresh]);

  return (
    <div className="flex h-full flex-col gap-4 p-px pt-0 lg:pr-4">
      <div className="relative top-0 lg:sticky lg:z-1">
        <Tabs
          size="sm"
          name="platform"
          className="border-base-content/10 border shadow-xs"
          items={[
            {
              label: t1('weibo'),
              value: 'weibo' as Platform,
              icon: <WeiboIcon size={16} />,
            },
            {
              label: t1('twitter'),
              value: 'twitter' as Platform,
              icon: <TwitterIcon size={16} />,
            },
          ]}
          value={platform}
          onChange={p => switchPlatform(p as Platform)}
        />
        <Menu
          keyword={localKw}
          isTracking={localIsTracking}
          setKeyword={setLocalKw}
          applyKeyword={applyKeyword}
          onToggleTracking={toggleTracking}
        />
        <div className="absolute top-0 right-2 hidden h-full items-center gap-4 lg:flex">
          <Filter
            isTracking={localIsTracking}
            onToggleTracking={toggleTracking}
          />
          <Input
            size="sm"
            className="bg-transparent"
            placeholder={t2('search.placeholder')}
            value={localKw}
            onChange={e => setLocalKw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyKeyword(localKw)}
          />
          <Button
            size="sm"
            color="primary"
            onClick={() => applyKeyword(localKw)}
          >
            <SearchIcon size={16} />
            {t2('search.search')}
          </Button>
          <Button
            size="sm"
            ghost
            className="bg-base-content/10"
            onClick={() => applyKeyword('')}
          >
            <RotateCcwIcon size={16} />
            {t2('search.reset')}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loading align="center" />
      ) : users.length <= 0 ? (
        <NoData />
      ) : (
        <>
          <div
            className={cn(
              'grid grid-cols-2 gap-4',
              'lg:grid-cols-4 lg:gap-6 lg:p-2 2xl:grid-cols-6'
            )}
          >
            {users.map(user => (
              <UserCard key={user.id} user={user} platform={platform} />
            ))}
          </div>
          <Paginator
            total={total}
            pageSize={PAGINATION_LIMIT}
            defaultCurrent={page}
            hideOnSinglePage={false}
            onCurrentPageChange={jumpPage}
          />
        </>
      )}
    </div>
  );
}

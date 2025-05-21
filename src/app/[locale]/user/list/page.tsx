/*
 * Users Page
 *
 * @Author: VenDream
 * @Date: 2023-09-07 17:09:27
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { twitter, weibo } from '@/api/server';
import MotionContainer from '@/components/common/motion-container';
import { PAGINATION_LIMIT } from '@/constants';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UserList from './user-list';

// revalidate user list at most every hour - 60 * 60
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Page({ searchParams }: ParamsBody) {
  const sp = await searchParams;
  if (sp.page && Number.isNaN(Number(sp.page))) notFound();

  const page = Number(sp.page) || 1;
  const platform = sp.platform ? sp.platform.replace(/'/g, '') : 'weibo';
  const keyword = sp.keyword ? sp.keyword.replace(/'/g, '') : '';
  const isTracking = sp.isTracking === 'true' ? true : undefined;

  const isWeibo = platform === 'weibo';

  const pageNo = Number(page) - 1;
  const pageSize = PAGINATION_LIMIT;
  const apiEndpoint = isWeibo ? weibo : twitter;
  const { list: users = [], total = 0 } = await apiEndpoint.getUserList({
    keyword,
    limit: pageSize,
    offset: pageNo * pageSize,
    isTracking,
    needTotal: true,
  });

  return (
    <MotionContainer>
      <UserList
        platform={platform}
        users={users}
        keyword={keyword}
        isTracking={isTracking}
        page={page}
        total={total}
      />
    </MotionContainer>
  );
}

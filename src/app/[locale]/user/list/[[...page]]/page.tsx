/*
 * Users Page
 *
 * @Author: VenDream
 * @Date: 2023-09-07 17:09:27
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { weibo } from '@/api/server';
import MotionContainer from '@/components/common/motion-container';
import { NoData } from '@/components/common/no-data';
import { PAGINATION_LIMIT } from '@/constants';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UsersList from './user-list';

// revalidate user list at most every hour - 60 * 60
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Page({ params }: ParamsBody) {
  const { page = 1 } = await params;
  if (page && Number.isNaN(Number(page))) notFound();

  const pageNo = Number(page) - 1;
  const pageSize = PAGINATION_LIMIT;
  const { list: users = [], total = 0 } = await weibo.getUserList({
    limit: pageSize,
    offset: pageNo * pageSize,
    needTotal: true,
  });

  return (
    <MotionContainer className="flex flex-col gap-10">
      {users.length > 0 ? (
        <UsersList users={users} pageNo={pageNo} total={total} />
      ) : (
        <NoData />
      )}
    </MotionContainer>
  );
}

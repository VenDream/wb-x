/*
 * Users Page
 *
 * @Author: VenDream
 * @Date: 2023-09-07 17:09:27
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbUsers } from '@/api/server';
import { PAGINATION_LIMIT } from '@/contants';
import { notFound } from 'next/navigation';
import Paginator from './paginator';
import UsersList from './user-list';

export default async function Users({ params }: ParamsBody) {
  const { page = 1 } = params;
  if (page && isNaN(page)) notFound();

  const pageNo = Number(page) - 1;
  const pageSize = PAGINATION_LIMIT;
  const { users = [], total = 0 } = await getDbUsers({
    limit: pageSize,
    offset: pageNo * pageSize,
    needTotal: true,
  });

  return (
    <div className="users-page">
      <UsersList users={users}></UsersList>
      <Paginator
        total={total}
        pageSize={pageSize}
        defaultCurrent={pageNo + 1}
      ></Paginator>
    </div>
  );
}
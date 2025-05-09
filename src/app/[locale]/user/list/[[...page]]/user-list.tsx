'use client';

/*
 * User List
 *
 * @Author: VenDream
 * @Date: 2023-09-27 14:49:32
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { PAGINATION_LIMIT } from '@/constants';
import { cn } from '@/utils/classnames';
import Paginator from './paginator';
import UserCard from './user-card';

interface UsersListProps {
  users: Weibo.User[];
  pageNo: number;
  total: number;
}

export default function UsersList(props: UsersListProps) {
  const { users = [], total = 0, pageNo = 0 } = props;

  return (
    <>
      <div className={cn('rounded-box grid grid-cols-5 gap-6 px-2 py-4')}>
        {users.map(user => (
          <UserCard key={user.id} user={user} platform="weibo" />
        ))}
      </div>
      <Paginator
        total={total}
        pageSize={PAGINATION_LIMIT}
        defaultCurrent={pageNo + 1}
      />
    </>
  );
}

/*
 * User List
 *
 * @Author: VenDream
 * @Date: 2023-09-27 14:49:32
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import UserCard from './user-card';

interface UsersListProps {
  users: Backend.User[];
}

export default function UsersList(props: UsersListProps) {
  const { users = [] } = props;

  return (
    <div
      className={cn('grid grid-cols-5 gap-6 rounded-[--rounded-box] px-2 py-4')}
    >
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

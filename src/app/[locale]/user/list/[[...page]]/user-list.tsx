/*
 * User List
 *
 * @Author: VenDream
 * @Date: 2023-09-27 14:49:32
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Avatar } from '@/components/daisyui';
import { STYLES } from '@/contants';

interface UsersListProps {
  users: Backend.User[];
}

export const LOGO =
  'https://mk.dev.rabbitpre.com.cn/common/content/assets/images/default-app-cover.png';

export default function UsersList(props: UsersListProps) {
  const { users = [] } = props;

  return (
    <div className="mb-12 grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5">
      {users.map(user => {
        const { id, name, avatar, desc, followCount, followersCount } = user;
        if (!id || +id <= 0) return;

        return (
          <div
            key={id}
            className="flex flex-col items-center justify-between rounded-lg p-4 transition-all hover:bg-base-200"
          >
            <Avatar
              src={LOGO || avatar}
              border
              size="sm"
              shape="circle"
              borderColor="primary"
            />
            <p className="mt-3 w-[80%] text-center text-sm" title={name}>
              {name || '-'}
            </p>
            <p className="mt-2 w-[80%] text-center text-xs text-gray-400">
              <span className="mr-3">关注: {followCount || 0}</span>
              <span className="mr-3">粉丝: {followersCount || 0}</span>
            </p>
            <p
              className="mt-2 w-[80%] text-center text-xs text-gray-400"
              style={STYLES.TWO_LINE_ELLIPSIS_TEXT}
              title={desc}
            >
              简介: {desc || '-'}
            </p>
          </div>
        );
      })}
    </div>
  );
}

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
import { FAKE_IMG } from '@/contants/debug';
import { getImageVariants } from '@/utils/weibo';
import { useTranslations } from 'next-intl';

interface UsersListProps {
  users: Backend.User[];
}

export default function UsersList(props: UsersListProps) {
  const { users = [] } = props;
  const t = useTranslations('pages.user');

  return (
    <div className="mb-10 grid grid-cols-2 gap-2 rounded bg-base-200 p-4 lg:grid-cols-3 xl:grid-cols-5">
      {users.map(user => {
        const { id, name, avatar, desc, followCount, followersCount } = user;
        if (!id || +id <= 0) return;

        return (
          <div
            key={id}
            className="flex flex-col items-center justify-between rounded p-4 hover:bg-base-300"
          >
            <Avatar
              src={FAKE_IMG || getImageVariants(avatar).sm}
              border
              size="sm"
              shape="circle"
              borderColor="primary"
            />
            <p className="mt-3 w-[80%] text-center text-sm" title={name}>
              {name || '-'}
            </p>
            <p className="mt-2 w-[80%] text-center text-xs text-gray-400">
              <span className="mr-3">
                {t('follows')}: {followCount || 0}
              </span>
              <span className="mr-3">
                {t('followers')}: {followersCount || 0}
              </span>
            </p>
            <p
              className="mt-2 w-[80%] text-center text-xs text-gray-400"
              style={STYLES.TWO_LINE_ELLIPSIS_TEXT}
              title={desc}
            >
              {t('desc')}: {desc || '-'}
            </p>
          </div>
        );
      })}
    </div>
  );
}

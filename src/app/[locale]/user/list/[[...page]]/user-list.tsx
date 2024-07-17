/*
 * User List
 *
 * @Author: VenDream
 * @Date: 2023-09-27 14:49:32
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Avatar } from '@/components/daisyui';
import { FAKE_IMG } from '@/contants/debug';
import { cn } from '@/utils/classnames';
import { getImageVariants } from '@/utils/weibo';
import { useTranslations } from 'next-intl';

interface UsersListProps {
  users: Backend.User[];
}

export default function UsersList(props: UsersListProps) {
  const { users = [] } = props;
  const t = useTranslations('pages.user');

  const blockClasses = 'w-[80%] text-center';

  return (
    <div className="mb-10 grid grid-cols-5 gap-2 rounded bg-base-200 p-4">
      {users.map(user => {
        const { id, name, avatar, desc, followCount, followersCount } = user;
        if (!id || +id <= 0) return;

        return (
          <div
            key={id}
            className="flex flex-col items-center justify-between gap-4 rounded p-4 hover:bg-base-300"
          >
            <Avatar
              src={FAKE_IMG || getImageVariants(avatar).sm}
              border
              size="sm"
              shape="circle"
              borderColor="primary"
            />
            <p
              title={name}
              className={cn(blockClasses, 'line-clamp-1 text-sm')}
            >
              {name || '-'}
            </p>
            <p className={cn(blockClasses, 'text-xs text-base-content/80')}>
              {t('follows')}：{followCount || 0}
              <br />
              {t('followers')}：{followersCount || 0}
            </p>
            <p
              title={desc}
              className={cn(
                blockClasses,
                'line-clamp-2 h-[3em] text-xs leading-normal text-base-content/80'
              )}
            >
              {t('desc')}: {desc || '-'}
            </p>
          </div>
        );
      })}
    </div>
  );
}

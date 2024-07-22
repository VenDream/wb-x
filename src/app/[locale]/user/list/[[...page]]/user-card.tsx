'use client';

/*
 * User card
 *
 * @Author: VenDream
 * @Date: 2024-07-18 14:06:36
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { FAKE_IMG } from '@/contants/debug';
import { slideInFromBottom } from '@/contants/motions';
import { cn } from '@/utils/classnames';
import { getImageVariants } from '@/utils/weibo';
import { useTranslations } from 'next-intl';
import { Avatar } from 'react-daisyui';

interface IProps {
  user: Backend.User;
}

export default function UserCard(props: IProps) {
  const t = useTranslations('pages.user');
  const { id, name, avatar, desc, followCount, followersCount } = props.user;

  const blockClasses = 'w-[80%] text-center';

  if (!id || +id <= 0) return null;

  return (
    <MotionContainer
      whileHover={slideInFromBottom}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-between gap-4 px-2 py-6',
        'rounded-[--rounded-box] border border-base-content/10 bg-base-200/50',
        'hover:shadow hover:outline hover:outline-2 hover:outline-primary'
      )}
    >
      <Avatar
        src={FAKE_IMG || getImageVariants(avatar).sm}
        border
        size="sm"
        shape="circle"
        borderColor="primary"
      />
      <p title={name} className={cn(blockClasses, 'line-clamp-1 text-sm')}>
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
    </MotionContainer>
  );
}

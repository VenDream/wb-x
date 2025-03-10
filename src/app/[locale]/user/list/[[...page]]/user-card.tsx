/*
 * User card
 *
 * @Author: VenDream
 * @Date: 2024-07-18 14:06:36
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import Tooltip from '@/components/common/tooltip';
import TrackingsBtn from '@/components/common/trackings-btn';
import { Avatar } from '@/components/daisyui';
import { WEIBO_HOST } from '@/constants';
import { FAKE_IMG } from '@/constants/debug';
import { cn } from '@/utils/classnames';
import { getImageVariants } from '@/utils/weibo';
import { useTranslations } from 'next-intl';

interface IProps {
  user: Backend.User;
  className?: string;
  onTrackUser?: () => void;
  onUntrackUser?: () => void;
}

export default function UserCard(props: IProps) {
  const t = useTranslations('pages.user');
  const { id, name, avatar, desc, followCount, followersCount } = props.user;

  const blockClasses = 'w-[80%] text-center';

  if (!id || +id <= 0) return null;

  return (
    <MotionContainer
      className={cn(
        'flex flex-col items-center justify-between gap-4 px-2 py-6',
        'bg-base-200/30 outline-base-content/10 rounded-box outline',
        'hover:outline-info outline-1 hover:shadow',
        '!will-change-transform',
        props.className
      )}
    >
      <Avatar
        src={FAKE_IMG() || getImageVariants(avatar).sm}
        border
        size="sm"
        shape="circle"
        borderColor="info"
      />
      <a
        target="_blank"
        rel="noreferrer"
        href={`${WEIBO_HOST}/${id}`}
        className={cn(
          blockClasses,
          'line-clamp-1 text-sm hover:underline',
          'hover:text-accent hover:underline-offset-4'
        )}
      >
        <p title={name}>{name ? `@${name}` : '-'}</p>
      </a>
      <TrackingsBtn
        user={props.user}
        onTrackUser={props.onTrackUser}
        onUntrackUser={props.onUntrackUser}
      />
      <p className={cn(blockClasses, 'text-xs')}>
        {t('follows')}：{followCount || 0}
        <br />
        {t('followers')}：{followersCount || 0}
      </p>
      <Tooltip
        delayDuration={500}
        message={desc || '-'}
        className="border-info max-w-64 border text-justify text-xs break-all"
      >
        <p
          className={cn(
            blockClasses,
            'line-clamp-2 h-[3em] text-xs leading-normal'
          )}
        >
          {desc || '-'}
        </p>
      </Tooltip>
    </MotionContainer>
  );
}

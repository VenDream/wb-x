/*
 * Twitter Tweet Card Header
 *
 * @Author: VenDream
 * @Date: 2025-05-15 14:39:03
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import AuthGuard from '@/components/common/auth-guard';
import Image from '@/components/common/image';
import Tooltip from '@/components/common/tooltip';
import TrackingsBtn from '@/components/common/trackings-btn';
import { Avatar } from '@/components/daisyui';
import { TWITTER_HOST } from '@/constants';
import { FAKE_IMG } from '@/constants/debug';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { getCreateTime } from '@/utils/datetime';
import { getImageVariants } from '@/utils/twitter';
import { useContext, useEffect, useState } from 'react';
import { CardCtx } from './context';
import { getSourceIcon } from './icons';

export default function CardHeader() {
  const { tweet, isRetweet, isComment } = useContext(CardCtx);
  const { user, createdAt, source } = tweet as Twitter.Tweet;

  const [ct, setCt] = useState('');

  useEffect(() => {
    setCt(getCreateTime(createdAt));
  }, [createdAt]);

  if (isRetweet)
    return (
      <div className="flex items-center gap-2 p-2">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`${TWITTER_HOST}/${user.screenName}`}
          className="text-[#1da1f2] underline underline-offset-2"
        >
          @{user.name}
        </Link>
        {!isComment && (
          <AuthGuard fallback={null}>
            <TrackingsBtn
              platform="twitter"
              user={user}
              iconOnly
              iconSize={14}
              className="h-5 min-h-0 w-10"
            />
          </AuthGuard>
        )}
      </div>
    );

  return (
    <div
      className={cn('grid grid-cols-[1fr_8fr] grid-rows-2', {
        'pt-4': !isComment,
      })}
    >
      <div
        className={cn(
          'relative row-start-1 row-end-3 flex items-center justify-center'
        )}
      >
        <Avatar>
          <div
            className={cn(
              'outline-primary relative h-10 w-10 rounded-full',
              'outline-2 outline-offset-3'
            )}
          >
            <Image
              alt={user.name}
              src={FAKE_IMG() || getImageVariants(user.avatar).sm}
            />
          </div>
        </Avatar>
        {!isComment && (
          <AuthGuard fallback={null}>
            <div
              className={cn(
                'absolute left-1/2 z-10 w-10 -translate-x-1/2',
                'top-[calc(100%_+_12px)]'
              )}
            >
              <TrackingsBtn
                platform="twitter"
                user={user}
                block
                iconOnly
                iconSize={14}
                className="h-5 min-h-0"
              />
            </div>
          </AuthGuard>
        )}
      </div>
      <span className="flex items-center gap-4 text-sm">{user.name}</span>
      <span className="inline-flex items-center">
        <Tooltip message={`${createdAt} • ${source}`} className="text-xs">
          <span
            className={cn(
              'text-base-content/50 flex cursor-text items-center text-xs'
            )}
          >
            {ct}
            {source && (
              <>
                &nbsp;•&nbsp;
                {getSourceIcon(source)}
              </>
            )}
          </span>
        </Tooltip>
      </span>
    </div>
  );
}

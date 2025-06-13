/*
 * Weibo Status Card Header
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import AuthGuard from '@/components/common/auth-guard';
import Image from '@/components/common/image';
import Tooltip from '@/components/common/tooltip';
import TrackingsBtn from '@/components/common/trackings-btn';
import { Avatar } from '@/components/daisyui';
import { WEIBO_HOST } from '@/constants';
import { FAKE_IMG } from '@/constants/debug';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { getCreateTime } from '@/utils/datetime';
import { getImageVariants } from '@/utils/weibo';
import { useContext, useEffect, useState } from 'react';
import CardCtx from './context';
import { cardHeader } from './variants';

export default function CardHeader() {
  const { status, isRetweet } = useContext(CardCtx);
  const { user, createdAt, source, region } = status as Weibo.Status;

  const [ct, setCt] = useState('');

  useEffect(() => {
    setCt(getCreateTime(createdAt));
  }, [createdAt]);

  if (isRetweet)
    return (
      <div className={cardHeader({ type: 'retweet' })}>
        {user.id !== '-1' ? (
          <>
            <Link
              target="_blank"
              rel="noreferrer"
              href={`${WEIBO_HOST}/${user.id}`}
              className="text-[#eb7340] underline underline-offset-2"
            >
              @{user.name}
            </Link>
            <AuthGuard fallback={null}>
              <TrackingsBtn
                platform="weibo"
                user={user}
                iconOnly
                iconSize={14}
                className="h-5 min-h-0 w-10"
              />
            </AuthGuard>
          </>
        ) : (
          '-'
        )}
      </div>
    );

  return (
    <div className={cardHeader({ type: 'source' })}>
      <div className={cn('relative flex items-center justify-center')}>
        <Avatar>
          <div
            className={cn(
              'outline-primary relative h-8 w-8 rounded-full lg:h-10 lg:w-10',
              'outline-2 outline-offset-3'
            )}
          >
            <Image
              alt={user.name}
              src={FAKE_IMG() || getImageVariants(user.avatar).sm}
            />
          </div>
        </Avatar>
        <AuthGuard fallback={null}>
          <div
            className={cn(
              'absolute left-1/2 z-1 w-10 -translate-x-1/2',
              'top-[calc(100%_+_12px)]'
            )}
          >
            <TrackingsBtn
              platform="weibo"
              user={user}
              block
              iconOnly
              iconSize={14}
              className="h-5 min-h-0"
            />
          </div>
        </AuthGuard>
      </div>
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-4 text-sm">{user.name}</span>
        <Tooltip message={createdAt} className="text-xs">
          <span
            className={cn(
              'text-base-content/50 flex cursor-text items-center text-xs',
              'line-clamp-1 pr-4'
            )}
          >
            {ct}
            {source && (
              <>
                &nbsp;•&nbsp;
                {source}
              </>
            )}
            {region && region !== source && (
              <>
                &nbsp;•&nbsp;
                {region}
              </>
            )}
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

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
import { cn } from '@/utils/classnames';
import { getCreateTime, getImageVariants } from '@/utils/weibo';
import { useContext, useEffect, useState } from 'react';
import CardCtx from './context';

export default function CardHeader() {
  const { status, isRetweet } = useContext(CardCtx);
  const { user, createdAt, source, region } = status as Backend.Status;

  const [ct, setCt] = useState('');

  useEffect(() => {
    setCt(getCreateTime(createdAt));
  }, [createdAt]);

  if (isRetweet)
    return (
      <div className="flex items-center gap-2 p-2">
        {user.id !== '-1' ? (
          <>
            <a
              target="_blank"
              rel="noreferrer"
              href={`${WEIBO_HOST}/${user.id}`}
              className="text-[#eb7340] underline underline-offset-4"
            >
              @{user.name}
            </a>
            <AuthGuard fallback={null}>
              <TrackingsBtn
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
    <div className="grid grid-cols-[1fr_8fr] grid-rows-2 pt-4 tracking-tight">
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
        <AuthGuard fallback={null}>
          <div
            className={cn(
              'absolute left-1/2 z-10 w-10 -translate-x-1/2',
              'top-[calc(100%_+_12px)]'
            )}
          >
            <TrackingsBtn
              user={user}
              block
              iconOnly
              iconSize={14}
              className="h-5 min-h-0"
            />
          </div>
        </AuthGuard>
      </div>
      <span className="flex items-center gap-4 text-sm">{user.name}</span>
      <span className="inline-flex items-center">
        <Tooltip message={createdAt} className="text-xs">
          <span
            className={cn(
              'text-base-content/50 flex cursor-text items-center text-xs'
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
      </span>
    </div>
  );
}

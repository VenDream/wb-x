/*
 * Weibo Status Card Header
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Tooltip from '@/components/common/tooltip';
import TrackingsBtn from '@/components/common/trackings-btn';
import { Avatar } from '@/components/daisyui';
import { WEIBO_HOST } from '@/contants';
import { FAKE_IMG } from '@/contants/debug';
import { getCreateTime, getImageVariants } from '@/utils/weibo';
import { useContext, useEffect, useState } from 'react';
import CardCtx from './context';

export default function CardHeader() {
  const { status, isRetweet } = useContext(CardCtx);
  const { user, createdAt, source } = status!;

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
            <TrackingsBtn
              user={user}
              iconOnly
              iconSize={14}
              className="h-5 min-h-0 w-10"
            />
          </>
        ) : (
          '-'
        )}
      </div>
    );

  return (
    <div className="grid grid-cols-[1fr,8fr] grid-rows-2 pt-4 tracking-tight">
      <div className="relative row-start-1 row-end-3 flex items-center justify-center">
        <Avatar
          src={FAKE_IMG() || getImageVariants(user.avatar).sm}
          border
          size="xs"
          shape="circle"
          borderColor="primary"
          className="row-start-1 row-end-3 flex items-center justify-center"
        />
        <div className="absolute left-1/2 top-[calc(100%_+_12px)] z-10 w-10 -translate-x-1/2">
          <TrackingsBtn
            user={user}
            iconOnly
            fullWidth
            iconSize={14}
            className="h-5 min-h-0"
          />
        </div>
      </div>

      <span className="flex items-center gap-4 text-sm">{user.name}</span>
      <span className="inline-flex items-center">
        <Tooltip message={createdAt} className="text-xs">
          <span className="flex cursor-text items-center text-xs text-base-content/50">
            {ct}
            {source && (
              <>
                &nbsp;•&nbsp;
                {source}
              </>
            )}
          </span>
        </Tooltip>
      </span>
    </div>
  );
}

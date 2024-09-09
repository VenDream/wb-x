/*
 * Weibo Status Card Header
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Tooltip from '@/components/common/tooltip';
import { Avatar } from '@/components/daisyui';
import { FAKE_IMG } from '@/contants/debug';
import { getCreateTime, getImageVariants } from '@/utils/weibo';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import CardCtx from './context';

export default function CardHeader() {
  const t = useTranslations('pages.status');
  const { status, isRetweet } = useContext(CardCtx);
  const { user, createdAt, source } = status!;

  const [ct, setCt] = useState('');

  useEffect(() => {
    setCt(getCreateTime(createdAt));
  }, [createdAt]);

  if (isRetweet) return null;

  return (
    <div className="card-header grid grid-cols-[1fr,8fr] grid-rows-2 pt-4 tracking-tight">
      <Avatar
        src={FAKE_IMG() || getImageVariants(user.avatar).sm}
        border
        size="xs"
        shape="circle"
        borderColor="primary"
        className="row-start-1 row-end-3 flex items-center justify-center"
      />
      <span className="flex items-center text-sm">{user.name}</span>
      <span className="inline-flex items-center">
        <Tooltip message={createdAt} className="text-xs">
          <span className="flex cursor-text items-center text-xs text-gray-500">
            {ct}
            {source && (
              <>
                &nbsp;•&nbsp;
                <span className="flex items-center">
                  {t('sourceFrom')}
                  &nbsp;
                  {source}
                </span>
              </>
            )}
          </span>
        </Tooltip>
      </span>
    </div>
  );
}

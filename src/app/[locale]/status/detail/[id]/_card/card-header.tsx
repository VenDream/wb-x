/*
 * Weibo Status Card Header
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Avatar } from '@/components/daisyui';
import { FAKE_IMG } from '@/contants/debug';
import { getCreateTime } from '@/utils/weibo';
import { useTranslations } from 'next-intl';

interface CardHeaderProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function CardHeader(props: CardHeaderProps) {
  const t = useTranslations('pages.status');
  const { isRetweet } = props;
  const { user, createdAt, source } = props.status;

  if (isRetweet) return null;

  return (
    <div className="card-header grid grid-cols-[1fr,8fr] grid-rows-2 pt-4 tracking-tight">
      <Avatar
        src={FAKE_IMG || user.avatar}
        border
        size="xs"
        shape="circle"
        borderColor="primary"
        className="row-start-1 row-end-3 flex items-center justify-center"
      />
      <span className="flex items-center text-sm">{user.name}</span>
      <span className="flex items-center text-xs text-gray-500">
        {getCreateTime(createdAt)}
        {source && (
          <span className="ml-2 flex items-center">
            <span className="mr-2">{t('sourceFrom')}</span>
            {source}
          </span>
        )}
      </span>
    </div>
  );
}

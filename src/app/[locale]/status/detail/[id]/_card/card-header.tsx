/*
 * Weibo Status Card Header
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Avatar } from '@/components/daisyui';

const AVATAR =
  'https://mk.sit.rabbitpre.com.cn/common/content/assets/images/default-app-cover.png';

interface CardHeaderProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function CardHeader(props: CardHeaderProps) {
  const { isRetweet } = props;
  const { user, createdAt, source } = props.status;

  if (isRetweet) return null;

  return (
    <div className="card-header grid grid-cols-[0.9fr,1.8fr,5fr] grid-rows-2 pt-4">
      <Avatar
        src={AVATAR || user.avatar}
        border
        size="xs"
        shape="circle"
        borderColor="primary"
        className="row-start-1 row-end-3 flex items-center justify-center"
      />
      <span className="col-start-2 col-end-4 flex items-center text-sm">
        {user.name}
      </span>
      <span className="flex items-center text-xs text-gray-500">
        {createdAt}
      </span>
      <span className="flex items-center text-xs text-gray-500">{source}</span>
    </div>
  );
}

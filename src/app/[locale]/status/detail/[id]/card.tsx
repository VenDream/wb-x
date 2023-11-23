/*
 * Weibo Status Card
 *
 * @Author: VenDream
 * @Date: 2023-11-23 13:45:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { Avatar } from '@/components/daisyui';
import {
  ArrowUpOnSquareIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';

import './card.sass';

interface CardProps {
  classname?: string;
  status: Backend.Status;
}

const AVATAR =
  'https://mk.sit.rabbitpre.com.cn/common/content/assets/images/default-app-cover.png';

export default function Card(props: CardProps) {
  const {
    id,
    user,
    text,
    createdAt,
    source,
    images,
    video,
    repostsCount,
    commentsCount,
    attitudesCount,
    retweetedStatus,
  } = props.status;

  return (
    <div
      data-id={id}
      className={`status-card border-regular-10 w-[40rem] rounded-md bg-base-200 p-4 shadow ${props.classname}`}
    >
      <div className="card-header grid grid-cols-[1fr,2fr,5fr] grid-rows-2 pt-4">
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
        <span className="flex w-[150px] items-center text-xs text-gray-500">
          {createdAt}
        </span>
        <span className="flex items-center text-xs text-gray-500">
          {source}
        </span>
      </div>
      <div className="card-body gap-1 p-4">
        <div
          className="status-text text-sm leading-6 tracking-tight"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
        <div className="status-images grid grid-cols-3">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              width={150}
              height={150}
              alt="IMG"
              className="object-cover"
            />
          ))}
        </div>
        {retweetedStatus && (
          <div className="status-repost">
            <Card
              status={retweetedStatus}
              classname="!w-full !shadow-none !bg-base-300"
            ></Card>
          </div>
        )}
      </div>
      <div className="card-footer p-4">
        <div className="status-actions flex gap-4 text-xs tracking-tighter text-gray-500">
          <span className="flex items-center justify-center">
            <HandThumbUpIcon className="mr-1 h-4 w-4" />
            {attitudesCount || 0}
          </span>
          <span className="flex items-center justify-center">
            <ChatBubbleLeftIcon className="mr-1 h-4 w-4" />
            {commentsCount || 0}
          </span>
          <span className="flex items-center justify-center">
            <ArrowUpOnSquareIcon className="mr-1 h-4 w-4" />
            {repostsCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

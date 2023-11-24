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
import ICONS from '@/components/layout/leftsider/icons';
import { Link } from '@/navigation';
import { getImageVariants } from '@/utils/weibo';
import {
  ArrowUpOnSquareIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { card } from './variants';

import './card.sass';

interface CardProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

const MAX_DISPLAY_IMAGES = 9;

const AVATAR =
  'https://mk.sit.rabbitpre.com.cn/common/content/assets/images/default-app-cover.png';

export default function Card(props: CardProps) {
  const { isRetweet } = props;
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

  const remainImagesNum = images.length - MAX_DISPLAY_IMAGES;
  const userName = isRetweet
    ? `<a href="/n/${user.name}" about="_blank">@${user.name}: </a>`
    : '';

  return (
    <div
      data-id={id}
      className={card({ type: isRetweet ? 'retweet' : 'default' })}
    >
      <Link
        href="#"
        className="group absolute right-[-70px] top-[-4px] flex w-[170px] rotate-45 transform items-center justify-center bg-base-300 py-3 shadow"
      >
        <span className="text-red-400 group-hover:text-red-500">
          {ICONS.WEIBO}
        </span>
      </Link>
      {!isRetweet && (
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
      )}
      <div className="card-body gap-1 p-4">
        <div
          className="status-text text-sm leading-6 tracking-tight"
          dangerouslySetInnerHTML={{ __html: userName + text }}
        ></div>
        {images.length > 0 && (
          <div className="status-images grid grid-cols-3 items-center justify-items-center gap-1">
            {images.slice(0, MAX_DISPLAY_IMAGES).map((img, idx) => {
              const { sm } = getImageVariants(img);
              const hasMore =
                idx === MAX_DISPLAY_IMAGES - 1 && remainImagesNum > 0;
              const dataProps = hasMore
                ? { 'data-remains': `+${remainImagesNum}` }
                : {};

              return (
                <div
                  key={idx}
                  {...dataProps}
                  className={clsx(
                    'aspect-square h-full w-full cursor-zoom-in rounded shadow',
                    {
                      'has-more': hasMore,
                    }
                  )}
                >
                  <Image
                    src={sm}
                    alt="IMG"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}
        {retweetedStatus && (
          <div className="status-repost">
            <Card isRetweet status={retweetedStatus}></Card>
          </div>
        )}
      </div>
      <div className="card-footer px-4">
        <div className="status-actions flex gap-4 text-xs tracking-tighter text-gray-500">
          <span className="flex items-center">
            <ArrowUpOnSquareIcon className="mr-1 h-4 w-4" />
            {repostsCount || 0}
          </span>
          <span className="flex items-center">
            <ChatBubbleLeftIcon className="mr-1 h-4 w-4" />
            {commentsCount || 0}
          </span>
          <span className="flex items-center">
            <HandThumbUpIcon className="mr-1 h-4 w-4" />
            {attitudesCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

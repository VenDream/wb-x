'use client';

/*
 * Weibo Status Card
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:28:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import ICONS from '@/components/layout/leftsider/icons';
import { WEIBO_HOST } from '@/contants';
import { Link } from '@/navigation';
import CardBody from './card-body';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import { card } from './variants';

interface CardProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function Card(props: CardProps) {
  const { status, isRetweet } = props;

  return (
    <div
      data-id={status.id}
      className={card({ type: isRetweet ? 'retweet' : 'default' })}
    >
      <Link
        target="_blank"
        href={`${WEIBO_HOST}/detail/${status.id}`}
        className="group absolute right-[-70px] top-[-4px] flex w-[170px] rotate-45 transform items-center justify-center bg-base-300 py-3 shadow"
      >
        <span className="text-base-400 group-hover:text-red-500">
          {ICONS.WEIBO}
        </span>
      </Link>
      <CardHeader status={status} isRetweet={isRetweet} />
      <CardBody status={status} isRetweet={isRetweet} />
      <CardFooter status={status} isRetweet={isRetweet} />
    </div>
  );
}

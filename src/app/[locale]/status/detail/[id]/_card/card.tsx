'use client';

/*
 * Weibo Status Card
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:28:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import CardBody from './card-body';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardMenu from './card-menu';
import { card } from './variants';

import './card.sass';

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
      <CardHeader status={status} isRetweet={isRetweet} />
      <CardBody status={status} isRetweet={isRetweet} />
      <CardFooter status={status} isRetweet={isRetweet} />
      <CardMenu status={status} isRetweet={isRetweet} />
      {/* <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-base-200">
        {status.id}
      </div> */}
    </div>
  );
}

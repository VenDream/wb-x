'use client';

/*
 * Twitter Tweet Card
 *
 * @Author: VenDream
 * @Date: 2025-05-15 13:54:15
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { useMemo } from 'react';
import CardBody from './card-body';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardMenu from './card-menu';
import CardCtx, { DEFAULT_MENU } from './context';
import type { CardContext, TweetCardProps } from './types';
import { card } from './variants';

export default function Card(props: TweetCardProps) {
  const { tweet, menu, isRetweet, sourceTweetId } = props;

  const ctx = useMemo<CardContext>(
    () => ({
      tweet,
      menu: { ...DEFAULT_MENU, ...menu },
      isRetweet: !!isRetweet,
      sourceTweetId: isRetweet ? sourceTweetId : tweet.id,
    }),
    [tweet, menu, isRetweet, sourceTweetId]
  );

  return (
    <div
      data-tweet-id={tweet.id}
      className={card({ type: isRetweet ? 'retweet' : 'source' })}
    >
      <CardCtx.Provider value={ctx}>
        <CardHeader />
        <CardBody />
        <CardMenu />
        <CardFooter />
      </CardCtx.Provider>
    </div>
  );
}

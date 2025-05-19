'use client';

/*
 * Twitter Tweet Card
 *
 * @Author: VenDream
 * @Date: 2025-05-15 13:54:15
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import merge from 'lodash.merge';
import { useCallback, useMemo, useState } from 'react';
import CardBody from './card-body';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardMenu from './card-menu';
import CardCtx, { DEFAULT_MENU } from './context';
import type { CardContext, TweetCardProps } from './types';
import { card } from './variants';

export default function Card(props: TweetCardProps) {
  const { menu, isRetweet, sourceTweetId } = props;

  const [tweet, setTweet] = useState<Twitter.Tweet>(props.tweet);

  const updateTweet = useCallback((tweet: Partial<Twitter.Tweet>) => {
    setTweet(prev => merge({}, prev, tweet));
  }, []);

  const ctx = useMemo<CardContext>(
    () => ({
      tweet,
      updateTweet,
      menu: { ...DEFAULT_MENU, ...menu },
      isRetweet: !!isRetweet,
      sourceTweetId: isRetweet ? sourceTweetId : tweet.id,
    }),
    [tweet, menu, isRetweet, sourceTweetId, updateTweet]
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

'use client';

/*
 * Tweet Detail
 *
 * @Author: VenDream
 * @Date: 2025-05-28 17:21:21
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { twitter } from '@/api/client';
import { CommentList, TweetCard } from '@/app/[locale]/tweet/_card';
import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import { NoData } from '@/components/common/no-data';
import useFavUid from '@/hooks/use-fav-uid';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

interface IProps {
  id: string;
}

export default function TweetDetail(props: IProps) {
  const t = useTranslations('pages.tweet');
  const uid = useFavUid();

  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState<Twitter.Tweet | null>(null);

  const fetchTweetDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const tweets = await twitter.getTweetList({
        id: props.id,
        favUid: uid,
      });
      if (tweets.list.length > 0) {
        setTweet(tweets.list[0]);
      }

      /** @TODO try fetching from upstream */
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [props.id, uid]);

  useEffect(() => {
    fetchTweetDetail();
  }, [fetchTweetDetail]);

  return isLoading ? (
    <Loading align="center" />
  ) : (
    <MotionContainer className="flex flex-col items-center gap-4">
      {tweet ? (
        <>
          <TweetCard tweet={tweet} menu={{ viewComments: false }} />
          <CommentList id={tweet.id} />
        </>
      ) : (
        <NoData tips={t('notExists')} />
      )}
    </MotionContainer>
  );
}

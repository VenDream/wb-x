/*
 * Twitter Tweet Card Body
 *
 * @Author: VenDream
 * @Date: 2025-05-15 15:00:44
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import Card from './card';
import CardImages from './card-images';
import CardCtx from './context';
import { preprocessTweetText } from './text-preprocessor';
import { cardBody } from './variants';

export default function CardBody() {
  const t = useTranslations('pages.tweet');

  const { tweet, isRetweet } = useContext(CardCtx);
  const { id, text, quotedTweet, retweetedTweet } = tweet as Twitter.Tweet;

  const isRetweeted = !!retweetedTweet;

  return (
    <div className={cardBody({ type: isRetweet ? 'retweet' : 'source' })}>
      <div className="col-start-2 col-end-4 space-y-4">
        <div
          className="tweet-text pr-8 text-sm leading-6"
          dangerouslySetInnerHTML={{
            __html: isRetweeted ? t('retweet') : preprocessTweetText(text),
          }}
        />
        {!isRetweeted && <CardImages />}
        {quotedTweet && (
          <Card isRetweet sourceTweetId={id} tweet={quotedTweet} />
        )}
        {retweetedTweet && (
          <Card isRetweet sourceTweetId={id} tweet={retweetedTweet} />
        )}
      </div>
    </div>
  );
}

/*
 * Twitter Tweet Card Body
 *
 * @Author: VenDream
 * @Date: 2025-05-15 15:00:44
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import Card from './card';
import CardImages from './card-images';
import CardVideos from './card-videos';
import CardCtx from './context';
import { preprocessTweetText } from './text-preprocessor';
import { cardBody } from './variants';

const retweetIconHtml = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    style="display: inline-block; vertical-align: middle;"
  >
    <path
      fill="currentColor"
      d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3z"
    />
  </svg>
`;

export default function CardBody() {
  const t = useTranslations('pages.tweet');

  const { tweet, isRetweet } = useContext(CardCtx);
  const { id, text, quotedTweet, retweetedTweet } = tweet as Twitter.Tweet;

  const isRetweeted = !!retweetedTweet;

  return (
    <div className={cardBody({ type: isRetweet ? 'retweet' : 'source' })}>
      <div className="col-start-2 col-end-4 space-y-4">
        <div
          className={cn(
            'pr-8 text-sm leading-6',
            '[&_a]:text-[#1da1f2] [&_a]:underline [&_a]:underline-offset-2',
            {
              'text-base-content/50': isRetweeted,
            }
          )}
          dangerouslySetInnerHTML={{
            __html: isRetweeted
              ? String(t.rich('retweet', { i: () => retweetIconHtml }))
              : preprocessTweetText(text),
          }}
        />
        {!isRetweeted && <CardImages />}
        {!isRetweeted && <CardVideos />}
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

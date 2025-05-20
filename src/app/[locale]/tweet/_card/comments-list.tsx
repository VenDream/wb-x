/*
 * Tweet Comments List
 *
 * @Author: VenDream
 * @Date: 2025-05-20 14:01:13
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import Loading from '@/components/common/loading';
import { LANGS } from '@/constants';
import useIsDarkTheme from '@/hooks/use-is-dark-theme';
import { getLocale } from '@/utils/common';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface CommentsListProps {
  tweetId: string;
}

export default function CommentsList(props: CommentsListProps) {
  const { tweetId } = props;
  const domId = `twitter-${tweetId}`;
  const t = useTranslations('pages.tweet.comments');
  const isDarkTheme = useIsDarkTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const twitterWidget = window.twttr;
    const container = document.getElementById(domId);
    if (!twitterWidget || !container) return;

    setTimeout(async () => {
      twitterWidget.widgets
        .createTweet(tweetId, container, {
          dnt: false,
          // cards: 'hidden',
          theme: isDarkTheme ? 'light' : 'light',
          lang: getLocale() === LANGS.zh ? 'zh-cn' : 'en',
        })
        .then(() => {
          setIsLoading(false);
        });
    }, 300);
  }, [domId, isDarkTheme, tweetId]);

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <Loading align="center" />
      ) : (
        <p className="text-base-content/50 flex items-center gap-1 text-sm">
          {t('tips')}
          <SquareArrowOutUpRightIcon size={16} className="relative top-[1px]" />
        </p>
      )}
      <div id={domId} className="min-h-[4rem] w-full" />
    </div>
  );
}

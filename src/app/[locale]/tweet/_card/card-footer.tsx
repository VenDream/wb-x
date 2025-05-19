/*
 * Twitter Tweet Card Footer
 *
 * @Author: VenDream
 * @Date: 2025-05-15 15:45:54
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import FavouriteBtn from '@/components/common/favourite-btn';
import Tooltip from '@/components/common/tooltip';
import { Button } from '@/components/daisyui';
import { TWITTER_HOST } from '@/constants';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { formatNumberWithUnit } from '@/utils/common';
import { getCreateTime } from '@/utils/datetime';
import {
  BookmarkIcon,
  EyeIcon,
  MessageCircleMoreIcon,
  Repeat2Icon,
  ThumbsUpIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import CardCtx from './context';
import { getSourceIcon } from './icons';
import { cardFooter } from './variants';

export default function CardFooter() {
  const t = useTranslations('pages.tweet');
  const { tweet, isRetweet } = useContext(CardCtx);
  const {
    id,
    user,
    source,
    createdAt,
    viewCount,
    repostsCount,
    commentsCount,
    favoriteCount,
    bookmarkCount,
  } = tweet as Twitter.Tweet;

  const [ct, setCt] = useState('');
  const [vc, setVc] = useState('0');
  const [rc, setRc] = useState('0');
  const [cc, setCc] = useState('0');
  const [fc, setFc] = useState('0');
  const [bc, setBc] = useState('0');

  /**
   * @TODO show twitter comments with API
   */
  const showComments = () => {};

  useEffect(() => {
    setCt(getCreateTime(createdAt));
    setVc(formatNumberWithUnit(viewCount || 0));
    setRc(formatNumberWithUnit(repostsCount || 0));
    setCc(formatNumberWithUnit(commentsCount || 0));
    setFc(formatNumberWithUnit(favoriteCount || 0));
    setBc(formatNumberWithUnit(bookmarkCount || 0));
  }, [
    bookmarkCount,
    commentsCount,
    createdAt,
    favoriteCount,
    repostsCount,
    viewCount,
  ]);

  return (
    <div className={cardFooter({ type: isRetweet ? 'retweet' : 'source' })}>
      <div
        className={cn(
          'col-start-2 col-end-4 flex justify-between text-xs',
          'text-base-content/60'
        )}
      >
        <div className="flex gap-3">
          <FavouriteBtn platform="twitter" post={tweet as Twitter.Tweet} />
          <Tooltip message={t('footer.comments')} className="text-xs">
            <Button
              link
              // onClick={showComments}
              className={cn(
                'text-base-content/60 m-0 h-auto min-h-0 gap-0 p-0 no-underline',
                'hover:text-accent text-xs active:!translate-none'
              )}
            >
              <Link
                target="_blank"
                rel="noreferrer"
                className="flex items-center"
                href={`${TWITTER_HOST}/${user.screenName}/status/${id}`}
              >
                <MessageCircleMoreIcon size={16} className="mr-1" />
                {cc}
              </Link>
            </Button>
          </Tooltip>
          <Tooltip message={t('footer.reposts')} className="text-xs">
            <span className="flex items-center">
              <Repeat2Icon size={16} className="mr-1" />
              {rc}
            </span>
          </Tooltip>
          <Tooltip message={t('footer.likes')} className="text-xs">
            <span className="flex items-center">
              <ThumbsUpIcon size={16} className="relative mr-1" />
              {fc}
            </span>
          </Tooltip>
          <Tooltip message={t('footer.views')} className="text-xs">
            <span className="flex items-center">
              <EyeIcon size={16} className="relative mr-1" />
              {vc}
            </span>
          </Tooltip>
          <Tooltip message={t('footer.bookmarks')} className="text-xs">
            <span className="flex items-center">
              <BookmarkIcon size={16} className="relative mr-1" />
              {bc}
            </span>
          </Tooltip>
        </div>
        {isRetweet && (
          <Tooltip message={`${createdAt} • ${source}`} className="text-xs">
            <div
              className={cn(
                'text-base-content/50 flex cursor-text items-center'
              )}
            >
              {ct}
              {source && (
                <>
                  &nbsp;•&nbsp;
                  {getSourceIcon(source)}
                </>
              )}
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

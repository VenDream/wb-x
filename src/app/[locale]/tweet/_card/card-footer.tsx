/*
 * Twitter Tweet Card Footer
 *
 * @Author: VenDream
 * @Date: 2025-05-15 15:45:54
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { useDialog } from '@/components/common/dialog';
import FavouriteBtn from '@/components/common/favourite-btn';
import Tooltip from '@/components/common/tooltip';
import { Button } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { formatNumberWithUnit } from '@/utils/common';
import { getCreateTime } from '@/utils/datetime';
import {
  BookmarkIcon,
  EyeIcon,
  MessageCircleMoreIcon,
  MessageSquareQuoteIcon,
  Repeat2Icon,
  ThumbsUpIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import CommentList from './comment-list';
import { CardCtx } from './context';
import { getSourceIcon } from './icons';
import { cardFooter } from './variants';

export default function CardFooter() {
  const t = useTranslations('pages.tweet');
  const { tweet, isRetweet, isComment } = useContext(CardCtx);
  const {
    id,
    source,
    createdAt,
    viewCount,
    repostsCount,
    commentsCount,
    favoriteCount,
    bookmarkCount,
  } = tweet as Twitter.Tweet;

  const { show: showDialog } = useDialog();

  const [ct, setCt] = useState('');
  const [vc, setVc] = useState('0');
  const [rc, setRc] = useState('0');
  const [cc, setCc] = useState('0');
  const [fc, setFc] = useState('0');
  const [bc, setBc] = useState('0');

  const showComments = () => {
    showDialog({
      footer: null,
      classNames: {
        wrapper: 'w-[40rem] h-[50rem] max-h-[85vh]',
        scrollArea: 'pb-2 pr-6',
      },
      title: t('comments.label'),
      icon: <MessageSquareQuoteIcon size={20} className="mr-2" />,
      content: <CommentList id={id} hideTitle />,
    });
  };

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
    <div
      className={cardFooter({
        type: isRetweet ? 'retweet' : 'source',
        displayAs: isComment ? 'comment' : 'tweet',
      })}
    >
      <div
        className={cn(
          'col-start-2 col-end-4 flex justify-between text-xs',
          'text-base-content/60'
        )}
      >
        <div className="flex gap-3">
          {!isComment && (
            <FavouriteBtn platform="twitter" post={tweet as Twitter.Tweet} />
          )}
          <Tooltip message={t('footer.comments')} className="text-xs">
            <Button
              link
              onClick={showComments}
              className={cn(
                'text-base-content/60 m-0 h-auto min-h-0 gap-0 p-0 no-underline',
                'hover:text-accent text-xs active:!translate-none'
              )}
            >
              <MessageCircleMoreIcon size={16} className="mr-1" />
              {cc}
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

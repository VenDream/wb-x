/*
 * Weibo Status Card Footer
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useDialog } from '@/components/common/dialog';
import FavouriteBtn from '@/components/common/favourite-btn';
import Tooltip from '@/components/common/tooltip';
import { Button } from '@/components/daisyui';
import { useIsMobile } from '@/hooks/use-media-query';
import { cn } from '@/utils/classnames';
import { formatNumberWithUnit } from '@/utils/common';
import { getCreateTime } from '@/utils/datetime';
import {
  MessageCircleMoreIcon,
  MessageSquareQuoteIcon,
  Repeat2Icon,
  ThumbsUpIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import CommentList from './comment-list';
import CardCtx from './context';
import { cardFooter } from './variants';

export default function CardFooter() {
  const t = useTranslations('pages.status');
  const { status, isRetweet } = useContext(CardCtx);
  const {
    id,
    source,
    region,
    createdAt,
    repostsCount,
    commentsCount,
    attitudesCount,
  } = status as Weibo.Status;
  const [ct, setCt] = useState('');
  const [rc, setRc] = useState('0');
  const [cc, setCc] = useState('0');
  const [ac, setAc] = useState('0');

  const isMobile = useIsMobile();
  const { show: showDialog } = useDialog();

  const showComments = () => {
    showDialog({
      footer: null,
      fullScreen: isMobile,
      classNames: {
        wrapper: 'w-[40rem] h-[50rem] max-h-[85vh]',
        scrollArea: isMobile ? 'pr-0' : '!pr-4',
      },
      title: t('comments.label'),
      icon: <MessageSquareQuoteIcon size={20} className="mr-2" />,
      content: <CommentList id={id} hideTitle className="w-full" />,
    });
  };

  useEffect(() => {
    setCt(getCreateTime(createdAt));
    setRc(formatNumberWithUnit(repostsCount || 0));
    setCc(formatNumberWithUnit(commentsCount || 0));
    setAc(formatNumberWithUnit(attitudesCount || 0));
  }, [attitudesCount, commentsCount, createdAt, repostsCount]);

  return (
    <div className={cardFooter({ type: isRetweet ? 'retweet' : 'source' })}>
      <div className={cn('text-base-content/60 flex justify-between text-xs')}>
        <div className="flex gap-3">
          <FavouriteBtn platform="weibo" post={status as Weibo.Status} />
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
              <ThumbsUpIcon size={16} className="relative top-[-1px] mr-1" />
              {ac}
            </span>
          </Tooltip>
        </div>
        {isRetweet && (
          <Tooltip message={createdAt} className="text-xs">
            <div
              className={cn(
                'text-base-content/60 flex cursor-text items-center'
              )}
            >
              {ct}
              {!isMobile && source && (
                <>
                  &nbsp;•&nbsp;
                  {source}
                </>
              )}
              {!isMobile && region && region !== source && (
                <>
                  &nbsp;•&nbsp;
                  {region}
                </>
              )}
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

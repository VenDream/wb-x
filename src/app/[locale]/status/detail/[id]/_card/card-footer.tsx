/*
 * Weibo Status Card Footer
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useDialog } from '@/components/common/dialog';
import { Button } from '@/components/daisyui';
import { formatNumberWithUnit } from '@/utils/common';
import { getCreateTime } from '@/utils/weibo';
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
  const { id, createdAt, repostsCount, commentsCount, attitudesCount } =
    status!;

  const [rc, setRc] = useState('0');
  const [cc, setCc] = useState('0');
  const [ac, setAc] = useState('0');

  const { show: showDialog } = useDialog();

  const showComments = () => {
    showDialog({
      footer: null,
      wrapperClassName: 'w-[40rem] max-h-[780px]',
      scrollAreaClassName: 'pb-2 pr-6',
      title: t('comments.label'),
      icon: <MessageSquareQuoteIcon size={20} className="mr-2" />,
      content: <CommentList id={id} hideTitle className="mt-0 w-full" />,
    });
  };

  useEffect(() => {
    setRc(formatNumberWithUnit(repostsCount || 0));
    setCc(formatNumberWithUnit(commentsCount || 0));
    setAc(formatNumberWithUnit(attitudesCount || 0));
  }, [attitudesCount, commentsCount, repostsCount]);

  return (
    <div className={cardFooter({ type: isRetweet ? 'retweet' : 'default' })}>
      <div className="col-start-2 col-end-4 flex justify-between text-xs tracking-tighter text-base-content/60">
        <div className="flex gap-4">
          <span className="flex items-center">
            <Repeat2Icon size={16} className="mr-1" />
            {rc}
          </span>
          <Button
            variant="link"
            animation={false}
            onClick={showComments}
            className="m-0 h-auto min-h-0 gap-0 p-0 text-base-content/60 no-underline"
          >
            <MessageCircleMoreIcon size={16} className="mr-1" />
            {cc}
          </Button>
          <span className="flex items-center">
            <ThumbsUpIcon size={16} className="relative top-[-1px] mr-1" />
            {ac}
          </span>
        </div>
        {isRetweet && (
          <div className="flex items-center tracking-tight">
            <span className="mr-2">{t('postedOn')}</span>
            {getCreateTime(createdAt)}
          </div>
        )}
      </div>
    </div>
  );
}

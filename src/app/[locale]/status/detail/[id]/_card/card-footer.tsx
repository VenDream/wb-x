/*
 * Weibo Status Card Footer
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { formatNumberWithUnit } from '@/utils/common';
import { getCreateTime } from '@/utils/weibo';
import {
  ArrowUpOnSquareIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import CardCtx from './context';
import { cardFooter } from './variants';

export default function CardFooter() {
  const t = useTranslations('pages.status');
  const { status, isRetweet } = useContext(CardCtx);
  const { createdAt, repostsCount, commentsCount, attitudesCount } = status!;

  const [rc, setRc] = useState('0');
  const [cc, setCc] = useState('0');
  const [ac, setAc] = useState('0');

  useEffect(() => {
    setRc(formatNumberWithUnit(repostsCount || 0));
    setCc(formatNumberWithUnit(commentsCount || 0));
    setAc(formatNumberWithUnit(attitudesCount || 0));
  }, [attitudesCount, commentsCount, repostsCount]);

  return (
    <div className={cardFooter({ type: isRetweet ? 'retweet' : 'default' })}>
      <div className="status-actions col-start-2 col-end-4 flex justify-between text-xs tracking-tighter text-gray-500">
        <div className="status-data flex gap-4">
          <span className="flex items-center">
            <ArrowUpOnSquareIcon className="mr-1 h-4 w-4" />
            {rc}
          </span>
          <span className="flex items-center">
            <ChatBubbleLeftIcon className="mr-1 h-4 w-4" />
            {cc}
          </span>
          <span className="flex items-center">
            <HandThumbUpIcon className="mr-1 h-4 w-4" />
            {ac}
          </span>
        </div>
        {isRetweet && (
          <div className="status-createtime flex items-center tracking-tight">
            <span className="mr-2">{t('postedOn')}</span>
            {getCreateTime(createdAt)}
          </div>
        )}
      </div>
    </div>
  );
}

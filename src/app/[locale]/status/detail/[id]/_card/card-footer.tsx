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
import { MessageCircleMoreIcon, Repeat2Icon, ThumbsUpIcon } from 'lucide-react';
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
            <Repeat2Icon size={16} className="mr-1" />
            {rc}
          </span>
          <span className="flex items-center">
            <MessageCircleMoreIcon size={16} className="mr-1" />
            {cc}
          </span>
          <span className="flex items-center">
            <ThumbsUpIcon size={16} className="relative top-[-1px] mr-1" />
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

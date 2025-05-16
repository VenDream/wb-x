/*
 * Twitter Tweet Card Menu
 *
 * @Author: VenDream
 * @Date: 2025-05-16 14:56:38
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button, Dropdown } from '@/components/daisyui';
import { TwitterIcon } from '@/components/icons';
import {
  PRIMARY_ROUTES,
  TWITTER_HOST,
  TWITTER_IMAGES_DOWNLOAD_API,
} from '@/constants';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { copyText } from '@/utils/common';
import {
  CopyIcon,
  EllipsisVerticalIcon,
  IdCardIcon,
  ImageDownIcon,
  MessageCircleMoreIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import CardCtx from './context';

const ALIGN_END_TRIGGER_W = 1536; // 2xl

export default function CardMenu() {
  const cardCtx = useContext(CardCtx);
  const { tweet, isRetweet, menu } = cardCtx;
  const { id, user, images } = tweet as Twitter.Tweet;
  const t = useTranslations('pages.tweet.menu');
  const [alignEnd, setAlignEnd] = useState(false);

  const hasImages = images.length > 0;

  const refreshAlignment = useCallback(() => {
    const w = window.innerWidth;
    setAlignEnd(w <= ALIGN_END_TRIGGER_W);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', refreshAlignment);
    refreshAlignment();
    return () => {
      window.removeEventListener('resize', refreshAlignment);
    };
  }, [refreshAlignment]);

  if (user.id === '-1') return null;

  return (
    <Dropdown
      align={alignEnd ? 'end' : 'start'}
      className={cn('absolute right-[14px]', {
        'top-[18px]': isRetweet,
        'top-[35px]': !isRetweet,
      })}
    >
      <Dropdown.Toggle>
        <Button
          ghost
          size="sm"
          className="h-[2.1rem] w-[2.1rem] rounded-full p-0"
        >
          <EllipsisVerticalIcon size={20} />
        </Button>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={cn(
          'border-base-content/10 z-20 mt-2 w-[190px] rounded-sm border',
          'bg-base-100/50 backdrop-blur-lg will-change-transform'
        )}
      >
        {!!menu.copyId && (
          <Dropdown.Item>
            <span
              className="rounded-sm p-2"
              onClick={() => {
                copyText(id);
                toast.success(t('copySuccessTips'));
                (document.activeElement as HTMLDivElement)?.blur();
              }}
            >
              <CopyIcon size={16} className="!stroke-2" />
              {t('copyID')}
            </span>
          </Dropdown.Item>
        )}
        {!!menu.copyUid && (
          <Dropdown.Item>
            <span
              className="rounded-sm p-2"
              onClick={() => {
                copyText(user.id);
                toast.success(t('copySuccessTips'));
                (document.activeElement as HTMLDivElement)?.blur();
              }}
            >
              <IdCardIcon size={16} className="!stroke-2" />
              {t('copyUID')}
            </span>
          </Dropdown.Item>
        )}
        {!!menu.viewOriginal && (
          <Dropdown.Item>
            <Link
              target="_blank"
              rel="noreferrer"
              className="rounded-sm p-2"
              href={`${TWITTER_HOST}/${user.screenName}/status/${id}`}
            >
              <TwitterIcon size={16} className="!stroke-2" />
              {t('source')}
            </Link>
          </Dropdown.Item>
        )}
        {!!menu.dlImages && hasImages && (
          <Dropdown.Item>
            <a
              target="_blank"
              rel="noreferrer"
              className="rounded-sm p-2"
              href={`${TWITTER_IMAGES_DOWNLOAD_API}&id=${id}`}
            >
              <ImageDownIcon size={16} className="!stroke-2" />
              {t('download')}
            </a>
          </Dropdown.Item>
        )}
        {!!menu.viewComments && (
          <Dropdown.Item>
            <Link
              target="_blank"
              className="rounded-sm p-2"
              href={`${TWITTER_HOST}/${user.screenName}/status/${id}`}
            >
              <MessageCircleMoreIcon size={16} className="!stroke-2" />
              {t('comments')}
            </Link>
          </Dropdown.Item>
        )}
        {!!menu.viewOpPosts && (
          <Dropdown.Item>
            <Link
              target="_blank"
              className="rounded-sm p-2"
              href={`${PRIMARY_ROUTES.TWITTER}?uid=${user.id}`}
            >
              <SquareArrowOutUpRightIcon size={16} className="!stroke-2" />
              {t('opPosts')}
            </Link>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

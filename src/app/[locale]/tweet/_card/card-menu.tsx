/*
 * Twitter Tweet Card Menu
 *
 * @Author: VenDream
 * @Date: 2025-05-16 14:56:38
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { twitter } from '@/api/client';
import { Button, Dropdown } from '@/components/daisyui';
import { TwitterIcon } from '@/components/icons';
import { PRIMARY_ROUTES, TWITTER_HOST } from '@/constants';
import useUser from '@/hooks/use-user';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { copyText } from '@/utils/common';
import {
  CopyIcon,
  EllipsisVerticalIcon,
  IdCardIcon,
  ImageDownIcon,
  MessageCircleMoreIcon,
  RefreshCwIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import CardCtx from './context';

const ALIGN_END_TRIGGER_W = 1536; // 2xl

export default function CardMenu() {
  const t1 = useTranslations('pages.tweet.menu');
  const t2 = useTranslations('global.status');

  const { isAdmin } = useUser();
  const cardCtx = useContext(CardCtx);

  const [alignEnd, setAlignEnd] = useState(false);

  const { tweet, isRetweet, menu, updateTweet } = cardCtx;
  const { id, user, images } = tweet as Twitter.Tweet;
  const hasImages = images.length > 0;

  const refreshTweet = async () => {
    toast.promise(
      new Promise<void>((resolve, reject) =>
        twitter
          .refreshTweet(id)
          .then(tweet => {
            updateTweet(tweet);
            resolve();
          })
          .catch(err => {
            reject(err);
          })
      ),
      {
        loading: t1('refreshing'),
        success: t1('refreshing') + t2('success'),
        error: t1('refreshFailed'),
      }
    );
  };

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
                toast.success(t1('copySuccessTips'));
                (document.activeElement as HTMLDivElement)?.blur();
              }}
            >
              <CopyIcon size={16} className="!stroke-2" />
              {t1('copyID')}
            </span>
          </Dropdown.Item>
        )}
        {!!menu.copyUid && (
          <Dropdown.Item>
            <span
              className="rounded-sm p-2"
              onClick={() => {
                copyText(user.id);
                toast.success(t1('copySuccessTips'));
                (document.activeElement as HTMLDivElement)?.blur();
              }}
            >
              <IdCardIcon size={16} className="!stroke-2" />
              {t1('copyUID')}
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
              {t1('source')}
            </Link>
          </Dropdown.Item>
        )}
        {!!menu.dlImages && hasImages && (
          <Dropdown.Item>
            <Link
              target="_blank"
              rel="noreferrer"
              className="rounded-sm p-2"
              href={`${window.location.origin}/api/twitter/tweet/images?responseType=zip&id=${id}`}
            >
              <ImageDownIcon size={16} className="!stroke-2" />
              {t1('download')}
            </Link>
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
              {t1('comments')}
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
              {t1('opPosts')}
            </Link>
          </Dropdown.Item>
        )}
        {isAdmin && (
          <Dropdown.Item>
            <span className="rounded-sm p-2" onClick={refreshTweet}>
              <RefreshCwIcon size={16} className="!stroke-2" />
              {t1('refresh')}
            </span>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

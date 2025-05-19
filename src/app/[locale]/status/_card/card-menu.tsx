/*
 * Weibo Status Card Menu
 *
 * @Author: VenDream
 * @Date: 2023-11-29 10:19:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Dropdown } from '@/components/daisyui';
import { WeiboIcon } from '@/components/icons';
import {
  PRIMARY_ROUTES,
  SECONDARY_ROUTES,
  WEIBO_HOST,
  WEIBO_IMAGES_DOWNLOAD_API,
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
  const { status, isRetweet, menu } = cardCtx;
  const { id, user, images } = status as Weibo.Status;
  const t = useTranslations('pages.status.menu');
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
              href={`${WEIBO_HOST}/detail/${id}`}
            >
              <WeiboIcon size={16} className="!stroke-2" />
              {t('source')}
            </Link>
          </Dropdown.Item>
        )}
        {!!menu.dlImages && hasImages && (
          <Dropdown.Item>
            <Link
              target="_blank"
              rel="noreferrer"
              className="rounded-sm p-2"
              href={`${WEIBO_IMAGES_DOWNLOAD_API}&id=${id}`}
            >
              <ImageDownIcon size={16} className="!stroke-2" />
              {t('download')}
            </Link>
          </Dropdown.Item>
        )}
        {!!menu.viewComments && (
          <Dropdown.Item>
            <Link
              target="_blank"
              className="rounded-sm p-2"
              href={`${SECONDARY_ROUTES.STATUS_DETAIL}/${id}#comments`}
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
              href={`${PRIMARY_ROUTES.WEIBO}?uid=${user.id}`}
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
